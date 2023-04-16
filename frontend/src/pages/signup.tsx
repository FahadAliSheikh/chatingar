import { Header } from "@features/ui";
import { Signup } from "@features/user";

export default function SignupPage() {
  return (
    <section className=" w-1/2 self-center m-20">
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="signin"
        linkUrl="/signin"
      />
      <Signup />
    </section>
  );
}
