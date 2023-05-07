import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useSocket } from "@socket/get-socket";
// redux login
import { useNavigate } from "react-router-dom";

interface ContactState {
  name: string;
  email: string;
  message: string;
}
export function ContactUs() {
  let navigate = useNavigate();

  const [contact, setContact] = useState<ContactState>({
    email: "",
    name: "",
    message: "",
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, name: event.target.value });
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, email: event.target.value });
  };

  const handleMessageChange = (event: any) => {
    console.log(event);
    setContact({ ...contact, message: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("contact", contact);
    // signinUser({ ...contact });
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="my-30">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto shadow-lg p-10 shadow-purple-200"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
            name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            value={contact.name}
            onChange={handleNameChange}
            className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Enter your name"
            ref={inputRef}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={contact.email}
            onChange={handleEmailChange}
            className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block mb-2 font-bold text-gray-700"
          >
            message
          </label>
          <textarea
            id="message"
            name="message"
            value={contact.message}
            onChange={handleMessageChange}
            className="h-44 rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Type your message here"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-600 focus:outline-none focus:shadow-outline-purple active:bg-purple-500"
          >
            Send us a message
          </button>
        </div>
      </form>
    </div>
  );
}
