const express = require('express');
const path = require('path');
const app = express();
const port = 2007;

let products = [
  {
      "id": 1,
      "category": "Электротехника",
      "name": "Электрическая плита",
      "price": 500,
      "description": "Мощная электрическая плита для приготовления вкусных блюд.",
      "color": "белый",
      "year": 2021
  },
  {
      "id": 2,
      "category": "Электротехника",
      "name": "Холодильник",
      "price": 800,
      "description": "Просторный холодильник для сохранения продуктов свежими.",
      "color": "серебро",
      "year": 2020
  },
  {
      "id": 3,
      "category": "Электротехника",
      "name": "Микроволновка",
      "price": 300,
      "description": "Удобная микроволновка для быстрого приготовления пищи.",
      "color": "черный",
      "year": 2022
  },
  {
      "id": 4,
      "category": "Электротехника",
      "name": "Утюг",
      "price": 50,
      "description": "Эффективный утюг для глажки вашей одежды.",
      "color": "голубой",
      "year": 2021
  },
  {
      "id": 5,
      "category": "Электротехника",
      "name": "Фен",
      "price": 30,
      "description": "Мощный фен для быстрого сушки волос.",
      "color": "розовый",
      "year": 2020
  },
  {
      "id": 6,
      "category": "Электроника",
      "name": "Ноутбук",
      "price": 1200,
      "description": "Современный ноутбук для работы и развлечений.",
      "color": "серый",
      "year": 2023
  },
  {
      "id": 7,
      "category": "Электроника",
      "name": "Смартфон",
      "price": 600,
      "description": "Стильный смартфон с передовыми технологиями.",
      "color": "черный",
      "year": 2022
  },
  {
      "id": 8,
      "category": "Электроника",
      "name": "Телевизор",
      "price": 1000,
      "description": "Широкий телевизор с высоким разрешением для качественного просмотра.",
      "color": "черный",
      "year": 2021
  },
  {
      "id": 9,
      "category": "Электроника",
      "name": "Наушники",
      "price": 100,
      "description": "Качественные наушники для наслаждения музыкой без помех.",
      "color": "черный",
      "year": 2020
  },
  {
      "id": 10,
      "category": "Электроника",
      "name": "Планшет",
      "price": 400,
      "description": "Легкий и удобный планшет для чтения и просмотра контента.",
      "color": "серый",
      "year": 2022
  },
  {
      "id": 11,
      "category": "Электроника",
      "name": "Мышка",
      "price": 20,
      "description": "Удобная и практичная мышка для вашего компьютера.",
      color: "черный",
      year: 2021
  },
  {
      "id": 12,
      "category": "Электротехника",
      "name": "Робот-пылесос",
      "price": 1200,
      "description": "Практичный помощник для уборки вашего дома.",
      "color": "белый",
      "year": 2020
  },
  {
      "id": 13,
      "category": "Электротехника",
      "name": "Кофемашина",
      "price": 900,
      "description": "Прекрасная находка для любителей взбодриться.",
      "color": "черный",
      "year": 2022
  },
  {
      "id": 14,
      "category": "Электротехника",
      "name": "Фен",
      "price": 400,
      "description": "Качественный и негромкий фен для быстрой сушки волос.",
      "color": "розовый",
      "year": 2021
  },
  {
      "id": 15,
      "category": "Электроника",
      "name": "Игровая приставка",
      "price": 150,
      "description": "Для вашего весёлого времяпрепровождения.",
      "color": "черный",
      "year": 2020
  },
  {
      "id": 16,
      "category": "Электроника",
      "name": "Электросамокат",
      "price": 1300,
      "description": "Удобное и компактное средство для быстрого передвижения по городу.",
      "color": "серый",
      "year": 2022
  },
  {
      "id": 17,
      "category": "Электротехника",
      "name": "Мультиварка",
      "price": 500,
      "description": "Практичный помощник на вашей кухне.",
      "color": "белый",
      "year": 2021
  },
  {
      "id": 18,
      "category": "Электротехника",
      "name": "Отпариватель",
      "price": 80,
      "description": "Отличная замена утюгу, для быстрого разглаживания вашей одежды.",
      "color": "серый",
      "year": 2020
  },
  {
      "id": 19,
      "category": "Электротехника",
      "name": "Швейная машинка",
      "price": 250,
      "description": "Отличный помощник для в создании стильной одежды и шитья.",
      "color": "черный",
      "year": 2022
  },
  {
      "id": 20,
      "category": "Электроника",
      "name": "Принтер",
      "price": 400,
      "description": "Превосходное средство для качественной печати ваших фото.",
      "color": "белый",
      "year": 2021
  }
];


let cartItems = [];

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/api/products', (req, res) => {
    if (req.query.categories) {
        const selectedCategories = req.query.categories.split(',').map(category => category.trim().toLowerCase());
        const filteredProducts = products.filter(product => selectedCategories.includes(product.category.toLowerCase()));
        res.json(filteredProducts);
    } else {
        res.json(products);
    }
});

app.get('/api/cart', (req, res) => {
    res.json(cartItems);
});

app.post('/api/cart', (req, res) => {
    const newItem = req.body;

    const existingItem = cartItems.find(item => item.id === newItem.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        newItem.quantity = 1;
        cartItems.push(newItem);
    }

    res.json(cartItems);
});

app.post('/api/cart/remove', (req, res) => {
  const itemIdToRemove = req.body.id;

  const itemIndex = cartItems.findIndex(item => item.id === itemIdToRemove);

  if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      res.json(cartItems);
  } else {
      res.status(404).json({ error: 'Товар не найден в корзине' });
  }
});
app.post('/api/cart/clear', (req, res) => {
  cartItems = [];
  res.json(cartItems);
});

let users = [];

/*// Эндпоинт для регистрации нового пользователя
app.post('/api/register', (req, res) => {
    const newUser = req.body;
    const existingUser = users.find(user => user.username === newUser.username);
    if (existingUser) {
        res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
    } else {
        users.push(newUser);
        res.json(newUser);
    }
});*/

// не получилось 
/*app.get('/api/products/filter', (req, res) => {
  const { color, year } = req.query;
  let filteredProducts = [...products]; 
  if (color) {
      filteredProducts = filteredProducts.filter(product => product.color === color);
  }
  if (year) {
      filteredProducts = filteredProducts.filter(product => product.year === year);
  }
  res.json(filteredProducts);
});*/

app.get('/product-details', (req, res) => {
  const productId = req.query.id;
  const product = products.find(item => item.id.toString() === productId);
  if (product) {
      res.sendFile(path.join(__dirname, 'public', 'product-details.html'), {
          product: {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,
              year: product.year,
              color: product.color,
          },
      });
  } else {
      res.status(404).send('Товар не найден');
  }
});



app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
//Добавить:
//Добавить фильтрацию(по цвету, году выпуска, ...) не вышло