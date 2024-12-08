import User from "../model/user.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req,res,next) => {
    let users;
    try{
        users = await User.find();
    }catch (err) {
        return console.log(err);     
    }
    if (!users){
        return res.status(404).json({message: 'No Users Found'});
    }
    return res.status(200).json({users});
};

export const signup = async (req,res,next) => {
    const {name, email, password} = req.body;

    let existUser;
    try {
        existUser = await User.findOne({email});
    }catch(err) {
        return console.log(err);
    }
    if (existUser){
        return res.status(400).json({message: "user already exist"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    

    const users = new User({
        name,email,
        password: hashedPassword,
        blogs: [],
    });
    try{
       await users.save();
    }catch (err){
        return console.log(err);
    }
    return res.status(201).json({users});
}

export const login = async (req,res,next) => {
    const {name, email, password} = req.body;
    let existUser;
    try {
        existUser = await User.findOne({email});
    }catch(err) {
        return console.log(err);
    }
    if (!existUser){
        return res.status(404).json({message: "user not found"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message: "Login Successfull"})
}