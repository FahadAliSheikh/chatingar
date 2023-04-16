import { Header } from "@features/ui";
import { LoginWOR } from "@features/user";
import { CheckBox } from "@features/ui";

export function LoginWORPage() {
  return (
    <div>
      <Header
        heading="Join chat as a guest user without registration!"
        paragraph="some paragrapht here"
        linkName=""
        linkUrl=""
      />
      <LoginWOR />
    </div>
  );
}
