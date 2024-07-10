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




// =========== GET ALL POSTS

// : api/posts
//UNPROTECTED

const getPosts = async (req, res,next)=>{
   try{
    const posts = await Post.find().sort({updatedAt: -1})
    res.status(200).json(posts)
   }catch{
    return next(new HttpError(error))
   }
}

// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getPost = async (req, res, next) => {
  try {
      const postId = req.params.id;
      console.log('Request postId:', postId); // Add this line to log the postId

      const post = await Post.findById(postId);

      if (!post) {
          return next(new HttpError("Post not found.", 404));
      }

      res.status(200).json(post);
  } catch (error) {
      console.error('Error fetching post:', error); // Add this line to log the error
      return next(new HttpError(error.message, 500));
  }
};



// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getCatPosts = async (req, res, next) => {
    try {
      // Extrae la categoría desde los parámetros de la URL
      const { category } = req.params;
  
      // Busca en la base de datos todos los posts que coincidan con la categoría dada y los ordena por fecha de creación de manera descendente
      const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
  
      // Si encuentra posts, los devuelve como respuesta con un estado HTTP 200
      res.status(200).json(catPosts);
    } catch (error) {
      // En caso de error durante la búsqueda, pasa el error al middleware de manejo de errores de Express
      return next(new HttpError(error));
    }
  }


// =========== CREATE A POST

//POST : api/posts
//PROTECTED

const getUserPosts = async (req, res, next) => {
    try {
      // Extrae el ID del usuario desde los parámetros de la URL
      const { id } = req.params;
  
      // Busca en la base de datos todos los posts cuyo campo 'creator' coincide con el ID del usuario y los ordena por fecha de creación descendente
      const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
  
      // Envía los posts encontrados como respuesta con un estado HTTP 200
      res.status(200).json(posts);
    } catch (error) {
      // En caso de error durante la búsqueda, pasa el error al middleware de manejo de errores de Express
      return next(new HttpError(error));
    }
  }

  const editPost = async (req, res, next) => {
    try {
      const postId = req.params.id;
      const { title, category, description } = req.body;
  
      // Verificación adicional
      console.log('Post ID:', postId);
      console.log('Request body:', req.body);
  
      if (!title || !category || description.length < 12) {
        return next(new HttpError("Fill in all fields.", 422));
      }
  
      let newFilename = null;
      if (req.files && req.files.thumbnail) {
        const { thumbnail } = req.files;
  
        if (thumbnail.size > 2000000) {
          return next(new HttpError("Thumbnail too large. Max size is 2MB.", 400));
        }
  
        const fileName = thumbnail.name;
        const splittedFilename = fileName.split('.');
        newFilename = `${splittedFilename[0]}${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;
  
        // Mueve el archivo a la carpeta de uploads
        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), (err) => {
          if (err) {
            console.error('Error moving file:', err);
            return next(new HttpError(err));
          }
        });
      }
  
      const updateData = { title, category, description };
      if (newFilename) {
        updateData.thumbnail = newFilename;
      }
  
      const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });
      if (!updatedPost) {
        return next(new HttpError("Could not update post.", 400));
      }
  
      res.status(200).json({ updatedPost });
    } catch (error) {
      console.error('Error in editPost:', error);
      return next(new HttpError(error.message, 500));
    }
  };
  
  /*
  const editPost = async (req, res, next) => {
    try {
      // Extrae el ID del post desde los parámetros de la URL
      const postId = req.params.id;
  
      // Extrae el título, categoría y descripción del cuerpo de la solicitud
      let { title, category, description } = req.body;
  
      // Verifica si el título, categoría o descripción están vacíos o si la descripción es demasiado corta
      if (!title || !category || description.length < 12) {
        return next(new HttpError("Fill in all fields.", 422));
      }
  
      if (!req.files || !req.files.thumbnail) {
        return next(new HttpError("Thumbnail file is required.", 400));
      }
  
      const { thumbnail } = req.files;
      if (thumbnail.size > 2000000) {
        return next(new HttpError("Thumbnail too large. Max size is 2MB.", 400));
      }
  
      const fileName = thumbnail.name;
      const splittedFilename = fileName.split('.');
      const newFilename = `${splittedFilename[0]}${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;
  
      // Mueve el archivo a la carpeta de uploads
      thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
        if (err) {
          return next(new HttpError(err));
        }
  
        const updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true });
        if (!updatedPost) {
          return next(new HttpError("Could not update post.", 400));
        }
  
        res.status(200).json({ updatedPost });
      });
    } catch (error) {
      return next(new HttpError(error));
    }
  }
  */



  

  const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailable.", 400));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found.", 404));
        }

        // Convierte ambos IDs a strings antes de compararlos
        if (req.user.id.toString() === post.creator.toString()) {
            const fileName = post.thumbnail;
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err));
                }
                
                await Post.findByIdAndDelete(postId);
                const currentUser = await User.findById(req.user.id);
                if (currentUser) {
                    const userPostCount = currentUser.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
                }

                res.json({ message: "Post deleted successfully." });
            });
        } else {
            // No permitir la eliminación si el usuario no es el creador
            return next(new HttpError("You are not authorized to delete this post.", 403));
        }
    } catch (error) {
        return next(new HttpError(error));
    }
}





module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost };


