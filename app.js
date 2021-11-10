//Import express module. Поключение модуля express
const express = require('express');
//Import bodyparser package. Поключение пакета bodyparser, который преобразует тело запроса в формат json
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Sauce = require('./models/ModelSauce');
//Connection to DataBase
mongoose.connect('mongodb+srv://olga:moldova@cluster0.xet0r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
  //Cors  Решение проблемы, когда у сервера и фронта используются разные порты. Теперь к нашему апи можно подключаться с любого адреса
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');//* - любой адрес для подключения
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
//application bodyparser for all api requests. Применение бодипарсера ко всем запросам апи. Теперь все тела запроса будут переводится в объекты JS
app.use(bodyParser.json());

//POST API
app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()//writing a new sauce to the database  Запись нового соуса в базу данных
      .then(() => res.status(201).json({ message: 'Votre sauce a été enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  });
 // GET BY ID
 app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  }); 
//GET ALL API
  app.get('/api/sauces', (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  });
//Export const app for other files. Экспорт константы app, чтобы ее можно было использовать в других файлах
module.exports = app;