import React from 'react'

type ErrorProps = { children: JSX.Element }

class ErrorBoundary extends React.Component<ErrorProps> {
  state = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error: error.message }
  }

  componentDidCatch(error: Error) {
    console.log(error)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container-center container">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl">Oops, there is an error!</h1>
              <span className="text-red-500">{this.state.error}</span>
            </div>
            <button
              className="w-52 rounded border border-gray-500 p-2 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-400"
              onClick={() => this.setState({ error: null })}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
