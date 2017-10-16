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

        // function AbstractAudio()
        // {
        // }
        //
        // AbstractAudio.prototype.id = '';
        // AbstractAudio.prototype.src = '';
        // AbstractAudio.prototype.autoplay = 'autoplay';
        // AbstractAudio.prototype.loop = '';
        // function BackgroundAudio()
        // {
        // }
        //
        // BackgroundAudio.prototype = new AbstractAudio();
        // BackgroundAudio.prototype.id = 'backgroundMusic';
        // BackgroundAudio.prototype.loop = 'loop';
        //
        // // главный экран
        // function HomeScreenAudio()
        // {
        // }
        //
        // HomeScreenAudio.prototype = new BackgroundAudio();
        // HomeScreenAudio.prototype.src = "music/home_screen2.mp3";
        //
        // // игра вариант 1
        // function Level1Audio()
        // {
        // }
        //
        // Level1Audio.prototype = new BackgroundAudio();
        // Level1Audio.prototype.src = "music/level.mp3";
        //
        //
        // // game over
        // function GameOverAudio()
        // {
        // }
        //
        // GameOverAudio.prototype = new BackgroundAudio();
        // GameOverAudio.prototype.src = "music/Game_Over.mp3";
        //
        // function ShotAudio()
        // {
        // }
        //
        // ShotAudio.prototype = new AbstractAudio();
        // ShotAudio.prototype.id = 'ShotAudio';
        //
        // function PulseLaserAudio()
        // {
        // }
        //
        // PulseLaserAudio.prototype = new ShotAudio();
        // PulseLaserAudio.prototype.src = "music/shotsAudio/PulseLaser.mp3";
        //
        // function MiniPowerLaserAudio()
        // {
        // }
        //
        // MiniPowerLaserAudio.prototype = new ShotAudio();
        // MiniPowerLaserAudio.prototype.src = "music/shotsAudio/PulseLaser5.mp3";
        //
        // function GreenLaserAudio()
        // {
        // }
        //
        // GreenLaserAudio.prototype = new ShotAudio();
        // GreenLaserAudio.prototype.src = "music/shotsAudio/GreenLaser.mp3";
        //
        // function BlueLaserAudio()
        // {
        // }
        //
        // BlueLaserAudio.prototype = new ShotAudio();
        // BlueLaserAudio.prototype.src = "music/shotsAudio/BlueLaser.mp3";
        //
        // function RapidCannonAudio()
        // {
        // }
        //
        // RapidCannonAudio.prototype = new ShotAudio();
        // RapidCannonAudio.prototype.src = "music/shotsAudio/PulseLaser6.mp3";
        //
        // function PowerLaserAudio()
        // {
        // }
        //
        // PowerLaserAudio.prototype = new ShotAudio();
        // PowerLaserAudio.prototype.src = "music/shotsAudio/PowerLaser.mp3";
        //
        // function MiniPhotonGunAudio()
        // {
        // }
        //
        // MiniPhotonGunAudio.prototype = new ShotAudio();
        // MiniPhotonGunAudio.prototype.src = "music/shotsAudio/MiniPhotonGun.mp3";
        //
        // function RocketAudio()
        // {
        // }
        //
        // RocketAudio.prototype = new ShotAudio();
        // RocketAudio.prototype.src = "music/shotsAudio/Rocket.mp3";


        // --------------------------------------------------------------------------------
        // звук
        // --------------------------------------------------------------------------------

        let channels = {};

        function Sound(src, channelId)
        {
            this.channel = channelId;
            this.src = src;
        }

        Sound.prototype.channel = '';
        Sound.prototype.src = '';
        Sound.prototype.autoplay = 'autoplay';
        Sound.prototype.loop = 'loop';
        Sound.prototype.play = function ()
        {
            if (!channels['backgroundMusic'] && this.channel === 'backgroundMusic')
            {
                channels.backgroundMusic = 'backgroundMusic';

                let audio = document.createElement('audio');
                audio.setAttribute('id', this.channel);
                audio.setAttribute('src', this.src);
                audio.setAttribute('autoplay', this.autoplay);
                audio.setAttribute('loop', this.loop);
                document.body.appendChild(audio);
            }
            if (!channels['shotAudio'] && this.channel === 'shotAudio')
            {
                channels.shotAudio = 'shotAudio';

                let audio = document.createElement('audio');
                audio.setAttribute('id', this.channel);
                audio.setAttribute('src', this.src);
                audio.setAttribute('autoplay', this.autoplay);
                document.body.appendChild(audio);
            }

            let audio = document.getElementById(this.channel);

            audio.setAttribute('src', this.src);

            // audio.setAttribute('autoplay', 'autoplay');
            //
            // if (this.channel === 'backgroundMusic')
            //     audio.setAttribute('loop', this.loop);
        };


        function SoundManager()
        {
            this.sounds = {};
            // this.channels = {};
        }

        function initSounds()
        {
            SoundManager.instance = new SoundManager;
            SoundManager.instance.sounds.homeScreen = new Sound("music/home_screen2.mp3", 'backgroundMusic');
            SoundManager.instance.sounds.level1 = new Sound("music/level.mp3", 'backgroundMusic');
            SoundManager.instance.sounds.gameOver = new Sound("music/Game_Over.mp3", 'backgroundMusic');
            SoundManager.instance.sounds.pulseLaser = new Sound("music/shotsAudio/PulseLaser.mp3", 'shotAudio');
            SoundManager.instance.sounds.miniPowerLaser = new Sound("music/shotsAudio/PulseLaser5.mp3", 'shotAudio');
            SoundManager.instance.sounds.greenLaser = new Sound("music/shotsAudio/GreenLaser.mp3", 'shotAudio');
            SoundManager.instance.sounds.blueLaser = new Sound("music/shotsAudio/BlueLaser.mp3", 'shotAudio');
            SoundManager.instance.sounds.rapidCannon = new Sound("music/shotsAudio/PulseLaser6.mp3", 'shotAudio');
            SoundManager.instance.sounds.powerLaser = new Sound("music/shotsAudio/PowerLaser.mp3", 'shotAudio');
            SoundManager.instance.sounds.miniPhotonGun = new Sound("music/shotsAudio/MiniPhotonGun.mp3", 'shotAudio');
            SoundManager.instance.sounds.rocket = new Sound("music/shotsAudio/Rocket.mp3", 'shotAudio');

        }

        initSounds();

        // channels
        // channels[channelId]
        // if (!channels[channelId])
        // {
        //     channels[channelId] = созать канал
        // }
        // channels[channelId].src = ...
        // channels['explosions'] = ...

        // function addBackgroundAudio(typeAudio)
        // {
        //     let curAudio = new typeAudio();
        //     let audio = document.createElement('audio');
        //     audio.setAttribute('id', curAudio.id);
        //     audio.setAttribute('src', curAudio.src);
        //     audio.setAttribute('autoplay', curAudio.autoplay);
        //     audio.setAttribute('loop', curAudio.loop);
        //     document.body.appendChild(audio);
        // }

        // function addShotAudio(typeAudio)
        // {
        //     let curAudio = new typeAudio();
        //     let audio = document.createElement('audio');
        //     audio.setAttribute('id', curAudio.id);
        //     audio.setAttribute('src', curAudio.src);
        //     document.body.appendChild(audio);
        // }

        // function changeCurAudio(typeAudio)
        // {
        //     let curAudio = new typeAudio();
        //     let audio = document.getElementById(curAudio.id);
        //     if (curAudio.id === 'backgroundMusic')
        //         audio.setAttribute('src', curAudio.src);
        //     if (curAudio.id === 'ShotAudio')
        //         audio.setAttribute('src', curAudio.src);
        //     audio.setAttribute('autoplay', 'autoplay');
        // }

        // function checkCurAudio()
        // {
        //     if (curShell === PulseLaser)
        //         changeCurAudio(PulseLaserAudio);
        //     if (curShell === MiniPowerLaser)
        //         changeCurAudio(MiniPowerLaserAudio);
        //     if (curShell === GreenLaser)
        //         changeCurAudio(GreenLaserAudio);
        //     if (curShell === BlueLaser)
        //         changeCurAudio(BlueLaserAudio);
        //     if (curShell === RapidCannon)
        //         changeCurAudio(RapidCannonAudio);
        //     if (curShell === PowerLaser)
        //         changeCurAudio(PowerLaserAudio);
        //     if (curShell === MiniPhotonGun)
        //         changeCurAudio(MiniPhotonGunAudio);
        //     if (curShell === Rocket)
        //         changeCurAudio(RocketAudio);
        // }


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
        AbstractFlyingObject.prototype.distanseAsteroidRatio = 1;

        AbstractFlyingObject.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
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
            this.y = getRandomFloat(-500, -50);
            this.dx = getRandomFloat(-1, 1);
            this.dy = getRandomFloat(1, 8);
            this.life = this.size;
            this.addScore = this.size / 4;
            this.image = images['asteroid' + Math.round(getRandomFloat(1, 13))];
        }

        Asteroid1.prototype = new AbstractFlyingObject();
        Asteroid1.prototype.type = 'asteroid';
        Asteroid1.prototype.distanseAsteroidRatio = 0.85;


        // осколок астероидa
        function Splinter(size, x, y, dx, dy)
        {
            this.size = size;
            this.x = x;
            this.y = y;
            this.accelerateX = getRandomFloat(-4, 4);
            this.accelerateY = getRandomFloat(-6, 4);
            this.dx = dx + this.accelerateX;
            this.dy = dy + this.accelerateY;
            if (Math.round(this.dx) === 0 && Math.round(this.dy) === 0)
            {
                this.dy = 1;
                this.dx = getRandomFloat(-2, 2);
            }
            this.life = this.size / 3;
            this.addScore = this.size / 2;
            this.image = images['splinter' + Math.round(getRandomFloat(1, 13))];
        }

        Splinter.prototype = new AbstractFlyingObject();
        Splinter.prototype.type = 'splinter';
        Splinter.prototype.accelerateX = 0;
        Splinter.prototype.accelerateY = 0;
        Asteroid1.prototype.distanseAsteroidRatio = 1.2;


        // --------------------------------------------------------------------------------
        // астероиды
        // --------------------------------------------------------------------------------


        let asteroids = [];

        let maxAsteroidsInLevel = 100;  // предельное количество элементов, задается от уровня

        let countAsteroid = 0;   // countAsteroid === maxAsteroidsInLevel -- конец уровня

        function addAsteroids(amount)
        {
            if (gameState === 'game' && countAsteroid < maxAsteroidsInLevel)
            {
                for (let i = 0; i < amount; i++)
                {
                    let asteroid = new Asteroid1;
                    asteroids.push(asteroid);
                }
                countAsteroid += amount;
            }
        }

        function addSplinters(amount, size, x, y, dx, dy)
        {
            for (let i = 0; i < amount; i++)
            {
                let splinterSize = getRandomFloat(size / 7, size / 5);
                let splinter = new Splinter(splinterSize, x, y, dx, dy);
                asteroids.push(splinter);
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
                        addAsteroids(1, Asteroid1);
                }
            }
        }

        function intervalAddAsteroids(numAddAsteroid, typeAsteroid, addTime)
        {
            setInterval(function ()
            {
                addAsteroids(numAddAsteroid, typeAsteroid);
            }, addTime)
        }


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
        AbstractShip.prototype.recoveryShieldHPerTick = 0.05;
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
            // ships['typeShip'] = new typeShip();
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
        AbstractShell.prototype.offsetStartY = 0;
        AbstractShell.prototype.timeoutFiringRate = 100;
        AbstractShell.prototype.power = 10;
        AbstractShell.prototype.image = images.shell1;
        AbstractShell.prototype.explosionDistance = 0;
        AbstractShell.prototype.distanseShellRatio = 1;
        AbstractShell.prototype.sound = SoundManager.instance.sounds.pulseLaser;
        AbstractShell.prototype.physicsOfCollisionShell = function (i, j)
        {
            shots.splice(j, 1);
            if (j > 0)
                j = j - 1;
            return j;
        };
        AbstractShell.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
        };
        AbstractShell.prototype.move = function ()
        {
            this.y -= this.dy;
        };


        // импульсный лазер
        function PulseLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('PulseLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        PulseLaser.prototype = new AbstractShell;
        PulseLaser.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height);
        };

        // мини версия мощного лазера
        function MiniPowerLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('MiniPowerLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        MiniPowerLaser.prototype = new AbstractShell;
        MiniPowerLaser.prototype.dy = 18;
        MiniPowerLaser.prototype.timeoutFiringRate = 120;
        MiniPowerLaser.prototype.power = 15;
        MiniPowerLaser.prototype.image = images.shell2;
        MiniPowerLaser.prototype.distanseShellRatio = 0.9;
        MiniPowerLaser.prototype.sound = SoundManager.instance.sounds.miniPowerLaser;

        // сдвоеный лазер
        function GreenLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('GreenLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        GreenLaser.prototype = new AbstractShell;
        GreenLaser.prototype.dy = 15;
        GreenLaser.prototype.timeoutFiringRate = 130;
        GreenLaser.prototype.power = 20;
        GreenLaser.prototype.image = images.shell3;
        GreenLaser.prototype.distanseShellRatio = 1.2;
        GreenLaser.prototype.sound = SoundManager.instance.sounds.greenLaser;
        GreenLaser.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height);
        };

        // строенный лазер
        function BlueLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('BlueLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        BlueLaser.prototype = new AbstractShell;
        BlueLaser.prototype.dy = 20;
        BlueLaser.prototype.timeoutFiringRate = 160;
        BlueLaser.prototype.power = 30;
        BlueLaser.prototype.image = images.shell4;
        BlueLaser.prototype.distanseShellRatio = 1.25;
        BlueLaser.prototype.sound = SoundManager.instance.sounds.blueLaser;
        BlueLaser.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height);
        };

        // импульсная пушка
        function RapidCannon()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('RapidCannon: ' + this.hpPerSec + ' hpPerSec');
        }

        RapidCannon.prototype = new AbstractShell;
        RapidCannon.prototype.dy = 25;
        RapidCannon.prototype.timeoutFiringRate = 120;
        RapidCannon.prototype.power = 27;
        RapidCannon.prototype.image = images.shell2;
        RapidCannon.prototype.distanseShellRatio = 1.2;
        RapidCannon.prototype.sound = SoundManager.instance.sounds.rapidCannon;
        RapidCannon.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - 21, this.y - 15, 40, 20);
        };

        // мощный лазер
        function PowerLaser()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('PowerLaser: ' + this.hpPerSec + ' hpPerSec');
        }

        PowerLaser.prototype = new AbstractShell;
        PowerLaser.prototype.dy = 10;
        PowerLaser.prototype.timeoutFiringRate = 380;
        PowerLaser.prototype.power = 120;
        PowerLaser.prototype.image = images.shell2;
        PowerLaser.prototype.distanseShellRatio = 1.2;
        PowerLaser.prototype.sound = SoundManager.instance.sounds.powerLaser;
        PowerLaser.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - 16, this.y - 60, 30, 100);
        };

        // мини фотонная пушка
        function MiniPhotonGun()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('MiniPhotonGun: ' + this.hpPerSec + ' hpPerSec');
        }

        MiniPhotonGun.prototype = new AbstractShell;
        MiniPhotonGun.prototype.dy = 25;
        MiniPhotonGun.prototype.offsetStartY = 15;
        MiniPhotonGun.prototype.timeoutFiringRate = 600;
        MiniPhotonGun.prototype.power = 160;
        MiniPhotonGun.prototype.image = images.shell5;
        MiniPhotonGun.prototype.distanseShellRatio = 1.3;
        MiniPhotonGun.prototype.sound = SoundManager.instance.sounds.miniPhotonGun;
        MiniPhotonGun.prototype.physicsOfCollisionShell = function (i, j)
        {
            let asteroid = asteroids[i];
            let shot = shots[j];
            shot.power -= asteroid.size;
            if (shot.power <= 0)
            {
                shots.splice(j, 1);
                if (j > 0)
                    j = j - 1;
                return j;
            }
        };

        // ракета
        function Rocket()
        {
            this.hpPerSec = this.power * 1000 / this.timeoutFiringRate;
            console.log('Rocket: ' + this.hpPerSec + ' hpPerSec');
        }

        Rocket.prototype = new AbstractShell;
        Rocket.prototype.dy = 5;
        Rocket.prototype.offsetStartY = 5;
        Rocket.prototype.timeoutFiringRate = 500;
        Rocket.prototype.power = 140;
        Rocket.prototype.image = images.rocket1;
        Rocket.prototype.distanseShellRatio = 1.7;
        Rocket.prototype.sound = SoundManager.instance.sounds.rocket;
        Rocket.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2 - 15);
        };
        Rocket.prototype.physicsOfCollisionShell = function (i, j)
        {
            let shot = shots[j];
            if (shot.explosionDistance === 0)
            {
                shot.explosionDistance = 70;
                shot.power /= 2;

                addExplosion(170, shot.x, shot.y - 50, 0, shot.dy / 4, 300);

                setTimeout(function ()
                {
                    shots.splice(j, 1);
                    if (j > 0)
                        j = j - 1;
                    return j;
                }, 100);
            }
        };

        // мега фотонная пушка

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
            if (score < 400)
                curShell = PulseLaser;
            else if (score >= 400 && score < 1000)
                changeCurShellTo(MiniPowerLaser);
            else if (score >= 1000 && score < 1500)
                changeCurShellTo(GreenLaser);
            else if (score >= 1500 && score < 2000)
                changeCurShellTo(BlueLaser);
            else if (score >= 2000 && score < 2500)
                changeCurShellTo(RapidCannon);
            else if (score >= 2500 && score < 3000)
                changeCurShellTo(PowerLaser);
            else if (score >= 3000 && score < 5500)
                changeCurShellTo(MiniPhotonGun);
            else if (score >= 5500)
                changeCurShellTo(Rocket);
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
            shot.y = ship.y - shot.offsetStartY;
            shots.push(shot);

            shot.sound.play();
            // checkCurAudio();
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


        // const MAX_EXPLOSION_LIFETIME = 1000;
        const EXPLOSION_FRAMES_AMOUNT = 9;

        function AbstractExplosion()
        {
        }

        AbstractExplosion.prototype.size = 0;
        AbstractExplosion.prototype.x = 0;
        AbstractExplosion.prototype.y = 0;
        AbstractExplosion.prototype.dx = 0;
        AbstractExplosion.prototype.dy = 0;
        AbstractExplosion.prototype.curentAnimationTime = 0.01;
        AbstractExplosion.prototype.totalAnimationTime = 0;
        AbstractExplosion.prototype.image = 'explosion1';

        AbstractExplosion.prototype.draw = function ()
        {
            this.image = images['explosion' + Math.ceil(this.curentAnimationTime / this.totalAnimationTime * EXPLOSION_FRAMES_AMOUNT)];
            context.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        };

        AbstractExplosion.prototype.move = function ()
        {
            this.x += this.dx;
            this.y += this.dy;
        };

        // взрыв астероида
        function Explosion(size, x, y, dx, dy, maxAnimationTime)
        {
            this.size = size;
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.totalAnimationTime = this.size / 120 * maxAnimationTime;
            // console.log(this.image, this.totalAnimationTime);
        }

        Explosion.prototype = new AbstractExplosion();


        // --------------------------------------------------------------------------------
        // взрывы
        // --------------------------------------------------------------------------------

        let explosions = [];

        function addExplosion(size, x, y, dx, dy, maxAnimationTime)
        {
            let explosion = new Explosion(size, x, y, dx, dy, maxAnimationTime);
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

                if (!pause)
                    explosion.curentAnimationTime += tickTime;

                if (explosion.curentAnimationTime >= explosion.totalAnimationTime)
                {
                    explosions.splice(i, 1);
                    i--;
                }
            }
        }


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

                    let colissionDistanse = (asteroid.size / 2 + ship.size / 2) * asteroid.distanseAsteroidRatio;

                    if (distanse <= colissionDistanse)
                    {
                        ship.life -= asteroid.life;

                        // let explosionDx;
                        // if (dx < 0)
                        //     explosionDx = dx + asteroid.size / 2;
                        // else
                        //     explosionDx = dx - asteroid.size / 2;
                        // addExplosion(getRandomFloat(asteroid.size / 2, asteroid.size), ship.x/* + explosionDx*/, ship.y - 20, 0, 0, 500);
                        // console.log(ship.image.width * asteroid.size / 2 / dx);

                        if (asteroid.type === 'asteroid')
                            addAsteroids(1, Asteroid1);

                        asteroids.splice(i, 1);
                        i--;

                        if (ship.life <= 0)
                        {
                            ship.life = 0;

                            addExplosion(170, ship.x, ship.y, 0, 0, 1000);

                            ships.splice(k, 1);
                            k--;

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

                    let colissionDistanse = (asteroid.size / 2) * asteroid.distanseAsteroidRatio * shot.distanseShellRatio + shot.explosionDistance;


                    if (distanse <= colissionDistanse)
                    {
                        asteroid.life -= shot.power;

                        j = shot.physicsOfCollisionShell(i, j);

                        if (asteroid.life <= 0)
                        {
                            if (asteroid.type === 'asteroid')
                            {
                                addAsteroids(1, Asteroid1);
                                addSplinters((Math.floor(asteroid.size / 30)) * 2, asteroid.size, asteroid.x, asteroid.y, asteroid.dx, asteroid.dy);
                            }
                            addExplosion(getRandomFloat(asteroid.size / 2, asteroid.size), asteroid.x, asteroid.y, asteroid.dx / 2, asteroid.dy / 2, 1000);

                            addScore(asteroid.addScore);

                            asteroids.splice(i, 1);
                            i--;
                        }
                        else
                        {
                            addScore(1);
                        }
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

        function postmissionTimeout()
        {
            let checkAsteroid = [];

            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                if (asteroid.type === 'asteroid')
                    checkAsteroid.push(asteroid);
            }
            if (countAsteroid >= maxAsteroidsInLevel && checkAsteroid.length <= 0)
                gameState = 'postmission';
        }

        function gameOverTimeout()
        {
            if (gameState === 'gameOver' && gameOverTime)
            {
                setTimeout(function ()
                {
                    SoundManager.instance.sounds.gameOver.play();

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
            if (gameState !== 'gameOver' && pause)
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('PAUSE', 300, 450);
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

                    let redRGB;

                    if (blueRGB > 200)
                        redRGB = 0;
                    else if (blueRGB > 150)
                        redRGB = 50;
                    else if (blueRGB > 100)
                        redRGB = 150;
                    else if (blueRGB > 50)
                        redRGB = 200;
                    else
                        redRGB = 250;

                    context.fillStyle = 'rgba(' + redRGB + ',50,' + blueRGB + ',0.7)';
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

        function drawHitShip(i)
        {
            let ship = ships[i];

            context.font = 'italic 25pt Calibri';
            context.lineWidth = 4;
            context.strokeRect(10, (80 + 40 * i), 250, 30);
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
                animationTime = 0;
            else if (animationTime > totalTime)
                animationTime = totalTime;

            let normalizedTime = animationTime / totalTime; // animationTime in 0..1

            let currentFrame = Math.floor(normalizedTime * (framesAmount + 1));
            if (currentFrame > (framesAmount - 1))
                currentFrame = (framesAmount - 1);

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
        let firingTimeout = true;

        function startFiring()
        {
            if (gameState !== 'gameOver' && !pause)
            {
                if (shotIntervalId === -1 && firingTimeout)
                {
                    addShot();
                    shotIntervalId = setInterval(addShot, curShell.prototype.timeoutFiringRate);

                    firingTimeout = false;
                    setTimeout(function ()
                    {
                        firingTimeout = true;
                    }, 400);
                }
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
            postmissionTimeout();
            gameOverTimeout();

            drawBackground();
            drawAsteroids();
            drawShots();
            drawShips();
            drawExplosions();
            drawGameOver();
            drawPause();
            drawLife();
            drawScore();
            drawPremission(1, 'the spacecraft enters the asteroid field');
            drawPostmission(1, 'the asteroid field is successfully completed');
        }


        // --------------------------------------------------------------------------------
        // инициализация
        // --------------------------------------------------------------------------------

        maxAsteroidsInLevel = 800;  // предельное количество элементов, задается от уровня
        addShip(Playership1);
        // SoundManager.instance.sounds.level1.play();
        addBackground(Background1);
        intervalAddAsteroids(1, Asteroid1, 10000);
        setInterval(tick, 1000 / 60);
        tick();
    }
);


