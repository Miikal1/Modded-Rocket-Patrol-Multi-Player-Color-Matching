class Rocket extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture, 0);
        this.missiles = ['rocketRed', 'rocketBlue', 'rocketYellow'];
        this.type = type;
        this.setScale(2);
        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        scene.add.existing(this);
        this.firing = false;
        this.sfxRocket = scene.sound.add('sfx_rocket')
    }

    update() {

        if(this.firing) {
            this.y -= 10;

            if (this.y < 0) {
                this.reset();
            }
        }
    }

    reset(){
        this.type = Math.floor((Math.random() * 3));
        this.setTexture(this.missiles[this.type]);
        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        this.y = 431;
        this.firing = false;
    }

}