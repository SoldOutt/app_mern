const argon2 = require('argon2');
const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')


// [POST] api/auth/register
// desc: register user        
// access: public
router.post('/register', async (req, res) => {
	// res.send('oke')
	const { username, password } = req.body
	//Simple validate
	if (!username || !password) {
		return res.status(400).json({ success: false, message: 'missing username or password' })
	}
	try {
		const user = await User.findOne({ username: username })
		if (user) {
			return res.status(400).json({ success: false, message: 'username already exists' })
		}

		//all good
		const hashPassword = await argon2.hash(password)

		const newUser = new User({ username: username, password: hashPassword })
		console.log(newUser)
		await newUser.save()        //newUser là đối tượng User Schema nên có các phương thức này lưu vào database
		//return tokens
		const acessToken = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET)
		return res.json({ success: true, message: 'dang ki thanh cong', acessToken })
	}
	catch (err) {
		console.log(err.message)
		return res.status(500).json({ success: false, message: 'Server Error' })
	}
})
// [POST] api/auth/login
// desc: login user        
// access: public

router.post('/login', async (req, res) => {
	const { username, password } = req.body
	if (!username || !password) {
		return res.status(400).json({ success: false, message: 'missing username or password' })
	}
	try {
		//check user 
		const user = await User.findOne({ username: username })
		if (!user) {
			return res.status(400).json({ success: false, message: 'missing username or password' })
		}
		const passwordValid = await argon2.verify(user.password, password) //so sánh passord nhập vào và password trong database
		console.log(passwordValid)
		if (!passwordValid) {
			return res.status(400).json({ success: false, message: 'missing username or password' })
		}
		//all good
		const acessToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET)
		return res.json({ success: true, message: 'Chao mung ban da dang nhap', acessToken })
	}
	catch (err) {
		console.log(err.message)
		return res.status(500).json({ success: false, message: 'Server Error' })
	}
})


router.get('/', (req, res) => {
	res.send('auth oke')
})
module.exports = router