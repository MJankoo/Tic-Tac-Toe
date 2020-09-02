const player1 = 1;
const player2 = 2;

let player1Score = 0;
let player2Score = 0;

let winned = false;
let round = 0;

const boxes = [...document.querySelectorAll(".box")];
boxes.forEach(box => box.addEventListener('click', doMove))

var board = ['','','','','','','','',''];

const combinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function doMove(event)
{
    var turn;
    var clickedBox = this.id;
    
    if(round%2 === 0)
        turn = player1;
    else
        turn = player2;
    
    if(board[clickedBox] !== '' || winned === true) 
    {
        return;
    }

    draw(clickedBox, turn);
    this.classList.add("inactive");  

    board[clickedBox] = turn;
    console.log(board[clickedBox]);

    check(turn);

    round++;
    if(round === 9 && winned === 0) 
        alert("Draw!");
}

function check(player)
{
    for(i=0;i<8;i++)
    {
        if(board[combinations[i][0]] === player && board[combinations[i][1]] === player && board[combinations[i][2]] === player)
            win(player);
    }
}

function win(player)
{
    winned = true;

    if(player === 1 )
        player1Score++;
    else
        player2Score++;

    document.getElementById("scoreboard").innerHTML = " <span id='red'>X - " + player1Score + "</span>vs <span id='blue'>" + player2Score + " - O</span>";
}

function draw(boxId, turn)
{

    var canvas = document.getElementById("canvas"+boxId);
    const ctx = canvas.getContext("2d");
    
    var width = document.getElementById("1").offsetWidth;

    canvas.width = width;
    canvas.height = width;
    ctx.lineWidth = 5;

    if(boxId === '')
        return;

    if(turn === 1)
    {
        ctx.arc(width/2,width/2,width/2 - 15,0,2*Math.PI);
        ctx.stroke();
    }

    if(turn === 2)
    {
        ctx.beginPath();

        ctx.moveTo( 15, 15);
        ctx.lineTo(width - 15, width - 15);
    
        ctx.moveTo(width - 15, 15);
        ctx.lineTo(15, width - 15);
        ctx.stroke();
    }
}

window.onresize = function()
{
    for(i=0;i<9;i++)
    {
        draw(i, board[i]);
    }
    
}

document.getElementById("resetButton").onclick = function() {
    winned = false;
    round = 0;
    board = ['','','','','','','','',''];

    for(i=0;i<9;i++)
    {   
        canvas = document.getElementById("canvas"+i);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);;
        document.getElementById(i).classList.remove("inactive");
    }
};