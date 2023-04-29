import { useEffect } from "react";
import { SingleActiveUser } from "./single-active-user";
import { useDispatch } from "react-redux";
import { useGetActiveUsersQuery } from "@/store/api/userApi";
import { setActiveUsers } from "@slices/userSlice";

export function ActiveUsers() {
  console.log("ACTIVE USERS COMPONENT=>");
  const dispatch = useDispatch();
  const {
    data: activeUsers = [],
    isLoading,
    error,
    isError,
    isSuccess,
  } = useGetActiveUsersQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActiveUsers(activeUsers));
    }

    if (isError) {
      console.log("inside iss error");
    }
  }, [activeUsers]);

  return (
    <div className="flex flex-col flex-grow overflow-auto">
      {activeUsers ? (
        activeUsers.map((user) => (
          <SingleActiveUser key={user._id} user={user} />
        ))
      ) : (
        <p>No active user so far..</p>
      )}
    </div>
  );
}
