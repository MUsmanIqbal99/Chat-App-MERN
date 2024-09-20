import { useEffect } from "react";

import { useSocketContext } from "../context/socket/useSocketContext";
import { useConversationContext } from "../context/conversation/useConversationContext";
import notificationSound from "../assets/sounds/notification.wav"

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversationContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;