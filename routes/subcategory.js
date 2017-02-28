var router = require('express').Router();
var validate = require('express-jsonschema').validate;
var httpStatus = require('http-status-codes');

var models = require('../models');

const schema = {
type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: false
    },
    category_id: {
      type: 'number',
      required: true
    }
  }
}

router.post('/create', validate({body: schema}),(req, res)=>{
  models.Category.find(req.body.category_id).then((category)=>{
    models.Subcategory.create(req.body).then((subcategory)=>{
      subcategory.dataValues.Category = category;
      res.status(httpStatus.OK).send(subcategory);
    }, (err)=>{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
    });
  },(err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
});

router.put('/update/:id', validate({body: schema}),(req, res)=>{
  var id = req.params.id;

  models.Category.find(req.body.category_id).then((category)=>{
      models.Subcategory.find({
      where:{id:id},
      include:[{model: models.Category, as:'Category', attributes:['id','name','description']}]
      }).then((subcategory)=>{
        if(!subcategory){
          return res.status(httpStatus.NOT_FOUND).send('Não encontrado');
        }
        subcategory.name = req.body.name;
        subcategory.description = req.body.description;
        subcategory.category_id = req.body.category_id

        subcategory.save().then(()=>{
          subcategory.dataValues.Category = category;
          res.status(httpStatus.OK).send(subcategory);
        }, (err)=>{
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
        })
      }, (err)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
      });

  },(err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
  
});

router.delete('/delete/:id', (req, res)=>{
  var id = req.params.id;
  models.Subcategory.find({
      where:{id:id},
      include:[{model: models.Category, as:'Category', attributes:['id','name','description']}]
  }).then((subcategory)=>{
    if(!subcategory){
      return res.status(httpStatus.NOT_FOUND).send('Não encontrado');
    }
    subcategory.destroy().then((subcategory)=>{
       res.status(httpStatus.OK).send(subcategory);
    }, (err)=>{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
    });
  }, (err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
});

router.get('/list', (req, res)=>{
  models.Subcategory.findAll({
      include:[{model: models.Category, as:'Category', attributes:['id','name','description']}]
  }).then((subcategories)=>{
    res.status(httpStatus.OK).send(subcategories);
  },(err)=>{
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
})

module.exports = router;
