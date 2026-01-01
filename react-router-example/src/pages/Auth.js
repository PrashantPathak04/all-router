import { Form, useActionData, useSearchParams, Link, redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const actionData = useActionData();
  const authCtx = useContext(AuthContext);
  // auth state is synced in `App.js` from localStorage after actions redirect

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 20 }}>
      <h1 style={{ marginBottom: 12 }}>{mode === "signup" ? "Create account" : "Sign in"}</h1>

      {actionData && actionData.message && (
        <div style={{ background: "#f8d7da", color: "#721c24", padding: 10, borderRadius: 6, marginBottom: 12 }}>
          {actionData.message}
        </div>
      )}

      <Form method="post">
        <input type="hidden" name="mode" value={mode} />

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Email</label>
          <input name="email" type="email" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Password</label>
          <input name="password" type="password" required style={{ width: "100%", padding: 8 }} />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" style={{ padding: "8px 12px" }}>
            {mode === "signup" ? "Create Account" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => {
              const nextMode = mode === "signup" ? "login" : "signup";
              const params = Object.fromEntries([...searchParams]);
              params.mode = nextMode;
              setSearchParams(params);
            }}
            style={{ padding: "8px 12px" }}
          >
            {mode === "signup" ? "Have an account? Sign in" : "New here? Create account"}
          </button>
        </div>
      </Form>   

      <p style={{ marginTop: 16 }}>
        Or go back to <Link to="/">Home</Link>.
      </p>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const mode = formData.get("mode") || new URL(request.url).searchParams.get("mode") || "login";

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  const url = mode === "signup" ? "http://localhost:8080/auth/signup" : "http://localhost:8080/auth/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      try {
        const data = await response.json();
        return { message: data?.message || "Authentication failed." };
      } catch (err) {
        return { message: "Authentication failed." };
      }
    }

    // parse successful response and persist token if provided
    try {
      const data = await response.json();
      if (data?.token) {
        localStorage.setItem('token', data.token);
      }
      if (data?.userId) {
        localStorage.setItem('userId', data.userId);
      }
    } catch (err) {
      // ignore parse errors and continue to redirect
    }

    // // honor redirectTo param if present
    // const redirectTo = new URL(request.url).searchParams.get('redirectTo') || '/';
    // return redirect(redirectTo);
    return redirect("/");
  } catch (err) {
    return { message: "Network error. Please try again." };
  }
}
