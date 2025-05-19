import User from "../models/User.js";
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

