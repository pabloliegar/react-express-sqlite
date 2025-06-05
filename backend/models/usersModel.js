import mysql from "mysql2/promise"
const config={
      host: 'localhost',
      user: 'usuario',
      password: 'pablo',
      database: 'users'   
}
const connection= await mysql.createConnection(config)
export class usersModel{
    static async getAll(){
        const [rows] = await connection.execute('SELECT * FROM usuarios')
        return rows
    }
    static async create({ nombre, email, contrasena, avatar }) {
    const sql = 'INSERT INTO USUARIOS (nombre, email, contrasena, avatar) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute(sql, [nombre, email, contrasena, avatar]);
    return { id: result.insertId, nombre, email, avatar };
  }

}