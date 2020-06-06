'use strict';
// eslint-disable-next-line strict

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var avatarValue = Math.floor(Math.random() * avatars.length);

var price = {
  min: 1,
  max: 1000
};

var rooms = {
  min: 1,
  max: 10
};

var guests = {
  min: 1,
  max: 30
};

var time = ['12:00', '13:00', '14:00'];

var currentTime = Math.floor(Math.random() * time.length);
var currentTimeOut = Math.floor(Math.random() * time.length);


var mapPins = document.querySelector('.map__pins');

var locationY = {
  min: 130,
  max: 630
};

var locationX = {
  min: 0,
  max: mapPins.offsetWidth
};

// eslint-disable-next-line no-unused-vars
function createItem() {

  var item = {
    'author': {
      'avatar': avatars[Math.floor(Math.random() * avatars.length)],
    },
    'offer': {
      'title': 1,
      'address': 1,
      'price': getRandomInt(price.min, price.max),
      'type': 1,
      'rooms': getRandomInt(rooms.min, rooms.max),
      'guests': getRandomInt(guests.min, guests.max),
      'checkin': time[Math.floor(Math.random() * time.length)],
      'checkout': time[Math.floor(Math.random() * time.length)],
      'features': 1,
      'description': 1,
      'photos': 1
    },
    'location': {
      x: getRandomInt(locationX.min, locationX.max),
      y: getRandomInt(locationY.min, locationY.max),
    }
  };

  return item;
};

// create array
function createItemsArray(amountItem) {
  var items = [];
  for (var i = 0; i < amountItem; i++) {
    items[i] = createItem();
  }
  return items;
}

var items = createItemsArray(8);


// тест вставки через шаблон
// убираем класс у .map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

for (var i = 0; i < items.length; i++) {
  var element = templatePin.cloneNode(true);
  templatePin.style.left = items[i].location.x + 'px';
  templatePin.style.top = items[i].location.y + 'px';
  element.querySelector('img').src = items[i].author.avatar;
  mapPins.appendChild(element);
}


