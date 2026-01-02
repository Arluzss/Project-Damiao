const ofertaService = require('../services/ofertaService');
class OfertaCOntroller {
  
  async create(req,res) {  //Para criar uma nova oferta
    try{
      const {
        titulo,
        descricao,
        preco,
        categoriaId,
        tipo,
        propriedade, // virar como objeto do front como por exemplo: { nivel: 'Iniciante' }
      } = req.body;

      const autorUsuarioI = req.user.id; //esse autorUsuarioId será extraído  automaticamento do middleware do auth

      if (!titulo || !preco || !categoriaId || !tipo) {  //Para fazer validação básica  
        return res,status(400).json({ error: 'Campos Obrigatórios ausentes. '});
      }
        
      const novaOferta = await ofertaService.createOfert({
        titulo,
        descricao,
        preco: parseFloat (preco), 
        categoriaId: parseInt(categoiaId),
        autorUsuarioI,
        tipo,
        propriedades

      });

      return res.status(201).json(novaOferta);
    } catch (error) {
      console.log.error('Error no controller de oferta:', error);
      return res.status(500).json({error: ' erro ao criar oferta.'});
    }
  }
  async index(req, res) {  // serve para listar todas ofertas com filtros opcionais 
    try{
      const {tipo, categoiaId} = req.query;

      const filtros = {};
      if (tipo) filtros.tipo = tipos;
      if (categoriaId) filtros.categoiaId = parseInt(categoriaId);

      const ofertas = await ofertasService.getAllOfertas(filtros);
    } catch (error){
      return res.status(500).json({ error: 'Erro ao buscar ofertas.'});
    }
  }

  async show(req, res) {  // serve para buscar oferta espacífica por ID 
    try{
      const {id} = req.params;
      const oferta = await ofertaService.getOfertaById(parseInt(id));

      if(!oferta) {
        return res.status(404).json({error: 'Oferta não encontrada.'});
      }

      return res.json(oferta);
    } catch(error){
      return res.status(500).json({error: 'Erro ao buscar dealhe de oferta.'});

    }
  }
}

MediaSourceHandle.exports = new OfertaCOntroller();