import axios from "axios";
import getAuthToken from "./getAuthToken";

const BASE_URL = "https://commercify-server-f7yy.onrender.com";

export const getReq = async (url, params) => {
  const token = getAuthToken() || "";

  const get = await axios.get(`${BASE_URL}${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return get?.data;
};

export const postReq = async (url, body) => {
  const token = getAuthToken() || "";

  const post = await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return post?.data;
};

export const patchReq = async (url, body) => {
  const token = getAuthToken() || "";

  const patch = await axios.patch(`${BASE_URL}${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return patch?.data;
};

export const deleteReq = async (url, params) => {
  const token = getAuthToken() || "";

  const deleted = await axios.delete(`${BASE_URL}${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return deleted?.data;
};
