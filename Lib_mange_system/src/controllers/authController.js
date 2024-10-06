const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateToken=(userId)=>{
    return jwt.sign({id:userId},
        process.env.JWT_SECRET,{
            expiresIn:'30d'})
}

const registerUser = async (req,res)=>{
    const{name,email,password}=req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
    
        const user = await User.create({ name, email, password });
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id),
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }


    const loginUser = async(req,res)=>{
        const{email,password}=req.body;

        try{
            const user = await user.findOne({email})

            if(!isuser){
                return res.sent(400).json({message:'Invaialid email and password'})


            res.json({
                _id:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            })
            
            }
        }catch(err){
            res.status(500).json({message:error.message})
        }
    }


    module.exports = {registerUser, loginUser};