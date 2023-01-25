const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');

router.get('/register', (req,res)=>{
    res.render('user/register');
});
router.post('/register', wrapAsync(async (req,res, next)=>{
    try{
    const {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registerUser = await User.register(newUser, password);
    req.login(registerUser, function(err){
        if(err) return next(err);
        req.flash('success','You are registered');
        res.redirect('/mess');
    })
    }catch(e){
        req.flash('error', e.message);
        res.redirect('/user/register');
    }
}));
router.get('/login', (req,res)=>{
    res.render('user/login');
});
router.post('/login', passport.authenticate('local',{failureFlash:true, failureRedirect:'/user/login', keepSessionInfo:true}), (req, res)=>{
   const redirectUrl = req.session.returnTo || '/mess';
   delete req.session.returnTo; 
   req.flash('success', 'Welcome back!');
   res.redirect(redirectUrl);
});
router.get('/logout', (req,res)=>{
    req.logout(function(err){
        if(err){return next(err)}
        req.flash('success', 'Goodbye');
        res.redirect('/mess');
    });
})
module.exports = router;