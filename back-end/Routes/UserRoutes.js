import express from 'express';
import { deleteUser, followUser, getUser, udpateUser, UnFollowUser } from '../Controllers/UserController.js';

const router = express.Router();

router.get('/:id', getUser);
router.put('/:id', udpateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', UnFollowUser)


export default router;