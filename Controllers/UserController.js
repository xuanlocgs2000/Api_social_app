import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { response } from "express";
//get a User
export const getUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
// update user
// export const updateUser = async (req, res) => {
//   const id = stringify(req.params.id);
//   const { currentUserId, currentUserAdminStatus, password } = req.body;

//   if (id === currentUserId || currentUserAdminStatus) {
//     try {
//       // if (password) {
//       //   const salt = await bcrypt.genSalt(10);
//       //   req.body.password = await bcrypt.hash(password, salt);
//       // }
//       const user = await UserModel.findByIdAndUpdate(id, req.body, {
//         new: true,
//       });
//       console.log(req.body);

//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   }
// };
export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { currentUserId, currentUserAdminStatus, password } = req.body;
  console.log(req.body);
  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

//Delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};
//dellete  all user
// export const deleteUserAll = async (req, res) => {
//   const id = req.params.id;
//   const { currentUserId, currentUserAdminStatus } = req.body;
//   if ((currentUserId, currentUserAdminStatus)) {
//     try {
//       await UserModel.findByIdAndDelete(id);
//       res.status(200).json("user delete susscesly");
//     } catch (error) {}
//   }
// };

//Folows a User

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } }); //them id vao mang
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("User is aready followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
export const updateUserAll = async (req, res) => {};
//folower user
export const FollowUserTest = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId == id) {
    res.status(403).json("Action forbiden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } }); //them id vao mang
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("User is aready followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
//Unfolows a User

export const UnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } }); //loai bo id khoi mang
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed");
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
//ban user
export const banUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserAdminStatus } = req.body;

  if (currentUserAdminStatus) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        id,
        { banned: true },
        { new: true }
      );

      if (user) {
        res.status(200).json("User banned successfully");
      } else {
        res.status(404).json("No such user exists");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! you do not have permission to ban users");
  }
};
