var express = require('express');
var router = express.Router();
const userService = require('../services/userServices');
const { validateCheck } = require('../middleware/validator');
const { validationObj } = require('../utility/validateUsersObj');
const jwtAuth = require('../middleware/jwtAuth');



//Register
router.post('/register', validateCheck(validationObj), async(req, res, next) => {
    try{
        const get_error = req.currentError;
        if(get_error){
            return res.status(404).json(get_error.message);
        }else{
            payload = req.body;
            const user = await userService.register(payload)
            return res.status(200).json({ message: 'User Registered Successfully...'})
        }
    }catch(err){
      return res.status(404).json(err)
    }
});


//Login
router.post('/login', async(req, res, next) => {
    try{
        const get_error = req.currentError;
        if(get_error){
            return res.status(404).json(get_error.message);
        }else{
            payload = req.body;
            const user = await userService.login(payload, res)
            return user
        }
    }catch(err){
      return res.status(404).json(err)
    }
});


//Show User
router.post('/profile', jwtAuth, async(req, res, next) => {
    try{
        const usermail = req.currentUser.email
        userService.findUser(usermail).then((data)=> {
            return res.status(200).json({status: "success", data:data})
        }).catch((err) => {
            return res.status(400).json(err)
        })
    }catch(err){
      return res.status(404).json(err)
    }
});



module.exports = router;