import React, { useEffect, useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { userApi } from "@/store/api/userApi";
import { useDispatch } from "react-redux";
import { setActiveUsers } from "@slices/userSlice";
import {
  emitSocketSearchUsers,
  offSocketGetUsers,
  onSocketGetUsers,
} from "@/socket";

export function GenderFilter() {
  console.log("GENDER FILTER COMP =>");
  const [selectedGender, setSelectedGender] = useState("");

  const dispatch = useDispatch();

  // const [
  //   executeGetActiveUsersQuery,
  //   { data: activeUsers = [], isError, error, isLoading, isSuccess },
  // ] = userApi.endpoints.getActiveUsers.useLazyQuery();

  const handleGender = (gender: any) => {
    setSelectedGender(gender);

    // executeGetActiveUsersQuery({ gender: gender })
    //   .unwrap()
    //   .then((data) => {
    //     dispatch(setActiveUsers(data));
    //   });
    let searchData = {
      name: "",
      gender: gender,
      countr: "",
    };
    emitSocketSearchUsers(searchData);
  };
  // useEffect(() => {
  //   onSocketGetUsers((userdata: any) => {
  //     console.log("user coming from socket", userdata);
  //     dispatch(setActiveUsers(userdata));
  //   });
  //   // cleanup function to unsubscribe the event listener
  //   return () => {
  //     offSocketGetUsers();
  //   };
  // });
  return (
    <div className="p-1 bg-purple-500  w-full rounded-t-xl text-white flex flex-row">
      <h1 className="text-2xl font-bold m-4">LOGO</h1>

      <ul className="flex felx-row justify-center gap-12 mt-4">
        <li className="mb-5">
          <a
            href="#"
            className={`hover:text-red-700 ${
              selectedGender === "" ? "text-red-700" : ""
            }`}
            onClick={() => handleGender("")}
          >
            {<FaMale size={20} title="male" />} All
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className={`hover:text-red-700 ${
              selectedGender === "male" ? "text-red-700" : ""
            }`}
            onClick={() => handleGender("male")}
          >
            {<FaMale size={20} title="male" />} Male
          </a>
        </li>
        <li className="mb-5">
          <a
            href="#"
            className={`hover:text-red-700 ${
              selectedGender === "female" ? "text-red-700" : ""
            }`}
            onClick={() => handleGender("female")}
          >
            {<FaFemale size={20} title="female" />} Female
          </a>
        </li>
      </ul>
    </div>
  );
}
