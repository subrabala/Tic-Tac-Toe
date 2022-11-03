const X_CLASS = 'x'             
const O_CLASS = 'circle'
const cellElements= document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const restart= document.getElementById('restartbut') 
const winningMessage=document.getElementById('winboard')
const winningText=document.querySelector('[data-winning-text]')
let circleturn

start()


restart.addEventListener('click', start)
const possible_win =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



function start(){
    circleturn=false
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once:true})
    })
    boardhover()
    winningMessage.classList.remove('show')
}


function handleClick(e){
    const cell=e.target                                 //the circle we're hovering/targeting on
    const currentClass= circleturn? O_CLASS : X_CLASS
    markplace(cell, currentClass)                           //asking to mark This cell with This class
    
    if (checkWin(currentClass)){
        endGame(false)
    }
    else if (isDraw()){
        endGame(true)
    }
    else {
        swapTurn()
        boardhover()
    }
}


function markplace(cell, currentClass){ 
    cell.classList.add(currentClass)
}


function swapTurn(){
    circleturn=!circleturn;                     //if current class is circle, it'll change it to not circle i.e X
}


function boardhover(){                          //removes existing class
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(circleturn){                                 //if it was circle's turn, then now O class hover effects will be applied
        board.classList.add(O_CLASS)
    }
    else{
        board.classList.add(X_CLASS)                    //vice-versa
    }
}


function checkWin(currentClass){
    return possible_win.some( combination =>{                                //returns true if any of the combination is satisfied
        return combination.every(index =>{                                   //checks combination's every index 
            return cellElements[index].classList.contains(currentClass)      //returns true if the cell elements at that index contains the same class name
        })
    })
}


function isDraw(){                                                                          //if every cell is filled with and element of class x or O
    return [...cellElements].every(cell =>{                                                 //returns true (it's a draw)
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

function endGame(draw){                                                    //draw=true if isDraw() returns 1
    if (draw)                                                              //prints if draw or win and shows the modal
    {
        winningText.innerText= `DRAW!`
    }
    else 
    {
        winningText.innerText= `${ circleturn ? " O's" : "X's" } "Win!" `
        
    }
    winningMessage.classList.add('show')
}



const toggle =document.getElementsById("slide")
// const cellEach= document.getElementsById("cellEach")
toggle.addEventListener('click', darkMode)


function darkMode(){
    cellEach.classList.add('dark')


}