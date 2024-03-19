import conn from './conn.js';

async function getAllPosts() {
  try {
    const [rows] = await conn.query('SELECT * FROM books_review_posts');
    console.log('Rows from database:', rows); // Agregar este mensaje de registro
    return rows;
  } catch (error) {
    console.error('Error en getAllPosts:', error);
    throw error;
  }
}

async function createPost(title, content, author, genre) {
  const [result] = await conn.query(
    'INSERT INTO books_review_posts (title, content, author, genre) VALUES (?, ?, ?, ?)',
    [title, content, author, genre],
  );
  return result;
}

async function getById(postId) {
  const [result] = await conn.query('SELECT * FROM books_review_posts WHERE id = ?', [postId]);
  return result;
}

async function deletebyID(postId) {
  const [deleteResult] = await conn.query('DELETE FROM books_review_posts WHERE id = ?', [postId]);
  return deleteResult;
}

async function updatePostById(title, content, author, genre, postId) {
  const [result] = await conn.query(
    'UPDATE books_review_posts SET title = ?, content = ?, author = ?, genre = ? WHERE id = ?',
    [title, content, author, genre, postId],
  );
  return result;
}

export { createPost, getAllPosts, getById, deletebyID, updatePostById };
