// https://github.com/alancting/react-cas-client-example/blob/main/cas-web-client/application/src/useCas.js
import { SetStateAction, useContext, useEffect, useState } from "react";
import { To, useNavigate } from "react-router-dom";
import CasClient, { constant } from "react-cas-client";
import { CasUserContext } from "../context/casUserContext";

const useCas = (attempLoginWithGateway = false) => {
  const navigate = useNavigate();

  const casUserContext = useContext<{ user: string; setUser: React.Dispatch<React.SetStateAction<string>>; } | undefined>(CasUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const casClient = new CasClient(process.env.REACT_APP_CAS_ENDPOINT, {
    version: constant.CAS_VERSION_3_0,
  });

  useEffect(() => {
    if (!casUserContext!.user) {
      (async function () {
        try {
          await attemptCasLogin(attempLoginWithGateway);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, []);

  function attemptCasLogin(gateway: boolean) {
    return new Promise((_resolve, reject) => {
      casClient
        .auth(gateway)
        .then((successRes: { user: SetStateAction<string>; currentPath: To; }) => {
          // Login user in state / locationStorage ()
          // eg. loginUser(response.user);
          casUserContext!.setUser(successRes.user);
          // Update current path to trim any extra params in url
          // eg. this.props.history.replace(response.currentPath);
          setIsLoading(false);
          navigate(successRes.currentPath, { replace: true });
        })
        .catch((errorRes: { currentPath: To; }) => {
          setIsLoading(false);
          navigate(errorRes.currentPath, { replace: true });
          reject(errorRes);
        });
    });
  }

  function logout(path = "/") {
    casClient.logout(path);
  }

  return { isLoading, attemptCasLogin, logout };
};

export default useCas;