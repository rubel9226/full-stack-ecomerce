import api from "../Axios/api";

export const getMe = () => {
  return fetch("/api/me", {
    credentials: "include",
  }).then(res => res.json());
};

export const loginUser = async (data) => {
  try {
    const res = await api.post('/auth/login', data);
    return res.data.payload.userWithoutPassword;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login Failed");
  }
};

export const logoutUser = async () => {
  const res = await api.post('auth/logout');
  return res.data;
};