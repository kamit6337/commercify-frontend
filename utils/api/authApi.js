import axios from "axios";
import getAuthToken from "./getAuthToken";

const BASE_URL = "https://commercify-server-f7yy.onrender.com" + "/auth";

export const getAuthReq = async (url, params) => {
  const token = getAuthToken() || "";

  const get = await axios.get(`${BASE_URL}${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return get?.data;
};

export const postAuthReq = async (url, body) => {
  const token = getAuthToken() || "";

  const post = await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return post?.data;
};

export const patchAuthReq = async (url, body) => {
  const token = getAuthToken() || "";

  const patch = await axios.patch(`${BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return patch?.data;
};

export const deleteAuthReq = async (url, params) => {
  const token = getAuthToken() || "";

  const deleted = await axios.delete(`${BASE_URL}${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return deleted?.data;
};
