String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

randomCake = function() {
  var cake1 = ['apple', 'cherry', 'banana', 'lemon', 'strawberry', 'raisin', 'carrot', 'coffee', 'pumpkin', 'hash', 'coconut', 'christmas', 'butter', 'angel', 'caramel', 'chocolate'];
  var cake2 = ['cake', 'cake', 'cake', 'cake', 'cake', 'slice', 'muffin', 'sponge', 'pie', 'brownie', 'flapjack', 'roll'];
  return cake1[Math.floor(Math.random()*cake1.length)] + ' ' + cake2[Math.floor(Math.random()*cake2.length)];
}
