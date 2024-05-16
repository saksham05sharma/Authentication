const express = require('express')
const jwt = require('jsonwebtoken')
const { JWT } = require('../config/index')

const auth = (req,res,next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({ message : "No token, authentication denied" });
    }
    try {
        const decoded = jwt.verify(token,JWT);
        req.user = decoded.user
        next()
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message : "Token is not valid" });
    }
};

module.exports = auth