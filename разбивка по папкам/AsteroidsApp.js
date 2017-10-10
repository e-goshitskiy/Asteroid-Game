/**
 * Created by Марина on 01.10.2017.
 */


let AsteroidsApp = function ()
{
    // точка входа в приложение ...

    this.images = new Images;

    this.shells = new Shells;

    this.explosions = new Explosions;


    let asteroids = Asteroids.instance();
    asteroids.items.push();
    asteroids.move();



    let images = Images.instance();
    images.asteroid1;
};

