import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSocket } from "@socket/get-socket";
import { User } from "@interfaces/user";
import { countries } from "@constants/countries";
// redux login
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSigninUserMutation } from "@/store/api/authApi";
import { setCredentials, selectCurrentUser } from "@/store/slices/authSlice";
import { getSocket } from "@/socket";

interface LoginState {
  email: string;
  password: string;
}
export function Login() {
  const socket = getSocket();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [signinUser, { data, isLoading, error, isError, isSuccess }] =
    useSigninUserMutation();
  // const socket = useSocket();

  const [user, setUser] = useState<LoginState>({
    email: "",
    password: "",
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, password: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signinUser({ ...user });
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      // setOpenPostModal(false);
      dispatch(setCredentials(data));
      socket.emit("setUp", data);
      navigate("/chat/chat-box");
      // navigate("/chat");
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

      <section className="  lg:1/2 self-center lg:m-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto shadow-lg p-10 shadow-purple-200"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-bold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={user.email}
              onChange={handleEmailChange}
              className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
              required
              placeholder="Enter your registered email!"
              ref={inputRef}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-bold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={user.password}
              onChange={handlePasswordChange}
              className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
              required
              placeholder="Enter your password!!"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple active:bg-purple-500"
            >
              Start chatting now!
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
