//constantes
const status_display =  document.querySelector('.game-notification'),
    game_state = ['','','','','','','','','',''],
    winnings = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
],
win_message = () =>`El jugador ${currentPlayer} ha ganado`,
draw_message = () => `El juego ha terminado en empate!`,
current_player_turn = () => `Turno del jugador ${currentPlayer}`


//variables
let gameActive = true,
    currentPlayer = 'O'

//funciones
function main(){
    handleStatusDisplay(current_player_turn())
    listeners()
}

main()

function handleStatusDisplay(message){
    status_display.innerHTML = message
}

function listeners () {
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame)
}

function handleCellClick (clickedEvent){
    const clickedCell = clickedEvent.target
    if(clickedCell.classList.contains('game-cell')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        console.log(clickedCellIndex)
        if(game_state[clickedCellIndex] !== '' || !gameActive){
            return
        }
        handleCellPlayed (clickedCell, clickedCellIndex)
        handleResultValidation()
    }
    console.log(clickedCell)
}

function handleRestartGame(){
    gameActive = true
    currentPlayer = 'O',
    restartGameState()
    handleStatusDisplay(current_player_turn())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerText = '')
}

function restartGameState(){
    let  i = game_state.length
    while(i--) {
        gameActive[i] = ''
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex){
    game_state[clickedCellIndex] = currentPlayer
    clickedCell.innerText = currentPlayer
}

function handleResultValidation (){
    let roundWon = false
    for (let i = 0; i < winnings.length; i++){
       const winCondition = winnings[i]
       let position1 = game_state[winCondition[0]],
        position2 =  game_state[winCondition[1]],
       position3 = game_state[winCondition[2]]
       if(position1 === '' || position2 === '' || position3 === ''){
        continue;
       } 
       if(position1 === position2 && position2 === position3){
        roundWon = true
        break;
       }
    }
    if(roundWon){
        handleStatusDisplay(win_message())
        gameActive = false
        return
    }

    let roundraw = !game_state.includes('')

    if (roundraw){
        handleStatusDisplay(draw_message())
        game_active = false
        return
    }

    handlePlayerChange()
}

function handlePlayerChange () {
    currentPlayer = (currentPlayer === 'X') ?'O' : 'X'
    handleStatusDisplay(current_player_turn()) 
}