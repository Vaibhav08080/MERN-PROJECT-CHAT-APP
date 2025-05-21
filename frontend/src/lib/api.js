import axiosInstance from "./axios";

export const signup = async (userData) => {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};


export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const completeOnboarding = async (userData) => {
    const response = await axiosInstance.post("/auth/onBoard", userData);
    return response.data;
};