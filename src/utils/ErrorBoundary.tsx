import React from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

type ErrorBoundaryState = {
  hasError: boolean;
}
// Define a class component named ErrorBoundary that extends React.Component
export default class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  // Define a constructor that accepts props and initializes the state with hasError set to false
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // Define a static method named getDerivedStateFromError that accepts an error and returns an object with hasError set to true
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Define a method named componentDidCatch that accepts an error and errorInfo and logs them to the console
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error({ error, errorInfo });
  }

  render() {
    // If this.state.hasError is true, show error
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    // Define a render method that returns this.props.children
    return this.props.children;
  }
}
