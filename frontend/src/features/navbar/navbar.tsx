import { useState } from "react";
import { Routes } from "@config/routes";
import { getSocket, emitSocketRemoveUser } from "@socket/get-socket";
// redux login
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, logout } from "@store/slices/authSlice";
import { setUserInitialState } from "@store/slices/userSlice";
import { setNotifInitialState } from "@store/slices/notificationSlice";
import { setChatInitialState } from "@store/slices/chatSlice";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  console.log("inside navbar");
  let socket = getSocket();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const [navbar, setNavbar] = useState(false);
  const signUpHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    navigate("/signup");
  };
  const signInHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();

    navigate("/signin");
  };
  const signOutHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(setUserInitialState());
    dispatch(setNotifInitialState());
    dispatch(setChatInitialState());
    // socket.emit("removeUser", user);
    emitSocketRemoveUser(user);

    navigate("/signin");
  };
  return (
    <nav className="w-full bg-purple-500 shadow sticky top-0">
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <h2 className="text-2xl font-bold text-white">CHATINGAR</h2>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {!user && (
                <li className="text-white hover:text-indigo-200">
                  <a href="/home">Home</a>
                </li>
              )}
              <li className="text-white hover:text-indigo-200">
                <a href="#">Blog</a>
              </li>
              {/* <li className="text-white hover:text-indigo-200">
                <a href="#">About US</a>
              </li> */}
              <li className="text-white hover:text-indigo-200">
                <a href="/contact">Contact US</a>
              </li>

              <>
                {user ? (
                  <>
                    <li className="text-white hover:text-indigo-200">
                      <a href="/chat/chat-box">Chat page</a>
                    </li>
                    <li className="text-white hover:text-indigo-200 md:hidden lg:hidded">
                      <a href="#">My Profile</a>
                    </li>
                    <li className="text-white hover:text-indigo-200 md:hidden lg:hidded">
                      <a
                        href="#"
                        onClick={signOutHandler}
                        className="text-red-800"
                      >
                        Sign Out
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-white hover:text-indigo-200 md:hidden lg:hidded">
                      <a
                        href={Routes.signin}
                        className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        onClick={signInHandler}
                      >
                        Sign in
                      </a>
                    </li>
                    <li className="text-white hover:text-indigo-200 md:hidden lg:hidded">
                      <a
                        href={Routes.signup}
                        className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                        onClick={signUpHandler}
                      >
                        Sign Up
                      </a>
                    </li>
                  </>
                )}
              </>
            </ul>
          </div>
        </div>
        {user ? (
          <Menu
            as="div"
            className="relative text-left hidden md:block lg:block"
          >
            <div>
              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {user?.name}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            {/* <div>
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="sr-only">Profile</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </Menu.Button>
          </div> */}
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {/* <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        View Profile
                      </a>
                    )}
                  </Menu.Item> */}
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-red-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={signOutHandler}
                      >
                        Sign Out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="hidden space-x-2 md:inline-block">
            <a
              href={Routes.signin}
              className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              onClick={signInHandler}
            >
              Sign in
            </a>
            <a
              href={Routes.signup}
              className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
              onClick={signUpHandler}
            >
              Register for free
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
