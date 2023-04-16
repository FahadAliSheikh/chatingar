import { useState } from "react";
import { signupFields } from "@constants/form-fields";
import { Button } from "@features/ui";
import { Input } from "@features/ui";

const fields = signupFields;
let fieldsState: any = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: any) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {};

  return (
    <section className="max-w-md mx-auto shadow-lg p-10 shadow-purple-200">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              onChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
              customClass=""
            />
          ))}
          <Button
            onSubmit={handleSubmit}
            text="Signup"
            type="button"
            action="submit"
          />
        </div>
      </form>
    </section>
  );
}
