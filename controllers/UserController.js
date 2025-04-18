const User = require('../models/Userr');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }


    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

 
    const user = await User.create({
        username,
        email,
        password,
        role: role || 'user'
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        console.log('User found:', {
            id: user._id,
            role: user.role,
            email: user.email
        });
        
        const token = generateToken(user._id, user.role);
        
        console.log('Generated token:', token);
        
        res.json({
            message: "Login successful",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


module.exports = {
    registerUser,
    loginUser
}