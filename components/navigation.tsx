import React from "react";
import BaseLayout from "./baseLayout";
import Head from "next/head";
import Link from "next/link";

const NavLink = ({ text, link, spacing }: { text: string; link: string, spacing?: string }) => (
  <Link
    className={ `inline-block relative after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bg-purple-5 after:bottom-0 after:left-0 after:origin-bottom-left after:transition-transform after:ease-out after:duration-200 hover:after:scale-x-100 :hover:after:origin-bottom-right hover:opacity-80 ${spacing || ''}`}
    href={link}
  >
    {text}
  </Link>
);

const Navigation = () => {
  return (
    <div className="bg-neutral-100">
      <BaseLayout>
        <div className="flex justify-between items-center h-20 ">
          <Link href="/">
            <h1 className="font-pacifico text-2xl text-purple-9">AgirlCodes</h1>
          </Link>

          <div className="font-roboto font-medium  text-base">
            <NavLink link="/" text="Home"/>
            {/* <NavLink link="/" text="Portfolio" /> */}
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Navigation;

//TODO: add the portfolio link back when you are done building the portfolio page
