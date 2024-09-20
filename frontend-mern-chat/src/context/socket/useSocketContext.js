import { useContext } from "react";
import { SocketContext } from "./socketContext";

export const useSocketContext = () => {
	return useContext(SocketContext);
};