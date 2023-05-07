import { useForm } from "react-hook-form";

export function ContactUs() {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e: any) => {
    const isValid = await trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };
  return (
    <div className="my-30">
      <form
        className="max-w-md mx-auto shadow-lg p-10 shadow-purple-200"
        target="_blank"
        onSubmit={onSubmit}
        action="https://formsubmit.co/476fa689f5916b8beeb0e65e917f4e84"
        method="POST"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
            name
          </label>
          <input
            id="name"
            type="name"
            className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Enter your name"
            {...register("name", {
              required: true,
              maxLength: 100,
            })}
          />
          {errors.name && (
            <p className="text-red mt-1 ">
              {errors.name.type === "required" && "This field is required!"}
              {errors.name.type === "maxLength" &&
                "Max length is 100 characters!"}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          {errors.email && (
            <p className="text-red mt-1 ">
              {errors.email.type === "required" && "This field is required!"}
              {errors.email.type === "pattern" && "Invalid email address!"}
            </p>
          )}
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
            className="h-44 rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            required
            placeholder="Type your message here"
            {...register("message", {
              required: true,
              maxLength: 100,
            })}
          />
          {errors.message && (
            <p className="text-red mt-1 ">
              {errors.message.type === "required" && "This field is required!"}
              {errors.message.type === "maxLength" &&
                "Max length is 2000 characters!"}
            </p>
          )}
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
