console.log("Hello from main.js");

// Michael Jasper, Modded Rocket Patrol: Multi-Player Color Matching, 4-19-2022, completed in 5 days

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

// 5 points - Track a high score that persists across scenes and display it in the UI
// 5 points - Implement the speed increase that happens after 30 seconds in the original game
// 10 points - Display the time remaining (in seconds) on the screen
// 10 popints - Create a new title screen (e.g., new artwork, typography, layout)
// 20 points - Create new artwork for all of the in-game assets (rocket, spaceships, explosion)
// 20 points - Implement a new timing/scoring mechanism that adds time to the clock for successful hits
// 30 points - Implement a simultaneous two-player mode
// 25 points - Have the players only score points if they hit spaceships of a matching color of their rocket, which changes each time its fired

// I did ask for plenty of help on discord and recieved from class mates and TAs