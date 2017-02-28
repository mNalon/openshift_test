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
    }
  }
}

router.post('/create', validate({body: schema}),(req, res)=>{
  models.Category.create(req.body).then((category)=>{
    res.status(httpStatus.OK).send(category);
  }, (err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });

});

router.put('/update/:id', validate({body: schema}),(req, res)=>{
  var id = req.params.id;
  models.Category.find(id).then((category)=>{
    if(!category){
      return res.status(httpStatus.NOT_FOUND).send('Não encontrado');
    }
    category.name = req.body.name;
    category.description = req.body.description;

    category.save().then((category)=>{
       res.status(httpStatus.OK).send(category);
    }, (err)=>{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
    })
  }, (err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
});

router.delete('/delete/:id', (req, res)=>{
  var id = req.params.id;
  models.Category.find(id).then((category)=>{
    if(!category){
      return res.status(httpStatus.NOT_FOUND).send('Não encontrado');
    }
    category.destroy().then((category)=>{
       res.status(httpStatus.OK).send(category);
    }, (err)=>{
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
    });
  }, (err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
});

router.get('/list', (req, res)=>{
  models.Category.findAll({attributes:['id','name','description']}).then((categories)=>{
    res.status(httpStatus.OK).send(categories);
  },(err)=>{
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');
  });
})

module.exports = router;
