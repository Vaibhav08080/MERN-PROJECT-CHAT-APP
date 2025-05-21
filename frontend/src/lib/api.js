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


export async function getUserFriends() {
    const response = await axiosInstance.get("/users/friends");
    return response.data;
}

export async function getRecommendedUsers() {
    try {
        console.log('Fetching recommended users...');
        const response = await axiosInstance.get("/users");
        console.log('Recommended users response:', response);
        console.log('Recommended users data:', response.data);
        
        // The backend returns { recommendedUsers: [...] } instead of just the array
        // Return the array directly to the component
        return response.data.recommendedUsers || [];
    } catch (error) {
        console.error('Error fetching recommended users:', error);
        console.error('Error response:', error.response?.data);
        throw error;
    }
}
    
export async function getOutgoingFriendReqs() {
    try {
        const response = await axiosInstance.get("/users/outgoing-friend-requests");
        // The backend returns { outgoingFriendRequests: [...] }
        console.log('Outgoing friend requests response:', response.data);
        // Return the array directly to make it easier to work with
        return response.data?.outgoingFriendRequests || [];
    } catch (error) {
        console.error('Error fetching outgoing friend requests:', error);
        return [];
    }
}

export async function sendFriendRequest(userId) {
    try {
        // Ensure userId is a string, not an object
        const id = userId && userId.toString ? userId.toString() : userId;
        console.log('Sending friend request to user, ID type:', typeof id, 'Value:', id);
        
        const response = await axiosInstance.post(`/users/friend-request/${id}`);
        console.log('Friend request response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error sending friend request:', error.message);
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }
        throw error;
    }
}