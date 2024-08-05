const Gameboard = (function() {   
    const gameboard =  [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    function renderBoard() {
        document.querySelectorAll(".cell").forEach((cell) => {
            const dataId = parseInt(cell.getAttribute("data-id"));
            const row = Math.floor((dataId - 1) / 3); 
            const column = (dataId - 1) % 3;
            cell.textContent = gameboard[row][column];
        })
    }

    function updateGameBoard(row, column, value) {
        if(gameboard[row][column] === "") {
            gameboard[row][column] = value;
            return true;
        }
        return false;
    }

    function checkStatus() {
        //row win status
        for(let i = 0; i < 3; i++) {
            if(gameboard[i][0] !== "" && gameboard[i][0] === gameboard[i][1] && gameboard[i][1] === gameboard[i][2]) {
                return gameboard[i][0];
            }
            if(gameboard[0][i] !== "" && gameboard[0][i] === gameboard[1][i] && gameboard[1][i] === gameboard[2][i]){
                return gameboard[0][i];
            }
        }

        //diagonal win status
        if(gameboard[0][0] !== "" && gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2]) {
            return gameboard[0][0];
        }

        if(gameboard[0][2] !== "" && gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0]) {
            return gameboard[0][2];
        }

        //draw status
        if(gameboard.every(row => row.every(cell => cell !== ""))) {
            return "draw";
        }

        return false;
    }

    return {
        updateGameBoard,
        renderBoard,
        checkStatus
    }
})();

const Game = (function() {
    let player1, player2;
    let currentPlayer;
    let isGameActive;

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
                startGame();
            } else {
                form.reportValidity();
            }
        });
    }

    function startGame() {
        isGameActive = true;
        currentPlayer = player1;
        updateTurnInfo();
        Gameboard.renderBoard();
        setCellListeners();
    }

    function updateTurnInfo() {
        const turnInfo = document.querySelector(".turn-info");
        turnInfo.textContent = `${currentPlayer}'s turn (${currentPlayer === player1 ? 'X' : 'O'})`
    }


    function setCellListeners() {
        document.querySelectorAll('.cell').forEach((cell) => {
            cell.addEventListener("click", handleCellInteraction)
        });
    }

    function handleCellInteraction(event) {
        if(!isGameActive) return;

        const cell = event.target;
        const char = currentPlayer === player1 ? 'X' : 'O';
        const dataId = parseInt(cell.getAttribute("data-id"));
        const row = Math.floor((dataId - 1) / 3); 
        const column = (dataId - 1) % 3;

        if(Gameboard.updateGameBoard(row, column, char)) {
            Gameboard.renderBoard();
            const status = Gameboard.checkStatus();
            if(status) {
                endGame();
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                updateTurnInfo();
            }
        }
    }

    function endGame() {
        isGameActive = false;
        const turnInfo = document.querySelector(".turn-info");
        const status = Gameboard.checkStatus();

        if(status === "draw") {
            turnInfo.textContent = "It's draw";
        } else {
            turnInfo.textContent = `${currentPlayer} wins!!!`
        }
    }

    return {
        setPlayers,
    };
   
})();

Game.setPlayers();
