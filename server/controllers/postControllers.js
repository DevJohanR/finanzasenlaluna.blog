const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs-extra');
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel');



// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const createPost = async (req, res, next) => {
    try {
        // Extrae los campos del cuerpo de la solicitud
        const { title, category, description } = req.body;

        // Valida que los campos requeridos estén presentes y que se haya subido un archivo
        if (!title || !category || !description || !req.files || !req.files.thumbnail) {
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422));
        }

        // Accede al archivo de la miniatura desde la solicitud
        const { thumbnail } = req.files;

        // Verifica el tamaño del archivo para asegurarse de que no exceda 2 MB
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb.", 413));
        }

        // Procesa el nombre del archivo para evitar conflictos y asegura un nombre único
        const fileName = thumbnail.name;
        const splittedFilename = fileName.split('.');
        const newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', newFilename);

        // Mueve el archivo a la carpeta de uploads
        thumbnail.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError("Failed to upload the thumbnail.", 500));
            }

            // Crea el post en la base de datos con los datos proporcionados
            const newPost = await Post.create({
                title,
                category,
                description,
                thumbnail: newFilename,
                creator: req.user.id
            });

            if (!newPost) {
                return next(new HttpError("Post couldn't be created.", 422));
            }

            // Encuentra al usuario creador y aumenta su contador de posts
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser.posts + 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

            // Envía una respuesta con el post creado
            res.status(201).json(newPost);
        });
    } catch (error) {
        // Maneja cualquier otro error no capturado
        return next(new HttpError(error.message, 500));
    }
};




// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getPosts = async (req, res,next)=>{
    res.json("Get Post")
}

// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        next(error);
    }
};



// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getCatPosts = async (req, res,next)=>{
    res.json("Get Cat Posts")
}


// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getUserPosts = async (req, res,next)=>{
    res.json("Get User Post")
}


const editPost = async (req, res,next)=>{
    res.json("Edit Post")
}

const deletePost = async (req, res,next)=>{
    res.json("Delete Post")
}


module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost };


