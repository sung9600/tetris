class Board {
    grid;
    piece;
    ctx;
    score;
    constructor(ctx){
        this.ctx=ctx;
        this.score=score;
    }
    reset(){
        this.grid=this.getEmptyBoard();
        //this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }

    getEmptyBoard(){
        return Array.from(
            {length:ROW},()=>Array(COL).fill(0)
        );
    }

    valid(p){
        return p.shape.every((row,dy)=>{
            return row.every((value,dx)=>{
                let x=p.x+dx;
                let y=p.y+dy;
                return(
                    value===0||
                    (this.insideWalls(x)&&this.aboveFloor(y)&&this.notOccupied(x,y))
                );
            });
        });
    }

    insideWalls(x){
        return x>=0&&x<COL;
    }
    aboveFloor(y){
        return y<=ROW;
    }
    notOccupied(x,y){
        return this.grid[y]&& this.grid[y][x]===0;
    }
    rotate(piece){
        let p= JSON.parse(JSON.stringify(piece));
        {
            for(let y=0;y<p.shape.length;++y){
                for(let x=0;x<y;++x){
                    [p.shape[x][y],p.shape[y][x]]=[p.shape[y][x],p.shape[x][y]];
                }
            }

            p.shape.forEach(row=>row.reverse());
        }
        return p;
    }
    draw(){
        this.drawline();
        this.piece.draw();
        this.drawboard();
    }
    drawline(){
        this.ctx.strokeStyle="#000000";
        this.ctx.lineWidth=0.01;
        var i=0;
        while(i<11){
            this.ctx.beginPath();
            this.ctx.moveTo(i,0);
            this.ctx.lineTo(i,20);
            this.ctx.stroke();
            i++;
        }
        var j=0;
        while(j<21){
            this.ctx.beginPath();
            this.ctx.moveTo(0,j);
            this.ctx.lineTo(10,j);
            this.ctx.stroke();
            j++;
        }
        //this.ctx.beginPath();
        //this.ctx.moveTo(1,0);
        //this.ctx.lineTo(1,20);
        //this.ctx.stroke();
    }
    drop(){
        let p=moves[KEY.DOWN](this.piece);
        if(this.valid(p)){
            this.piece.move(p);
        }
        else {
            this.freeze();
            this.clearlines();
            if(this.piece.y===0){
                return false;
            }
            let p2=new Piece(this.ctx);
            this.piece=p2;
        }
        return true;
    }
    freeze(){
        this.piece.shape.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value>0){
                    this.grid[y+this.piece.y][x+this.piece.x]=value;
                }
            });
        });
    }
    drawboard(){
        this.grid.forEach((row,y)=>{
            row.forEach((value,x)=>{
                if(value>0){
                    //this.ctx.strokeStyle=COLORS[value];
                    //this.ctx.strokeRect(x,y,1,1);
                    this.ctx.fillStyle=COLORS[value];
                    this.ctx.fillRect(x,y,1,1);
                }
            });
        });
    }
    clearlines(){
        let lines=0;
        this.grid.forEach((row,y)=>{
            if(row.every(value=>value>0)){
                lines++;
                this.grid.splice(y,1);
                this.grid.unshift(Array(COL).fill(0));
            }
        });
        if(lines>0){
            this.score.innerHTML=Number(this.score.innerHTML)+Number(lines);
        }
    }
}