import { ColyseusSDK, Callbacks, Room } from "@colyseus/sdk";
import { SERVER_ENDPOINT, ROOM_NAME } from "../constants";
import { useNetworkStore } from "../store/useNetworkStore";
import type { RemotePlayer } from "../types";

class ColyseusClientManager {
  private client: ColyseusSDK | null = null;
  private room: Room | null = null;

  constructor() {
    this.initClient();
  }

  private initClient() {
    try {
      this.client = new ColyseusSDK(SERVER_ENDPOINT);
    } catch (err) {
      console.error("[ColyseusClientManager] Failed to init client:", err);
    }
  }

  public async connect(nickname: string): Promise<boolean> {
    const store = useNetworkStore.getState();
    store.setConnecting(true);
    store.setConnectionError(null);

    if (!this.client) {
      this.initClient();
    }

    if (!this.client) {
      store.setConnectionError("Colyseus SDK를 초기화할 수 없습니다.");
      return false;
    }

    try {
      this.room = await this.client.joinOrCreate(ROOM_NAME, { nickname });

      store.setConnected(true, this.room.sessionId);
      store.setNickname(nickname);

      const callbacks = Callbacks.get(this.room);

      // Listen for player additions and property changes
      callbacks.onAdd("players", (player: any, key: any) => {
        const sessionId = String(key);
        const syncPlayer = () => {
          const remotePlayer: RemotePlayer = {
            sessionId,
            nickname: player.nickname || "관람객",
            x: player.x || 0,
            y: player.y || 0,
            z: player.z || 0,
            rotationY: player.rotationY || 0,
            state: player.state || "IDLE",
            isHoldingRope: !!player.isHoldingRope,
            ropeIndex: player.ropeIndex ?? -1,
            hasCandle: !!player.hasCandle,
            joinedAt: player.joinedAt || Date.now(),
          };
          useNetworkStore.getState().upsertPlayer(sessionId, remotePlayer);
        };

        syncPlayer();

        // Listen for realtime position and state property updates
        callbacks.onChange(player, () => {
          syncPlayer();
        });
      });

      // Listen for player removals
      callbacks.onRemove("players", (_player: any, key: any) => {
        const sessionId = String(key);
        useNetworkStore.getState().removePlayer(sessionId);
      });

      // Handle room leave
      this.room.onLeave((code) => {
        console.warn(`[ColyseusClientManager] Left room with code: ${code}`);
        useNetworkStore.getState().reset();
      });

      this.room.onError((code, message) => {
        console.error(`[ColyseusClientManager] Room error [${code}]:`, message);
        useNetworkStore.getState().setConnectionError(`오류 (${code}): ${message}`);
      });

      return true;
    } catch (err: any) {
      console.warn("[ColyseusClientManager] Connection failed (server may be offline):", err);
      store.setConnectionError("서버에 연결할 수 없습니다. 오프라인 관람 모드로 진행합니다.");
      return false;
    }
  }

  public disconnect() {
    if (this.room) {
      try {
        this.room.leave();
      } catch (err) {
        console.warn("[ColyseusClientManager] Leave error:", err);
      }
      this.room = null;
    }
    useNetworkStore.getState().reset();
  }

  public sendPositionUpdate(x: number, y: number, z: number, rotationY: number, state: string) {
    if (!this.room) return;
    try {
      this.room.send("update_position", { x, y, z, rotationY, state });
    } catch (err) {
      console.error("[ColyseusClientManager] Failed to send position update:", err);
    }
  }

  public sendState(newState: string) {
    if (!this.room) return;
    try {
      this.room.send("set_state", newState);
    } catch (err) {
      console.error("[ColyseusClientManager] Failed to send state:", err);
    }
  }

  public sendNickname(newNickname: string) {
    if (!this.room) return;
    try {
      this.room.send("set_nickname", newNickname);
    } catch (err) {
      console.error("[ColyseusClientManager] Failed to send nickname:", err);
    }
  }
}

export const colyseusManager = new ColyseusClientManager();
