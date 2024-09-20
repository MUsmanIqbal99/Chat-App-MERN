import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "../constants.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  // get user details from FrontEnd
  // validation - not empty
  // is user already exist - userName or email
  // are images uploaded on server - avatar image
  // upload on cloudinary using multer
  // creat user object, creat entry in DB
  // exclude the password and refresh token fields in response
  // is user created or NOT
  // finally return response

  const { userName, email, fullName, password } = req.body;

  if ([userName, email, fullName].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Some required fields are empty");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser)
    throw new ApiError(409, "User with username or email already registered");

  console.log(req.file);
  const avatarLocalPath = await req.file?.path;
  console.log(avatarLocalPath);

  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log(avatar);
  if (!avatar) {
    throw new ApiError(400, "Avatar file not uploaded on cloudinary");
  }

  const user = await User.create({
    fullName,
    userName: userName.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong wile regestering user");

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    createdUser._id,
  );

  return res
    .status(201)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        { user: createdUser, accessToken, refreshToken },
        "User registed successfully",
      ),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, userName, password } = req.body;
  console.log("Email:", email);

  if (!userName && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(400, "user doesn't exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully",
      ),
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  // get user details using verifyJwt middleware
  // remove refreshToken value from database
  // clear cookies

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // remove the field from document
      },
    },
    {
      new: true,
    },
  );

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const getUser = asyncHandler(async (req, res)=> {
  
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("fullName lastSeen");
  return res
  .status(200)
  .json(new ApiResponse(
    200,
    user,
    "Last seen value retrieved" 
  ))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  // get refresh token from cookies or header
  // verify that cookie
  // get user based on the cookie
  // check whether the cookie token and user's token are same or not
  // generate access and refresh token based on the user's id
  // return new cookie

  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    if (!decodedToken) {
      throw new ApiError(401, "Invalid token");
    }

    const user = await User.findById(decodedToken?._id);

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access TOken Refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

export { registerUser, loginUser, logOutUser, getUser, refreshAccessToken };
