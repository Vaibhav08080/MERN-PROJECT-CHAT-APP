import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    bio:{
        type:String,
        maxlenght:1000,
    },
    ProfilePic:{
        type:String,
        default:""
    },
    nativelanguage:{
        type:String,
        default:""
    },
    learinglanguages:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    isOnBoarded:{
        type:Boolean,
        default:false
    },

    friends:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       } 
    ],

    

    
},{timestamps:true});




UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    
    try{
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password,salt);
        next();
    }
    catch(error){
        next(error);
    }
})
const User = mongoose.model("User",UserSchema);
export default User;