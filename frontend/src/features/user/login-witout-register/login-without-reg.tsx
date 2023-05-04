import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useSocket } from "@socket/get-socket";
import { User } from "@interfaces/user";
import { countries } from "@constants/countries";
// redux login
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupWOMMutation } from "@/store/api/authApi";
import { setCredentials, selectCurrentUser } from "@/store/slices/authSlice";

interface userState {
  name: string;
  password: string;
  age: number;
  gender: string;
  country: string;
}

export function LoginWOR() {
  console.log("inside loging wor");
  // countries.unshift();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupWOM, { data, isLoading, error, isError, isSuccess }] =
    useSignupWOMMutation();

  // const socket = useSocket();

  const [user, setUser] = useState<userState>({
    name: "",
    age: 18,
    gender: "male",
    country: "",
    password: "",
  });

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value });
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, age: parseInt(event.target.value, 10) });
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, gender: event.target.value as User["gender"] });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, country: event.target.value });
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // user.uuid = uuid();
  //   console.log("event", event);

  //   navigate("/chat");
  // };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user);
    const userData = await signupWOM({ ...user }).unwrap();
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      // setOpenPostModal(false);
      dispatch(setCredentials(data));
      navigate("/chat");
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      {error ? <ToastContainer /> : null}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto shadow-lg p-10 shadow-purple-200"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
            Username
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={user.name}
            onChange={handleUsernameChange}
            className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Select a unique username!"
          />
        </div>
        <div className="flex">
          <div className="mb-4">
            <label htmlFor="age" className="block mb-2 font-bold text-gray-700">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              value={user.age}
              onChange={handleAgeChange}
              min={18}
              max={90}
              className="rounded-md w-full px-3 py-2 leading-tight text-gray-700 border shadow appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="mx-8 mb-4">
            <label
              htmlFor="gender"
              className="block mb-2 font-bold text-gray-700"
            >
              Gender
            </label>
            <div>
              <label
                htmlFor="male"
                className="inline-flex items-center mr-4 gap-4"
              >
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={handleGenderChange}
                  className="form-radio  text-purple-500 border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label htmlFor="female" className="inline-flex items-center">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={handleGenderChange}
                  // className="form-radio"
                  className="form-radio  text-purple-500 border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block mb-2 font-bold text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            name="country"
            value={user.country}
            onChange={handleCountryChange}
            required
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select a country</option>
            {countries.map(({ code, name }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple active:bg-purple-500"
          >
            Start chatting now!
          </button>
        </div>
      </form>
    </>
  );
}

// export default loginWOR;
