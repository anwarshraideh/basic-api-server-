'use strict';
const uudid = require('uuid').v4;
class Food {
  constructor() {
    this.foodArray = [];
  }

  create(object) {
    const record = {
      id: uudid(),
      data: object,
    };
    this.foodArray.push(record);
    return record;
  }
  read(id) {
    if (id) {
      return this.foodArray.find((record) => record.id === id);
    } else {
      return this.foodArray;
    }
  }

  update(id, object) {
    for (let i = 0; i < this.foodArray.length; i++) {
      if (this.foodArray[i].id === id) {
        this.foodArray[i].data = object;
        return this.foodArray[i];
      }
    }
  }

  delete(id) {
    this.foodArray = this.foodArray.filter((person) => person.id !== id);
    return { message: null };
  }
}

module.exports = Food;
