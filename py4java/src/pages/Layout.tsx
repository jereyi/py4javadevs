import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <nav className="bg-dim-gray border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl py-4 px-16">
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-cal font-semibold whitespace-nowrap text-white">
            Python for Java Devs
          </span>
        </a>
      </div>
    </nav>

    <Outlet />
    </>
  );
};

export default Layout;
