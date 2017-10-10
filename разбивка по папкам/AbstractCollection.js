/**
 * Created by Марина on 01.10.2017.
 */

let AbstractCollection = function ()
{
    this.items = [];
};

AbstractCollection.prototype.items;

AbstractCollection.prototype.defragment = function ()
{
    for (let i = 0; i < this.items.length; i++)
    {
        if (this.items[i].isDestructed)
        {
            this.items.splice(i, 1);
            i--;
        }
    }
};

AbstractCollection.prototype.move = function (time)
{
    this.defragment();

    for (let i = 0; i < this.items.length; i++)
    {
        this.items.move(time);
    }
};

AbstractCollection.prototype.draw = function ()
{
    for (let i = 0; i < this.items.length; i++)
    {
        this.items.draw(time);
    }
};