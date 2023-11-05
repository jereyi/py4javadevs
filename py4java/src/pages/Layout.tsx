import { useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CasUserContext } from "../context/casUserContext";
import { UserInfo } from "../utils/types";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(CasUserContext)!;

  useEffect(() => {
    if (!user) {
      fetch("/auth/getUser")
        .then((res) => res.json())
        .then((data) => {
          const userInfo = JSON.parse(data);
          console.log(userInfo);
          setUser({
            netid: userInfo.net_id,
            displayName: userInfo.display_name,
            lastLogin: new Date(userInfo.last_login),
            completedLessons: userInfo.completed_lessons,
          });
        })
        .catch(() => {
          console.log("User not found");
          navigate("/login");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user && location.pathname !== "/login" ? (
        <nav className="bg-dim-gray border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl py-4 px-16">
              <span className="self-center text-2xl font-cal font-semibold whitespace-nowrap text-white cursor-pointer" onClick={() => navigate("/")}>
                Python for Java Devs
              </span>
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
