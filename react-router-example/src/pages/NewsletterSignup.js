import Newsletter from "./Newsletter";
import PageWrapper from "./PageWrapper";

const NewsletterSignup = () => {
  return (
    <PageWrapper
      title="Newsletter"
      subtitle="Subscribe to get the latest updates."
    >
      <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
        Subscribe to our newsletter to get the latest updates!
      </p>
      <Newsletter />
    </PageWrapper>
  );
};
export default NewsletterSignup;

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");
  console.log("User signed up with email:", email);
  return { message: "Signed up successfully" };
}

