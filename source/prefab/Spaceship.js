class Spaceship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, type){
        super(scene, x, y, texture, 0);
        this.ships = ['spaceshipRed', 'spaceshipBlue', 'spaceshipYellow'];
        this.type = type;
        scene.add.existing(this);
        this.pointValue = 10;
    }

    update() {
        this.x -= game.settings.spaceshipSpeed;
        if (this.x < 0) {
            this.type = Math.floor((Math.random() * 3));
            this.setTexture(this.ships[this.type]);
            this.x = game.config.width;
        }
    }

    reset() {
        this.type = Math.floor((Math.random() * 3));
        this.setTexture(this.ships[this.type]);
        this.x = game.config.width;
    }

}