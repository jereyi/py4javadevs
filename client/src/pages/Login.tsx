import { customButtonStyle } from "../utils/styles";
import queryString from 'query-string';

const Login = () => {
  const handleLogin = () => {
    const redirectUrl =
      `https://fed.princeton.edu/cas/login?service=${process.env.REACT_APP_URL}/auth/verify`;
    window.location.replace(redirectUrl);
  };

  const handleGoogleLogin = () => {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: `${process.env.REACT_APP_URL}/auth/google`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '), // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
    window.location.replace(googleLoginUrl);

  }
  return (
    <div className="font-cal text-8xl whitespace-pre-wrap font-black flex items-center justify-center h-screen gap-10">
      <div>{"Python\nFor\nJava\nDevelopers"}</div>
      <div className="flex flex-col">
        <button
          className={customButtonStyle("text-2xl mb-2 py-2 px-16")}
          onClick={handleLogin}
        >
          Login with CAS
        </button>
        <button
          className={customButtonStyle("text-2xl mt-2 py-2 px-16")}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
