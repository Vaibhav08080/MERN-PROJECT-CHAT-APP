import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
export async function getRecommendedUsers(req,res){
    try {
        const CurrentuserId = req.user.id;
        const CurrentUser=req.user;

        const recommendedUsers = await User.find({
            $and:[
                {_id:{$ne:CurrentuserId}},
                {$id:{$nin:CurrentUser.friends}},
                {isOnBoarded:true}
            ]
        })
        return res.status(200).json({recommendedUsers})
    } catch (error) {
        console.log("error in getRecommendedUsers controller",error);
        return res.status(500).json({message:"Server error"})
    }
}


export async function getMyfriends(req,res){
    try {
       const user =await User.findById(req.user.id).select("friends")
       .populate("friends","fullName ProfilePic nativeLanguage learinglanguages")
       return res.status(200).json({user})
    } catch (error) {
        console.log("error in getMyfriends controller",error);
        return res.status(500).json({message:"Server error"})
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId=req.user.id;
        const {id:recipientId}=req.params;

        if(myId==recipientId){
            return res.status(400).json({message:"You cannot send a friend request to yourself"})
        }

        const recipient=await User.findById(recipientId);
        if(!recipient){
            return res.status(404).json({message:"User not found"})
        }
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message:"You are already friends with this user"})
        }
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,recipient:recipientId},
                {sender:recipientId,recipient:myId}
            ]
        })
        if(existingRequest){
            return res.status(400).json({message:"You have already sent a friend request to this user"})
        }
        const friendRequest =await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        })
        return res.status(200).json({message:"Friend request sent successfully",friendRequest})
    } catch (error) {
        console.log("error in sendFriendRequest controller",error);
        return res.status(500).json({message:"Server error"})
    }
}
