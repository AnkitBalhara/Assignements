import UserModel from "../model/user.model";

export const signup = async (req, res) => {
  const { fullName, password } = req.body;

  try {
    if (!fullName || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be of 6 characters" });
    }

    const AlreadyUser = await UserModel.findOne({email})
    if(AlreadyUser) return res.status(400).json({"message":"Email Already Exists"})
  } catch (error) {}
};
