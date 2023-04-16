import { useState } from "react";
import { loginFields } from "@constants/form-fields";
import { Button } from "@features/ui";
import { CheckBox } from "@features/ui";

import { Input } from "@features/ui";

const fields = loginFields;
let fieldsState: any = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    console.log("inside handle submit", e);
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {};

  return (
    <section className="max-w-md mx-auto shadow-lg p-10 shadow-purple-200">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              onChange={handleChange}
              value={loginState[field.id]}
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
        </div>

        <CheckBox />
        <Button
          onSubmit={handleSubmit}
          text="Login"
          type="button"
          action="submit"
        />
      </form>
    </section>
  );
}
