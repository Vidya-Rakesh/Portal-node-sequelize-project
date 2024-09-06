const jwt = require('jsonwebtoken');

const {userToken} = require('../../models/usertokenmodel');
//const db = require('../../models/usertokenmodel');
//const admin = require('../../firebase');


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
const RefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
expiresIn: '80d',
});
const userToken = await db.userToken.findOne({where:{user_id: user.user_id } });
if (userToken) userToken.destroy();
    // refresh token is stored in a database db.userToken
   // await new db.userToken({ user_id: user.user_id, token: RefreshToken }).save();
   await userToken.create({user_id:user.user_id,token:RefreshToken})
return { accessToken:accessToken, RefreshToken:RefreshToken}; //return tokens
}
module.exports ={generateAccessToken}