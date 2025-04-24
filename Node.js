const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/' , (req ,res) => {
    res.json("Server is running")
});

app.post('/signup', (req , res)=> {
    const {username , email ,password} = req.body;

    if(!username || username.trim === ''){
        return res.status(400).json({message: "Username cannot be empty"})
    }

    if(!email || email.trim === ''){
        return res.status(400).json({message: "Email cannot be empty"})
    }

    if(!password || password.length < 8 || password.length > 16){
        return res.status(400).json({
            error: "Password should be atleast greater than 8 and less than 16 and Password cannot be empty"
        });


        res.status(200).json({
            message: "Signup successfull",
            data : {username , password , email}
        });
    } 


});

app.listen(PORT, ()=> {console.log(`Server is running on port: http://localhost:${PORT}`);
})