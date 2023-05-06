import React, { useEffect } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { userApi } from "@/store/api/userApi";
import { useDispatch } from "react-redux";
import { setActiveUsers } from "@slices/userSlice";

export function GenderFilter() {
  const dispatch = useDispatch();

  const [
    executeGetActiveUsersQuery,
    { data: activeUsers = [], isError, error, isLoading, isSuccess },
  ] = userApi.endpoints.getActiveUsers.useLazyQuery();

  const handleGender = (gender: any) => {
    executeGetActiveUsersQuery({ gender: gender })
      .unwrap()
      .then((data) => {
        dispatch(setActiveUsers(data));
      });
  };
  return (
    <div className="p-1 bg-purple-500  w-full rounded-t-xl text-white flex flex-row">
      <h1 className="text-2xl font-bold m-4">LOGO</h1>

      <ul className="flex felx-row justify-center gap-12 mt-4">
        <li className="mb-5">
          <a
            href="#"
            className="hover:text-gray-400 "
            onClick={() => handleGender("")}
          >
            {<FaMale size={20} title="male" />} All
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className="hover:text-gray-400 "
            onClick={() => handleGender("male")}
          >
            {<FaMale size={20} title="male" />} Male
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className="hover:text-gray-400"
            onClick={() => handleGender("female")}
          >
            {<FaFemale size={20} title="female" />} Female
          </a>
        </li>
      </ul>
    </div>
  );
}
