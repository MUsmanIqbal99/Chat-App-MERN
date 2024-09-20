import { User } from "../models/user.model.js";

export const updateLastSeen = async (userId) => {
      const user = await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
      if(user) console.log(`${user?.fullName}'s lastSeen updated`);
};