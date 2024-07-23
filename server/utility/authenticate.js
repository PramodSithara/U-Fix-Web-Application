var passport = require('passport');
const jwt = require('jsonwebtoken');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const google = require('../models/googleoauth')
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRE = process.env.EXPIRE;

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SE,
    callbackURL: 'http://localhost:5000/api/v1/google/callback'
  },
  async function(accessToken, refreshToken, profile, cb) {
    //Register user here
    const email = profile.emails[0].value
    const name = profile.name.familyName
    const success = await google.create({name, email})

    function jwtTokenGenarator(email, id) {
      return jwt.sign({ email, id }, JWT_SECRET, {
          expiresIn: EXPIRE,
      });
    }
    const token = jwtTokenGenarator(email, success._id)
    cb(null, token)
  }
));