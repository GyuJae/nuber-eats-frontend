import { useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../contants";

const loggedout = () => {
  isLoggedInVar(false);
  authTokenVar("");
  localStorage.removeItem(LOCALSTORAGE_TOKEN);
};

export default loggedout;
