const canvas=document.getElementById('board');
const ctx=canvas.getContext('2d');
const score=document.getElementById('score');
ctx.canvas.width=COL*BLOCK_SIZE;
ctx.canvas.height=ROW*BLOCK_SIZE;
ctx.scale(BLOCK_SIZE,BLOCK_SIZE);
let requestId;
let board=new Board(ctx,score);
time={start:0,elapsed:0};
function play(){
    addEventListener();
    board.reset();
    ctx.beginPath();
    ctx.moveTo(1,1);
    ctx.lineTo(20,10);
    ctx.stroke();
    let piece=new Piece(ctx);
    piece.draw();
    board.piece=piece;
    time.start=performance.now();
    animate();
    //console.table(board.grid);
}

moves={
    [KEY.LEFT]: p =>({...p,x:p.x-1}),
    [KEY.RIGHT]: p =>({...p,x:p.x+1}),
    [KEY.DOWN]: p =>({...p,y:p.y+1}),
    [KEY.UP]: p=>board.rotate(p)
}
function addEventListener(){
    document.addEventListener('keydown',event =>{
        if(moves[event.keyCode]){
            event.preventDefault();
            let p=moves[event.keyCode](board.piece);
            if(board.valid(p)){
                board.piece.move(p);
                ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
                
                board.piece.draw();
            }
            
        }
    });
}

function animate(now =0){
    time.elapsed=now-time.start;
    if(time.elapsed>1000){
        time.start=now;
        if(!board.drop()){
            gameOver();
            return;
        }
    }
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    board.draw();
    requestId=requestAnimationFrame(animate);
    //requestAnimationFrame(this.animate.bind(this));
}
function gameOver(){
    cancelAnimationFrame(requestId);
    requestId=null;
    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4);
}

function ai(){
    let max_height=0;
    board.grid.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value>0){
                max_height=y;
            }
        });
    });
    console.log(max_height);
}