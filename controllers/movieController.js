const db = require('../db/db');

const getAllMovies = (req, res) => {
    const sql = 'SELECT * FROM peliculas';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener películas:', err);
            res.status(500).json({ error: 'Error al obtener películas' });
            return;
        }
        res.json(results);
    });
};

const getMovieById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM peliculas WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener película:', err);
            res.status(500).json({ error: 'Error al obtener película' });
            return;
        }
        res.json(results);
    });
};

const createMovie = (req, res) => {
    const { titulo, fecha_lanzamiento, duracion, descripcion, genero, imagen_url, trailer_url, director } = req.body;
    const image = req.file ? req.file.path : null; // Asegúrate de que la variable image esté definida
    const sql = 'INSERT INTO peliculas (titulo, fecha_lanzamiento, duracion, descripcion, genero, imagen_url, trailer_url, director) VALUES (?, ?, ?, ?)';
    db.query(sql, [titulo, fecha_lanzamiento, duracion, descripcion, genero, imagen_url, trailer_url, director], (err, results) => {
        if (err) {
            console.error('Error al crear película:', err);
            res.status(500).json({ error: 'Error al crear película' });
            return;
        }
        res.json({ message: 'Pelicula creada', movieId: results.insertId });
    });
};

const updateMovie = (req, res) => {
    const { id } = req.params;
    const { title, director, year } = req.body;
    const image = req.file ? req.file.path : null; 
    const sql = 'UPDATE peliculas SET titulo = ?, fecha_lanzamiento = ?, duracion = ?, descripcion = ?, genero = ?, imagen_url = ?, trailer_url = ?, director = ? WHERE id = ?';
    db.query(sql, [titulo, fecha_lanzamiento, duracion, descripcion, genero, imagen_url, trailer_url, director], (err, result) => {
        if (err) {
            console.error('Error al actualizar película:', err);
            res.status(500).json({ error: 'Error al actualizar película' });
            return;
        }
        res.json({ message: 'pelicula actualizada' });
    });
};

const deleteMovie = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM peliculas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar película:', err);
            res.status(500).json({ error: 'Error al eliminar película' });
            return;
        }
        res.json({ message: 'pelicula borrada' });
    });
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
