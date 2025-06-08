import mysql from "mysql2/promise"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta_aqui';
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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
      const sql = 'INSERT INTO USUARIOS (nombre, email, contrasena, avatar) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(sql, [nombre, email, hashedPassword, avatar]);
      return { id: result.insertId, nombre, email, avatar };
  }
  static async usuario(email,contraseña){
    const [rows]= await connection.execute('SELECT * FROM usuarios WHERE email = ?',[email])
       if (rows.length === 0) {
      return null
    }
      const user = rows[0];

    // Comparamos el hash de la contraseña almacenada con la recibida
    const match = await bcrypt.compare(contraseña, user.contrasena);

    if (!match) {
      return null
    }

    const { contrasena, ...userWithoutPassword } = user;
    const token = jwt.sign(
    { id: userWithoutPassword.id },
    SECRET_KEY,
    { expiresIn: '1000h' } 
  );
  return token;
   
  }

}