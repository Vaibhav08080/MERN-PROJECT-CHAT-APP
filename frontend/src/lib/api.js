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
    try {
        console.log('Fetching user friends...');
        const response = await axiosInstance.get("/users/friends");
        console.log('User friends response:', response.data);
        
        // The backend returns { user: { friends: [...] } }
        // We need to extract just the friends array
        if (response.data && response.data.user && response.data.user.friends) {
            return response.data.user.friends;
        } else {
            console.warn('Unexpected response format from /users/friends endpoint:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching user friends:', error);
        return [];
    }
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


export async function getFriendRequests() {
    try {
        const response = await axiosInstance.get("/users/friend-requests");
        console.log('Friend requests response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        return [];
    }
}


export async function acceptFriendRequest(requestId) {
    try {
        // Ensure the ID is properly formatted
        const id = requestId && requestId.toString ? requestId.toString() : requestId;
        console.log('Accepting friend request with ID:', id);
        
        // Match the exact route from your backend's user.routes.js
        // Using template literals with the exact path
        const url = `/users/accept-friend-request/${id}`;
        console.log('Request URL:', url);
        
        const response = await axiosInstance.put(url);
        console.log('Friend request accepted response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error accepting friend request:', error.message);
        if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error response data:', error.response.data);
        }
        throw error;
    }
}