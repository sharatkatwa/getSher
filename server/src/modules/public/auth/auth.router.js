import express from 'express'
import AuthController from './auth.controller.js'
import passport from 'passport'
import { asyncHandler } from '../../../shared/utils/asyncHandler.js'

const router = express.Router()
const authController = new AuthController()

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
       passport.authenticate('google', { session: false }),
       authController.GoogleCallBack.bind(authController)
    //    (req, res) => {
    //      // Generate a JWT for the authenticated user
    //      const token = jwt.sign({ id: req.user.id, displayName: req.user.displayName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //      // Send the token to the client
    //      res.json({ token });
    //    }
     );

router.post("/register",asyncHandler(authController.Register.bind(authController)))     

router.post("/login",asyncHandler(authController.Login.bind(authController)))     

export default router

