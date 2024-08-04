const Gameboard = (function() {   
    const gameboard =  [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    function renderBoard() {
        document.querySelectorAll(".cell").forEach((cell) => {
            const dataId = cell.getAttribute("data-id");
            if(dataId > 0 && dataId <= 3) {
                cell.textContent = gameboard[0][dataId-1];
            } else if (dataId > 3 && dataId <= 6) {
                cell.textContent = gameboard[1][dataId-1];
            } else if (dataId > 6 && dataId <= 9) {
                cell.textContent = gameboard[2][dataId-1];
            }
        })
    }

    function updateGameBoard(xIndex, yIndex, value) {
        if(!gameboard[xIndex][yIndex]) {
            gameboard[xIndex][yIndex] = value;
            console.log("cell is getting updated");
            return;
        }

        console.log("cell is already occupied");
    }

    function checkStatus() {
        //row win status
        for(let i = 0; i < 3; i++) {
            if(gameboard[i][0] == gameboard[i][1] && gameboard[i][1] == gameboard[i][2]) {
                return true;
            }
        }
        //column win status
        for(let i = 0; i < 3; i++) {
            if(gameboard[0][i] = gameboard[1][i] && gameboard[1][i] == gameboard[2][i]){
                return true;
            }
        }

        //diagonal win status
        if(gameboard[0][0] == gameboard[1][1] && gameboard[1][1] == gameboard[2][2]) {
            return true;
        }
        
        if(gameboard[0][3] == gameboard[1][1] && gameboard[1][1] == gameboard[3][0]) {
            return true;
        }
    }

    return {
        updateGameBoard,
        renderBoard,
        checkStatus
    }
})();

function createUser(name) {

}

const Game = (function() {
    let player1, player2;
    let isX = true;

    function setPlayers() {
        const selection = document.querySelector(".selection");
        const form = document.querySelector("form");
        const button = document.querySelector(".submit")
        const game = document.querySelector(".game");

        button.addEventListener("click", (e) => {
            if(form.checkValidity()) {
                e.preventDefault(); 
                player1 = document.getElementById("player1").value;
                player2 = document.getElementById("player2").value;
                selection.style.display = "none";
                game.style.display = "flex";
            } else {
                form.reportValidity();
            }
        });
    }

    function play() {
        let char;
        if(isX) {
            char = "X";
        } else {
            char = "O";
        }

        document.querySelectorAll('.cell').forEach((cell) => {
            cell.addEventListener("click", () => {
                const dataId = cell.getAttribute('data-id');
                console.log(dataId);
                if(dataId > 0 && dataId <= 3) {
                    Gameboard.updateGameBoard(0, dataId - 1, char);
                } else if (dataId > 3 && dataId <= 6) {
                    Gameboard.updateGameBoard(1, dataId - 1, char);
                } else if (dataId > 6 && dataId <= 9) {
                    Gameboard.updateGameBoard(2, dataId - 1, char);
                }
                isX = !isX;
                Gameboard.renderBoard();
            });
        });
    }

    return {
        setPlayers,
        play
    };
   
})();

Game.setPlayers();
Game.play();
