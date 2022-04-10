const { FLOWBASEANNOTATION_TYPES } = require("@babel/types");
const Potion = require("./potion");
const Character = require("./character");

class Player extends Character {
  constructor(name = "") {
      super(name);

    this.inventory = [new Potion("health"), new Potion()];
  }

  getStats() {
    return {
      potions: this.inventory.length,
      health: this.health,
      strength: this.strength,
      agility: this.agility,
    };
  }

  getInventory() {
    if (this.inventory.length) {
      return this.inventory;
    } else {
      return false;
    }
  }

  addPotion(potion) {
    this.inventory.push(potion);
  }

  usePotion(index) {
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
      case "agility":
        this.agility += potion.value;
        break;
      case "health":
        this.health += potion.value;
        break;
      case "strength":
        this.strenght += potion.value;
        break;
    }
  }
}
module.exports = Player;
