import conn from './conn.js'

async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM recipe_posts');
    console.log('Rows from database:', rows); // Agregar este mensaje de registro
    return rows;
  } catch (error) {
    console.error('Error en getAllPosts:', error);
    throw error;
  }
}

async function createPost(title, content, author, category, tags) {
  const [result] = await conn.query(
    'INSERT INTO recipe_posts (title, content, author, category, tags) VALUES (?, ?, ?, ?, ?)',
    [title, author, category, content, tags],
  )
  return result
}

async function getById(postId) {
  const [result] = await conn.query('SELECT * FROM recipe_posts WHERE id = ?', [postId])
  return result
}

async function deletebyID(postId) {
  const [deleteResult] = await conn.query('DELETE FROM recipe_posts WHERE id = ?', [postId])
  return deleteResult
}

async function updatePostById(title, content, author, category, tags, postId) {
  const [result] = await conn.query(
    'UPDATE recipe_posts SET title = ?, content = ?, author = ?, category = ?, tags = ? WHERE id = ?',
    [title, content, author, category, tags, postId],
  )
  return result
}

export {
  createPost, getAllPosts, getById, deletebyID, updatePostById,
}
