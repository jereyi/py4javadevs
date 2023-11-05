import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CasUserContext } from "../context/casUserContext";
import { CASSession } from "../utils/types";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(CasUserContext)!;

  useEffect(() => {
    if (!user) {
      fetch("/auth/getUser")
        .then((res) => res.json())
        .then((data) => {
          setUser((JSON.parse(data) as CASSession).netid);
        })
        .catch(() => {
          console.log("User not found");
          navigate("/login");
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {user && location.pathname !== "/login" ? (
        <nav className="bg-dim-gray border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl py-4 px-16">
            <a href="/" className="flex items-center">
              <span className="self-center text-2xl font-cal font-semibold whitespace-nowrap text-white">
                Python for Java Devs
              </span>
            </a>
          </div>
        </nav>
      ) : (
        <></>
      )}
      <Outlet />
    </>
  );
};

export default Layout;
