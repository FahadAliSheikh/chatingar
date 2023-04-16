import { Header } from "@features/ui";
import { Login } from "@features/user";
export default function LoginPage() {
  return (
    <section className=" w-1/2 self-center m-20">
      <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
      <Login />
    </section>
  );
}
