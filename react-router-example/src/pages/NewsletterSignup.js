import Newsletter from "./Newsletter";

const NewsletterSignup = () => {
  return (
    <section>
      <p />
      <h1>Newsletter Page</h1>
      <p>Subscribe to our newsletter to get the latest updates!</p>
      <Newsletter />
    </section>
  );
};
export default NewsletterSignup;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  console.log("User signed up with email:", email);
  return { message: "Signed up successfully" };
}

