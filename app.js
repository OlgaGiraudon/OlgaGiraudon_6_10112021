//Import express module. Поключение модуля express
const express = require('express');
//Import bodyparser package. Поключение пакета bodyparser, который преобразует тело запроса в формат json
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
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
app.use('/api/sauces', stuffRoutes);

//Export const app for other files. Экспорт константы app, чтобы ее можно было использовать в других файлах
module.exports = app;