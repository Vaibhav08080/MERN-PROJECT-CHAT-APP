import { StreamChat } from 'stream-chat'
import dotenv from "dotenv";
dotenv.config();

const apikey= process.env.STEAM_API_KEY;
const apisecret= process.env.STEAM_API_SECRET;


if(!apikey || !apisecret){
    console.log("Stream api key is missing");
    process.exit(1);
}

const streamClient = StreamChat.getInstance(apikey, apisecret);

export const uperStreamUser = async (userData) => {
    try {
        const user = {
            id: userData.id,
            name: userData.name,
            image: userData.image || "",
            role: 'user',
            created_at: new Date().toISOString()
        };
        
        console.log("Creating Stream user:", user);
        // Use upsertUser (singular) for a single user
        const response = await streamClient.upsertUser(user);
        console.log("Stream user created:", response);
        return response;
    } catch (error) {
        console.error("Error in uperStreamUser:", error);
        throw error; // Re-throw to handle it in the controller
    }
}
    
export const generateStreamToken=(userId)=>{
    try{
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr);
    }
    catch(error){
        console.error("Error in generateStreamToken:",error);
        throw error;
    }
}