import {comentariosModel} from '../models/comentariosModel.js';
export class comentariosController {
  static async getAll(req, res) {
    try {
      const comentarios = await comentariosModel.getAll();
      res.json(comentarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { userId, text, tweetId } = req.body;
      if (!userId || !text || !tweetId) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }
      const comentario = await comentariosModel.create({ userId, text, tweetId });
      res.status(201).json(comentario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getByTweetId(req, res) {
    try {
      const comentarios = await comentariosModel.getByTweetId(req.params.tweetId);
      if (!comentarios) {
        return res.status(404).json({ error: 'Comentarios no encontrados' });
      }
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}