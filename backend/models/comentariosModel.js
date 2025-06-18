import mysql from "mysql2/promise"
const config={
      host: 'localhost',
      user: 'usuario',
      password: 'pablo',
      database: 'users'   
}
const connection= await mysql.createConnection(config)
export class comentariosModel {
    static async getAll() {
        const [rows] = await connection.execute('SELECT comentarios.id, comentarios.texto, comentarios.usuario_id, comentarios.fecha, usuarios.nombre, usuarios.email, comentarios.tweet_id FROM comentarios JOIN usuarios ON usuarios.id=comentarios.usuario_id ORDER BY comentarios.fecha DESC');
        return rows;
    }

    static async create({ userId, text, tweetId }) {
        const sql = 'INSERT INTO comentarios (usuario_id, texto, tweet_id) VALUES (?, ?, ?)';
        const [result] = await connection.execute(sql, [userId, text, tweetId]);
        return { id: result.insertId, userId, text, tweetId };
    }

    static async getByTweetId(tweetId) {
        const [rows] = await connection.execute('SELECT comentarios.id, comentarios.texto, comentarios.usuario_id, comentarios.fecha, usuarios.nombre, usuarios.email, comentarios.tweet_id FROM comentarios JOIN usuarios ON usuarios.id=comentarios.usuario_id WHERE tweet_id = 1 ORDER BY comentarios.fecha DESC LIMIT 100 ?', [tweetId]);
        return rows;
    }
}