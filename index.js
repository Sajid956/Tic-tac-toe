const boxes = document.querySelectorAll(".box");
const player = document.querySelector('.game-info');
const btn = document.querySelector('.btn');
const celebrate = document.querySelectorAll('.confetti-piece');

let currentPlayer;
let currentFilledBoxes;
const winPos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function initGame() {
    currentPlayer = 'X';
    player.textContent = `Current Player - ${currentPlayer}`;
    currentFilledBoxes = ['', '', '', '', '', '', '', '', ''];

    boxes.forEach( (box) => {
        box.textContent = '';
        box.style.pointerEvents = "all";
        box.classList.remove('win');
    })
    console.log("in init func");
    player.classList.remove('win');
    player.classList.remove('loose');
    celebrate.forEach( (e) => {
        e.classList.remove('celebration');
    })

    btn.classList.remove('active');
    console.log('everything is good');
}

initGame();

boxes.forEach( (box, index) => {
    console.log('here');
    box.addEventListener('click', () => {
        console.log('you clicked at box-', index)
        clickHandler(index);
    })
});

function changePlayer() {

    if(currentPlayer === 'X') currentPlayer = 'O';
    else currentPlayer = 'X';
}

function checkGameWinner() {
    let winner = '';

    winPos.forEach((element) => {
        if( (currentFilledBoxes[element[0]] == 'X' && currentFilledBoxes[element[1]] == 'X' && currentFilledBoxes[element[2]] == 'X') || (currentFilledBoxes[element[0]] == 'O' && currentFilledBoxes[element[1]] == 'O' && currentFilledBoxes[element[2]] == 'O') ) {
            
            if(currentPlayer === 'X')
                winner = 'O';
            else winner = 'X';

            boxes[element[0]].classList.add('win');
            boxes[element[1]].classList.add('win');
            boxes[element[2]].classList.add('win');
        }
    })

    if(winner !== '') {
        boxes.forEach((box) => {
            box.style.pointerEvents = 'none';
        });

        player.textContent = `Player - ${winner} Wins!`;
        player.classList.add('win');
        celebrate.forEach( (e) => {
            e.classList.add('celebration');
        })
        btn.classList.add('active');

        return;
    }

    let fillCount = 0;
    currentFilledBoxes.forEach((element) => {
        if(element !== '') fillCount++;
    })

    //Match is tied
    if(fillCount == 9) {
        player.textContent = 'Match Tied !';
        player.classList.add('loose');
        btn.classList.add("active");
    }
}

function clickHandler(index) {

    if(boxes[index].textContent === "") {
        console.log('in clickHandler function');
        boxes[index].textContent = currentPlayer;
        currentFilledBoxes[index] = currentPlayer;
        changePlayer();
        boxes[index].style.pointerEvents = "none";
        player.textContent = `Current Player - ${currentPlayer}`;
        player.classList.add('shake-animation');

        checkGameWinner();
        
        setTimeout(() => {
            player.classList.remove('shake-animation');
        }, 300);
        
    }
}

btn.addEventListener('click', () => {
    btn.classList.remove('active');
    initGame();
})