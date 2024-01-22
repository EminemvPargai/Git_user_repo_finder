const APIURL = "https://api.github.com/users/";

const getUser = async (username) => {
  try {
    const response1 = await fetch(APIURL + username);
    const data1 = await response1.json();
    var url =
      "user.html" +
      "?param1=" +
      encodeURIComponent(data1.avatar_url) +
      "&param2=" +
      encodeURIComponent(data1.name) +
      "&param3=" +
      encodeURIComponent(data1.bio) +
      "&param4=" +
      encodeURIComponent(data1.location) +
      "&param5=" +
      encodeURIComponent(data1.twitter_username) +
      "&param6=" +
      encodeURIComponent(APIURL + username);
    window.location.href = url;
  } catch (err) {
    console.log(err);
  }
};

const formSubmit = () => {
  let userSearch = document.querySelector("#username");
  getUser(userSearch.value);
  return false;
};
