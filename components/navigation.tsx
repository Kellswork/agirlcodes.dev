import React from "react";
import BaseLayout from './baseLayout';
import Head from "next/head";

const Navigation = () => {
  return (
    <div className="bg-slate-100">
      <BaseLayout>
        <div>
          <h1 className="font-pacifico">AgirlCodes</h1>
        </div>
      </BaseLayout>
    </div>
  );
};

export default Navigation;
