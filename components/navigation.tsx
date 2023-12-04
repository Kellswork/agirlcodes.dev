import React from "react";
import BaseLayout from "./baseLayout";
import Head from "next/head";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="bg-slate-100">
      <BaseLayout>
        <div className="flex justify-between items-center h-20 ">
          <div>
            <h1 className="font-pacifico text-2xl">AgirlCodes</h1>
          </div>
          <div className="font-roboto font-medium  text-base">
            <Link className='mr-5' href="/">Home</Link>
            <Link className='ml-5' href="/">Portfolio</Link>
          </div>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Navigation;
