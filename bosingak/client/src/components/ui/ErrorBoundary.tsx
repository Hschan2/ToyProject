import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary] Uncaught 3D rendering error:", error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback-screen">
          <div className="error-dialog">
            <h2>⚠️ 3D 화면 로딩 중 문제가 발생했습니다</h2>
            <p>
              브라우저의 WebGL 하드웨어 가속이 활성화되어 있는지 확인해 주세요.
            </p>
            {this.state.error && (
              <pre className="error-code-block">{this.state.error.message}</pre>
            )}
            <button className="btn-primary" onClick={this.handleReload}>
              다시 시도하기
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
