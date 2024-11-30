import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import cloudinary from "../utils/cloudinary.js";

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
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: UserToChatId },
        { senderId: UserToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in Getting messages");
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload image 64 URL to the cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Real time functionality goes here  --> socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in send message controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
