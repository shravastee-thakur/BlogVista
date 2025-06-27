import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }

    if (users.length === 0) {
      return res.json({ message: "No user in database" });
    }

    return res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (req.user.id.toString() === userId.toString()) {
      return res.json({ message: "Admin cannot delete yourself" });
    }

    const users = await User.findByIdAndDelete(userId);

    return res.status(201).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
