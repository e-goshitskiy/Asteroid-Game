"use strict";
window.addEventListener('load', function ()
    {
        let canvas = document.getElementById('game');
        let context = canvas.getContext('2d');


// загрузка изображений
        let images = {};

        function loadImages()
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

        loadImages();


// рисуем бэкграунд

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

// рисуем астероиды

        let asteroids = [];

        let countAsteroid = 0;

        function addAsteroids(amount)
        {
            for (let i = 0; i < amount; i++)
            {
                let asteroid = {};
                asteroid.size = getRandomFloat(20, 100);
                asteroid.speed = getRandomFloat(1, 10);
                asteroid.x = getRandomFloat(-50, 650);
                asteroid.offsetX = getRandomFloat(-1, 1);
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

        function moveAsteroids()
        {
            for (let i = 0; i < asteroids.length; i++)
            {
                let asteroid = asteroids[i];
                asteroid.x += asteroid.offsetX;
                asteroid.y += asteroid.speed;
                if (asteroid.y >= 1000 || asteroid.x < -60 || asteroid.x > 660)
                {
                    killAsteroid(i);
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
            asteroids.splice(index, 1);
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


// рисуем корабль

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


// набор снарядов для выстрела

        let shells = {};

        // конструктор снаряда
        function AbstractShell()
        {
        }

        AbstractShell.prototype.speed = 15;
        AbstractShell.prototype.timeoutFiringRate = 100;
        AbstractShell.prototype.power = 10;
        AbstractShell.prototype.image = images.shell1;
        AbstractShell.prototype.numberShell = 1;
        // AbstractShell.prototype.hpPerSec = this.prototype.power * 1000 / this.prototype.timeoutFiringRate;

        // метод draw
        AbstractShell.prototype.draw = function ()
        {
            context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
        };
        // метод move
        AbstractShell.prototype.move = function ()
        {
            this.y -= this.speed;
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
        PowerLaser.prototype.speed = 10;
        PowerLaser.prototype.timeoutFiringRate = 175;
        PowerLaser.prototype.power = 23;
        PowerLaser.prototype.image = images.shell2;
        PowerLaser.prototype.numberShell = 2;
        // PowerLaser.prototype.hpPerSec = 131;

        // 2ой лазер (оружие 3)
        function GreenLaser()
        {
        }

        GreenLaser.prototype = new AbstractShell;
        GreenLaser.prototype.speed = 15;
        GreenLaser.prototype.timeoutFiringRate = 150;
        GreenLaser.prototype.power = 25;
        GreenLaser.prototype.image = images.shell3;
        GreenLaser.prototype.numberShell = 3;
        // GreenLaser.prototype.hpPerSec = 166;

        // 3ой лазер (оружие 4)
        function BlueLaser()
        {
        }

        BlueLaser.prototype = new AbstractShell;
        BlueLaser.prototype.speed = 12;
        BlueLaser.prototype.timeoutFiringRate = 175;
        BlueLaser.prototype.power = 35;
        BlueLaser.prototype.image = images.shell4;
        BlueLaser.prototype.numberShell = 4;
        // BlueLaser.prototype.hpPerSec = 200;

        // мини фотонная пушка (оружие 5)
        function MiniPhotonGun()
        {
        }

        MiniPhotonGun.prototype = new AbstractShell;
        MiniPhotonGun.prototype.speed = 20;
        MiniPhotonGun.prototype.timeoutFiringRate = 400;
        MiniPhotonGun.prototype.power = 100;
        MiniPhotonGun.prototype.image = images.shell5;
        MiniPhotonGun.prototype.numberShell = 5;
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
        Rocket.prototype.speed = 5;
        Rocket.prototype.timeoutFiringRate = 300;
        Rocket.prototype.power = 150;
        Rocket.prototype.image = images.rocket;
        Rocket.prototype.numberShell = 7;
        // Rocket.prototype.hpPerSec = 500;


// рисуем выстрелы

        let shots = [];
        let curShell = PulseLaser;

        function checkCurShell()
        {
            if (score >= 20 && score < 100)
                changeCurShellTo(PowerLaser);
            else if (score >= 100 && score < 200)
                changeCurShellTo(GreenLaser);
            else if (score >= 200 && score < 300)
                changeCurShellTo(BlueLaser);
            else if (score >= 200 && score < 300)
                changeCurShellTo(MiniPhotonGun);
            else if (score >= 300)
                changeCurShellTo(Rocket);
            // if (score < 500)
            //     curShell = PulseLaser;
            // else if (score >= 500 && score < 1000)
            //     changeCurShellTo(PowerLaser);
            // else if (score >= 1000 && score < 2000)
            //     changeCurShellTo(GreenLaser);
            // else if (score >= 2000 && score < 3000)
            //     changeCurShellTo(BlueLaser);
            // else if (score >= 3000 && score < 4000)
            //     changeCurShellTo(MiniPhotonGun);
            // else if (score >= 5000)
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


// рисуем взрывы

        let explosions = [];
        let previousTickTime = 0;
        let timeRatio = 10;  // время жизни взрыва (коэф.)

        function addExplosion(size, speed, x, offsetX, y, timeRatio)
        {
            if (!isGameOver)
            {
                let explosion = {};
                explosion.size = size;
                explosion.speed = speed;
                explosion.x = x;
                explosion.offsetX = offsetX;
                explosion.y = y;
                explosion.lifeTime = Math.round(size * timeRatio);
                explosion.imageLifeTime = Math.round(size * timeRatio / 9);
                explosion.startTime = (new Date).getTime();
                explosions.push(explosion);
            }
        }

        function drawExplosion()
        {
            for (let i = 0; i < explosions.length; i++)
            {
                let explosion = explosions[i];

                let currentTime = (new Date).getTime();

                // остановка взрыва при паузе
                if (pause)
                    explosion.startTime = explosion.startTime + currentTime - previousTickTime;
                previousTickTime = currentTime;


                for (let k = 1; k <= 9; k++)
                {
                    if (currentTime <= explosion.startTime + explosion.imageLifeTime * k)
                    {
                        let image = images['explosion' + k];
                        context.drawImage(image, explosion.x - explosion.size / 2, explosion.y - explosion.size / 2, explosion.size, explosion.size);
                        break;
                    }
                }
                if (currentTime > explosion.startTime + explosion.lifeTime)
                {
                    explosions.splice(i, 1);
                    i--;
                }
            }

        }

        function moveExplosion()
        {
            for (let i = 0; i < explosions.length; i++)
            {
                let explosion = explosions[i];
                explosion.x += explosion.offsetX / 2;
                explosion.y += explosion.speed / 2;
            }
        }


// столкновение корабля с астероидом

        function checkCollisions()
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
                    addExplosion(asteroid.size, asteroid.speed, asteroid.x, asteroid.offsetX, asteroid.y, timeRatio);
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
                addExplosion(playership.size * 2, undefined, playership.x, undefined, playership.y, 20)
                gameOver();
            }
        }


// столкновение снаряда с астероидом

        function checkHitAsteroid()
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
                    let colissionDistanse = (asteroid.size / 2 + shot.y / 2) * .1;
                    if (distanse <= colissionDistanse)
                    {
                        hitAsteroid(shot.power, i);
                        deleteShellAtHit(k);
                        if (curShell === Rocket)
                            addExplosion(300, undefined, shot.x, undefined, shot.y, 90000);
                        if (curShell === MiniPhotonGun)
                            addExplosion(600, undefined, shot.x, undefined, shot.y, 90000);
                        else
                            addExplosion(40, undefined, shot.x, undefined, shot.y, 10);
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
                addExplosion(asteroid.size, asteroid.speed, asteroid.x, asteroid.offsetX, asteroid.y, timeRatio);

            }
        }

        function deleteShellAtHit(indexShell)
        {
            shots.splice(indexShell, 1);
            indexShell--;
        }


// начало игры уровень 1

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


// рисуем пройденный уровень

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

// рисуем конец игры

        let isGameOver = false;

        function gameOver()
        {
            setTimeout(function ()
            {
                isGameOver = true;
            }, 400);
        }

        function drawGameOver()
        {
            context.font = '40pt Calibri';
            context.fillStyle = 'red';
            context.textAlign = 'center';
            context.fillText('GAME OVER', 300, 450);
        }


// рисуем жизнь

        function drawLife()
        {
            // context.font = '40pt Calibri';
            // context.fillStyle = 'red';
            // context.fillText('Shield: ' + Math.ceil(playership.life), 10, 100);
            context.fillStyle = 'rgba(255,50,255,0.5)';
            context.fillRect(10, 80, playership.life / 2, 30);
            context.fillStyle = 'black';
            context.lineWidth = 4;
            context.strokeRect(10, 80, 250, 30);
            context.font = 'italic 18pt Calibri';
            context.textAlign = 'left';
            context.fillStyle = 'blue';
            context.fillText(('Shield'), 22, 102);
        }


// восстановление щита

        function recoveryShield(hp)
        {
            if (playership.life < 499)
            {
                playership.life += hp;
            }
        }


// рисуем счет

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


// задержка старта астероидов

        let start = true;

        function timeoutStartAsteroid()
        {
            if (!level1 && start)
            {
                start = false;
                addAsteroids(5);
            }
        }


// случайная величина

        function getRandomFloat(min, max)
        {
            return Math.random() * (max - min) + min;
        }


// пауза

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


// управление кнопками кораблем  и выстрелами

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
            stopFiring();
            startFiring();
        }


        window.addEventListener('keyup', (e) =>
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
        window.addEventListener('keydown', (e) =>
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


// вызов функций

        let maxAsteroidsInLevel = 500;

        function tick()
        {
            if (!pause)
            {
                moveAsteroids();
                movePlayership();
                moveShots();
                moveExplosion();
                moveBackground();
            }
            timeoutStartAsteroid();
            checkCollisions();
            checkHitAsteroid();
            drawBackground();
            drawAsteroids();
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
                drawGameOver();
            drawExplosion();

            // requestAnimationFrame(tick);
        }

        addPlayership();
        intervalAddAsteroid(1, 5000);
        setInterval(tick, 1000 / 60);
        tick();
    }
);


