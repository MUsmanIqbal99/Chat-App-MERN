import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Message } from "../models/message.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import { getReceiverSocketId, io } from "../app.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getMessages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id: participantId } = req.params;

  if (!userId || !participantId)
    throw new ApiError(400, "Missing required fields: user or participant ID");

  try {
    const isParticipantExist = await User.findById(participantId);

    if (!isParticipantExist) throw new ApiError(404, "Participant not found");

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] },
    }).populate("messages");

    if (!conversation) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            404,
            [],
            "No conversation found between the participants",
          ),
        );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          conversation.messages,
          "All conversation retrieved successfully",
        ),
      );

    res.status(200);
  } catch (error) {
    throw new ApiError(500, error.message || "Can not get messages");
  }
});

const postMessage = asyncHandler(async (req, res) => {
  // Validate inputs
  // Check if conversation already exists
  // If conversation doesn't exist, create a new one
  // Create message
  // Add message to conversation
  // setup Socket IO
  // Send response

  const senderId = req.user._id;
  const { id: receiverId } = req.params;
  const { message } = req.body;

  if (!senderId || !receiverId || (!message && !req.file)) {
    throw new ApiError(
      400,
      "Missing required fields: senderId, receiverId, or message/audio",
    );
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [], // Initialize with an empty array for messages
      });
    }

    let newMessage;
    if (req.file) {
      const audioLocalPath = await req.file?.path;

      if (!audioLocalPath) throw new ApiError(400, "Audio file is required");

      const audio = await uploadOnCloudinary(audioLocalPath);

      if (!audio) {
        throw new ApiError(400, "Audio file not uploaded on cloudinary");
      }

      const audioUrl = audio.url;
      newMessage = await Message.create({
        senderId,
        receiverId,
        audioUrl,
        isAudio: true,
      });
    } else {
      newMessage = await Message.create({
        senderId,
        receiverId,
        message,
      });
    }
    conversation.messages.push(newMessage._id);
    await conversation.save(); // Save updated conversation

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, newMessage, "Message sent successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Message not sent");
  }
});

export { getMessages, postMessage };
