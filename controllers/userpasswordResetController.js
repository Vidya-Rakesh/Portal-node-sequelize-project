const db = require("../models/usersmodel")
const bcrypt = require('bcrypt');

const {DataTypes} = require('sequelize')
const { sequelize} = require('../models/server');
//const { validateEmail } = require('../config/utils/Validation');


db.users = require('../models/usersmodel')(sequelize,DataTypes)
db.school = require('../models/schoolmodel')(sequelize,DataTypes);
db.student=require('../models/studentmodel')(sequelize,DataTypes);
db.company = require('../models/companymodel')(sequelize,DataTypes);


const userRole = {
    ADMIN:1,
    SCHOOL:2,
    STUDENT:3,
    COMPANY:4

};

const schoolPasswordReset =async (req,res) => {

    //const userAgent = req.headers['user-agent'];
    //console.log("user agent",userAgent);
    //const query = { where: {} };
    //const authHeader = req.headers.authorization;


 // console.log({authHeader});
  /* if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing.' });
  } */
  try {
      /* const decodedCredentials = Buffer.from(authHeader, 'base64').toString('utf-8');
      const [user_name, password, ] = decodedCredentials.split(' ');
      console.log({user_name});
      console.log({password});
      try{
        if (user_name) {
            if (validateEmail(user_name)) {
                query.where.user_name = user_name;
            }  else {
                return res.status(400).json({ message: 'Invalid input:  email not valid .' });
            }
        }
      }catch(error){
        return res.status(400).json({message:'error in getting a user with specifeid email id'})
      }
      */

    /* const user = await db.users.findOne(query);
    console.log({user});
    if (!user) {
    return res.status(200).json({ message: 'No user with the given email id.' });
    }
 */
      const user=await db.users.findOne({where:{user_id:req.user.user_id}})
      console.log({user});
      //Role validation
      if (user.role === userRole.ADMIN) {
        return res.status(403).json({ message: 'You do not have permission to access this route.' });
    }
    let role= user.role;
console.log({role});
    /* try{
        //validate password
        const passwordMatch = await bcrypt.compare(password, user.password);
        let pwd=user.password;
        console.log({pwd});
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Your password does not match.' });

        }
    }catch(error){
        return res.status(401).json({message: 'Your password does not match.'},{error:error.message});
    } */
    
    
  
   
     //handle password reset for school users
     let comp = user.role === userRole.SCHOOL? 1: 0;
     console.log({comp});
     let r= userRole.SCHOOL;
     console.log(r);
           if(user.role === userRole.SCHOOL){
             
            try {
                const { currentPassword, newPassword } = req.body;
             
                console.log({currentPassword});
                console.log(newPassword);
                if (!currentPassword || !newPassword) {
                    return res.status(400).json({ message: 'Current and new passwords are required.' });
                }

                const existingUser = await db.users.findOne({where:{user_id:user.user_id}});
                if (!existingUser) {
                  return res.status(404).json({ error: "User not found" });
                }
                console.log({existingUser});
            let p = existingUser.password;
            console.log({p});
                // Check if the current password matches the one in the database
               const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);
                if (!isPasswordValid) {
                  return res.status(401).json({ error: "Current password is incorrect" });
                  }
            
                // Hash the new password
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            
                try{
                    // Update the user's password in the database
                await db.users.update(
                    { password: hashedNewPassword },
                    { where: { user_id: user.user_id } }
                  );
              
                }catch(error){
                    return res.status(400).json({message:'Error in reseting password',error:error.message});
                }
                
                res.status(200).json({ message: "Password updated successfully" });
              } catch (error) {
                console.log('stack trace:', error.stack);
                res.status(500).json({ error: 'Unable to update the password' });
              }

            }

}
catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Error logging in.', error });
                 }

}

const companyPasswordReset =async (req,res) =>{
    try {
        const user=await db.users.findOne({
            where:
            {user_id:req.user.user_id

            }})
        console.log({user});
      //Role validation
      if (user.role === userRole.ADMIN) {
        return res.status(403).json({ message: 'You do not have permission to access this route.' });
    }
    let role= user.role;
console.log({role});
let comp = user.role === userRole.COMPANY? 1: 0;
     console.log({comp});
     let r= userRole.COMPANY;
     console.log(r);
           if(user.role === userRole.COMPANY){
             
            try {
                const { currentPassword, newPassword } = req.body;
             
                console.log({currentPassword});
                console.log(newPassword);
                if (!currentPassword || !newPassword) {
                    return res.status(400).json({ message: 'Current and new passwords are required.' });
                }

                const existingUser = await db.users.findOne({where:{user_id:user.user_id}});
                if (!existingUser) {
                  return res.status(404).json({ error: "User not found" });
                }
                console.log({existingUser});
            let p = existingUser.password;
            console.log({p});
                // Check if the current password matches the one in the database
               const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);
                if (!isPasswordValid) {
                  return res.status(401).json({ error: "Current password is incorrect" });
                  }
            
                // Hash the new password
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            
                try{
                    // Update the user's password in the database
                await db.users.update(
                    { password: hashedNewPassword },
                    { where: { user_id: user.user_id } }
                  );
              
                }catch(error){
                    return res.status(400).json({message:'Error in reseting password',error:error.message});
                }
                
                res.status(200).json({ message: "Password updated successfully" });
              } catch (error) {
                console.log('stack trace:', error.stack);
                res.status(500).json({ error: 'Unable to update the password' });
              }

            }

}
catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Error logging in.', error });
                 }

}


const studentPasswordReset =async (req,res) => {

  try {
    const user=await db.users.findOne({
        where:
        {user_id:req.user.user_id

        }})
    console.log({user});
  //Role validation
  if (user.role === userRole.ADMIN) {
    return res.status(403).json({ message: 'You do not have permission to access this route.' });
}
let role= user.role;
console.log({role});
let comp = user.role === userRole.STUDENT? 1: 0;
 console.log({comp});
 let r= userRole.STUDENT;
 console.log("role of user is",r);
       if(user.role === userRole.STUDENT){
         
        try {
            const { currentPassword, newPassword } = req.body;
         
            console.log({currentPassword});
            console.log(newPassword);
            if (!currentPassword || !newPassword) {
                return res.status(400).json({ message: 'Current and new passwords are required.' });
            }

            const existingUser = await db.users.findOne({where:{user_id:user.user_id}});
            if (!existingUser) {
              return res.status(404).json({ error: "User not found" });
            }
            console.log({existingUser});
        let p = existingUser.password;
        console.log({p});
            // Check if the current password matches the one in the database
           const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);
            if (!isPasswordValid) {
              return res.status(401).json({ error: "Current password you entered is incorrect" });
              }
        
            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
            try{
                // Update the user's password in the database
            await db.users.update(
                { password: hashedNewPassword },
                { where: { user_id: user.user_id } }
              );
          
            }catch(error){
                return res.status(400).json({message:'Error in reseting password',error:error.message});
            }
            
            res.status(200).json({ message: "Password updated successfully" });
          } catch (error) {
            console.log('stack trace:', error.stack);
            res.status(500).json({ error: 'Unable to update the password' });
          }

        }

}
catch (error) {
console.log(error.stack)
res.status(500).json({ message: 'Error logging in.', error });
             }


}


  module.exports ={schoolPasswordReset,companyPasswordReset,studentPasswordReset}