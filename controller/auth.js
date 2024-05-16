const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { JWT } = require('../config/index')
const { omit } = require('../utils/functions')

const register = async (req,res) => {
    const { fname, lname, username, email, password } = req.body;
    if( !fname || !lname || !username || !email || !password ) {
        return res.status(400).json({message : "Invalid Data"});
    }
    if( password.length < 6 ) {
        return res.status(400).json({ message : "Minimum of 6 characters is required" });
    }
    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message : "User already exist" });
        }
        user = await User.findOne({ username });
        if(user) {
            return res.status(400).json({ message : "This username has already been taken" });
        }
        user = new User({ fname, lname, username, email, password });
        user.password = await bcrypt.hash(password,10);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,JWT,{expiresIn: 360000},(err,token)=>{
            if(err){
                console.error(err);
                return res.status(500).json({ message : "JWT error" });
            } return res.status(200).json({ token: token, message: 'User registered, Login to continue' });
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message : "Server Error" });
    }
};

const login = async (req,res) => {
    const { username, password } = req.body;

    if( !username || !password ) {
        return res.status(400).json({ message : "Username and Password is required" })
    }

    try {
        let user = await User.findOne({ username });
        if(!user) {
            return res.status(404).json({ message : "User doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(404).json({ message : "Invalid Credentials" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(payload, JWT, {expiresIn: 360000}, (req,res)=>{
            if(err) throw err;
            return token;
        });
        return res.status(200).json({
            token,
            user: omit(user, "password"),
            message: "Login successful",
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message : "Server Error" })
    }
};
module.exports = { register, login }