const multer = require('multer');

//Создаем словарь, в котором будут храниться все возможные расширения
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Configuration multer  Конфигурация мултера
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');//указываем имя досье, в котором будут храниться фотографии
  },
  filename: (req, file, callback) => { //Указываем мултеру какое название фотографии использовать
    const name = file.originalname.split(' ').join('_');// генерируем новое название фото, заменяя все пробелы нижними подчеркиваниями 
    const extension = MIME_TYPES[file.mimetype];//задаем фотографии расширение
    callback(null, name + Date.now() + '.' + extension);//создаем полное развание для файла = название + дата (чтобы задать ему уникальное название) + расширение
  }
});

module.exports = multer({storage: storage}).single('image');