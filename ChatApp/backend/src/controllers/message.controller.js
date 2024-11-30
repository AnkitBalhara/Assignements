import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error occurred in getUsersForSidebar");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: UserToChatId } = req.params;
    const senderId = req.user._id;
    
    const messages = await Message.find(
        {senderId:senderId,},
    )
  } catch (error) {}
};
