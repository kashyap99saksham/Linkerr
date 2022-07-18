import express from 'express';
import { deleteUser, followUser, getAllUser, getUser, udpateUser, UnFollowUser } from '../Controllers/UserController.js';
import authMiddlware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUser);
router.put('/:id', authMiddlware, udpateUser);
router.delete('/:id', authMiddlware, deleteUser);
router.put('/:id/follow', authMiddlware, followUser)
router.put('/:id/unfollow',  authMiddlware,UnFollowUser)


export default router;