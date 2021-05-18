'use strict';
const uudid = require('uuid').v4;
class Clothe {
  constructor() {
    this.clotheArray = [];
  }

  create(object) {
    const record = {
      id: uudid(),
      data: object,
    };
    this.clotheArray.push(record);
    return record;
  }
  read(id) {
    if (id) {
      return this.clotheArray.find((record) => record.id === id);
    } else {
      return this.clotheArray;
    }
  }

  update(id, object) {
    for (let i = 0; i < this.clotheArray.length; i++) {
      if (this.clotheArray[i].id === id) {
        this.clotheArray[i].data = object;
        return this.clotheArray[i];
      }
    }
  }

  delete(id) {
    this.clotheArray = this.clotheArray.filter((person) => person.id !== id);
    return { message: null };
  }
}

module.exports = Clothe;
