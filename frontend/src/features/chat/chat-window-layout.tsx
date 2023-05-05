// import { Inbox, ChatBox } from "@/features/chat";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store/store";
// import { UserSearchForm } from "@/features/user-search";

// export function ChatWindowLayout() {
//   const displayedComponent = useSelector<RootState, string>(
//     (state: any) => state.display.displayedComponent
//   );

//   let componentToRender = <UserSearchForm />;

//   if (displayedComponent === "Inbox") {
//     componentToRender = <Inbox />;
//   } else if (displayedComponent === "ChatBox") {
//     componentToRender = <ChatBox />;
//   } else if (displayedComponent === "UserSearchForm") {
//     componentToRender = <UserSearchForm />;
//   }

//   return <> {componentToRender}</>;
// }
