import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Elgris Solar" }] }),
  component: SignupPage,
});

function SignupPage() {
  return <LoginPage />;
}
