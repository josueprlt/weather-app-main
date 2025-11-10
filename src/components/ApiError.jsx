import {IconError} from "./icons";
import Button from "./Button";

export const ApiError = () => {
    const handleRetry = () => {
        window.location.reload();
    }

    return (
        <section className="flex flex-col items-center justify-center mx-8 my-8 text-center">
            <IconError className="w-10 h-10 md:w-16 md:h-16" />
            <h1 className="text-center text-xl my-2 sm:my-8 sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque">Something went wrong</h1>
            <p className="mb-4 md:mb-8">We couldn't connect to the server (API error). Please try again in a few moments.</p>

            <Button color="gray" icon="retry" onclick={handleRetry}>Retry</Button>
        </section>
    )
}

export default ApiError;