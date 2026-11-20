import { useState, useEffect, useRef } from "react";

export interface KeyboardState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  jump: boolean;
}

export function useKeyboardControls(): React.RefObject<KeyboardState> {
  const keysRef = useRef<KeyboardState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
  });

  const [, setTrigger] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when typing into input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      let updated = false;
      const k = keysRef.current;

      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          if (!k.forward) {
            k.forward = true;
            updated = true;
          }
          break;
        case "KeyS":
        case "ArrowDown":
          if (!k.backward) {
            k.backward = true;
            updated = true;
          }
          break;
        case "KeyA":
        case "ArrowLeft":
          if (!k.left) {
            k.left = true;
            updated = true;
          }
          break;
        case "KeyD":
        case "ArrowRight":
          if (!k.right) {
            k.right = true;
            updated = true;
          }
          break;
        case "ShiftLeft":
        case "ShiftRight":
          if (!k.sprint) {
            k.sprint = true;
            updated = true;
          }
          break;
        case "Space":
          if (!k.jump) {
            k.jump = true;
            updated = true;
          }
          break;
      }

      if (updated) {
        setTrigger((prev) => prev + 1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      let updated = false;
      const k = keysRef.current;

      switch (e.code) {
        case "KeyW":
        case "ArrowUp":
          if (k.forward) {
            k.forward = false;
            updated = true;
          }
          break;
        case "KeyS":
        case "ArrowDown":
          if (k.backward) {
            k.backward = false;
            updated = true;
          }
          break;
        case "KeyA":
        case "ArrowLeft":
          if (k.left) {
            k.left = false;
            updated = true;
          }
          break;
        case "KeyD":
        case "ArrowRight":
          if (k.right) {
            k.right = false;
            updated = true;
          }
          break;
        case "ShiftLeft":
        case "ShiftRight":
          if (k.sprint) {
            k.sprint = false;
            updated = true;
          }
          break;
        case "Space":
          if (k.jump) {
            k.jump = false;
            updated = true;
          }
          break;
      }

      if (updated) {
        setTrigger((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keysRef;
}
