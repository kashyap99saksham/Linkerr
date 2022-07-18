import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import { validateUserId } from "../common/common.js";

//get a user
export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await validateUserId(id);
        const { password, ...otherDetails } = user?._doc;
        res.status(200).json(otherDetails);
    } catch (err) {
        res.json(err);
    }
};
// update a user
export const udpateUser = async (req, res) => {
    try {
        const id = req?.params?.id;
        await validateUserId(id);
        const { currentUserId, currentUserAdminStatus, password } = req?.body;
        if (id === currentUserId || currentUserAdminStatus) {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                const hashedPass = await bcrypt.hash(password, salt);
                req.body.password = hashedPass;
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(user);
        } else {
            throw {
                statusCode: 403,
                statusMessage: "Access Denied! you can only update your own profile"
            }
        }
    } catch (err) {
        res.json(err);
    }

};
// Delete User
export const deleteUser = async (req, res) => {
    try {
        const id = req?.params?.id;
        await validateUserId(id);
        const { currentUserId, currentUserAdminStatus } = req?.body;
        if (id === currentUserId || currentUserAdminStatus) {
            await UserModel.findByIdAndDelete(id);
            res.json({
                statusCode: 200,
                statusMessage: "User Deleted successfully!"
            })
        } else {
            throw {
                statusCode: 403,
                statusMessage: "Access Denied! you can only Delete your own profile"
            }
        }
    } catch (err) {
        res.json(err);
    }
};

// Follow a User
export const followUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { currentUserId } = req.body;
        const followUser = await validateUserId(id);
        const followingUser = await validateUserId(currentUserId);
        if (currentUserId === id) {
            res.json({
                statusCode: 403,
                statusMessage: "Action forbidden"
            });
        } else {
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } });
                await followingUser.updateOne({ $push: { following: id } });
                res.json({
                    statusCode: 200,
                    statusMessage: "User followed!"
                });
            } else {
                throw res.json({
                    statusCode: 403,
                    statusMessage: "User is Already followed by you"
                });
            }
        }
    } catch (err) {
        res.json(err);
    }
};

// UnFollow a User
export const UnFollowUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { currentUserId } = req.body;
        const followUser = await validateUserId(id);
        const followingUser = await validateUserId(currentUserId);
        if (currentUserId === id) {
            res.json({
                statusCode: 403,
                statusMessage: "Action forbidden"
            });
        } else {
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } });
                await followingUser.updateOne({ $pull: { following: id } });
                res.json({
                    statusCode: 200,
                    statusMessage: "User Unfollowed!"
                });
            } else {
                res.json({
                    statusCode: 403,
                    statusMessage: "User is not followed by you"
                });
            }
        }
    } catch (err) {
        res.json(err);
    }
};
