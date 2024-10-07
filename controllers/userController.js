import User from "../models/userModel.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt.js"

const signUpUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser= new User({
        name,
        email,
        username,
        password:hashedPassword,
    });

    await newUser.save();

    if(newUser)
        {
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                username:newUser.username,
            })
        }
        else
        {
            res.status(400).json({error:"Invalid user data"});
        }
  } catch (error) {
    res.status(500).json({error:error.message});
    console.log("Error in signUpUser:",error.message);
  }
};

const loginUser=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        //if the user is not found then the value of user becomes a null object, and while we check the password, bcrypt doesn't support the check of a string and null value, hence we add password || "" defining if the user is null indicating no user.password, in that case simply compare it with an empty string which will automatically give us the false value and then we can easily proceed with that!

        if(!user || !isPasswordCorrect)
            return res.status(400).json({error:"Invalid Username or Password"});

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
        })
        
    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in loginuser functionality",error.message);
    }
};

const updateUser=async(req,res)=>{
    const {name,username,password,email}=req.body;
    const userId=req.user._id;
    try {
        let user=await User.findById(userId);
        if(!user) return res.status(400).json({error:"User not found"});
        
        if(req.params.id!==userId.toString())
            {
                res.status(500).json({error:"You cannot update any other profile from this profile!"});
            }

        if(password)
        {
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            user.password=hashedPassword;
        }
        
        user.name=name||user.name;
        user.email=email||user.email;
        user.username=username||user.username;

        user=await user.save();

        user.password=null; //we dont want the password to appear in our res, hence we set it to null after the user data after updating is saved.

        res.status(200).json({message:"User updated successfully."},user);

    } catch (error) {
        res.status(500).json({error:error.message});
        console.log("Error in update user functionality",error.message);
    }
};