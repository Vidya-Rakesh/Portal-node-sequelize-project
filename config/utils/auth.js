
const jwt = require('jsonwebtoken');
const {Sequelize,DataTypes} = require('sequelize')
const { sequelize} = require('../../models/server');

const db = require('../../models/usertokenmodel');
db.usertoken= require('../../models/usertokenmodel')(sequelize,DataTypes);



async function generateAccessToken(user) {

  //data to be encoded into the token using user details
const payload = {
    user_id: user.user_id,
    user_name: user.user_name,
    role: user.role
};
console.log(payload)

//token generation. 1).accessToken 2).refresh token
const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
expiresIn: '30d',
});
const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
expiresIn: '80d',
});
const userToken = await db.usertoken.findOne({where:{user_id: user.user_id } });
if (userToken) userToken.destroy();
    // refresh token is stored in a database db.userToken
   // await new db.usertoken({ user_id: user.user_id, token: RefreshToken }).save();
   await db.usertoken.create({user_id:user.user_id,token:refreshToken})


   return { accessToken:accessToken, refreshToken:refreshToken}; //return tokens
}//middleware fn to authenticate requests by verifying the access token


function authenticateAccessToken(req, res, next) {
 //const authHeader = req.headers.authorization;//retrieves token from autorization header
  const token = req.headers.authorization;
 //const token = authHeader && authHeader.split(' ')[1];
  console.log({token});
  //respond with an error if the token is missing
  if (!token) {
      return res.status(400).json({ message: 'Access token is missing.' });
  }
  
  
  //Verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
       return res.status(401).json({ message: 'Invalid access token.' });  ///change 403 to 401 when invliad token happen
      }//if verification fails,respond with an error
  
      req.user = decoded;//if successfully verified attach decoded data to req.user
      //console.log(req.user);
      next();// a fn in express.js middleware to pass control to the next middleware fn in the req-res cycle.
  });
  }

module.exports ={generateAccessToken,authenticateAccessToken}