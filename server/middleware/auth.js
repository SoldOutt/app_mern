const jwt = require('jsonwebtoken')
const User = require('../models/User')

//token lay ra tu header co dang :Authorization: Bearer lkdjsdhfasjdkdjsad nen phai lay chuoi tu sau dau space
const verifyToken = (req, res, next) => {
    // console.log(req)
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {       // khi khong co token 
        return res.status(401).json({ success: false, message: 'Acess token not found' })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        // var u = User.findOne({ _id: decoded.userId }).exec((err, data) => {
        //     console.log(data);
        // })
        req.userId = decoded.userId
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(403).json({ success: false, message: 'Invalid token' })
    }
}
module.exports = verifyToken