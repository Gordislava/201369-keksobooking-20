'use strict';
// eslint-disable-next-line strict
var AMOUNT_ITEMS = 8;
var PIN_WIDTN = 50;
var PIN_HEIGHT = 70;
var REGISTRATION_TIME = ['12:00', '13:00', '14:00'];
var TITLES = [
  'Выгодное предложение',
  'Только для состоятельных путешественников',
  'Идеально для пар',
  '5 звезд за локацию',
  'Бюджетно. Сурово. Доступно',
  'Hello Kitti на всех поверхностях. Только для фанатов!',
  'Это так дорого, что можешь даже не смотреть',
  'Деловой центр, 5 минут до достопримечательностей'
];
var DESCRIPTIONS = [
  'Хороший вариант для путешественников',
  'Пять звезд от бизнесменов со всего мира',
  'Спартанские условия, кружку для чая везите с собой. Зато дешево',
  'Атмосферно и няшно',
  'Роскошные хоромы для тех, кто хочет почувствовать себя императором',
  'Простой вариант без претензий, но в центре Токио',
  'Идеальное место для ценителей сезона цветения сакуры',
  'Последний вариант и у меня кончилась фантазия'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var priceLimits = {
  MIN: 1,
  MAX: 1000
};
var roomLimits = {
  MIN: 1,
  MAX: 10
};
var guestLimits = {
  MIN: 1,
  MAX: 30
};
var locationLimitsY = {
  MIN: 130,
  MAX: 630
};

var mapPins = document.querySelector('.map__pins');

var locationLimitsX = {
  MIN: 0,
  MAX: mapPins.offsetWidth
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (array) {
  var randomArrayValue = Math.floor(Math.random() * array.length);
  return array[randomArrayValue];
};

var createRandomArray = function (array) {
  var randomArray = [];
  var j = 0;
  for (var i = 0; i < array.length; i++) {
    if (getRandomInt(0, 1)) {
      randomArray[j] = array[i];
      j++;
    }
  }
  return randomArray;
};

// create array of avatars
var createAvatarsArray = function () {
  var avatars = [];
  for (var i = 0; i < AMOUNT_ITEMS; i++) {
    avatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return avatars;
};

var avatars = createAvatarsArray(AMOUNT_ITEMS);

// create one item
var createItem = function () {
  var coordinateX = getRandomInt(locationLimitsX.MIN, locationLimitsX.MAX);
  var coordinateY = getRandomInt(locationLimitsY.MIN, locationLimitsY.MAX);
  var item = {
    'author': {
      'avatar': avatars.splice((getRandomInt(0, (avatars.length - 1))), 1),

    },
    'offer': {
      'title': getRandomValue(TITLES),
      'address': coordinateX + ',' + coordinateY,
      'price': getRandomInt(priceLimits.MIN, priceLimits.MAX),
      'type': getRandomValue(TYPES),
      'rooms': getRandomInt(roomLimits.MIN, roomLimits.MAX),
      'guests': getRandomInt(guestLimits.MIN, guestLimits.MAX),
      'checkin': getRandomValue(REGISTRATION_TIME),
      'checkout': getRandomValue(REGISTRATION_TIME),
      'features': createRandomArray(FEATURES),
      'description': getRandomValue(DESCRIPTIONS),
      'photos': createRandomArray(PHOTOS)
    },
    'location': {
      x: coordinateX,
      y: coordinateY,
    }
  };

  return item;
};

// create array of items
var createItemsArray = function () {
  var items = [];
  for (var i = 0; i < AMOUNT_ITEMS; i++) {
    items[i] = createItem();
  }
  return items;
};

var items = createItemsArray(AMOUNT_ITEMS);

// вставка через шаблон
var createPins = function () {
  var pins = [];
  for (var i = 0; i < items.length; i++) {
    pins[i] = templatePin.cloneNode(true);
  }
  return pins;
};

var pins = createPins();

var renderPins = function () {
  for (var i = 0; i < pins.length; i++) {
    var pin = pins[i];
    pin.style.left = items[i].location.x - PIN_WIDTN / 2 + 'px';
    pin.style.top = items[i].location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = items[i].author.avatar;
    pin.querySelector('img').alt = items[i].offer.title;
    mapPins.appendChild(pin);
  }
  return pin;
};

renderPins();


// записать данные, удалить элемент, если их нет
// var configurationInfo = function (nodeElement, myObject) {
//   if (!myObject) {
//     nodeElement.textContent = myObject;
//   } else {
//     nodeElement.remove();
//   }
//   return nodeElement;
// };


var renderCard = function (cardItem) {
  var singleCard = templateCard.cloneNode(true);
  singleCard.querySelector('.popup__avatar').src = cardItem.author.avatar;
  singleCard.querySelector('.popup__title').textContent = cardItem.offer.title;
  singleCard.querySelector('.popup__text--address').textContent = cardItem.offer.address;
  singleCard.querySelector('.popup__text--price').textContent = cardItem.offer.price;
  singleCard.querySelector('.popup__type').textContent = cardItem.offer.type;
  singleCard.querySelector('.popup__text--capacity').textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + ' гостей';
  singleCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
  singleCard.querySelector('.popup__description').textContent = cardItem.offer.description;
  var fillFeaturesList = function () {

    var featuresList = singleCard.querySelector('.popup__features');
    var featuresElements = featuresList.querySelectorAll('.popup__feature');
    for (var i = 0; i < featuresElements.length; i++) {
      for (var j = 0; j < cardItem.offer.features.length; j++) {
        var featureClass = 'popup__feature--' + cardItem.offer.features[j];
        if (featuresElements[i].classList.contains(featureClass)) {
          featuresElements[i].textContent = cardItem.offer.features[j];
        }
      }
      if (!featuresElements[i].textContent) {
        featuresElements[i].remove();
      }
    }
    return featuresElements[i];
  };

  fillFeaturesList();


  var createPhotoTemplate = function (src) {
    var photoTemplate = document.createElement('img');
    photoTemplate.src = src;
    photoTemplate.alt = 'Фотография жилья';
    photoTemplate.style.width = 45 + 'px';
    photoTemplate.style.height = 40 + 'px';
    photoTemplate.classList.add('popup__photo');

    return photoTemplate;
  };


  var fillPhotoList = function (container, arrayItem) {
    var photoList = singleCard.querySelector('.popup__photos');
    photoList.innerHTML = '';

    for (var i = 0; i < cardItem.offer.photos.length; i++) {
      if (cardItem.offer.photos.length > 0) {
        var singlePhoto = createPhotoTemplate(cardItem.offer.photos[i]);
        photoList.appendChild(singlePhoto);
      } else {
        photoList.remove();
      }
    }
  };

  fillPhotoList(singleCard.querySelector('.popup__photos'), cardItem.offer.photos);

  return singleCard;
};

console.log(renderCard(items[0]));

