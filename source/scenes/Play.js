class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    // please work 1

    preload(){
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocketRed', 'assets/rocketRed.png');
        this.load.image('rocketBlue', 'assets/rocketBlue.png');
        this.load.image('rocketYellow', 'assets/rocketYellow.png');
        this.missiles = ['rocketRed', 'rocketBlue', 'rocketYellow'];
        this.load.image('spaceshipRed', 'assets/spaceshipRed.png');
        this.load.image('spaceshipBlue', 'assets/spaceshipBlue.png');
        this.load.image('spaceshipYellow', 'assets/spaceshipYellow.png');
        this.ships = ['spaceshipRed', 'spaceshipBlue', 'spaceshipYellow'];
        this.load.spritesheet('explosion', 'assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.bg = this.add.tileSprite(0,0, game.config.width, game.config.height, 'starfield').setOrigin(0,0);

        let typeP1 = Math.floor((Math.random() * 3));
        let typeP2 = Math.floor((Math.random() * 3));

        this.p1Rocket = new Rocket(this, 150, 431, this.missiles[typeP1], typeP1).setOrigin(0.5,0);
        this.p1Rocket.reset();
        this.p2Rocket = new Rocket(this, 450, 431, this.missiles[typeP2], typeP2).setOrigin(0.5,0);
        this.p2Rocket.reset();

        let typeA = Math.floor((Math.random() * 3));
        let typeB = Math.floor((Math.random() * 3));
        let typeC = Math.floor((Math.random() * 3));


        this.shipA = new Spaceship(this, 300, 300, this.ships[typeA], typeA);
        this.shipB = new Spaceship(this, 400, 150, this.ships[typeB], typeB);
        this.shipC = new Spaceship(this, 100, 200, this.ships[typeC], typeC);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, game.config.height, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        
        this.p1Score = 0;
        this.p2Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
             },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(460, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
    
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.speedUp = false;
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        console.log(this.time);
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > this.p2Score){
                this.add.text(game.config.width/2, game.config.height/2, 'Player 1 Wins!!!', scoreConfig).setOrigin(0.5);
            }
            if (this.p1Score < this.p2Score){
                this.add.text(game.config.width/2, game.config.height/2, 'Player 2 Wins!!!', scoreConfig).setOrigin(0.5);
            }
            if (this.p1Score == this.p2Score){
                this.add.text(game.config.width/2, game.config.height/2, 'Its a TIE!!!', scoreConfig).setOrigin(0.5);
            }
            if (this.p1Score > highScore){
                highScore = this.p1Score;
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'New Highscore: ' + highScore, scoreConfig).setOrigin(0.5);
            }
            if (this.p2Score > highScore){
                highScore = this.p2Score;
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'New Highscore: ' + highScore, scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'Press (R) to Restart or LEFT for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true
            game.settings.spaceshipSpeed /= 2;
        }, null, this);

        this.topScore = this.add.text(game.config.width/2, borderUISize + borderPadding*2, highScore, scoreConfig);
        this.countdown = this.add.text((game.config.width/2)-100, borderUISize + borderPadding*2, Math.round(this.clock.getRemainingSeconds()), scoreConfig);
    }

    update() {
        
         // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.speedUp = false;
            console.log(game.settings.spaceshipSpeed);
            console.log(this.speedUp);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }

        this.bg.tilePositionX -= 4;
        const movenmentSpeed = 4;
        
        if (((game.settings.gameTimer == 60000 && this.clock.getRemaining() <= 30000) || (game.settings.gameTimer == 45000 && this.clock.getRemaining() <= 15000)) && !this.speedUp && !this.gameOver){
            game.settings.spaceshipSpeed *= 2;
            this.speedUp = true;
        }

        this.countdown.text = Math.round(this.clock.getRemainingSeconds());

        if(keyLEFT.isDown) {
            this.p2Rocket.x -= movenmentSpeed;
        }
        if(keyRIGHT.isDown) {
            this.p2Rocket.x += movenmentSpeed;
        }
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.p2Rocket.firing = true;
            this.sound.play('sfx_rocket');;
        }

        if(keyA.isDown) {
            this.p1Rocket.x -= movenmentSpeed;
        }
        if(keyD.isDown) {
            this.p1Rocket.x += movenmentSpeed;
        }
        if(Phaser.Input.Keyboard.JustDown(keyW)){
            this.p1Rocket.firing = true;
            this.sound.play('sfx_rocket');;
        }

        if (!this.gameOver) {               
            this.p1Rocket.update(); 
            this.p2Rocket.update();        // update rocket sprite
            this.shipA.update();           // update spaceships (x3)
            this.shipB.update();
            this.shipC.update();
        } 

        if(this.checkCollision(this.p1Rocket, this.shipA)) {
            console.log('kaboom ship A');
            this.p1Rocket.reset();
            this.shipExplode(this.shipA);
            this.p1Score += this.shipA.pointValue;
            this.scoreLeft.text = this.p1Score;
          }
          if (this.checkCollision(this.p1Rocket, this.shipB)) {
            console.log('kaboom ship B');
            this.p1Rocket.reset();
            this.shipExplode(this.shipB);
            this.p1Score += this.shipB.pointValue;
            this.scoreLeft.text = this.p1Score;
          }
          if (this.checkCollision(this.p1Rocket, this.shipC)) {
            console.log('kaboom ship C');
            this.p1Rocket.reset();
            this.shipExplode(this.shipC);
            this.p1Score += this.shipC.pointValue;
            this.scoreLeft.text = this.p1Score;
          }

          if(this.checkCollision(this.p2Rocket, this.shipA)) {
            console.log('kaboom ship A');
            this.p2Rocket.reset();
            this.shipExplode(this.shipA);
            this.p2Score += this.shipA.pointValue;
            this.scoreRight.text = this.p2Score;
          }
          if (this.checkCollision(this.p2Rocket, this.shipB)) {
            console.log('kaboom ship B');
            this.p2Rocket.reset();
            this.shipExplode(this.shipB);
            this.p2Score += this.shipB.pointValue;
            this.scoreRight.text = this.p2Score;
          }
          if (this.checkCollision(this.p2Rocket, this.shipC)) {
            console.log('kaboom ship C');
            this.p2Rocket.reset();
            this.shipExplode(this.shipC);
            this.p2Score += this.shipC.pointValue;
            this.scoreRight.text = this.p2Score;
          }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if ((rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) 
            && rocket.type == ship.type) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });      
        this.sound.play('sfx_explosion');
        this.clock.delay += 3000;
      }

}