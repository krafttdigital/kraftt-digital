import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this would report to an error-tracking service.
    console.error('Kraftt Digital — caught render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="font-display text-3xl text-[var(--color-midnight)]" style={{ fontWeight: 300 }}>
              Something went wrong.
            </h1>
            <p className="mt-3 font-sans text-sm text-[var(--color-midnight)]/65">
              This part of the page failed to load. Refreshing usually fixes it — if not, please get in touch.
            </p>
            <div className="mt-6">
              <Button href="/">Back to home</Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
