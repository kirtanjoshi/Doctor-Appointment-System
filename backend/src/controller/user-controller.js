// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const UserModel = require('../model/patient-model');
// const dotenv = require('dotenv');
// dotenv.config();

// const createUser = async (req, res) => {
//     try {
//         const { email, password , userName , fullName , role,phone , gender} = req.body;
//         const existingUser = await UserModel.findOne({ email: email });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
     
//         if(existingUser){
//             return res.send("User already exists");
//         } 
//          const user = new UserModel({
         
//              fullName,
//              userName,
//              email,
//              password: hashedPassword,
//              phone,
//              gender,
//              role,
            
//     });
//         await user.save();


//       res.status(201).json({ msg: "User registered successfully" });
//     } catch (error) {
//        res.status(500).json({ error});  
//     }
// }


// const loginUser =async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         const user = await UserModel.findOne({ email: email});
//         if(!user){
//             return res.send("User does not exist");
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.send("Password is incorrect");
//         }

//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({
//             message: 'Login successful',
//             token,
//             user: {
//                 id: user._id,
//                 userName: user.userName,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


// const updateUser = (req, res) => {
//     try {
        
//     }
//     catch (error) {
        
//     }
// }

// module.exports = { createUser, loginUser };