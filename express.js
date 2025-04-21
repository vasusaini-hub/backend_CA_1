const express = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(express.json());

const credentials = {
    username:"admin",
    password:"password123"
}

app.post("/login", (req,res)=> {
    try{
        const {username , password} = req.body;
    
    if(
        username===credentials.username &&
        password===credentials.password
    ) {
        const token = jwt.sign(
            {username},
            process.env.JWT_SECRET_KEY,
            {expiresIn: process.env.JWT_SECRET_KEY || "2m"}
        )
        return res.status(200).json({message: "Login successfully" , token})
    }
    return res.status(401).json({message: "Invalid credentials"})

    } catch(err){
        res.status(500).json({message: "Internal server error" , err})
    }

});


function authenticateToken(req , res , next) {
    const authHeader= req.headers["authorization"];
    if(!authHeader) return res.status(401).json({message: "Token required"});

    const token = authHeader.split('  ')[1]
    if(!token) return res.status(401).json({message: "Bearer token missing"});

    jwt.verify(token , process.env.JWT_SECRET_KEY , (err , user)=> {
        res.err(403).json({message: "Token is invalid or expired"});
        req.user=user;
        next();
    });
};


app.get("/profile", authenticateToken , (req,res)=>{
    res.json({
        message: "User profile loaded successfully.",
        username: req.user.username
    });
});


app.listen(PORT, ()=> {
    console.log(`Server is running on port :${PORT}`);
    
});