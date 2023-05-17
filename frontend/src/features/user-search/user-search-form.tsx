import React, { useState, useEffect } from "react";
import { userApi } from "@/store/api/userApi";
import { useDispatch } from "react-redux";
import { setActiveUsers } from "@/store/slices/userSlice";
import { countries } from "@constants/countries";
import { BackToUserBtn } from "../chat";
import { Spinner } from "../spinner";
import { emitSocketSearchUsers } from "@/socket";

interface User {
  name: string;
  gender: "male" | "female";
  country: string;
}

export function UserSearchForm() {
  let dispatch = useDispatch();
  const [
    executeGetActiveUsersQuery,
    { data: activeUsers = [], isError, error, isLoading, isSuccess },
  ] = userApi.endpoints.getActiveUsers.useLazyQuery();

  const [user, setUser] = useState<User>({
    name: "",
    gender: "female",
    country: "",
  });

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, name: event.target.value });
  };

  // const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUser({ ...user, age: parseInt(event.target.value, 10) });
  // };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, gender: event.target.value as User["gender"] });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user, country: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call an API to submit the user data
    // executeGetActiveUsersQuery(user)
    //   .unwrap()
    //   .then((data) => {
    //     console.log("setting new active users in state");
    //     dispatch(setActiveUsers(data));
    //   });
    emitSocketSearchUsers(user);
  };

  return (
    <>
      <div>
        <BackToUserBtn />
      </div>
      <div>
        <h2 className="mt-6 text-center text-2xl font-bold text-black">
          Search for Users to chat!
        </h2>
      </div>

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
            // className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            className="rounded-md appearance-none  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm dark:bg-white"
            placeholder="Select a unique username"
          />
        </div>
        {/* <div className="flex"> */}
        {/* <div className="mb-4">
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
        </div> */}
        <div className=" mb-4">
          <label
            htmlFor="gender"
            className="block mb-2 font-bold text-gray-700"
          >
            Gender
          </label>
          <div>
            <label htmlFor="female" className="inline-flex items-center mr-5">
              <input
                id="female"
                name="gender"
                type="radio"
                value="female"
                checked={user.gender === "female"}
                onChange={handleGenderChange}
                // className="form-radio"
                className="form-radio  text-purple-500 border-gray-300 focus:ring-2 focus:ring-purple-500 mr-2"
              />
              Female
            </label>

            <label
              htmlFor="male"
              className="inline-flex items-center mr-5 gap-2"
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
              Male
            </label>
          </div>
        </div>
        {/* </div> */}
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
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Countries</option>
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
            className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded focus:outline-none focus:shadow-outline-purple active:bg-purple-500 hover:bg-purple-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner height={"h-6"} width={"w-6"} />
            ) : (
              <p>Search now!</p>
            )}{" "}
          </button>
        </div>
      </form>
    </>
  );
}

// export default loginWOR;
