import UserModel from "../Models/userModel.js";
// Find User present or Not
export const validateUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await UserModel.findById(userId);
            if (response)
                resolve(response);
            else
                throw {
                    statusCode: 404,
                    statusMessage: "User Not Found"
                };
        } catch (error) {
            reject({
                statusCode: error.statusCode || 500,
                statusMessage: error.statusMessage || "User Not Found"
            });
        }
    });
};
