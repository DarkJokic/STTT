import { MatrixBase } from "./Matrix.js"
import { PlayerMove } from "./ExternalFunctions.js"

const MainQuadrants = new MatrixBase(3, 3)

document.addEventListener("DOMContentLoaded", () => {
    let MainQuadrantsGrid = document.getElementById("MainGameGrid")

    for(let i = 1; i < MainQuadrants.Size + 1; i++){

        let Quadrant = document.createElement("div")
        MainQuadrantsGrid.append(Quadrant)
        Quadrant.setAttribute("class", "Quadrant")
        Quadrant.setAttribute("id", i)

        let QuadrantMatrix = new MatrixBase(3, 3)
        MainQuadrants.ChangeCellInfo(i, QuadrantMatrix)

        let QuadrantGrid = document.createElement("div")
        Quadrant.append(QuadrantGrid)
        QuadrantGrid.setAttribute("class", "GameGrid")

        for(let j = 1; j < MainQuadrants.Size + 1; j++){
            let SubQuadrant = document.createElement("div")
            QuadrantGrid.append(SubQuadrant)
            SubQuadrant.setAttribute("class", "Empty")

            SubQuadrant.addEventListener("click", () => {PlayerMove(SubQuadrant, QuadrantMatrix, i, j, MainQuadrants)})    
        }
    }
})