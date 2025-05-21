import axiosInstance from "./axios";

export const signup = async (userData) => {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
};
export const getAuthUser = async () => {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
};


export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onBoard", userData);
    return response.data;
};