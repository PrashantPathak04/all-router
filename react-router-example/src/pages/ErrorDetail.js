
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import Root from "./Root";
import PageWrapper from "./PageWrapper";

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
        <PageWrapper title={title} subtitle={String(message)}>
            <div style={{ marginTop: 16 }}>
                <button onClick={() => navigate("/", { replace: true })} style={{ marginRight: 8, padding: 10, borderRadius: 8, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>
                    Go home
                </button>
                <button onClick={() => navigate(-1)} style={{ padding: 10, borderRadius: 8, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer' }}>
                    Go back
                </button>
            </div>
        </PageWrapper>
        </>
    );
}
