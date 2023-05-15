import { BackToUserBtn } from "./back-to-user-btn";
import { countries } from "@/constants/countries";

export function ChatHeader({ selectedUser }: any) {
  let content: any;
  const countryName = countries.find(
    (country) => country.code === selectedUser?.country
  );
  if (selectedUser) {
    content = (
      <div
        className={`flex items-center  p-3 border-b border-gray-300 rounded-lg bg-pink-300 ${
          selectedUser?.gender === "male" ? "bg-purple-300" : "bg-pink-300"
        }`}
      >
        <div className="flex items-center space-x-4">
          <BackToUserBtn />
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              // src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
              src={`/icons/${selectedUser?.gender}.png`}
              alt="User image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {selectedUser?.name}
            </p>
            <p className="text-sm text-gray-800 truncate dark:text-gray-800">
              {selectedUser?.gender}, {selectedUser?.age} years, <span></span>
              {countryName?.name}
            </p>
          </div>
        </div>
      </div>
    );
  }
  return content;
}
