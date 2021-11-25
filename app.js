//Import express module. Поключение модуля express
const express = require('express');
//Import bodyparser package. Поключение пакета bodyparser, который преобразует тело запроса в формат json
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const BDCONNECT = process.env.BDCONNECT;

//Connection to DataBase
mongoose.connect(BDCONNECT,
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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);


//Export const app for other files. Экспорт константы app, чтобы ее можно было использовать в других файлах
module.exports = app;