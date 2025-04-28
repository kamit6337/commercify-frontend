export default function getAuthToken() {
  if (typeof window === "undefined") {
    const { cookies } = require("next/headers"); // dynamic import at runtime
    return cookies().get("_use")?.value;
  } else {
    const Cookies = require("js-cookie");
    return Cookies.get("_use");
  }
}
