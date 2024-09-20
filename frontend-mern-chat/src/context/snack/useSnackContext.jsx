import { useContext } from "react";
import { SnackContext } from "./SnackContext";


export const useSnackContext = () => {
  return useContext(SnackContext);
};