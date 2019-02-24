import React from 'react';

class ErrorBoundary extends React.Component{
    state = {
        hasError: false
    };
    componentDidCatch(error){
        this.setState(
            {hasError: true}
        )
    }
    render(){
        return this.state.hasError ? <h1>something wrong</h1> : this.props.children;
    }
}

export default ErrorBoundary;