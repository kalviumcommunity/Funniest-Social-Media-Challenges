const express = require("express");
const userModel = require("./userSchema");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).send({message: "User already exists"});
        }

        const newUser = new userModel({ name, email, password });
        await newUser.save();
        return res.status(201).send({ message: "User registered successfully", user: newUser });

    }catch (error) {
        console.error("Error checking for existing user:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
})

userRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    try {
        // For testing purposes, accept any credentials
        console.log("Login attempt with:", email, password);

        // Mock user data
        const user = {
            name: "Test User",
            email: email
        };

        // Set username in cookie - expires in 24 hours
        res.cookie('username', user.name, {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            sameSite: 'strict'
        });

        return res.status(200).send({ message: "Login successful", user });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
})

userRouter.get("/get",async(req,res)=>{
    try {
        const users = await userModel.find();
        return res.status(200).send({message:"User Data",users});
    } catch (error) {
        console.error("getting data error:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
})

// Logout endpoint to clear the cookie
userRouter.post("/logout", (req, res) => {
    try {
        // Clear the username cookie
        res.clearCookie('username');
        return res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = userRouter;