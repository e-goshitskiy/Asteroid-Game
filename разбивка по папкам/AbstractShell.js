/**
 * Created by Марина on 01.10.2017.
 */


function AbstractShell()
{
}

AbstractShell.prototype.dy = 15;
AbstractShell.prototype.timeoutFiringRate = 100;
AbstractShell.prototype.power = 10;
AbstractShell.prototype.image = images.shell1;
// AbstractShell.prototype.numberShell = 1;
// AbstractShell.prototype.hpPerSec = this.prototype.power * 1000 / this.prototype.timeoutFiringRate;

AbstractShell.prototype.draw = function ()
{
    context.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2);
};

AbstractShell.prototype.move = function ()
{
    this.y -= this.dy;
};