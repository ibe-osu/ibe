import { Container } from "@mui/material";
import { Metadata } from "next";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  robots: { index: false, follow: false },
};

// The heading lives inside SignupForm rather than here, so it can change to
// "Check your email" once the form is submitted — otherwise the page still
// reads "You'll need the membership code from an IBE officer" after you've
// already used one.
export default function SignupPage() {
  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <SignupForm />
    </Container>
  );
}
