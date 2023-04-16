import React from "react";
import {
  FaMale,
  FaFemale,
  FaTransgenderAlt,
  FaDatabase,
  FaFolder,
  FaHamburger,
  FaLandmark,
  FaTools,
} from "react-icons/fa";

export function GenderFilter() {
  return (
    <div className="p-1 bg-purple-500  w-60 rounded-tr-xl text-white">
      <ul className="flex felx-row justify-center gap-8 mt-4">
        <li className="mb-5">
          <a href="#" className="hover:text-gray-400 ">
            {<FaMale size={20} title="male" />} Male
          </a>
        </li>
        <li className="mb-5">
          <a href="#" className="hover:text-gray-400">
            {<FaFemale size={20} title="female" />} Female
          </a>
        </li>
      </ul>
    </div>
  );
}