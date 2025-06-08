import { usersModel } from '../models/usersModel.js'

export class usersController{
    static async getAll(req,res){
      try {
        const users = await usersModel.getAll()
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
       const user = await usersModel.usuario(req.body);
       if (!user) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}