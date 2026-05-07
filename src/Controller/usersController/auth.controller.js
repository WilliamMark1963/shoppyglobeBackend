import { User } from "../../Model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Register Logic
export const register = async (req, res)=>{
    try{
        const {username, email, password} = req.body;

        // ST:1 Basic Validations 
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        // ST:2 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // ST: 3 Hash the password 
        // Adding some salt then hash it for more complexity
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ST: 4 Create a new user
        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        })
        // ST: 5 saving it in DB....
        await newUser.save()
        res.status(201).json({
            message: "User registered successfully! ✅",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }})
    }
    catch(err){
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
}

// Login logic
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Create JWT Token
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: '10min' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};