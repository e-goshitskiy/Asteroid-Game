"use strict";
window.addEventListener('load',
    function ()
    {
        let canvas = document.getElementById('game');
        let context = canvas.getContext('2d');


        // --------------------------------------------------------------------------------
        // изображения
        // --------------------------------------------------------------------------------


        let images = {};

        function initImages()
        {
            images.background = loadImage('assets/backgrounds/1.png');
            images.playership = loadImage('assets/playerships/1.png');
            images.asteroid = loadImage('assets/asteroids/1.png');
            images.rocket = loadImage('assets/rocket/1.png');
            for (let i = 1; i <= 13; i++)
                images['splinter' + i] = loadImage('assets/splinters/' + i + '.png');
            for (let i = 1; i <= 6; i++)
                images['shell' + i] = loadImage('assets/shells/' + i + '.png');
            for (let i = 1; i <= 9; i++)
                images['explosion' + i] = loadImage('assets/explosion/' + i + '.png');
        }

        function loadImage(url)
        {
            let image = new Image;
            image.src = url;
            return image;
        }


        initImages();


        // --------------------------------------------------------------------------------
        // звук
        // --------------------------------------------------------------------------------


        let audioSrc = {};
        audioSrc.homeScreen = "music/home_screen2.mp3";
        audioSrc.level1 = "music/level.mp3";
        audioSrc.gameOver = "music/Game_Over.mp3";

        function initAudio(src)
        {
            let audio = document.createElement('audio');
            audio.id = 'audio';
            audio.setAttribute('src', src);
            audio.setAttribute('autoplay', 'autoplay');
            audio.setAttribute('loop', 'loop');
            document.body.appendChild(audio);
        }

        function playAudio(src)
        {
            let audio = document.getElementById('audio');
            audio.setAttribute('src', src);
        }

        // document.body.replaceChild(music.level, music.gameOver);
        // let d1 = document.getElementById('audio');
        // d1.remove();
        // document.body.appendChild();


        // --------------------------------------------------------------------------------
        // бэкграунд
        // --------------------------------------------------------------------------------


        let y1 = -605;

        let y2 = 0;

        let y3 = 605;

        function drawBackground()
        {
            context.drawImage(images.background, 0, y1);
            context.drawImage(images.background, 0, y2);
            context.drawImage(images.background, 0, y3);
        }

        function moveBackground()
        {
            y1 += 0.5;
            y2 += 0.5;
            y3 += 0.5;
            if (y1 >= 900)
                y1 -= 605 * 3;
            if (y2 >= 900)
                y2 -= 605 * 3;
            if (y3 >= 900)
                y3 -= 605 * 3;
        }


        // --------------------------------------------------------------------------------
        // астероиды
        // --------------------------------------------------------------------------------


        let asteroids = [];

        let countAsteroid = 0;

        function addAsteroids(amount)
        {
            for (let i = 0; i < amount; i++)
            {
                let asteroid = {};
                asteroid.size = getRandomFloat(20, 100);
                asteroid.dy = getRandomFloat(1, 10);
                asteroid.x = getRandomFloat(-50, 650);
                asteroid.dx = getRandomFloat(-1, 1);
                asteroid.y = getRandomFloat(-500, -100);
                asteroid.life = asteroid.size;
                asteroids.push(asteroid);
            }
        }

        function drawAsteroids()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                context.drawImage(images.asteroid, asteroid.x - asteroid.size / 2, asteroid.y - asteroid.size / 2, asteroid.size, asteroid.size);
            }
        }

        function moveAsteroids(time)
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                asteroid.x += asteroid.dx;
                asteroid.y += asteroid.dy;
                if (asteroid.y >= 1000 || asteroid.x < -60 || asteroid.x > 660)
                {
                    killAsteroid(i);
                    asteroids.splice(i, 1);
                    i--;
                }
            }
        }

        function intervalAddAsteroid(numAddAsteroid, addTime)
        {
            setInterval(function ()
            {
                addAsteroidAfterKill(numAddAsteroid);
            }, addTime)
        }

        function killAsteroid(index)
        {
            addAsteroidAfterKill(1);
        }

        function addAsteroidAfterKill(numAddAsteroids)
        {
            if (!isGameOver && !pause)
            {
                if (countAsteroid < maxAsteroidsInLevel)
                {
                    addAsteroids(numAddAsteroids);
                    countAsteroid++;
                }
                if (!asteroids.length)
                    endLevel1 = true;
            }
        }


        // --------------------------------------------------------------------------------
        // осколки астероидов
        // --------------------------------------------------------------------------------


        let splinters = [];

        function addSplinter(amount, size, x, y, dx, dy)
        {
            for (let i = 0; i < amount; i++)
            {
                let splinter = {};
                splinter.size = size / 5;
                splinter.x = x;
                splinter.y = y;
                splinter.dx = dx;
                splinter.dy = dy;
                splinter.accelerateX = Math.round(getRandomFloat(-4, 4));
                splinter.accelerateY = Math.round(getRandomFloat(-4, 4));
                splinter.life = 20;
                splinter.image = images['splinter' + Math.round(getRandomFloat(1, 13))];
                splinters.push(splinter);
            }
        }

        function drawSplinter()
        {
            for (let i = 0; i < splinters.length; i++)
            {
                let splinter = splinters[i];
                context.drawImage(splinter.image, splinter.x - splinter.image.width / 2, splinter.y - splinter.image.width / 2/*, splinter.size, splinter.size*/);
            }

        }

        function moveSplinter()
        {
            for (let i = 0; i < splinters.length; i++)
            {
                let splinter = splinters[i];
                splinter.x += splinter.dx + splinter.accelerateX;
                splinter.y += splinter.dy + splinter.accelerateY;
                if (splinter.y >= 1000 || splinter.x < -60 || splinter.x > 660)
                    i = killSplinter(i);
            }
        }

        function killSplinter(index)
        {
            splinters.splice(index, 1);
            index--;
            return index;
        }


        // --------------------------------------------------------------------------------
        // корабль
        // --------------------------------------------------------------------------------


        let playership = {};

        function addPlayership()
        {
            playership.size = 50;
            playership.horisontalGas = 0;
            playership.x = 300;
            playership.y = 850;
            playership.life = 500;
        }

        function drawPlayership()
        {

            context.drawImage(images.playership, playership.x - playership.size / 2, playership.y - playership.size / 2, playership.size, playership.size);
        }

        function movePlayership()
        {
            if (horisontalMovement === -1)
            {
                playership.horisontalGas += -1;
                if (playership.horisontalGas < -10)
                    playership.horisontalGas = -10;
            }
            else if (horisontalMovement === 1)
            {
                playership.horisontalGas += 1;
                if (playership.horisontalGas > 10)
                    playership.horisontalGas = 10;
            }
            else
            {
                if (playership.horisontalGas > 0)
                {
                    playership.horisontalGas -= 0.5;
                    if (playership.horisontalGas < 0)
                        playership.horisontalGas = 0;
                }
                if (playership.horisontalGas < 0)
                {
                    playership.horisontalGas += 0.5;
                    if (playership.horisontalGas > 0)
                        playership.horisontalGas = 0;
                }
            }

            playership.x += playership.horisontalGas;

            if (playership.x < 10)
                playership.x = 10;

            if (playership.x > 590)
                playership.x = 590;
        }


        // --------------------------------------------------------------------------------
        // набор снарядов для выстрела
        // --------------------------------------------------------------------------------


        let shells = {};

        // конструктор снаряда
        function AbstractShell()
        {
        }

        AbstractShell.prototype.dy = 15;
        AbstractShell.prototype.timeoutFiringRate = 100;
        AbstractShell.prototype.power = 10;
        AbstractShell.prototype.image = images.shell1;
        // AbstractShell.prototype.numberShell = 1;
        // AbstractShell.prototype.hpPerSec = this.prototype.power * 1000 / this.prototype.timeoutFiringRate;

        // метод draw
        AbstractShell.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
        };
        // метод move
        AbstractShell.prototype.move = function ()
        {
            this.y -= this.dy;
        };


        // импульсный лазер (оружие 1)
        function PulseLaser()
        {
        }

        PulseLaser.prototype = new AbstractShell;
        // PulseLaser.prototype.hpPerSec = 100;

        // мощный лазер (оружие 2)
        function PowerLaser()
        {
        }

        PowerLaser.prototype = new AbstractShell;
        PowerLaser.prototype.dy = 10;
        PowerLaser.prototype.timeoutFiringRate = 175;
        PowerLaser.prototype.power = 23;
        PowerLaser.prototype.image = images.shell2;
        // PowerLaser.prototype.numberShell = 2;
        // PowerLaser.prototype.hpPerSec = 131;

        // 2ой лазер (оружие 3)
        function GreenLaser()
        {
        }

        GreenLaser.prototype = new AbstractShell;
        GreenLaser.prototype.dy = 15;
        GreenLaser.prototype.timeoutFiringRate = 150;
        GreenLaser.prototype.power = 25;
        GreenLaser.prototype.image = images.shell3;
        // GreenLaser.prototype.numberShell = 3;
        // GreenLaser.prototype.hpPerSec = 166;

        // 3ой лазер (оружие 4)
        function BlueLaser()
        {
        }

        BlueLaser.prototype = new AbstractShell;
        BlueLaser.prototype.dy = 12;
        BlueLaser.prototype.timeoutFiringRate = 175;
        BlueLaser.prototype.power = 35;
        BlueLaser.prototype.image = images.shell4;
        // BlueLaser.prototype.numberShell = 4;
        // BlueLaser.prototype.hpPerSec = 200;

        // мини фотонная пушка (оружие 5)
        function MiniPhotonGun()
        {
        }

        MiniPhotonGun.prototype = new AbstractShell;
        MiniPhotonGun.prototype.dy = 30;
        MiniPhotonGun.prototype.timeoutFiringRate = 400;
        MiniPhotonGun.prototype.power = 100;
        MiniPhotonGun.prototype.image = images.shell5;
        // MiniPhotonGun.prototype.numberShell = 5;
        // MiniPhotonGun.prototype.hpPerSec = 250;

        // мега фотонная пушка (оружие 6)

        // function PhotonGun()
        // {
        // }
        //
        // PhotonGun.prototype = new AbstractShell;
        // PhotonGun.prototype.speed = 0;
        // PhotonGun.prototype.timeoutFiringRate = 1000 / 60;
        // PhotonGun.prototype.power = 5;
        // PhotonGun.prototype.image = images.shell6;
        // PhotonGun.prototype.numberShell = 6;
        // MiniPhotonGun.prototype.hpPerSec = 300;

        // ракета (оружие 6)
        function Rocket()
        {
        }

        Rocket.prototype = new AbstractShell;
        Rocket.prototype.dy = 5;
        Rocket.prototype.timeoutFiringRate = 300;
        Rocket.prototype.power = 300;
        Rocket.prototype.image = images.rocket;
        // Rocket.prototype.numberShell = 7;
        // Rocket.prototype.hpPerSec = 1000;


        // --------------------------------------------------------------------------------
        // выстрелы
        // --------------------------------------------------------------------------------


        let shots = [];
        let curShell = PulseLaser;

        function checkCurShell()
        {
            // if (score >= 40 && score < 100)
            //     changeCurShellTo(PowerLaser);
            // else if (score >= 100 && score < 300)
            //     changeCurShellTo(GreenLaser);
            // else if (score >= 300 && score < 400)
            //     changeCurShellTo(BlueLaser);
            // else if (score >= 400 && score < 800)
            //     changeCurShellTo(MiniPhotonGun);
            // else if (score >= 800)
            //     changeCurShellTo(Rocket);
            if (score < 500)
                curShell = PulseLaser;
            else if (score >= 500 && score < 1000)
                changeCurShellTo(PowerLaser);
            else if (score >= 1000 && score < 2000)
                changeCurShellTo(GreenLaser);
            else if (score >= 2000 && score < 3000)
                changeCurShellTo(BlueLaser);
            else if (score >= 3000 && score < 4000)
                changeCurShellTo(MiniPhotonGun);
            else if (score >= 5000)
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
            let shot = new curShell();
            shot.x = playership.x;
            shot.y = playership.y - 10;
            shots.push(shot);
        }

        function moveShots()
        {
            for (let i = 0; i < shots.length; i++)
            {
                let shot = shots[i];
                shot.move();
                if (shot.y <= -100)
                    deleteShellAtHit(i);
            }
        }

        function drawShots()
        {
            for (let i = 0; i < shots.length; i++)
            {
                let shot = shots[i];
                shot.draw();
            }
        }


        // --------------------------------------------------------------------------------
        // взрывы
        // --------------------------------------------------------------------------------


        let explosions = [];

        const EXPLOSION_LIFETIME = 250;
        const EXPLOSION_FRAMES_AMOUNT = 9;


        function addExplosion(size, x, y, dx, dy)
        {
            // DEBUG
            // if (explosions.length > 0)
            //     return;

            if (!isGameOver)
            {
                let explosion = {};

                explosion.size = size / 32;
                explosion.x = x;
                explosion.y = y;
                explosion.dx = dx;
                explosion.dy = dy;
                explosion.animationTime = 0;
                explosion.lifeTime = EXPLOSION_LIFETIME;

                explosions.push(explosion);
            }
        }


        function drawExplosions()
        {
            for (let i = 0; i < explosions.length; i++)
            {
                let explosion = explosions[i];

                let image = images['explosion' + (getFrameNumberByAnimationTime(explosion.animationTime, explosion.lifeTime, EXPLOSION_FRAMES_AMOUNT) + 1)];

                context.drawImage(image,
                    explosion.x - (image.width * explosion.size) / 2,
                    explosion.y - (image.height * explosion.size) / 2,
                    (image.width * explosion.size),
                    (image.height * explosion.size));
            }
        }


        function moveExplosions(time)
        {
            for (let i = 0; i < explosions.length; i++)
            {
                let explosion = explosions[i];

                explosion.x += explosion.dx / 2;
                explosion.y += explosion.dy / 2;

                explosion.animationTime += time;

                if (explosion.animationTime >= explosion.lifeTime)
                {
                    explosions.splice(i, 1);
                    i--;
                }
            }
        }


        // --------------------------------------------------------------------------------
        // столкновение корабля с астероидом
        // --------------------------------------------------------------------------------


        function checkPlayershipAndAsteroidsCollisions()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                let dx = asteroid.x - playership.x;
                let dy = asteroid.y - playership.y;
                let distanse = Math.sqrt(dx * dx + dy * dy);
                let colissionDistanse = (asteroid.size / 2 + playership.size / 2) * 0.7;
                if (distanse <= colissionDistanse)
                {
                    hitPlayership(asteroid.life);
                    killAsteroid(i);
                    asteroids.splice(i, 1);
                    addExplosion(asteroid.size, asteroid.x, asteroid.y, asteroid.dx, asteroid.dy);
                    break;
                }

            }
        }


        function hitPlayership(hp)
        {
            playership.life -= hp;
            if (playership.life <= 0)
            {
                playership.life = 0;
                addExplosion(playership.size * 2, playership.x, playership.y, 0, 0);
                gameOver();
            }
        }


        // --------------------------------------------------------------------------------
        // столкновение снаряда с астероидом
        // --------------------------------------------------------------------------------


        function checkShellsAndAsteroidsCollisions()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];

                for (let k = 0; k < shots.length; k++)
                {
                    let shot = shots[k];

                    let dx = asteroid.x - shot.x;
                    let dy = asteroid.y - shot.y;
                    let distanse = Math.sqrt(dx * dx + dy * dy);
                    let colissionDistanse = (asteroid.size / 2 + shot.y / 2) * 0.13;
                    if (distanse <= colissionDistanse)
                    {
                        hitAsteroid(shot.power, i);

                        deleteShellAtHit(k);

                        if (curShell === Rocket)
                            addExplosion(getRandomFloat(100, 300), shot.x, shot.y, 0, 0);

                        if (curShell === MiniPhotonGun)
                            addExplosion(getRandomFloat(300, 600), shot.x, shot.y, 0, 0);
                        else
                            addExplosion(getRandomFloat(20, 40), shot.x, shot.y, 0, 0);
                    }
                }
            }
        }

        function hitAsteroid(hp, indexAsteroid)
        {
            let asteroid = asteroids[indexAsteroid];
            asteroid.life -= hp;
            addScore(hp / hp);
            if (asteroid.life <= 0)
            {
                addScore(asteroid.size / 4);
                killAsteroid(indexAsteroid);
                asteroids.splice(indexAsteroid, 1);
                addExplosion(getRandomFloat(asteroid.size / 2, asteroid.size), asteroid.x, asteroid.y, asteroid.dx, asteroid.dy);
                addSplinter((Math.floor(asteroid.size / 30)) * 2, asteroid.size, asteroid.x, asteroid.y, asteroid.dx, asteroid.dy);
            }
        }

        function deleteShellAtHit(indexShell)
        {
            shots.splice(indexShell, 1);
            indexShell--;
        }


        // --------------------------------------------------------------------------------
        // столкновение корабля с осколком
        // --------------------------------------------------------------------------------


        function checkPlayershipAndSplintersCollisions()
        {
            for (let i = 0; i < splinters.length; i++)
            {
                let splinter = splinters[i];
                let dx = splinter.x - playership.x;
                let dy = splinter.y - playership.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let collisionDistance = (splinter.size / 2 + playership.size / 2) * 1;
                if (distance <= collisionDistance)
                {
                    hitPlayership(splinter.life);
                    killSplinter(i);
                    addExplosion(splinter.size * 2, splinter.x, splinter.y, splinter.dx + splinter.accelerateX, splinter.dy + splinter.accelerateY);
                    break;
                }

            }
        }


        // --------------------------------------------------------------------------------
        // столкновение снаряда с осколком
        // --------------------------------------------------------------------------------


        function checkShellsAndSplintersCollisions()
        {
            for (let i = 0; i < splinters.length; i++)
            {
                let splinter = splinters[i];

                for (let k = 0; k < shots.length; k++)
                {
                    let shot = shots[k];

                    let dx = splinter.x - shot.x;
                    let dy = splinter.y - shot.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let collisionDistance = (splinter.size / 2 + shot.y / 2) * 0.08;
                    if (distance <= collisionDistance)
                    {
                        hitSplinter(shot.power, i);
                        deleteShellAtHit(k);
                        addExplosion(getRandomFloat(20, 40), shot.x, shot.y, 0, 0);
                    }
                }
            }
        }

        function hitSplinter(hp, indexSplinter)
        {
            let splinter = splinters[indexSplinter];
            splinter.life -= hp;
            if (splinter.life <= 0)
            {
                addScore(5);
                killSplinter(indexSplinter);
                addExplosion(splinter.size * 2, splinter.x, splinter.y, splinter.dx + splinter.accelerateX, splinter.dy + splinter.accelerateY);
            }
            else
                addScore(hp / hp);
        }


        // --------------------------------------------------------------------------------
        // начало игры уровень 1
        // --------------------------------------------------------------------------------


        let level1 = true;
        setTimeout(function ()
        {
            level1 = false;
        }, 3000);

        function drawLevel1()
        {
            if (level1)
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('LEVEL 1', 300, 450);
                context.font = 'italic 20pt Calibri';
                context.fillText('the spacecraft enters the asteroid field', 300, 520);
            }
        }


        // --------------------------------------------------------------------------------
        // пройденный уровень
        // --------------------------------------------------------------------------------


        let endLevel1 = false;

        function drawEndLevel()
        {
            if (endLevel1)
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('LEVEL COMPLETED', 300, 450);
                context.font = 'italic 20pt Calibri';
                context.fillText('the asteroid field is successfully completed', 300, 520);
            }
        }


        // --------------------------------------------------------------------------------
        // конец игры
        // --------------------------------------------------------------------------------


        let isGameOver = false;

        function gameOver()
        {
            setTimeout(function ()
            {
                isGameOver = true;
                let audio = document.getElementById('audio');
                playAudio(audioSrc.gameOver);
            }, 400);
        }

        function drawGameOver()
        {
            context.font = '40pt Calibri';
            context.fillStyle = 'red';
            context.textAlign = 'center';
            context.fillText('GAME OVER', 300, 450);
        }


        // --------------------------------------------------------------------------------
        // пауза
        // --------------------------------------------------------------------------------

        function drawPause()
        {
            if (pause)
            {
                context.font = '40pt Calibri';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.fillText('PAUSE', 300, 450);
            }
        }


        // --------------------------------------------------------------------------------
        // полоса жизни
        // --------------------------------------------------------------------------------


        function drawLife()
        {
            let blueRGB = Math.floor(playership.life / 2);

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
            context.fillRect(10, 80, playership.life / 2, 30);
            context.fillStyle = 'black';
            context.lineWidth = 4;
            context.strokeRect(10, 80, 250, 30);
            context.font = 'italic 18pt Calibri';
            context.textAlign = 'left';
            context.fillStyle = '#C8C8FF';
            context.fillText(('Shield'), 22, 102);
        }


        // --------------------------------------------------------------------------------
        // щит
        // --------------------------------------------------------------------------------


        function recoveryShield(hp)
        {
            if (playership.life < 499)
            {
                playership.life += hp;
            }
        }


        // --------------------------------------------------------------------------------
        // счет
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


        // --------------------------------------------------------------------------------
        // задержка старта астероидов
        // --------------------------------------------------------------------------------


        let start = true;

        function timeoutStartAsteroid()
        {
            if (!level1 && start)
            {
                start = false;
                addAsteroids(5);
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


        // --------------------------------------------------------------------------------
        // управление кораблем и выстрелами
        // --------------------------------------------------------------------------------


        let horisontalMovement = 0;
        let shotIntervalId = -1;
        let pause = false;

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
                        // checkInterval = true;
                        // clearTimeout(timerId);
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
                        // let shot = new curShell();
                        // if (checkInterval && !pause)
                        // {
                        //     addShot();
                        //     timerId = setInterval(addShot, shot.timeoutFiringRate);
                        //     checkInterval = false;
                        // }
                        // if (shot.numberShell !== lastNumberShell)
                        // {
                        //     checkInterval = true;
                        //     clearTimeout(timerId);
                        //     lastNumberShell = shot.numberShell;
                        // }
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
                        (!pause) ? pause = true : pause = false;
                        // if (!pause)
                        //     pause = true;
                        // else
                        //     pause = false;
                        break;
                }
            });


        // --------------------------------------------------------------------------------
        // основной цикл
        // --------------------------------------------------------------------------------


        let lastTime = -1;

        let maxAsteroidsInLevel = 500;

        function tick()
        {
            let currentTime = (new Date).getTime();
            if (lastTime === -1)
                lastTime = currentTime;

            let tickTime = currentTime - lastTime;
            lastTime = currentTime;

            if (!pause)
            {
                moveAsteroids(tickTime);
                moveSplinter(tickTime);
                movePlayership(tickTime);
                moveShots(tickTime);
                moveExplosions(tickTime);
                moveBackground(tickTime);
            }

            timeoutStartAsteroid();

            checkPlayershipAndAsteroidsCollisions();
            checkPlayershipAndSplintersCollisions();
            checkShellsAndAsteroidsCollisions();
            checkShellsAndSplintersCollisions();

            drawBackground();
            drawAsteroids();
            drawSplinter();
            drawExplosions();

            drawScore();
            drawLevel1();
            drawEndLevel();
            drawPause();

            if (!isGameOver)
            {
                drawShots();
                drawPlayership();
                drawLife();

                recoveryShield(0.03);
            }
            else
            {
                drawGameOver();
            }

            // requestAnimationFrame(tick);
        }


        // --------------------------------------------------------------------------------
        // инициализация
        // --------------------------------------------------------------------------------


        addPlayership();
        initAudio(audioSrc.level1);
        intervalAddAsteroid(1, 10000);
        setInterval(tick, 1000 / 60);
        tick();
    }
);


