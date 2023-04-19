import React, { useContext, useEffect, useMemo, useState } from "react";
import http from "services/http";
import userService from "services/userService";
import jwt from "jwt-decode";
import * as AUTH from "constants/AuthConstants";

const AuthContext = React.createContext({});

const AuthContextProvider = ({ children }) => {
  const defaultState = {
    isAuthLoading: true,
    isLoggedIn: false,
    authObject: null,
    email: null,
    govId: null,
    role: null,
    govUserId: null,
  };

  const [state, setState] = useState(defaultState);

  async function _changeGov(newGovId) {
    var responseObj = { success: false, message: "" };

    try {
      if (state.govId === newGovId) {
        throw new Error("GovID already Set");
      }

      var res = await userService.switchGov(newGovId);

      if (!("data" in res)) {
        throw new Error("Unexpected Error");
      }

      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      var auth = res.data;

      const contextFields = await createStateFields(auth);
      setState(contextFields);

      responseObj.success = true;
      return responseObj;
    } catch (ex) {
      console.log("Switch Failed", ex);
      responseObj.message = ex.message;
      return responseObj;
    }
  }

  async function createStateFields(auth) {
    var isAuthLoading = false;
    var authObject = auth;
    var email = null;
    var govId = null;
    var govName = null;
    var role = null;
    var userId = null;
    var isLoggedIn = false;

    if (auth) {
      var decodedToken = jwt(auth.token);
      email = decodedToken[AUTH.CLAIM_EMAIL];
      userId = email;

      //see if govId exists
      if (AUTH.CLAIM_GOVID in decodedToken) {
        govId = decodedToken[AUTH.CLAIM_GOVID];
        govName = decodedToken[AUTH.CLAIM_GOVNAME];
      }

      if (AUTH.CLAIM_GOVROLE in decodedToken) {
        role = decodedToken[AUTH.CLAIM_GOVROLE];
      }

      //sets axios default auth header
      http.setJwt(auth.token);

      localStorage.setItem(AUTH.STORAGE_AUTH, JSON.stringify(auth));

      if (govId) {
        http.setGov(govId);
      }

      isLoggedIn = !!authObject;
    }
    return {
      isAuthLoading,
      isLoggedIn,
      authObject,
      email,
      govId,
      role,
      govName,
      userId,
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const savedAuth = JSON.parse(localStorage.getItem(AUTH.STORAGE_AUTH));
      const contextFields = await createStateFields(savedAuth);
      setState(contextFields);
    };
    fetchData();
  }, []);

  // avoid refresh if state does not change
  const contextValue = useMemo(
    () => ({
      ...state, // isLoggedIn, authObject
      async login(userEmail, password) {
        var responseObj = { success: false, message: "" };

        try {
          var res = await http.post("auth/login", {
            email: userEmail,
            password: password,
          });

          if (!("data" in res)) {
            throw new Error("Unexpected Error");
          }
          if (!res.data.success) {
            throw new Error(res.data.errors[0]);
          }
          var auth = res.data;

          const contextFields = await createStateFields(auth);

          //login to gov if last set.  HTTP header is set in createStateFields
          var lastLoginResult = await http.get("user/lastlogin");
          var lastGovId = null;
          if (lastLoginResult && lastLoginResult.data) {
            lastGovId = lastLoginResult.data.lastGovernmentId;
          }

          if (lastGovId !== null) {
            var finalResult = await _changeGov(lastGovId);

            return finalResult;
          } else {
            setState(contextFields);
          }

          responseObj.success = true;
          return responseObj;
        } catch (ex) {
          console.log("error thrown", ex.message);
          responseObj.message = ex.message;
          return responseObj;
        }
      },
      logout() {
        http.setJwt("");
        http.setGov("");

        localStorage.removeItem(AUTH.STORAGE_AUTH);
        localStorage.removeItem(AUTH.STORAGE_LASTGOV);

        setState(defaultState);
      },

      hasRole(roles) {
        if (!roles) {
          return false;
        }
        if (roles === AUTH.ROLE_ALL) {
          return true;
        }
        if (!state.role) {
          return false;
        }
        if (Array.isArray(roles)) {
          //check if exist in array
          if (roles.includes(state.role)) {
            return true;
          } else {
            return false;
          }
        } else {
          // not an array
          return state.role === roles;
        }
      },

      async changeGov(newGovId) {
        return await _changeGov(newGovId);
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state, _changeGov, createStateFields]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider };
