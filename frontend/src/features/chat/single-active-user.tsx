import React from "react";

export function SingleActiveUser({ user }: any) {
  return (
    <li className="py-3 sm:py-4 bg-pink-300">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.username}
          </p>
          <p className="text-sm text-gray-800 truncate dark:text-gray-800">
            {user?.age}, {user?.country}
          </p>
        </div>
        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-gray-900">
          $320
        </div> */}
      </div>
    </li>
  );
}
