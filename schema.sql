
-- CREATE USER IF NOT EXISTS 'MajoV'@'%' IDENTIFIED BY 'MajoV';
-- GRANT ALL PRIVILEGES ON recipes_db.* TO 'MajoV'@'%' WITH GRANT OPTION;
-- FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS recipe_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

