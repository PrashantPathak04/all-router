import { redirect } from "react-router-dom";

export function requireAuth({ request }) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      const url = new URL(request.url);
    //   const redirectTo = url.pathname + url.search;
      return redirect(`/auth`);
    }
    return null;
  } catch (err) {
    return redirect(`/auth?mode=login`);
  }
}
