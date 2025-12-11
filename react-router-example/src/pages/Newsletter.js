
import { useFetcher } from "react-router-dom";
const Newsletter = () => {
    const fetcher = useFetcher();
    const email = fetcher.formData ? fetcher.formData.get("email") : "";
    const state = fetcher.state;
    const data = fetcher.data;
    
    console.log("Fetcher State:", state);
    console.log("Fetcher Data:", data); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetcher.submit(formData, { method: "post", action: "/newsletter" });

    form.reset();

  };

  return (
    <fetcher.Form method="post" action="/newsletter" onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        defaultValue={email}
        required
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
         style={{
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      >
        Sign Up
      </button>
    </fetcher.Form>
  );
};

export default Newsletter;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  console.log("User signed up with email:", email);
  return { message: "Signed up successfully", email };
}
