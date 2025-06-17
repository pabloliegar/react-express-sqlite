import mysql from "mysql2/promise"
const config={
      host: 'localhost',
      user: 'usuario',
      password: 'pablo',
      database: 'users'   
}
const connection= await mysql.createConnection(config)
export class tweetsModel {
    static async getAll() {
        const [rows] = await connection.execute('SELECT  tweets.id, tweets.texto, tweets.usuario_id, tweets.fecha_creacion,usuarios.nombre,usuarios.email, COUNT(comentarios.id) AS total_comentarios FROM tweets JOIN usuarios ON usuarios.id=tweets.usuario_id LEFT JOIN  comentarios ON comentarios.tweet_id = tweets.id GROUP BY tweets.id, tweets.texto, tweets.usuario_id, tweets.fecha_creacion ORDER BY  tweets.fecha_creacion DESC ');

        return rows;
    }

    static async create({ userId, text }) {
        const sql = 'INSERT INTO tweets (usuario_id, texto) VALUES (?, ?)';
        const [result] = await connection.execute(sql, [userId, text]);
        return { id: result.insertId, userId, text };
    }

    static async getById(id) {
        const [rows] = await connection.execute('SELECT * FROM tweets WHERE id = ?', [id]);
        return rows[0];
    }
}