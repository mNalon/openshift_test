var express = require('express');
var router = express.Router();
var httpStatus = require('http-status-codes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/category',require('./category'));
router.use('/subcategory',require('./subcategory'));

/*
  Handler error
*/
router.use((err, req, res, next)=>{

  if(err.name === 'JsonSchemaValidation'){
    return res.status(httpStatus.BAD_REQUEST).send('Corpo da mensagem inválida');
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Ocorreu um erro');

});

module.exports = router;
