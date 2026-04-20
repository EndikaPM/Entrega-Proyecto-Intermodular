import React from 'react';

class ChatErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Fallo en Chat:', error, info);
    }

    render() {
        if (this.state.hasError) {
        return <div className="chat-container">El chat no está disponible</div>;
        }

        return this.props.children;
    }
}

export default ChatErrorBoundary;