"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                        p: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Something went wrong
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {this.state.error?.message || "An unexpected error occurred"}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={this.handleReset}
                        sx={{ mt: 2 }}
                    >
                        Try again
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 