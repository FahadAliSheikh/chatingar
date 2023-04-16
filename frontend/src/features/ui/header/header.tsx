import { Link } from "react-router-dom";

interface Props {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

export function Header({ heading, paragraph, linkName, linkUrl = "#" }: Props) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"
        />
      </div>
      <h2 className="mt-6 text-center text-2xl font-bold text-black">
        {heading}
      </h2>
      <p className=" text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-purple-500 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
