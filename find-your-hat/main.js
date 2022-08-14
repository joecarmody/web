const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let hatFound = false;
let fellInHole = false;
let outOfBounds = false;

class Field {
    constructor(field) {
        this.field = field;
        this.height = field.length - 1;
        this.width = field[0].length;
    }

    print() {
        this.field.forEach((arr) => {
            arr.forEach((el) => process.stdout.write(el));
            console.log();
        });
    }

    at(position) {
        return this.field[this.height - position[1]][position[0]];
    }

    drawPathCharacter(position) {
        this.field[this.height - position[1]][position[0]] = pathCharacter;
    }

    addRandomHole() {
        const holePos = [Math.floor(Math.random()*fieldWidth), Math.floor(Math.random()*fieldHeight)];
        this.field[this.height - holePos[1]][holePos[0]] = hole;
    }

    static generateField(height, width, percentage, playerPos) {
        let result = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                if (Math.floor(Math.random()*100+1) < percentage) {
                    row.push(hole);
                } else {
                    row.push(fieldCharacter);
                }
            }
            result.push(row);
        }
        result[playerPos[1]][playerPos[0]] = "*";
        result[Math.floor(Math.random()*height)][Math.floor(Math.random()*width)] = "^";
        return result;
    }
}

class Player {
    constructor(position = [0, 0], field) {
        this.position = position;
        this.field = field;
    }

    moveResult() {
        if (this.field.at(this.position) == hole) {
            fellInHole = true;
        } else if (this.field.at(this.position) == hat) {
            this.field.drawPathCharacter(this.position);
            this.field.print();
            hatFound = true;
        } else {
            this.field.drawPathCharacter(this.position);
        }
    }

    move(direction) {
        let [x, y] = this.position;
        switch (direction) {
            case "u":
                if (y + 1 > this.field.height) {
                    outOfBounds = true;
                } else {
                    this.position = [x, y + 1];
                    this.moveResult();
                }
                break;
             
            case "d":
                if (y - 1 < 0) {
                    outOfBounds = true;
                } else {
                    this.position = [x, y - 1];
                    this.moveResult();
                }
                break;

            case "r":
                if (x + 1 > this.field.width - 1) {
                    outOfBounds = true;
                } else {
                    this.position = [x + 1, y];
                    this.moveResult();
                }
                break;

            case "l":
                if (x - 1 < 0) {
                    outOfBounds = true;
                } else {
                    this.position = [x - 1, y];
                    this.moveResult();
                }
                break;

            default:
                break;
        }
    }
}

const [fieldHeight, fieldWidth] = [25, 50];
const playerPos = [Math.floor(Math.random()*fieldWidth), Math.floor(Math.random()*fieldHeight)];
const field = new Field(Field.generateField(fieldHeight, fieldWidth, 20, playerPos));
const player = new Player([playerPos[0], fieldHeight - playerPos[1] - 1], field);
const hardMode = false;

while (!(hatFound || fellInHole || outOfBounds)) {
    field.print();
    const input = prompt('Move:');
    player.move(input);
    if (hardMode) {
        field.addRandomHole();
    }
}

if (hatFound) {
    console.log('You found your hat!');
}
if (fellInHole) {
    console.log('You fell down a hole!');
}
if (outOfBounds) {
    console.log('Out of bounds!');
}