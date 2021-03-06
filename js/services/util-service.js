export const utilService = {
  saveToStorage,
  loadFromStorage,
  makeId,
  getRandomCol,
};

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function makeId(length = 5) {
  var txt = "e";
  var possible = "0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomCol() {
  console.log(Math.floor(Math.random() * 16777215).toString(16));
  return Math.floor(Math.random() * 16777215).toString(16);
}
