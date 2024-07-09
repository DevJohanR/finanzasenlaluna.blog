const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const HttpError = require("../models/errorModel")
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Asegúrate de importar la librería UUID

//=================== REGISTER A NEW USER
//POST: api/users/register
// UNPROTECTED

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;

    // LOG DE LOS DATOS RECIBIDOS
    console.log("DATOS RECIBIDOS:", { name, email, password, password2 });

    // VERIFICA QUE TODOS LOS CAMPOS ESTÉN COMPLETOS
    if (!name || !email || !password || !password2) {
      console.log("FALTAN CAMPOS POR COMPLETAR."); // LOG SI FALTAN CAMPOS
      return next(new HttpError("Fill in all fields.", 422));
    }

    // NORMALIZA EL CORREO ELECTRÓNICO
    const newEmail = email.toLowerCase();

    // VERIFICA SI EL CORREO ELECTRÓNICO YA EXISTE
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      console.log("EL CORREO ELECTRÓNICO YA EXISTE."); // LOG SI EL CORREO YA EXISTE
      return next(new HttpError("Este correo ya existe", 422));
    }

    // VERIFICA LA LONGITUD DE LA CONTRASEÑA
    if ((password.trim()).length < 6) {
      console.log("LA CONTRASEÑA ES DEMASIADO CORTA."); // LOG SI LA CONTRASEÑA ES CORTA
      return next(new HttpError("La contraseña debe tener más de 6 caracteres", 422));
    }

    // VERIFICA SI LAS CONTRASEÑAS COINCIDEN
    if (password !== password2) {
      console.log("LAS CONTRASEÑAS NO COINCIDEN."); // LOG SI LAS CONTRASEÑAS NO COINCIDEN
      return next(new HttpError("Las contraseñas no son iguales", 422));
    }

    // GENERA EL HASH DE LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    console.log("CONTRASEÑA HASHEADA:", hashedPass); // LOG DE LA CONTRASEÑA HASHEADA

    // CREA UN NUEVO USUARIO
    const newUser = await User.create({ name, email: newEmail, password: hashedPass });
    console.log("NUEVO USUARIO CREADO:", newUser); // LOG DEL NUEVO USUARIO CREADO

    res.status(201).json({ message: `Nuevo usuario ${newUser.email} registrado con éxito!` });

  } catch (error) {
    console.error("ERROR AL REGISTRAR USUARIO:", error.message); // LOG DEL ERROR EN EL SERVIDOR
    return next(new HttpError("Falla al registrar usuario", 500));
  }
};
//=================== LOGIN A REGISTERED USER
//POST: api/users/login
// UNPROTECTED

// Definición de la función asíncrona para iniciar sesión
const loginUser = async (req, res, next) => {
  try {
    // Extracción del email y contraseña del cuerpo de la solicitud
    const {email, password} = req.body;

    // Verificación de que ambos, email y contraseña, han sido proporcionados
    if (!email || !password) {
      return next(new HttpError("Fill in all fields.", 422));
    }

      // Verifica si la clave secreta JWT está definida
      if (!process.env.JWT_SECRET) {
        return next(new HttpError("JWT secret is not set.", 500));
      }

    // Normalización del email a minúsculas para evitar problemas de coincidencia de mayúsculas/minúsculas
    const newEmail = email.toLowerCase();

    // Búsqueda del usuario por email en la base de datos
    const user = await User.findOne({email: newEmail});
    
    // Si no se encuentra el usuario, se devuelve un error
    if (!user) {
      return next(new HttpError("Invalid credentials.", 422));
    }

    // Comparación de la contraseña proporcionada con la contraseña almacenada usando bcrypt
    const comparePass = await bcrypt.compare(password, user.password);
    
    // Si la comparación de contraseña falla, se devuelve un error
    if (!comparePass) {
      return next(new HttpError("Invalid credentials.", 422));
    }

    const {_id: id, name} = user;
    const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.status(200).json({token, id, name})

  // Manejo de errores en el proceso de inicio de sesión
  } catch (error) {
    return next(new HttpError("Login failed. Please check your credentials.", 422));
  }
};


//=================== USER PROFILE
//POST: api/users/:id
// UNPROTECTED

// Definición de la función asíncrona para obtener la información del usuario
const getUser = async (req, res, next) => {
  try {
    // Extraemos el 'id' de los parámetros de la solicitud
    const {id} = req.params;

    // Buscamos al usuario por ID en la base de datos y excluimos la contraseña en el resultado
    const user = await User.findById(id).select('-password');
    
    // Si no se encuentra el usuario, enviamos un error 404
    if (!user) {
      return next(new HttpError("User not found.", 404));
    }

    // Si se encuentra el usuario, respondemos con el usuario en formato JSON y código de estado 200
    res.status(200).json(user);

  // Capturamos cualquier error que ocurra durante el proceso de la solicitud
  } catch (error) {
    // Enviamos el error usando el middleware de manejo de errores de Express
    return next(new HttpError(error));
  }
};


//=================== CHANGE USER AVATAR (profile picture)
//POST: api/users/change-avatar
// UNPROTECTED

// Definición de la función asíncrona para cambiar el avatar del usuario
// Definición de la función asíncrona para cambiar el avatar del usuario
const changeAvatar = async (req, res, next) => {
  try {
    // Comprueba si hay un archivo de avatar en la solicitud
    if (!req.files || !req.files.avatar) {
      return next(new HttpError("Please choose an image.", 422));
    }

    // Busca al usuario en la base de datos utilizando el ID almacenado en req.user.id
    const user = await User.findById(req.user.id);

    // Si el usuario tiene un avatar anterior, bórralo
    if (user.avatar) {
      fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
        if (err) {
          return next(new HttpError("Failed to delete old avatar.", 500));
        }
      });
    }

    const { avatar } = req.files;

    // Verificar tamaño del archivo
    if (avatar.size > 500000) {
      return next(new HttpError("Profile picture too big. Should be less than 500kb.", 422));
    }

    const uuid = uuidv4(); // Generar un nuevo UUID
    const fileName = avatar.name;
    const splittedFilename = fileName.split('.');
    const newFilename = `${splittedFilename[0]}_${uuid}.${splittedFilename[splittedFilename.length - 1]}`;

    // Mover el archivo a la carpeta de uploads
    avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
      if (err) {
        return next(new HttpError("Failed to upload avatar.", 500));
      }

      // Actualizar el avatar del usuario en la base de datos
      const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true }).select('-password');
      if (!updatedAvatar) {
        return next(new HttpError("Avatar couldn't be changed.", 422));
      }

      // Envía una respuesta de éxito con los detalles del usuario actualizado
      res.status(200).json(updatedAvatar);
    });
  } catch (error) {
    return next(new HttpError("Error changing avatar.", 500));
  }
};




//=================== EDIT USER DETAILS (profile picture)
//POST: api/users/edit-user
// UNPROTECTED

const editUser = async (req, res, next) => {
  try {
    // Verificar que req.user.id está presente
    if (!req.user || !req.user.id) {
      return next(new HttpError("Unauthorized. No user ID found.", 401));
    }

    // Desestructurar los campos del cuerpo de la solicitud
    const { name, email, currentPassword, newPassword, newConfirmNewPassword } = req.body;
    
    // Verificar que todos los campos requeridos estén presentes
    if (!name || !email || !currentPassword || !newPassword || !newConfirmNewPassword) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    // Obtener el usuario de la base de datos usando el ID del usuario autenticado
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found.", 403));
    }

    // Asegurarse de que el nuevo email no exista ya en la base de datos
    const emailExist = await User.findOne({ email });
    // Si el email existe y pertenece a otro usuario, retornar un error
    if (emailExist && (emailExist._id != req.user.id)) {
      return next(new HttpError("Email already exist.", 422));
    }

    // Comparar la contraseña actual proporcionada con la almacenada en la base de datos
    const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
    // Si la contraseña no es válida, retornar un error
    if (!validateUserPassword) {
      return next(new HttpError("Invalid current password", 422));
    }

    // Comparar las nuevas contraseñas para asegurarse de que coincidan
    if (newPassword !== newConfirmNewPassword) {
      return next(new HttpError("New passwords do not match.", 422));
    }

    // Generar una nueva sal y usarla para hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Actualizar la información del usuario en la base de datos
    const newInfo = await User.findByIdAndUpdate(
      req.user.id, 
      { name, email, password: hash },
      { new: true }
    );

    // Enviar la nueva información del usuario como respuesta
    res.status(200).json(newInfo);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    return next(new HttpError(error));
  }
};




//=================== GET AUTHORS
//POST: api/users/authors
// UNPROTECTED

// Definición de la función asíncrona para obtener una lista de autores
const getAuthors = async (req, res, next) => {
  try {
    // Busca todos los usuarios en la base de datos y excluye sus contraseñas de los resultados
    const authors = await User.find().select('-password');

    // Envía la lista de autores en formato JSON
    res.json(authors);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la consulta y lo pasa al middleware de errores
    return next(new HttpError(error));
  }
};



module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}