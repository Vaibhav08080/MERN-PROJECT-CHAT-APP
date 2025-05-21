import {axiosInstance} from "./axios";

export const signup = async (userData) => {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
};

export const getAuthUser = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};