import jwt from 'jsonwebtoken';
import User from '../models/user/user.js';


export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        console.log('token.......', token)
        if (!token) {
            // console.log('wrong token')
            res.status(401).json({ message: "unauthorization" })
        }
        const decode = await jwt.verify(token, 'my_secret')

        console.log('decode', decode)
        const user = await User.findById({ _id: decode._id });
        const { firstName, lastName, email } = user;
        req.user = {
            firstName,
            lastName,
            email
        };
        console.log(req.user);
        next()
    }

    catch (error) {
        res.status(401).json({ message: "Not Authenticated" })
        console.log(error)
    }
}


// import jwt from 'jsonwebtoken';
// import User from '../models/user/user.js';


// export const isAuthenticated = async (req, res, next) => {
//     try {
//         const token = req.headers['authorization'];
//         console.log(token)
//         if (!token) {
//             // console.log('wrong token')
//             res.status(201).json({ message: "invalid creds" })
//         }
//         jwt.verify(token, 'my_secret', async (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ message: "invalid token" })
//             }
//             //  req.decoded = decoded;
//             console.log('decode', decoded)
//             const user = await User.findById({ _id: decoded._id });
//             req.user = user;
//             next()
//         })

//     } catch (error) {
//         res.status(401).json({ message: "Not Authenticated" })
//         console.log(error)
//     }
// }
