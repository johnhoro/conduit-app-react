const ROOT_URL = "https://mighty-oasis-08080.herokuapp.com/api/";

const articlesURL = ROOT_URL + `articles`;
const profileURL = ROOT_URL + `user`;
const userURL = ROOT_URL + "profiles";

const localStorageKey = "app_user";

const userVerifyURL = ROOT_URL + `user`;
export {
  ROOT_URL,
  userURL,
  articlesURL,
  localStorageKey,
  userVerifyURL,
  profileURL,
};
