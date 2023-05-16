import { BackToUserBtn } from "../chat/back-to-user-btn";

import { useSelector } from "react-redux";
import { getInbox } from "@slices/notificationSlice";
import { ActiveUsers } from "../chat";

export function Inbox() {
  console.log("INBOX COMPONENT=>");
  const currentInbox = useSelector(getInbox);

  return (
    <>
      <div>
        <BackToUserBtn />
      </div>
      <div className="flex flex-col h-full">
        <ActiveUsers flag="inbox" />
      </div>
    </>
  );
}
