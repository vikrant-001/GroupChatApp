const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password,pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter All Details");
    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("user Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Failed to create the user"); 
    }
});

const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    console.log(email,password)
    if(!email || !password){
        res.status(400);
        throw new Error("Please Enter All Details");
    }

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("User not Found"); 
    }

})

const allUsers = asyncHandler(async (req,res) => {
    const keyword = req.query.search ? 
    {
        $or: [
            {name:{$regex : req.query.search, $options : "i"}},
            {email:{$regex : req.query.search, $options : "i"}}
        ]
    }
    : {};

    const user = await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(user);

});

module.exports = {registerUser,authUser,allUsers};