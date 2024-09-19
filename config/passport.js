const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const { User, Company, School, Student } = require('../models'); // Sequelize models

const db = require('../models/server');
const { useInflection } = require('sequelize');
//const User = require('../models/usersmodel');

/* db.user = require('../models/usersmodel')
db.company = require('../models/companymodel');
db.school = require('../models/schoolmodel');
db.student = require('../models/studentmodel'); */
const userRole = {
    ADMIN:1,
    SCHOOL:2,
    STUDENT:3,
    COMPANY:4

};

    passport.use(new GoogleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    //scope:['email'], //limit the scope only to the email
    }, async (accessToken, refreshToken, profile, done) => {
  try {
    // Extract the email from the Google profile
    const email = profile.emails[0].value;
    console.log({email});
    // Find the user in the user table
  const user = await db.user.findOne({ where: { user_name:email } });
    console.log({user})
    if (!user) {
      // If the user doesn't exist, create a new user record
      //user = await User.create({
       // email: email,
       // username: profile.displayName,
       // role:userRole.STUDENT // default user type, or you could infer this somehow
      //});
      //if user doesn't exist, redirect to sign up page
      return done(null, false, { message: 'User not found. Redirecting to signup.' });
    }

    // Proceed based on the user_type (company, school, student)
    let profileData;
    let urole=user.role;
    console.log({urole});
    switch (user.role) {
      case userRole.COMPANY:
        profileData = await db.company.findOne({ 
          where: { user_id: user.user_id } },
        {attributes:['company_name','company_id']});
        break;
      case userRole.SCHOOL:
        profileData = await db.school.findOne({ where: { user_id: user.user_id } },
          {attributes:['school_name','school_id']}
        );
        break;
      case userRole.STUDENT:
        profileData = await db.student.findOne({ where: { user_id: user.user_id } },
          {attributes:['student_name','student_id']}
        );
        break;
      default:
        return done(null, false, { message: 'Invalid user type' });
    }
console.log({user});
console.log({profileData});
   // return done(null, user.user_id); // Attach user and their profile data
   return done(null,{user,profileData});
  } catch (error) {
    return done(error);
  }
}));


// Serialize user (saves user id in session)
/* passport.serializeUser((id, done) => {
  console.log({id})
//let uid=user.user_id;

//console.log({uid})
  done(null, id);
}); */
passport.serializeUser((userData, done) => {
  console.log('Serializing user:',userData);
//let uid=user.user_id;
if(!userData || !userData.user || !userData.user.user_id){
  return done(new Error('User or user_id not found '));
}
//console.log({uid})
  done(null, userData.user.user_id);
});


// Deserialize user (retrieves user from session)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.user.findByPk(id);
    if (!user) return done(null, false);
    
    let profileData;
    switch (user.role) {
      case userRole.COMPANY:
        profileData = await db.company.findOne({ where: { user_id: user.user_id } });
        break;
      case userRole.SCHOOL:
        profileData = await db.school.findOne({ where: { user_id: user.user_id } });
        break;
      case userRole.STUDENT:
        profileData = await db.student.findOne({ where: { user_id: user.user_id } });
        break;
    }

    done(null, { user, profileData });
  } catch (error) {
    done(error);
  }
});


module.exports=passport;