import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getAllUsers = asyncHandler( async (req, res) => {

  const loggedInUserId = req.user._id;
  
  try {
    
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -refreshToken");
    
    return res
    .status(200)
    .json(
      new ApiResponse(200, filteredUsers, "All users retrieved successfully")
    )
  } catch (error) {
    throw new ApiError(500, error.message || "Error while getting all users");
  }
});

export {getAllUsers};
