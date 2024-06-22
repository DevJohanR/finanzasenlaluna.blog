const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');

// Importa solo los controladores que están definidos y utilizados
const {
  createPost,
  getPosts,
  getPost, // Asegúrate de que esta función esté definida y exportada en postControllers
  getCatPosts,
  getUserPosts,
  editPost,
  deletePost
} = require('../controllers/postControllers');

const router = Router();

// Ruta para crear un post con middleware de autenticación
router.post('/', authMiddleware, createPost);

// Ruta para obtener todos los posts
router.get('/', getPosts);

// Ruta para obtener un post específico por ID
router.get('/:id', getPost);

// Ruta para obtener posts por categoría
router.get('/categories/:category', getCatPosts);

// Ruta para obtener posts de un usuario específico
router.get('/users/:id', getUserPosts);

// Ruta para editar un post, requiere autenticación
router.patch('/:id', authMiddleware, editPost);

// Ruta para eliminar un post, también con autenticación
router.delete('/:id', authMiddleware, deletePost);

// Exporta el router para ser usado en el archivo principal de la aplicación
module.exports = router;
