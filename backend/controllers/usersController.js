import { usersModel } from '../models/usersModel.js'
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_clave_secreta_aqui';
export class usersController{
    static async getAll(req,res){
      try {
        console.log(req.headers['authorization'])
        const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(401).json({ error: 'Token no proporcionado' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token mal formado' });
      }
        const users = await usersModel.getAll(token)
        res.json(users)
        } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }

  static async create(req, res) {
    try {
      const user = await usersModel.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async usuario(req,res){
    try {
      const { email, password } = req.body;
       const user = await usersModel.usuario(email, password);
       if (!user) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
      
    }
  }

}