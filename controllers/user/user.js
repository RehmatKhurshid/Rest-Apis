import User from "../../models/user/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body;
        console.log(firstName, lastName, email, password);
        //generate salt
        const salt = await bcrypt.genSalt(10);

        console.log(salt)

        //hash password
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword)
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        await user.save();

        res.status(201).json({ message: "signUp successful" })
    } catch (error) {
        console.log(error)
    }
}
export const signIn = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email, password)
        const isUser = await User.findOne({ email: email });
        console.log('isUser', isUser)
        // is email there
        if (!isUser) {
            res.status(401).json({ message: 'invalid creds' })
        }

        // if password is correct
        const isCorrectUser = await bcrypt.compare(password, isUser.password)
        // if (!isCorrectUser) {
        if (!isCorrectUser) {
            res.status(401).json({ message: 'invalid password here' });
        }

        //create jwt token
        const token = await jwt.sign({ _id: isUser._id }, 'my_secret', { expiresIn: '3h' })
        console.log('token : ', token)
        res.status(201).json({
            id: isUser._id,
            email: isUser.email,
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error)
    }
}