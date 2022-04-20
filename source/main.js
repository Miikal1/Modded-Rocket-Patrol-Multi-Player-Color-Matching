console.log("Hello from main.js");

let config = {
    type: Phaser.Canvas,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};

let keyA, keyD, keyW, keyLEFT, keyRIGHT, keyUP, keyR;

let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

let highScore = 0;

let game = new Phaser.Game(config);
