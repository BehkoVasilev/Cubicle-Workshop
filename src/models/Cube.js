const db = require('../db.json');
const fs = require('fs/promises');
const path = require('path');

class Cube {
    constructor(name, description, imageUrl, difficultyLevel){
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    };

    // async save(cube) {
    //     this.id = db.cubes[db.cubes.length-1].id + 1;
    //     db.cubes.push(cube);
    //     const jsonData = JSON.stringify(db, null, 2);
    //     await fs.writeFile(path.resolve(__dirname, '../db.json'), jsonData);
    // };
    async save() {
        this.id = db.cubes[db.cubes.length-1].id + 1;
        db.cubes.push(this);
        const jsonData = JSON.stringify(db, null, 2);
        await fs.writeFile(path.resolve(__dirname, '../db.json'), jsonData);
    };

}

module.exports = Cube;