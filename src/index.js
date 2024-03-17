import express from 'express'
import {
  getAllPosts, getById, createPost, updatePostById, deletebyID,
} from './db'

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send('HELLO FROM MY API')
})

// Ruta para obtener todos los posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    console.error('Error al obtener los posts:', error)
    res.status(500).send('Error en el servidor')
  }
})

// Ruta para obtener un post por ID
app.get('/posts/:postId', async (req, res) => {
  try {
    const post = await getById(req.params.postId)
    if (post.length === 0) {
      res.status(404).json({ message: 'Post no encontrado' })
    } else {
      res.status(200).json(post[0])
    }
  } catch (error) {
    console.error('Error al obtener el post por ID:', error)
    res.status(500).send('Error en el servidor')
  }
})

// Ruta para crear un nuevo post
app.post('/posts', async (req, res) => {
  const {
    title, content, author, category, tags,
  } = req.body

  try {
    const message = 'Post created successfully! :)'
    const result = await createPost(title, content, author, category, tags)

    res.status(200).json({ message, result })
  } catch (error) {
    console.error('Error al crear el post:', error)
    res.status(500).send('Error en el servidor')
  }
})

// Ruta para modificar un post por ID
app.put('/posts/:postId', async (req, res) => {
  const {
    title, content, author, category, tags,
  } = req.body

  try {
    const updatedPost = await updatePostById(title, content, author, category, tags, req.params.postId)
    if (updatedPost.affectedRows === 0) {
      res.status(404).json({ message: 'Post no encontrado' })
    } else {
      res.status(200).json(updatedPost)
    }
  } catch (error) {
    console.error('Error al actualizar el post:', error)
    res.status(500).send('Error en el servidor')
  }
})

// Ruta para borrar un post por ID
app.delete('/posts/:postId', async (req, res) => {
  try {
    await deletebyID(req.params.postId)
    res.status(204).send()
  } catch (error) {
    console.error('Error al borrar el post:', error)
    res.status(500).send('Error en el servidor')
  }
})

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`)
})
