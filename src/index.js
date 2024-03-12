import express from 'express'
import { getAllPosts } from './db.js'
const db = require('./db');



const app = express();
const port = 3000;


app.get('/hello', async (req, res) => {
  res.send('HELLO FROM MY SERVER')
})

app.get('/post1s', async (req, res) => {
  const posts = await getAllPosts()
  res.json(posts)
})


app.get('/posts', (req, res) => {
  db.query('SELECT * FROM posts', (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.status(200).json(results);
    }
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).send('Se requieren campos title y content');
    return;
  }

  db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (error, results) => {
    if (error) {
      console.error('Error al insertar el post:', error);
      res.status(500).send('Error en el servidor');
    } else {
      const postId = results.insertId;
      res.status(200).json({ id: postId, title, content });
    }
  });
});
