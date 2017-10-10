"use strict";

window.addEventListener('load', function ()
    {
        let canvas = document.getElementById('game');
        let context = canvas.getContext('2d');


        // --------------------------------------------------------------------------------
        // изображения
        // --------------------------------------------------------------------------------


        let images = {};

        function initImages()
        {
            for (let i = 1; i <= 1; i++)
                images['background' + i] = loadImage('assets/backgrounds/' + i + '.png');
            for (let i = 1; i <= 1; i++)
                images['rocket' + i] = loadImage('assets/rocket/' + i + '.png');
            for (let i = 1; i <= 13; i++)
                images['splinter' + i] = loadImage('assets/splinters/' + i + '.png');
            for (let i = 1; i <= 6; i++)
                images['shell' + i] = loadImage('assets/shells/' + i + '.png');
            for (let i = 1; i <= 9; i++)
                images['explosion' + i] = loadImage('assets/explosion/' + i + '.png');
            for (let i = 1; i <= 13; i++)
                images['asteroid' + i] = loadImage('assets/asteroids/' + i + '.png');
            for (let i = 1; i <= 1; i++)
                images['ship' + i] = loadImage('assets/playerships/' + i + '.png');
        }

        function loadImage(url)
        {
            let image = new Image;
            image.src = url;
            return image;
        }


        initImages();


// --------------------------------------------------------------------------------
// набор звук
// --------------------------------------------------------------------------------

        function AbstractAudio()
        {
        }

        AbstractAudio.prototype.id = '';
        AbstractAudio.prototype.src = '';
        AbstractAudio.prototype.autoplay = 'autoplay';
        AbstractAudio.prototype.loop = '';

        function BackgroundAudio()
        {
        }

        BackgroundAudio.prototype = new AbstractAudio();
        BackgroundAudio.prototype.id = 'backgroundMusic';
        BackgroundAudio.prototype.loop = 'loop';


        // главный экран
        function HomeScreenAudio()
        {
        }

        HomeScreenAudio.prototype = new BackgroundAudio();
        HomeScreenAudio.prototype.src = "music/home_screen2.mp3";

        // игра вариант 1
        function Level1Audio()
        {
        }

        Level1Audio.prototype = new BackgroundAudio();
        Level1Audio.prototype.src = "music/level.mp3";


        // game over
        function GameOverAudio()
        {
        }

        GameOverAudio.prototype = new BackgroundAudio();
        GameOverAudio.prototype.src = "music/Game_Over.mp3";


        // --------------------------------------------------------------------------------
        // звук
        // --------------------------------------------------------------------------------

        function addAudio(typeAudio)
        {
            let curAudio = new typeAudio();
            let audio = document.createElement('audio');
            audio.setAttribute('id', curAudio.id);
            audio.setAttribute('src', curAudio.src);
            audio.setAttribute('autoplay', curAudio.autoplay);
            audio.setAttribute('loop', curAudio.loop);
            document.body.appendChild(audio);
            console.log(curAudio);
        }

        function changeAudioSrc(typeAudio)
        {
            let curAudio = new typeAudio();
            let audio = document.getElementById(curAudio.id);
            audio.setAttribute('src', curAudio.src);
            console.log(curAudio);
            console.log(audio);
        }


// --------------------------------------------------------------------------------
// набор бэкграундов
// --------------------------------------------------------------------------------

        // конструктор бэкграундов
        function AbstractBackground()
        {
        }

        AbstractBackground.prototype.x = 0;
        AbstractBackground.prototype.y1 = -605;
        AbstractBackground.prototype.y2 = 0;
        AbstractBackground.prototype.y3 = 605;
        AbstractBackground.prototype.image = images.background1;

        AbstractBackground.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x, this.y1);
            context.drawImage(this.image, this.x, this.y2);
            context.drawImage(this.image, this.x, this.y3);
        };

        AbstractBackground.prototype.move = function ()
        {
            this.y1 += 0.5;
            this.y2 += 0.5;
            this.y3 += 0.5;
            if (this.y1 >= 900)
                this.y1 -= 605 * 3;
            if (this.y2 >= 900)
                this.y2 -= 605 * 3;
            if (this.y3 >= 900)
                this.y3 -= 605 * 3;
        };


        // бэкграунд1
        function Background1()
        {
        }

        Background1.prototype = new AbstractBackground();


        //--------------------------------------------------------------------------------
        //бэкграунд
        //--------------------------------------------------------------------------------

        let backgrounds = [];

        function addBackground(typeBackground)
        {
            let background = new typeBackground();
            backgrounds.push(background);
        }

        function drawBackground()
        {
                let curBackground = backgrounds[0];
                curBackground.draw();
        }

        function moveBackground()
        {
                let curBackground = backgrounds[0];
                curBackground.move();
        }


// --------------------------------------------------------------------------------
// набор астероидов
// --------------------------------------------------------------------------------

        // function Asteroid()
        // {
        //     this.x = 0;
        //     this.y = 0;
        //     this.life = this.size;
        // }
        //
        // Asteroid.prototype.type = 'asteroid';
        // Asteroid.prototype.size = 20;
        // Asteroid.prototype.x = 650;
        // Asteroid.prototype.y = 100;
        // Asteroid.prototype.dx = 2;
        // Asteroid.prototype.dy = 10;
        // Asteroid.prototype.life = 0;
        // Asteroid.prototype.image = 'some image';
        // Asteroid.prototype.move = function ()
        // {
        //     this.x += this.dx;
        //     this.y += this.dy;
        // };
        //
        //
        // let asteroid1 = new Asteroid;

        // конструктор кораблей
        function AbstractFlyingObject()
        {
            this.life = this.size;
        }

        AbstractFlyingObject.prototype.type = '';
        AbstractFlyingObject.prototype.size = 0;
        AbstractFlyingObject.prototype.x = 0;
        AbstractFlyingObject.prototype.y = 0;
        AbstractFlyingObject.prototype.dx = 0;
        AbstractFlyingObject.prototype.dy = 0;
        AbstractFlyingObject.prototype.life = 0;
        AbstractFlyingObject.prototype.addScore = 0;
        AbstractFlyingObject.prototype.image = '';

        AbstractFlyingObject.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2, this.size, this.size);
        };

        AbstractFlyingObject.prototype.move = function ()
        {
            this.x += this.dx;
            this.y += this.dy;
        };


        // астероид 1
        function Asteroid1()
        {
            this.size = getRandomFloat(30, 120);
            this.x = getRandomFloat(-50, 650);
            this.y = getRandomFloat(-300, -50);
            this.dx = getRandomFloat(-1, 1);
            this.dy = getRandomFloat(1, 8);
            this.life = this.size;
            this.addScore = this.size / 4;
            this.image = images['asteroid' + Math.round(getRandomFloat(1, 13))];
        }

        Asteroid1.prototype = new AbstractFlyingObject();
        Asteroid1.prototype.type = 'asteroid';


        // осколок астероидa
        function Splinter(size, x, y, dx, dy)
        {
            this.size = size / 5;
            this.x = x;
            this.y = y;
            this.dx = dx + this.accelerateX;
            this.dy = dy + this.accelerateY;
            this.accelerateX = Math.round(getRandomFloat(-4, 4));
            this.accelerateY = Math.round(getRandomFloat(-4, 4));
            this.life = this.size;
            this.addScore = this.size / 2;
            this.image = images['splinter' + Math.round(getRandomFloat(1, 13))];

        }

        Splinter.prototype = new Asteroid1();
        Splinter.prototype.type = 'splinter';
        Splinter.prototype.accelerateX = 0;
        Splinter.prototype.accelerateY = 0;


        // --------------------------------------------------------------------------------
        // астероиды
        // --------------------------------------------------------------------------------


        let asteroids = [];

        let countAsteroid = 0;

        function addAsteroids(amount, typeAsteroid)
        {
            for (let i = 0; i < amount; i++)
            {
                let asteroid = new typeAsteroid();
                asteroids.push(asteroid);
            }
        }

        function drawAsteroids()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                asteroid.draw();
            }
        }

        function moveAsteroids()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                asteroid.move();
                if (asteroid.y >= 950 || asteroid.x < -90 || asteroid.x > 690)
                {
                    asteroids.splice(i, 1);
                    i--;
                    if (asteroid.type === 'asteroid')
                        addAsteroidAfterKill(1, Asteroid1);
                }
            }
        }

        function intervalAddAsteroid(numAddAsteroid, typeAsteroid, addTime)
        {
            setInterval(function ()
            {
                addAsteroidAfterKill(numAddAsteroid, typeAsteroid);
            }, addTime)
        }

        function addAsteroidAfterKill(numAddAsteroids, typeAsteroid)
        {
            if (gameState === 'game')
            {
                if (countAsteroid < maxAsteroidsInLevel)
                {
                    addAsteroids(numAddAsteroids, typeAsteroid);
                    countAsteroid++;
                }
                if (!asteroids.length)
                    gameState = 'postmission';
            }
        }


        // --------------------------------------------------------------------------------
        // осколки астероидов
        // --------------------------------------------------------------------------------
        // let splinters = [];
        //
        // function addSplinter(amount)
        // {
        //     for (let i = 0; i < amount; i++)
        //     {
        //         let splinter = new Splinter();
        //         splinters.push(splinter);
        //     }
        // }
        //
        // function drawSplinter()
        // {
        //     for (let i = 0; i < splinters.length; i++)
        //     {
        //         let splinter = splinters[i];
        //         context.drawImage(splinter.image, splinter.x - splinter.image.width / 2, splinter.y - splinter.image.width / 2/*, splinter.size, splinter.size*/);
        //     }
        //
        // }
        // function moveSplinter()
        // {
        //     for (let i = 0; i < splinters.length; i++)
        //     {
        //         let splinter = splinters[i];
        //         splinter.x += splinter.dx + splinter.accelerateX;
        //         splinter.y += splinter.dy + splinter.accelerateY;
        //         if (splinter.y >= 1000 || splinter.x < -90 || splinter.x > 690)
        //         {
        //             splinters.splice(i, 1);
        //             i--;
        //         }
        //     }
        // }


// --------------------------------------------------------------------------------
// набор кораблей
// --------------------------------------------------------------------------------

        let horisontalMovement = 0;

        // конструктор кораблей
        function AbstractShip()
        {
        }

        AbstractShip.prototype.size = 0;
        AbstractShip.prototype.horisontalGas = 0;
        AbstractShip.prototype.x = 0;
        AbstractShip.prototype.y = 0;
        AbstractShip.prototype.life = 0;
        AbstractShip.prototype.recoveryShieldHPerTick = 0.03;
        AbstractShip.prototype.image = images.ship1;

        AbstractShip.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
        };

        AbstractShip.prototype.move = function ()
        {
            if (horisontalMovement === -1)
            {
                this.horisontalGas += -1;
                if (this.horisontalGas < -10)
                    this.horisontalGas = -10;
            }
            else if (horisontalMovement === 1)
            {
                this.horisontalGas += 1;
                if (this.horisontalGas > 10)
                    this.horisontalGas = 10;
            }
            else
            {
                if (this.horisontalGas > 0)
                {
                    this.horisontalGas -= 0.5;
                    if (this.horisontalGas < 0)
                        this.horisontalGas = 0;
                }
                if (this.horisontalGas < 0)
                {
                    this.horisontalGas += 0.5;
                    if (this.horisontalGas > 0)
                        this.horisontalGas = 0;
                }
            }

            this.x += this.horisontalGas;

            if (this.x < 10)
                this.x = 10;

            if (this.x > 590)
                this.x = 590;
        };


        function PlayerShip()
        {
        }

        PlayerShip.prototype = new AbstractShip();
        PlayerShip.prototype.size = 50;
        PlayerShip.prototype.x = 300;
        PlayerShip.prototype.y = 850;
        PlayerShip.prototype.life = 500;

        function EnemyShip()
        {
        }

        EnemyShip.prototype = new AbstractShip();
        EnemyShip.prototype.size = 50;
        EnemyShip.prototype.x = 300;
        EnemyShip.prototype.y = 50;
        EnemyShip.prototype.life = 1000;


        // корабль игрока1
        function Playership1()
        {
        }

        Playership1.prototype = new PlayerShip();
        Playership1.prototype.image = images.ship1;


        // --------------------------------------------------------------------------------
        // корабль
        // --------------------------------------------------------------------------------

        let ships = [];

        function addShip(typeShip)
        {
            let ship = new typeShip();
            ships.push(ship);
        }

        function drawShips()
        {
            if (gameState !== 'gameOver')
            {
                for (let i = 0; i < ships.length; i++)
                {
                    let ship = ships[i];
                    ship.draw();
                }
            }
        }

        function moveShips()
        {
            for (let i = 0; i < ships.length; i++)
            {
                let ship = ships[i];
                ship.move();

                // ship.curentTime += tickTime;
            }
        }


// --------------------------------------------------------------------------------
// набор снарядов для выстрела
// --------------------------------------------------------------------------------

        // конструктор снаряда
        function AbstractShell()
        {
        }

        AbstractShell.prototype.x = 300;
        AbstractShell.prototype.y = 650;
        AbstractShell.prototype.dy = 15;
        AbstractShell.prototype.offsetY = 0;
        AbstractShell.prototype.timeoutFiringRate = 100;
        AbstractShell.prototype.power = 10;
        AbstractShell.prototype.image = images.shell1;

        AbstractShell.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y/* - this.image.height / 2*/);
        };
        AbstractShell.prototype.move = function ()
        {
            this.y -= this.dy;
        };


        // импульсный лазер (оружие 1)
        function PulseLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('PulseLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        PulseLaser.prototype = new AbstractShell;


        // мощный лазер (оружие 2)
        function PowerLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('PowerLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        PowerLaser.prototype = new AbstractShell;
        PowerLaser.prototype.dy = 10;
        PowerLaser.prototype.offsetY = 10;
        PowerLaser.prototype.timeoutFiringRate = 175;
        PowerLaser.prototype.power = 23;
        PowerLaser.prototype.image = images.shell2;

        // 2ой лазер (оружие 3)
        function GreenLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('GreenLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        GreenLaser.prototype = new AbstractShell;
        GreenLaser.prototype.dy = 15;
        GreenLaser.prototype.offsetY = 10;
        GreenLaser.prototype.timeoutFiringRate = 150;
        GreenLaser.prototype.power = 25;
        GreenLaser.prototype.image = images.shell3;

        // 3ой лазер (оружие 4)
        function BlueLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('BlueLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        BlueLaser.prototype = new AbstractShell;
        BlueLaser.prototype.dy = 12;
        BlueLaser.prototype.offsetY = 10;
        BlueLaser.prototype.timeoutFiringRate = 175;
        BlueLaser.prototype.power = 35;
        BlueLaser.prototype.image = images.shell4;

        // мини фотонная пушка (оружие 5)
        function MiniPhotonGun()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('MiniPhotonGun: ' + this.hpPerSec + ' hpPerSec');
        }

        MiniPhotonGun.prototype = new AbstractShell;
        MiniPhotonGun.prototype.dy = 35;
        MiniPhotonGun.prototype.offsetY = 45;
        MiniPhotonGun.prototype.timeoutFiringRate = 300;
        MiniPhotonGun.prototype.power = 120;
        MiniPhotonGun.prototype.image = images.shell5;


        // ракета (оружие 6)
        function Rocket()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('Rocket: ' + this.hpPerSec + ' hpPerSec');
        }

        Rocket.prototype = new AbstractShell;
        Rocket.prototype.dy = 5;
        Rocket.prototype.offsetY = 25;
        Rocket.prototype.timeoutFiringRate = 300;
        Rocket.prototype.power = 300;
        Rocket.prototype.image = images.rocket1;

        // мега фотонная пушка (оружие7)

        // function PhotonGun()
        // {
        // this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
        // console.log('PhotonGun ' + this.hpPerSec + ' hpPerSec');
        // }
        //
        // PhotonGun.prototype = new AbstractShell;
        // PhotonGun.prototype.speed = 0;
        // PhotonGun.prototype.timeoutFiringRate = 1000 / 60;
        // PhotonGun.prototype.power = 5;
        // PhotonGun.prototype.image = images.shell6;
        // PhotonGun.prototype.numberShell = 6;


        // --------------------------------------------------------------------------------
        // выстрелы
        // --------------------------------------------------------------------------------

        let shots = [];
        let curShell = PulseLaser;

        function checkCurShell()
        {
            if (score >= 40 && score < 100)
                changeCurShellTo(PowerLaser);
            else if (score >= 100 && score < 300)
                changeCurShellTo(GreenLaser);
            else if (score >= 300 && score < 400)
                changeCurShellTo(BlueLaser);
            else if (score >= 400 && score < 800)
                changeCurShellTo(MiniPhotonGun);
            else if (score >= 800)
                changeCurShellTo(Rocket);
            // if (score < 400)
            //     curShell = PulseLaser;
            // else if (score >= 400 && score < 1000)
            //     changeCurShellTo(PowerLaser);
            // else if (score >= 1000 && score < 1500)
            //     changeCurShellTo(GreenLaser);
            // else if (score >= 1500 && score < 2000)
            //     changeCurShellTo(BlueLaser);
            // else if (score >= 2000 && score < 3000)
            //     changeCurShellTo(MiniPhotonGun);
            // else if (score >= 3000)
            //     changeCurShellTo(Rocket);
        }

        function changeCurShellTo(newShell)
        {
            if (curShell === newShell)
                return;

            curShell = newShell;

            restartFiring();
        }

        function addShot()
        {
            checkCurShell();
            let shot = new curShell;
            let ship = ships[0];
            shot.x = ship.x;
            shot.y = ship.y - shot.offsetY;
            shots.push(shot);
        }

        function drawShots()
        {
            if (gameState !== 'gameOver')
            {
                for (let i = 0; i < shots.length; i++)
                {
                    let shot = shots[i];
                    shot.draw();
                }
            }
        }

        function moveShots()
        {
            for (let i = 0; i < shots.length; i++)
            {
                let shot = shots[i];
                shot.move();
                if (shot.y <= -60)
                {
                    shots.splice(i, 1);
                    i--;
                }
            }
        }


// --------------------------------------------------------------------------------
// набор взрывов
// --------------------------------------------------------------------------------


        const MAX_EXPLOSION_LIFETIME = 1000;
        const EXPLOSION_FRAMES_AMOUNT = 9;

        function AbstractExplosion()
        {
        }

        AbstractExplosion.prototype.size = 0;
        AbstractExplosion.prototype.x = 0;
        AbstractExplosion.prototype.y = 0;
        AbstractExplosion.prototype.dx = 0;
        AbstractExplosion.prototype.dy = 0;
        AbstractExplosion.prototype.curentAnimationTime = 0;
        AbstractExplosion.prototype.totalAnimationTime = 0;
        AbstractExplosion.prototype.image = '';

        AbstractExplosion.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        };

        AbstractExplosion.prototype.move = function ()
        {
            this.x += this.dx;
            this.y += this.dy;
        };


        // взрыв астероида
        function AsteroidExplosion(size, x, y, dx, dy, animationTime)
        {
            this.size = size;
            this.x = x;
            this.y = y;
            this.dx = dx / 2;
            this.dy = dy / 2;
            this.totalAnimationTime = this.size / 120 * animationTime;
            this.image = images['explosion' + (getFrameNumberByAnimationTime(this.curentAnimationTime, MAX_EXPLOSION_LIFETIME, EXPLOSION_FRAMES_AMOUNT))];
            console.log(this.image, this.totalAnimationTime);
        }

        AsteroidExplosion.prototype = new AbstractExplosion();

        // взрыв осколка
        function SplinterExplosion(size, x, y, dx, dy, animationTime)
        {
            this.size = size;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.totalAnimationTime = this.size / 120 * animationTime;
            this.image = images['explosion' + (getFrameNumberByAnimationTime(this.curentAnimationTime, MAX_EXPLOSION_LIFETIME, EXPLOSION_FRAMES_AMOUNT))];
        }

        SplinterExplosion.prototype = new AbstractExplosion();

        // взрыв снаряда
        function ShellExplosion(size, x, y, dx, dy, animationTime)
        {
            this.size = size;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.totalAnimationTime = this.size / 120 * animationTime;
            this.image = images['explosion' + (getFrameNumberByAnimationTime(this.curentAnimationTime, MAX_EXPLOSION_LIFETIME, EXPLOSION_FRAMES_AMOUNT))];
        }

        ShellExplosion.prototype = new AbstractExplosion();

        // взрыв корабля
        function PlayershipExplosion(size, x, y, dx, dy, animationTime)
        {
            this.size = size;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.totalAnimationTime = this.size / 120 * animationTime;
            this.image = images['explosion' + (getFrameNumberByAnimationTime(this.curentAnimationTime, MAX_EXPLOSION_LIFETIME, EXPLOSION_FRAMES_AMOUNT))];
        }

        PlayershipExplosion.prototype = new AbstractExplosion();


        // --------------------------------------------------------------------------------
        // взрывы
        // --------------------------------------------------------------------------------

        let explosions = [];

        function addExplosion(typeExplosion)
        {
            let explosion = new typeExplosion();
            explosions.push(explosion);
        }

        function drawExplosions()
        {
            for (let i = 0; i < explosions.length; i++)
            {
                let explosion = explosions[i];
                explosion.draw();
            }
        }

        function moveExplosions(tickTime)
        {
            for (let i = 0; i < explosions.length; i++)
            {
                let explosion = explosions[i];
                explosion.move();

                explosion.curentAnimationTime += tickTime;

                if (explosion.curentAnimationTime >= explosion.totalAnimationTime)
                {
                    explosions.splice(i, 1);
                    i--;
                }
            }
        }

        // // --------------------------------------------------------------------------------
        // // взрывы
        // // --------------------------------------------------------------------------------
        //
        //
        // let explosions = [];
        //
        // const MAX_EXPLOSION_LIFETIME = 1000;
        // const EXPLOSION_FRAMES_AMOUNT = 9;
        //
        //
        // function addExplosion(size, x, y, dx, dy)
        // {
        //     let explosion = {};
        //
        //     explosion.size = size / 32;
        //     explosion.x = x;
        //     explosion.y = y;
        //     explosion.dx = dx;
        //     explosion.dy = dy;
        //     explosion.animationTime = 0;
        //     explosion.lifeTime = EXPLOSION_LIFETIME;
        //
        //     explosions.push(explosion);
        // }
        //
        //
        // function drawExplosions()
        // {
        //     for (let i = 0; i < explosions.length; i++)
        //     {
        //         let explosion = explosions[i];
        //
        //         let image = images['explosion' + (getFrameNumberByAnimationTime(explosion.animationTime, explosion.lifeTime, EXPLOSION_FRAMES_AMOUNT) + 1)];
        //
        //         context.drawImage(image,
        //             explosion.x - (image.width * explosion.size) / 2,
        //             explosion.y - (image.height * explosion.size) / 2,
        //             (image.width * explosion.size),
        //             (image.height * explosion.size));
        //     }
        // }

        // function drawExplosions()
        // {
        //     for (let i = 0; i < explosions.length; i++)
        //     {
        //         let explosion = explosions[i];
        //
        //         let currentTime = (new Date).getTime();
        //
        //         // остановка взрыва при паузе
        //         if (pause)
        //             explosion.startTime = explosion.startTime + currentTime - previousTickTime;
        //         previousTickTime = currentTime;
        //
        //
        //         for (let k = 1; k <= 9; k++)
        //         {
        //             if (currentTime <= explosion.startTime + explosion.imageLifeTime * k)
        //             {
        //                 context.drawImage(images['explosion' + k], explosion.x - explosion.size / 2, explosion.y - explosion.size / 2, explosion.size, explosion.size);
        //                 break;
        //             }
        //         }
        //         if (currentTime > explosion.startTime + explosion.lifeTime)
        //         {
        //             explosions.splice(i, 1);
        //             i--;
        //         }
        //     }
        // }

        // let explosions = [];
        // let previousTickTime = 0;
        // let timeRatio = 10;  // время жизни взрыва (коэф.)
        //
        //
        // function addExplosion(size, speed, x, offsetX, y, timeRatio)
        // {
        //     if (!isGameOver)
        //     {
        //         let explosion = {};
        //         explosion.size = size;
        //         explosion.speed = speed;
        //         explosion.x = x;
        //         explosion.offsetX = offsetX;
        //         explosion.y = y;
        //         explosion.lifeTime = Math.round(size * timeRatio);
        //         explosion.imageLifeTime = Math.round(size * timeRatio / 9);
        //         explosion.startTime = (new Date).getTime();
        //         explosions.push(explosion);
        //     }
        // }
        //
        //
        // function drawExplosions()
        // {
        //     for (let i = 0; i < explosions.length; i++)
        //     {
        //         let explosion = explosions[i];
        //
        //         let currentTime = (new Date).getTime();
        //
        //         // остановка взрыва при паузе
        //         if (pause)
        //             explosion.startTime = explosion.startTime + currentTime - previousTickTime;
        //         previousTickTime = currentTime;
        //
        //
        //         for (let k = 1; k <= 9; k++)
        //         {
        //             if (currentTime <= explosion.startTime + explosion.imageLifeTime * k)
        //             {
        //                 context.drawImage(images['explosion' + k], explosion.x - explosion.size / 2, explosion.y - explosion.size / 2, explosion.size, explosion.size);
        //                 break;
        //             }
        //         }
        //         if (currentTime > explosion.startTime + explosion.lifeTime)
        //         {
        //             explosions.splice(i, 1);
        //             i--;
        //         }
        //     }
        //
        // }
        //
        //
        // function moveExplosions()
        // {
        //     for (let i = 0; i < explosions.length; i++)
        //     {
        //         let explosion = explosions[i];
        //         explosion.x += explosion.offsetX / 2;
        //         explosion.y += explosion.speed / 2;
        //     }
        // }


// --------------------------------------------------------------------------------
// обработка столкновений
// --------------------------------------------------------------------------------

        function gameEngine()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];

                // столкновение астероида с кораблем
                for (let k = 0; k < ships.length; k++)
                {
                    let ship = ships[k];

                    let dx = asteroid.x - ship.x;
                    let dy = asteroid.y - ship.y;
                    let distanse = Math.sqrt(dx * dx + dy * dy);

                    let distanseRatio;
                    if (asteroid.type === 'asteroid')
                        distanseRatio = 0.7;
                    if (asteroid.type === 'splinter')
                        distanseRatio = 1;

                    let colissionDistanse = (asteroid.size / 2 + ship.size / 2) * distanseRatio;

                    if (distanse <= colissionDistanse)
                    {
                        ship.life -= asteroid.life;
                        // addExplosion(AsteroidExplosion(asteroid.size, asteroid.x, asteroid.y, asteroid.dx, asteroid.dy));

                        if (asteroid.type === 'asteroid')
                            addAsteroidAfterKill(1, Asteroid1);

                        asteroids.splice(i, 1);
                        i--;

                        if (ship.life <= 0)
                        {
                            ship.life = 0;
                            // addExplosion(PlayershipExplosion(ship.size * 2, ship.x, ship.y, 0, 0, 500));
                            gameState = 'gameOver';
                        }
                    }
                }

                // попадание снаряда в астероид
                for (let j = 0; j < shots.length; j++)
                {
                    let shot = shots[j];

                    let dx = asteroid.x - shot.x;
                    let dy = asteroid.y - shot.y;
                    let distanse = Math.sqrt(dx * dx + dy * dy);

                    let distanseRatio;
                    if (asteroid.type === 'asteroid')
                        distanseRatio = 0.8;
                    if (asteroid.type === 'splinter')
                        distanseRatio = 0.8;

                    let colissionDistanse = (asteroid.size / 2) * distanseRatio;
                    console.log(distanse, colissionDistanse);

                    if (distanse <= colissionDistanse)
                    {
                        asteroid.life -= shot.power;

                        if (asteroid.life <= 0)
                        {
                            if (asteroid.type === 'asteroid')
                            {
                                addAsteroidAfterKill(1, Asteroid1);
                                // addExplosion(AsteroidExplosion(getRandomFloat(asteroid.size / 2, asteroid.size), asteroid.x, asteroid.y, asteroid.dx, asteroid.dy, 1000));
                                // addAsteroidAfterKill(3/*(Math.floor(asteroid.size / 30)) * 2*/, Splinter);
                            }
                            if (asteroid.type === 'splinter')
                            {
                                addScore(asteroid.addScore);
                                // addExplosion(SplinterExplosion(asteroid.size, asteroid.x, asteroid.y, asteroid.dx, asteroid.dy, 500));
                            }

                            addScore(asteroid.addScore);
                            asteroids.splice(i, 1);
                            i--;
                        }
                        else
                        {
                            addScore(1);

                            // if (curShell === Rocket)
                            //     addExplosion(ShellExplosion(getRandomFloat(100, 300), shot.x, shot.y, 0, 0, 500));
                            //
                            // if (curShell === MiniPhotonGun)
                            //     addExplosion(ShellExplosion(getRandomFloat(300, 600), shot.x, shot.y, 0, 0, 500));
                            // else
                            //     addExplosion(ShellExplosion(getRandomFloat(20, 40), shot.x, shot.y, 0, 0, 500));
                        }

                        shots.splice(j, 1);
                        j--;
                    }
                }
            }
        }


// --------------------------------------------------------------------------------
// состояния игры
// --------------------------------------------------------------------------------

        let gameState = 'premission';  // premission, game, postmission, gameOver
        let pause = false;
        let premissionTimeOut = true;
        let gameOverTime = true;

        function premissionTimeout()
        {
            if (gameState === 'premission' && premissionTimeOut)
            {
                premissionTimeOut = false;
                setTimeout(function ()
                {
                    gameState = 'game';
                    addAsteroids(5, Asteroid1);
                }, 3000);
            }
        }

        function gameOverTimeout()
        {
            if (gameState === 'gameOver' && gameOverTime)
            {
                setTimeout(function ()
                {
                    changeAudioSrc(GameOverAudio);
                    gameOverTime = false;
                }, 500);
            }
        }

        function drawPremission(numLevel, text)
        {
            if (gameState === 'premission')
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('LEVEL ' + numLevel, 300, 450);
                context.font = 'italic 20pt Calibri';
                context.fillText(text, 300, 520);
            }
        }

        function drawPostmission(numLevel, text)
        {
            if (gameState === 'postmission')
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('LEVEL ' + numLevel + ' COMPLETED', 300, 450);
                context.font = 'italic 20pt Calibri';
                context.fillText(text, 300, 520);
            }
        }

        function drawGameOver()
        {
            if (gameOverTime === false)
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('GAME OVER', 300, 450);
            }
        }

        function drawPause()
        {
            if (gameState !== 'gameOver')
            {
                if (pause)
                {
                    context.font = '40pt Calibri';
                    context.fillStyle = 'red';
                    context.textAlign = 'center';
                    context.fillText('PAUSE', 300, 450);
                }
            }
        }


// --------------------------------------------------------------------------------
// индикаторы
// --------------------------------------------------------------------------------

        let score = 0;

        function addScore(add)
        {
            score += add;
        }

        function drawScore()
        {
            context.font = 'italic 25pt Calibri';
            context.textAlign = 'left';
            context.fillStyle = 'blue';
            context.fillText('Score: ' + Math.ceil(score), 20, 70);
        }

        function drawLife()
        {
            if (gameState !== 'gameOver')
            {
                for (let i = 0; i < ships.length; i++)
                {
                    let ship = ships[i];

                    let blueRGB = Math.floor(ship.life / 2);

                    function redRGB()
                    {
                        if (blueRGB > 200)
                            return 0;
                        else if (blueRGB > 150)
                            return 50;
                        else if (blueRGB > 100)
                            return 150;
                        else if (blueRGB > 50)
                            return 200;
                        else
                            return 250;
                    }

                    context.fillStyle = 'rgba(' + redRGB() + ',50,' + blueRGB + ',0.7)';
                    context.fillRect(10, (80 + 40 * i), ship.life / 2, 30);
                    context.fillStyle = 'black';
                    context.lineWidth = 4;
                    context.strokeRect(10, (80 + 40 * i), 250, 30);
                    context.font = 'italic 18pt Calibri';
                    context.textAlign = 'left';
                    context.fillStyle = '#C8C8FF';
                    context.fillText(('Shield'), 22, (102 + 40 * i));
                }
            }
        }

        function recoveryShield()
        {
            if (gameState !== 'gameOver')
            {
                    for (let i = 0; i < ships.length; i++)
                    {
                        let ship = ships[i];
                        if (ship.life < 499)
                        {
                            ship.life += ship.recoveryShieldHPerTick;
                        }
                    }
            }
        }


// --------------------------------------------------------------------------------
// утилиты
// --------------------------------------------------------------------------------

        function getRandomFloat(min, max)
        {
            return Math.random() * (max - min) + min;
        }

        function getFrameNumberByAnimationTime(animationTime, totalTime, framesAmount)
        {
            if (animationTime < 0)
                animationTime = 1;
            else if (animationTime > totalTime)
                animationTime = totalTime;

            let currentFrame = Math.ceil(animationTime / totalTime * framesAmount);
            if (currentFrame > framesAmount)
                currentFrame = framesAmount;

            return currentFrame;
        }

        let tickTime = 0;
        let lastTime = null;

        function curTickTime()
        {
            let currentTime = (new Date).getTime();
            if (lastTime === null)
                lastTime = currentTime;

            tickTime = currentTime - lastTime;
            lastTime = currentTime;
        }


// --------------------------------------------------------------------------------
// управление кораблем и выстрелами
// --------------------------------------------------------------------------------


        let shotIntervalId = -1;

        function startFiring()
        {
            if (shotIntervalId === -1)
            {
                addShot();
                shotIntervalId = setInterval(addShot, curShell.prototype.timeoutFiringRate);
            }
        }

        function stopFiring()
        {
            if (shotIntervalId !== -1)
            {
                clearInterval(shotIntervalId);
                shotIntervalId = -1;
            }
        }

        function restartFiring()
        {
            if (shotIntervalId !== -1)
            {
                clearInterval(shotIntervalId);
                shotIntervalId = setInterval(addShot, curShell.prototype.timeoutFiringRate);
            }
        }


        window.addEventListener('keyup',
            function (e)
            {
                e.stopPropagation();
                e.stopImmediatePropagation();

                let keyCode = e['keyCode'];

                switch (keyCode)
                {
                    // пробел
                    case 32:
                        stopFiring();
                        break;
                    // стрелка влево
                    case 37:
                        horisontalMovement = 0;
                        break;
                    // стрелка вправо
                    case 39:
                        horisontalMovement = 0;
                        break;
                }

            });

        window.addEventListener('keydown',
            function (e)
            {
                e.stopPropagation();
                e.stopImmediatePropagation();

                let keyCode = e['keyCode'];

                switch (keyCode)
                {
                    // пробел
                    case 32:
                        startFiring();
                        break;
                    // стрелка влево
                    case 37:
                        horisontalMovement = -1;
                        break;
                    // стрелка вправо
                    case 39:
                        horisontalMovement = 1;
                        break;
                    // пауза
                    case 80:
                        (pause) ? pause = false : pause = true;
                        break;
                }
            });


// --------------------------------------------------------------------------------
// основной цикл
// --------------------------------------------------------------------------------

        // предельное количество элементов, задается от уровня
        let maxAsteroidsInLevel = 500;

        function tick()
        {
            curTickTime();
            if (!pause)
            {
                moveAsteroids();
                moveShips();
                moveShots();
                moveExplosions(tickTime);
                moveBackground();
                gameEngine();
                recoveryShield();
            }
            premissionTimeout();
            gameOverTimeout();

            drawBackground();
            drawAsteroids();
            drawExplosions();
            drawGameOver();
            drawPause();
            drawShots();
            drawShips();
            drawLife();
            drawScore();
            drawPremission(1, 'the spacecraft enters the asteroid field');
            drawPostmission(1, 'the asteroid field is successfully completed');
            // checkPlayershipAndAsteroidsCollisions();
            // checkPlayershipAndSplintersCollisions();
            // checkShellsAndAsteroidsCollisions();
            // checkShellsAndSplintersCollisions();
        }


        // --------------------------------------------------------------------------------
        // инициализация
        // --------------------------------------------------------------------------------

        addShip(Playership1);
        addAudio(Level1Audio);
        addBackground(Background1);
        intervalAddAsteroid(1, Asteroid1, 10000);
        setInterval(tick, 1000 / 60);
        tick();
    }
);


