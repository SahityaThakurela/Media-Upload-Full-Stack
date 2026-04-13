import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"





const registerUser = asyncHandler (async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res



    // get user details from frontend
    const {fullName, email, username, password} = req.body      // req.body is default given by express
    console.log("email", email);


    // validation - not empty
    if  (
            [fullName, email, username, password].some((field) => 
                field?.trim() === "")
        ){
            throw new ApiError(400, "All fields are required")
        }
    

    // check if user already exists: username, email
    const existedUser = User.findOne({     // find one stop when it finds the //User can talk to DB directly
        $or: [{ username }, { email }]     //or is a operator 
    })
    if(existedUser){
        throw new ApiError(409, "User with same email and username already exist")
    }


    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }


    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400, "Avatar is required")
    }


    // create user object - create entry in db
    const user = await User.create({
        fullName,                       // in js fullName, -> fullName = fullName
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })


    // remove password and refresh token field from response
    // check for user creation
    const createdUser = await User.findById(user._id).select(   // this select feature work little diff 
        //this ._id is created automatically everytimes entry happens
        "-password -refreshToken"                               // -fields not selected 
    )
    if(!createdUser) {
        throw new ApiError(500, "Something is wrong while registering the user")
    }


    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser,"User is Registered Successfully")
    )
})

export {registerUser}