let CurrentPlayer = "X"

let Quadrant

let ToPlayIn 

let gameEnded = false

function ChangeInfoLog(Info){
    let InfoLog = document.getElementById("Info")

    InfoLog.innerHTML = Info
}

function CheckGameOver(Player, MatrixBase){
    let Consecutive = 0

    let Matrix = MatrixBase.Matrix

    for(let i = 0; i < MatrixBase.SizeX; i++){
        for(let j = 0; j < MatrixBase.SizeY; j++){
            if (Matrix[i][j] === Player){Consecutive++}
        }

        if(Consecutive === MatrixBase.SizeY){return true}

        Consecutive = 0
    }

    for (let i = 0; i < MatrixBase.SizeY; i++){

        for(let j = 0; j < MatrixBase.SizeX; j++){
            if ((Matrix[j][i]) === Player){Consecutive++}
        }
    
        if(Consecutive === MatrixBase.SizeX){return true}
    
        console.log(Consecutive)
    
        Consecutive = 0
    }
    
    for(let i=0; i < MatrixBase.SizeY; i++){
        if (!(Matrix[i][i] === Player)){continue}
        
        Consecutive++
    
        console.log(Consecutive)
    
    }
    
    if(Consecutive === MatrixBase.SizeY){return true}
    
    Consecutive = 0
    
    let column = 0
    
    for(let row = MatrixBase.SizeX - 1; row>=0; row--){
        if (!(Matrix[row][column] === Player)){column++; continue}
    
        column++
        Consecutive++
        console.log(Consecutive)
    
    }
    
    if(Consecutive === MatrixBase.SizeY){return true}

}

function freeSpot(MatrixBase){
     for(let i=1; i<MatrixBase.Size + 1; i++){
         if(MatrixBase.GetCellInfo(i) === undefined){return true}
     }
}

export function PlayerMove(Element, MatrixBase, PlayedQuadrant, PlayedCell, Board){

    if(gameEnded){return}

    if(typeof(Board.GetCellInfo(PlayedQuadrant)) === "string"){ChangeInfoLog("This quadrant is already won!"); return}

    if(Quadrant === undefined){Quadrant = PlayedQuadrant}

    if(!(Quadrant === PlayedQuadrant )){ChangeInfoLog(`You need to play in the highlighted quadrant!`); return}

    if(!(MatrixBase.GetCellInfo(PlayedCell) === undefined)){ChangeInfoLog("This spot is already taken!"); return}

    MatrixBase.ChangeCellInfo(PlayedCell, CurrentPlayer)

    Element.setAttribute("class", CurrentPlayer)

    if(CheckGameOver(CurrentPlayer, MatrixBase)){

        Board.ChangeCellInfo(PlayedQuadrant, CurrentPlayer);

        let ElementQuadrant = document.getElementById(String(PlayedQuadrant))

        let Container = ElementQuadrant.children[0]
        Container.classList.add(CurrentPlayer+"Won")

        let FieldsArr = Container.querySelectorAll('*')

        MatrixBase = undefined

        console.log(MatrixBase)

        for(const ThisElement of FieldsArr){
            console.log(ThisElement)
            ThisElement.remove()
        }

        if(CheckGameOver(CurrentPlayer, Board)){
            ChangeInfoLog(`${CurrentPlayer} has won!`)
            gameEnded = true
            ToPlayIn.classList.remove("WhereToPlay")
            return
        }

        Quadrant = undefined;

    }else{
        if(typeof(Board.GetCellInfo(PlayedCell)) === "string"  || !(freeSpot(Board.GetCellInfo(PlayedCell)))){Quadrant = undefined}else{Quadrant = PlayedCell}
    }
    
    if(CurrentPlayer === "X"){CurrentPlayer = "O"}else{CurrentPlayer = "X"}
    ChangeInfoLog("Current player: "+CurrentPlayer)

    if(ToPlayIn === undefined){
        ToPlayIn = document.getElementById(String(Quadrant))

        ToPlayIn.classList.add("WhereToPlay")
    }else{
        ToPlayIn.classList.remove("WhereToPlay")

        if(Quadrant === undefined){return}

        ToPlayIn = document.getElementById(String(Quadrant))
        ToPlayIn.classList.add("WhereToPlay")
    }
}

