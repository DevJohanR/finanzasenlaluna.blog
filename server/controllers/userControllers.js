const bcrypt = require('bcryptjs')

const HttpError = require("../models/errorModels")
const User = require('../models/userModel');


//=================== REGISTER A NEW USER
//POST: api/users/register
// UNPROTECTED

const registerUser = async (req, res, next) => {
    try {
      const { name, email, password, password2 } = req.body;
      
      if (!name || !email || !password || !password2) {
        return next(new HttpError("Fill in all fields.", 422));
      }
  
  
      const newEmail = email.toLowerCase();
      
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        return next(new HttpError("Este correo ya existe", 422));
      }
  
      if((password.trim()).length < 6){
        return next(new HttpError("La contraseña debe tener mas de 6 caracteres", 422))
      }

      if(password!= password2){
        return next(new HttpError("Las contraseñas no son iguales"))
      }
  
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(password, salt);
      const newUser = await User.create({name, email: newEmail, password: hashedPass})
      res.status(201).json(`Nuevo usuario ${newUser.email} registrado con exito!`)
    
  
    } catch (error) {
      return next(new HttpError("Falla al registrar usuario", 500));
    }
  };
//=================== LOGIN A REGISTERED USER
//POST: api/users/login
// UNPROTECTED

const loginUser = (req,res,next) =>{
    res.json("Login User")
}


//=================== USER PROFILE
//POST: api/users/:id
// UNPROTECTED

const getUser = async (req,res,next) =>{
    res.json("User Profile")
}


//=================== CHANGE USER AVATAR (profile picture)
//POST: api/users/change-avatar
// UNPROTECTED

const changeAvatar = async (req,res,next) =>{
    res.json("Change User Avatar")
}

//=================== EDIT USER DETAILS (profile picture)
//POST: api/users/edit-user
// UNPROTECTED

const editUser = async (req,res,next) =>{
    res.json("Edit User Details")
}



//=================== GET AUTHORS
//POST: api/users/authors
// UNPROTECTED

const getAuthors = async (req,res,next) =>{
    res.json("Get All Users/Authors")
}


module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}