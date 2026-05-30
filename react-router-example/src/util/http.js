export async function loaderEvents() {
  const response = await fetch("http://localhost:8080/event");
  if (!response.ok) {
    throw new Error("Failed to fetch events.", { status: response.status });
  }
  console.log("Fetched events:", response);
  return response.json();
} 