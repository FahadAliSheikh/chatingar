import { useDispatch, useSelector } from "react-redux";
import { setDisplayedComponent } from "@/store/slices/displaySliceOld";
import { setDisplayedClasses } from "@/store/slices/displaySlice";
import { countries } from "@/constants/countries";
import { setSelectedUser } from "@slices/userSlice";
import { getInbox, removeFromInbox } from "@slices/notificationSlice";
import { useNavigate } from "react-router-dom";

export function SingleActiveUser({ user }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("SINGLE USER COMPONENT=>");
  const countryName = countries.find(
    (country) => country.code === user?.country
  );
  const currentInbox = useSelector(getInbox);
  function userWithId(userId: any) {
    return currentInbox.some((sender: any) => sender._id === userId);
  }

  const handleClick = async (user: any) => {
    dispatch(setSelectedUser(user));
    dispatch(removeFromInbox(user));
    dispatch(
      setDisplayedClasses([
        "h-full lg:h-5/6 flex flex-col w-full lg:w-3/5 hidden md:hidden lg:block",
        "bg-purple-100 sm:block w-full rounded-xl text-black h-full",
      ])
    );
    navigate("/chat/chat-box", { replace: true });
  };
  return (
    <div
      className={`flex w-full py-4 border border-white-800 hover:cursor-pointer rounded-md ${
        user?.gender === "male" ? "bg-purple-300" : "bg-pink-300"
      }`}
      onClick={() => handleClick(user)}
    >
      <div className="flex-shrink-0">
        <img
          className="w-10 h-10 rounded-full"
          // src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
          src={`/icons/${user?.gender}.png`}
          alt="Neil image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user?.name}
        </p>
        <p className="text-sm text-gray-800 truncate dark:text-gray-800">
          {user?.gender}, {user?.age}, {countryName?.name}
        </p>
      </div>
      {currentInbox.length > 0 && userWithId(user?._id) && (
        <span className="justify-center items-center px-2 py-2 mx-2 text-xs font-bold text-red-100 bg-red-600 rounded-full">
          {/* {currentInbox?.length} */}1
        </span>
      )}
    </div>
  );
}
