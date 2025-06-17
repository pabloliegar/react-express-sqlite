import {tweetsModel} from '../models/tweetsModel.js';
export class tweetsController {
  static async getAll(req, res) {
    try {
      const tweets = await tweetsModel.getAll();
      res.json(tweets);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { userId, text } = req.body;
      if (!userId || !text) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
      }
      const tweet = await tweetsModel.create({ userId, text });
      res.status(201).json(tweet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const tweet = await tweetsModel.getById(req.params.id);
      if (!tweet) {
        return res.status(404).json({ error: 'Tweet no encontrado' });
      }
      res.json(tweet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}