import express from 'express';
import jwt from 'jsonwebtoken';
import User from './User.js'

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Authentication failed');
    }
    if (user.isLoggedIn) {
      return res.status(403).send('User already logged in on another device');
    }
    user.isLoggedIn = true;
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/logout', async (req, res) => {
    const { email } = req.body;  // Make sure you send 'email' from the frontend
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      user.isLoggedIn = false;
      await user.save();
      res.status(200).send('Logged out successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

export default router;
