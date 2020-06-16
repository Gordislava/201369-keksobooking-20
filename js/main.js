'use strict';

var AMOUNT_ITEMS = 8;
var PIN_WIDTN = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_TIP_HEIGHT = 22;
var MAIN_PIN_TIP_WIDTH = 10;
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
  'Чулан в офисе аниме-студии. Творческая тусовка - есть. Света, воды и покоя - нет'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TYPES_VALUE = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало'
];

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
// map.classList.remove('map--faded');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var siblingMapElement = document.querySelector('.map__filters-container');
var getRandomInt = function (min, max) {map.
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
      'address': coordinateX + ', ' + coordinateY,
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

// перенести отрисовку объявлений в функцию активации карты
// renderPins();


// создание шаблона для фотографии

var createPhotoTemplate = function (src) {
  var photoTemplate = document.createElement('img');
  photoTemplate.src = src;
  photoTemplate.alt = 'Фотография жилья';
  photoTemplate.style.width = 45 + 'px';
  photoTemplate.style.height = 40 + 'px';
  photoTemplate.classList.add('popup__photo');

  return photoTemplate;
};


// создание списка фотографий

var fillPhotoList = function (container, array) {
  container.innerHTML = '';
  if (array.length > 0) {
    for (var i = 0; i < array.length; i++) {
      var containerChild = createPhotoTemplate(array[i]);
      container.appendChild(containerChild);
    }
  } else {
    container.remove();
  }

  return (containerChild);
};

// перевод значение Тип в нужный вид

var fillTypeString = function (element, indexArray, valueArray) {
  return (valueArray[indexArray.indexOf(element)]);
};


// создание списка фич

var fillFeaturesList = function (container, array) {
  container.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    var element = document.createElement('li');
    element.classList.add('popup__feature');
    element.classList.add('popup__feature--' + array[i]);
    element.textContent = array[i];
    container.appendChild(element);
  }
  return container;
};

// наполнение карточки информацией

var fillCard = function (cardItem) {
  var singleCard = templateCard.cloneNode(true);
  var cardAvatar = singleCard.querySelector('.popup__avatar');
  var cardTitle = singleCard.querySelector('.popup__title');
  var cardAddress = singleCard.querySelector('.popup__text--address');
  var cardPrice = singleCard.querySelector('.popup__text--price');
  var cardType = singleCard.querySelector('.popup__type');
  var cardCapacity = singleCard.querySelector('.popup__text--capacity');
  var cardTime = singleCard.querySelector('.popup__text--time');
  var cardDescription = singleCard.querySelector('.popup__description');
  var cardFeatures = singleCard.querySelector('.popup__features');
  var cardPhotos = singleCard.querySelector('.popup__photos');

  cardAvatar.src = cardItem.author.avatar;
  cardTitle.textContent = cardItem.offer.title;
  cardAddress.textContent = cardItem.offer.address;
  cardPrice.textContent = cardItem.offer.price + ' ₽' + ' /ночь';
  cardType.textContent = fillTypeString(cardItem.offer.type, TYPES, TYPES_VALUE);
  cardCapacity.textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
  cardDescription.textContent = cardItem.offer.description;

  fillFeaturesList(cardFeatures, cardItem.offer.features);

  fillPhotoList(cardPhotos, cardItem.offer.photos);

  return singleCard;
};

// отрисовка карточки

var renderCard = function (template, siblingNext) {
  map.insertBefore(template, siblingNext);
};

// вызов заккоментирован до лучших времен
// renderCard(fillCard(items[0]), siblingMapElement);


// блокировка форм на странице
var disabledElement = function (element) {
  element.setAttribute('disabled', 'true');
};

var disabledMultipleElement = function (arrayElements) {
  for (var i = 0; i < arrayElements.length; i++) {
    disabledElement(arrayElements[i]);
  }
  return arrayElements;
};

var filterSelects = document.querySelectorAll('select');
var formFieldsets = document.querySelectorAll('fieldset');


var mainPin = document.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');


var selectRoom = document.querySelector('#room_number');
var selectCapacity = document.querySelector('#capacity');

var activatedForm = function (arrayElements) {
  for (var i = 0; i < arrayElements.length; i++) {
    arrayElements[i].removeAttribute('disabled');
  }
};

// поиск координат центра метки
var setMainPinAddressInactive = function () {
  var locationX = Math.round(MAIN_PIN_WIDTH / 2 + mainPin.offsetLeft);
  var locationY = Math.round(MAIN_PIN_HEIGHT / 2 + mainPin.offsetTop);
  addressInput.value = locationX + ', ' + locationY;

};

// поиск координат кончика метки
var setMainPinAddress = function () {
  var locationX = Math.round(MAIN_PIN_WIDTH / 2 + mainPin.offsetLeft + (MAIN_PIN_TIP_WIDTH / 2));
  var locationY = Math.round(MAIN_PIN_HEIGHT + mainPin.offsetTop + MAIN_PIN_TIP_HEIGHT);
  addressInput.value = locationX + ', ' + locationY;

};

// блокировка выбора кол-ва гостей на старте
var disabledCapasityOptions = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'true');
  }
};

// блокировка страницы на старте
var isPageInactive = function () {
  disabledMultipleElement(filterSelects);
  disabledMultipleElement(formFieldsets);
  setMainPinAddressInactive();
};

isPageInactive();

// разблокирование страницы

var startActiveState = function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  renderPins();
  activatedForm(filterSelects);
  activatedForm(formFieldsets);
  setMainPinAddress();
  renderCard(fillCard(items[0]), siblingMapElement);
  disabledCapasityOptions(selectCapacity);
};


// ограничение диапазона выбора кол-ва гостей при смене комнат
var setCapasityOptions = function () {
  if (selectRoom.options.selectedIndex === 1) {
    selectCapacity.options[2].disabled = false;
    selectCapacity.options[1].disabled = false;
    selectCapacity.options[0].disabled = true;
    selectCapacity.options[3].disabled = true;
  } else if (selectRoom.options.selectedIndex === 2) {
    selectCapacity.options[2].disabled = false;
    selectCapacity.options[1].disabled = false;
    selectCapacity.options[0].disabled = false;
    selectCapacity.options[3].disabled = true;
  } else if (selectRoom.options.selectedIndex === 3) {
    selectCapacity.options[3].disabled = false;
    selectCapacity.options[2].disabled = true;
    selectCapacity.options[1].disabled = true;
    selectCapacity.options[0].disabled = true;
  } else if (selectRoom.options.selectedIndex === 0) {
    selectCapacity.options[3].disabled = true;
    selectCapacity.options[2].disabled = false;
    selectCapacity.options[1].disabled = true;
    selectCapacity.options[0].disabled = true;
  }
};


mainPin.addEventListener('mousedown', startActiveState);
mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    startActiveState();
  }
});
selectRoom.addEventListener('change', setCapasityOptions);

