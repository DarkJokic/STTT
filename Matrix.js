export class MatrixBase {
    Matrix = [];

    SizeX;

    SizeY;

    constructor(SizeX, SizeY) {

        this.SizeX = SizeX;

        this.SizeY = SizeY

        this.Size = SizeX * SizeY

        for(let i = 0; i < SizeX; i++){
            this.Matrix.push([])
        }

    }

    GetRow(input){
        let Result 

        Result = Math.ceil((input / this.SizeY)) - 1

        return Result;
    }

    GetColumn(input){
        let Result;

        let Mod = input % this.SizeY;

        Result = Mod - 1;

        if(Mod === 0) Result = this.SizeY - 1;

        return Result
    }

    GetCellInfo(input) {
        let Row = this.GetRow(input);

        let Column = this.GetColumn(input);

        return this.Matrix[Row][Column]
    }

    ChangeCellInfo(input, Value) {
        let Row = this.GetRow(input);

        let Column = this.GetColumn(input);

        this.Matrix[Row][Column] = Value

    }
    
}