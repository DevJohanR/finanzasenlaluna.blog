// Importa Schema y model de mongoose para definir modelos y trabajar con MongoDB
const { Schema, model } = require("mongoose");

// Define el esquema para los posts
const postSchema = new Schema({
  title: { type: String, required: true },  // Campo para el título del post, es obligatorio
  category: { 
    type: String, 
    enum: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"], 
    message: "{VALUE} is not supported"  // Mensaje de error cuando el valor no está en la lista permitida
  },
  description: { type: String, required: true },  // Campo para la descripción del post, es obligatorio
  creator: { type: Schema.Types.ObjectId, ref: 'User' },  // Referencia al modelo de usuario que crea el post
  thumbnail: { type: String, required: true },  // Campo duplicado, parece un error
}, { timestamps: true });  // Opción para agregar automáticamente campos de timestamp (createdAt, updatedAt)

// Exporta el modelo de post, utilizando el esquema definido
module.exports = model('Post', postSchema);
