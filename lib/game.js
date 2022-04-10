const inquirer = require("inquirer");
const ListPrompt = require("inquirer/lib/prompts/list");
const Enemy = require("../lib/enemy");
const Player = require("../lib/player");

function Game() {
  this.roundNumer = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.intializeGame = function () {
  this.enemies.push(new Enemy("goblin", "sword"));
  this.enemies.push(new Enemy("orc", "Lucille the vampire bat"));
  this.enemies.push(new Enemy("zombie", "brain-hungry teeth"));

  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // Destructure name from the prompt objectFF
    .then(({ name }) => {
      this.player = new Player(name);
      // initialize fight sequence
      this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function () {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  }
  false;

  console.log("Your stats are as follows:");
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());
  this.battle();
};

Game.prototype.battle = function() {
  if (this.isPlayerTurn) {
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use Potion"]
      })
      .then(({ action }) => {
        if (action === "Use Potion") {
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return;
          }

          inquirer
            .prompt({
              type: "list",
              message: "Which potion would you like to use?",
              name: "action",
              choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
            })
            .then(({ action }) => {
              const potionDetails = action.split(': ');

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion.`);
            });
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage)

          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
}

module.exports = Game;
