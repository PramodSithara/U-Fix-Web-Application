const User = require('../models/users');
const bcrypt = require("bcrypt");
const { jwtTokenGenarator } = require('../utility/jwtTokenGenarate');


const register = async (data) => {
    try{
        const { userName, email, role, password } = data;
        bcrypt.hash(password, 10)
        .then(hash => {
            User.create({userName, email, role, password:hash})
        })
        .catch(err => console.log(err.message))
    }catch(err){
        throw err
    }
}



const login = async (data, res) => {
    try {
        const { email, password } = data;
        const user = await User.findOne({ email: email });
        if (user) {
            if(user.role == "user"){
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwtTokenGenarator(user.email, user.id)
                    return res.status(200).json(token);
                } else {
                    return res.status(401).json("The Password Incorrect");
                }
            }else{
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return res.status(200).json(user.role);
                } else {
                    return res.status(401).json("The Password Incorrect");
                }
            }
        } else {
            return res.status(404).json("No Record Existed");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const findUser = async (email) => {
    try{
        const user = await User.findOne({email: email})
        return user
    }catch(err){
        throw err
    }
}



module.exports = {
    register,
    login,
    findUser
}