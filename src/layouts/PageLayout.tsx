// Custom useErrorBoundary hook
import React, {ReactElement, useState} from "react"
import {WrapperProvider} from "./WrapperProvider"
import {Header} from "../components/organisms/Header"
import {Outlet} from "react-router-dom"
import {Footer} from "../components/molecules/Footer"

function useErrorBoundary() {
	const [error, setError] = useState<Error | null>(null)

	function componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		setError({...error, ...errorInfo})
	}

	function resetError() {
		setError(null)
	}

	return {error, componentDidCatch, resetError}
}

// ErrorBoundary component
interface ErrorBoundaryProps {
	children: React.ReactNode
	fallback: ReactElement<FallbackComponentProps>
}

/**
 * The `ErrorBoundary` component is a higher-order component that wraps around
 * other components to catch errors in their rendering process and display a
 * fallback UI instead of crashing the entire app.
 *
 * @component
 * @example
 * ```jsx
 * <ErrorBoundary fallback={<FallbackComponent />}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the ErrorBoundary.
 * @param {React.ReactElement} props.fallback - The fallback component to be displayed in case of an error.
 *
 * @returns {React.ReactElement} The wrapped child components if there are no errors, or the fallback component if an error occurs.
 */

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({children, fallback}) => {
	const {error, componentDidCatch, resetError} = useErrorBoundary()

	if (error) {
		return (
			<>
				{React.cloneElement(fallback, {error, resetError})}
				<details style={{whiteSpace: "pre-wrap"}}>
					{error && error.toString()}
					<br />
				</details>
			</>
		)
	}

	return (
		<React.Fragment>
			{React.Children.map(children, child => React.cloneElement(child, {componentDidCatch}))}
		</React.Fragment>
	)
}

// FallbackComponent
interface FallbackComponentProps {
	error?: Error
	resetError?: () => void
}

const FallbackComponent: React.FC<FallbackComponentProps> = ({error, resetError}) => (
	<div>
		<p>An error occurred: {error && error.toString()}</p>
		<button onClick={resetError}>Try again</button>
	</div>
)

export function PageLayout() {
	return (
		<>
			<ErrorBoundary fallback={<FallbackComponent />}>
				<WrapperProvider>
					<Header />
					<Outlet />
					<Footer />
				</WrapperProvider>
			</ErrorBoundary>
		</>
	)
}
