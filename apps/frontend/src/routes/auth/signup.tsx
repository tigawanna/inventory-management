import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { SignupComponent } from "./-components/SignupComponent";
import { z } from "zod";
import { Helmet } from "@/components/wrappers/custom-helmet";


const searchparams = z.object({
  returnTo: z.string(),
});
export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
  validateSearch: (search) => searchparams.parse(search),
  async beforeLoad(ctx) {
    const viewer = ctx.context?.viewer;
    const returnTo = ctx.search?.returnTo ?? "/";
    if (viewer?.result) {
      throw redirect({ to: returnTo,replace: true });
    }
  },
});

interface SignupProps {}

export function SignupPage({}: SignupProps) {
  return (
    <div className="to-primary/50items-center flex h-full min-h-screen w-full flex-col justify-center">
      <Helmet title="invenrory | Signup" description="Login to your account" />
      <SignupComponent />
    </div>
  );
}
