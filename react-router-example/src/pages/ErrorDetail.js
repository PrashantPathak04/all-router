
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import Root from "./Root";

export default function ErrorDetail() {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = "Unexpected Error";
    let message = "An unexpected error occurred.";

    if (isRouteErrorResponse(error)) {
        title = `Error ${error.status}` + (error.statusText ? ` — ${error.statusText}` : "");
        message = error.data?.message ?? error.data ?? error.statusText ?? message;
    } else if (error instanceof Error) {
        title = error.name || title;
        message = error.message || message;
    } else if (typeof error === "string") {
        message = error;
    }

    return (
        <>
        <Root />
        <div style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial" }}>
            <h1 style={{ marginTop: 0 }}>{title}</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>{String(message)}</p>

            {/* {process.env.NODE_ENV === "development" && error && (
                <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 6, overflow: "auto" }}>
                    {String((error && (error.stack ?? JSON.stringify(error, null, 2))) || "")}
                </pre>
            )} */}

            <div style={{ marginTop: 16 }}>
                <button onClick={() => navigate("/", { replace: true })} style={{ marginRight: 8 }}>
                    Go home
                </button>
                <button onClick={() => navigate(-1)}>Go back</button>
            </div>
        </div>
        </>
    );
}
