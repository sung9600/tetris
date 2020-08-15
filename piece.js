class Piece{
    x;
    y;
    color;
    shape;
    type;
    ctx;

    constructor(ctx) {
        this.ctx=ctx;
        this.spawn();
    }

    spawn() {
        var rand=Math.random();
        this.type=Math.floor(rand*7+1);
        //console.log(this.type);
        this.shape=SHAPES[this.type];
        this.color=COLORS[this.type];
        this.x=3;
        this.y=0;
    }

    draw() {
        this.shape.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value>0){
                    this.ctx.strokeStyle=this.color;
                    ctx.lineWidth=0.1;
                    this.ctx.strokeRect(this.x + x,this.y + y,1,1);
                }
            });
        });
    }
    move(p){
        this.x=p.x;
        this.y=p.y;
        this.shape=p.shape;
    }
    random(num){
        return Math.floor(Math.random()*num+1);
    }
}