"use strict";
window.addEventListener('load', function ()
    {
        let canvas = document.getElementById('game');
        let context = canvas.getContext('2d');


        let images = {};


        function loadImages()
        {
            images.background = loadImage('assets/backgrounds/1.png');
            images.playership = loadImage('assets/playerships/1.png');
            images.asteroid = loadImage('assets/asteroids/1.png');
            images.rocket = loadImage('assets/rocket/1.png');
        }


        function loadImage(url)
        {
            let image = new Image;
            image.src = url;
            return image;
        }


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
            if (countAsteroid < maxAsteroidsInLevel)
            {
                addAsteroids(numAddAsteroids);
                countAsteroid++;
            }
            if (!asteroids.length)
                endLevel1 = true;
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


// рисуем выстрелы

        let weapons = {};

        function loadWeapon()
        {
            weapons.pulseLazer = new NewWeapon(2, 10, 15, 100, 10, 'red');
            weapons.lazer = new NewWeapon(4, 30, 12, 200, 40, 'red');
            weapons.greenLazer = new NewWeapon(6, 40, 10, 300, 80, 'green');
            weapons.rocket = new NewWeapon(6, 30, 3, 350, 120, 'blue');
            weapons.photonGun = new NewWeapon(6, 60, 6, 400, 150, 'yellow');
        }

        function NewWeapon(width, height, speed, timeoutFiringRate, power, color)
        {
            this.width = width;
            this.height = height;
            this.speed = speed;
            this.timeoutFiringRate = timeoutFiringRate;
            this.x = playership.x;
            this.y = playership.y - 30;
            this.power = power;
            this.color = color;
            this.hpPerSec = power / timeoutFiringRate * 1000;
        }

        let curWeapon = [];

        let shot;

        function addShot()
        {
            if (score < 500)
                shot = new NewWeapon(2, 10, 15, 100, 10, 'pink');
            if (score >= 500 && score < 1000)
                shot = new NewWeapon(4, 30, 12, 200, 40, 'red');
            if (score >= 1000 && score < 1500)
                shot = new NewWeapon(6, 40, 10, 300, 80, 'green');
            if (score >= 1500)
                shot = new NewWeapon(6, 60, 6, 400, 150, 'yellow');
            curWeapon.push(shot);
        }


        function drawShot()
        {
            for (let i = 0; i < curWeapon.length; i++)
            {
                let curShot = curWeapon[i];
                context.fillStyle = curShot.color;
                context.fillRect(curShot.x, curShot.y, curShot.width, curShot.height);
            }
        }

        function moveShot()
        {
            for (let i = 0; i < curWeapon.length; i++)
            {
                let curShot = curWeapon[i];
                curShot.y -= curShot.speed;
                if (curShot.y <= -100)
                {
                    curWeapon.splice(i, 1);
                    i--;
                }
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
                gameOver();
            }
        }


// столкновение лазера с астероидом

        function checkHitAsteroid()
        {
            let asteroid = asteroids[0];
            let lazer = curWeapon[0];

            if (lazer !== undefined && asteroid !== undefined)
            {
                for (let i = 0; i < asteroids.length; i++)
                {
                    asteroid = asteroids[i];

                    for (let k = 0; k < curWeapon.length; k++)
                    {
                        lazer = curWeapon[k];

                        let dx = asteroid.x - lazer.x;
                        let dy = asteroid.y - lazer.y;
                        let distanse = Math.sqrt(dx * dx + dy * dy);
                        let colissionDistanse = (asteroid.size / 2 + lazer.y / 2) * .1;
                        if (distanse <= colissionDistanse)
                        {
                            hitAsteroid(lazer.power, i);
                            deleteLazerAtHit(k);
                            k--;
                        }
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
            }
        }

        function deleteLazerAtHit(indexLazer)
        {
            curWeapon.splice(indexLazer, 1);
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
            isGameOver = true;
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


// управление кнопками кораблем  и выстрелами

        let horisontalMovement = 0;
        let timerId;
        let checkInterval;
        let pause = false;

        window.addEventListener('keyup', (e) =>
        {
            e.stopPropagation();
            e.stopImmediatePropagation();

            let keyCode = e['keyCode'];

            switch (keyCode)
            {
                // пробел
                case 32:
                    checkInterval = true;
                    clearTimeout(timerId);
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
                    if (checkInterval && !pause)
                    {
                        addShot();
                        timerId = setInterval(addShot, shot.timeoutFiringRate);
                        checkInterval = false;
                    }
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

// пауза

        function drawPause()
        {
            context.font = '40pt Calibri';
            context.fillStyle = 'red';
            context.textAlign = 'center';
            context.fillText('PAUSE', 300, 450);
        }

// вызов функций

        let maxAsteroidsInLevel = 300;

        function tick()
        {
            if (!pause)
            {
                moveAsteroids();
                movePlayership();
                moveShot();
                moveBackground();
            }
            else
                drawPause();
            checkCollisions();
            checkHitAsteroid();
            drawBackground();
            drawAsteroids();
            drawScore();
            drawLevel1();
            timeoutStartAsteroid();
            if (!isGameOver)
            {
                drawPlayership();
                drawLife();
                drawShot();
                recoveryShield(0.03);
                drawEndLevel();
            }
            else
                drawGameOver();
            // requestAnimationFrame(tick);
        }

        loadImages();
        addPlayership();
        loadWeapon();
        intervalAddAsteroid(1, 10000);
        setInterval(tick, 1000 / 60);
        tick();
    }
);


