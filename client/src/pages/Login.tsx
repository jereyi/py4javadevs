import { customButtonStyle } from "../utils/styles";

const Login = () => {
  const handleLogin = () => {
    const redirectUrl =
      "https://fed.princeton.edu/cas/login?service=http://localhost:3001/auth/verify";
    window.location.replace(redirectUrl);
  };
  return (
    <div className="font-cal text-8xl whitespace-pre-wrap font-black flex items-center justify-center h-screen gap-10">
      <div>{"Python\nFor\nJava\nDevelopers"}</div>
      <button
        className={customButtonStyle("text-2xl py-2 px-16")}
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
