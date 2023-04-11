import React, { ChangeEvent } from "react";

interface Props {
  //   onSubmit?: (value: string) => void;
  type?: "submit" | "reset" | "button";
  action?: "submit" | "reset" | "button";
  onSubmit?: (e: object) => void;
  text?: string;
}

export function Button(
  //     {
  //   onSubmit,
  //   type = "button",
  //   action = "submit",
  //   text,
  // }
  props: Props
) {
  const handleClick = (event: ChangeEvent<HTMLButtonElement>) => {
    if (props.onSubmit) {
      props.onSubmit(event);
    }
  };
  return (
    <>
      {props.type === "button" ? (
        <button
          type={props.action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleClick}
        >
          {props.text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
