const profileService = require('../services/ProfileService');

class ProfileController {
  async me(req, res) {
    try {
      const userId = req.user && req.user.id;
      if (!userId) return res.status(400).json({ error: 'Usuário inválido' });

      const perfil = await profileService.getProfileById(userId);
      return res.status(200).json({ usuario: perfil });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const userId = req.user && req.user.id;
      if (!userId) return res.status(400).json({ error: 'Usuário inválido' });

      const dados = req.body || {};
      const atualizado = await profileService.updateProfile(userId, dados);
      return res.status(200).json(atualizado);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async courses(req, res) {
    try {
      const userId = req.user && req.user.id;
      if (!userId) return res.status(400).json({ error: 'Usuário inválido' });

      const cursos = await profileService.getUserCourses(userId);
      return res.status(200).json({ courses: cursos });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async balance(req, res) {
    try {
      const userId = req.user && req.user.id;
      if (!userId) return res.status(400).json({ error: 'Usuário inválido' });

      const balance = await profileService.getBalance(userId);
      return res.status(200).json({ damiao: balance });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ProfileController();
