/* eslint-disable react/prop-types */
import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useSocketContext } from "../../context/socket/useSocketContext";
import { useConversationContext } from "../../context/conversation/useConversationContext";
import { AudioRecorder } from "react-audio-voice-recorder";

const MessageInput = ({ isMobile = false }) => {
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const { sendMessage } = useSendMessage();
  const { startTyping, stopTyping } = useSocketContext();
  const { selectedConversation } = useConversationContext();

  const debouncedStopTyping = useCallback(
    debounce(() => stopTyping(selectedConversation?._id), 3000),
    [selectedConversation]
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      startTyping(selectedConversation?._id);
    } else {
      stopTyping(selectedConversation?._id);
    }
    debouncedStopTyping();
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (input.trim()) {
      await sendMessage(input);
      stopTyping(selectedConversation?._id);
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleSaveAudio = async (blob) => {
    await sendMessage(null, blob);
    setIsRecording(false);
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          position: isMobile ? "sticky" : "static",
          bottom: isMobile ? 0 : "auto",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <div className={`flex w-full items-center ${isRecording && "hidden"}`}>
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <EmojiEmotionsIcon />
          </IconButton>
          {showEmojiPicker && (
            <Box sx={{ position: "fixed", bottom: "14%" }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </Box>
          )}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            autoComplete="off"
            sx={{ ml: 1 }}
          />
        </div>
        <IconButton
          color="primary"
          onClick={input.trim() ? handleSendMessage : toggleRecording}
        >
          {input.trim() ? (
            <SendIcon />
          ) : (
            <AudioRecorder
              onRecordingComplete={(blob) => handleSaveAudio(blob)}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              showVisualizer={true}
            />
          )}
        </IconButton>
      </Box>
    </>
  );
};

export default MessageInput;
