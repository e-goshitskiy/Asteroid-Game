/**
 * Created by Марина on 01.10.2017.
 */


let Asteroids = function (app)
{
};

Asteroids.prototype = new AbstractCollection;





Asteroids.instance = function ()
{
    if (!Asteroids._instance)
    {
        Asteroids._instance = new Asteroids;
    }

    return Asteroids._instance;
};