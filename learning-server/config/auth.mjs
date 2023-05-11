import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}

const createJWT = (admin) => {
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET)

    return token
}

const protect = (req, res, next) => {

    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401).json({ message: 'not authorized' })
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401).res.json({ message: 'not valid token' })
        return
    }

    try {
        const admin = jwt.verify(token, process.env.JWT_SECRET)
        req.admin = admin
        next()
    } catch (err) {
        console.log(err)
        res.status(401).json({ message: 'not authorized' })
    }


}

export { createJWT, protect, comparePasswords, hashPassword }