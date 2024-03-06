import React, { Component, ErrorInfo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state to show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // We can log the error to an error reporting service here.
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI component when an error occurs.
      return (
        <Box textAlign="center" py={4}>
          <Typography variant="h5" component="div">
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" component="div">
            We're sorry, but an error has occurred.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
