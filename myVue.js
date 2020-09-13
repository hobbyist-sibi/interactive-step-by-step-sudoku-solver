var app = new Vue({
    el: '#app',
    data: {
        sudoku1: [
            [6,0,0,0,9,5,0,0,0],
            [2,0,0,0,0,0,1,7,0],
            [0,0,0,0,0,0,0,3,0],
            [4,0,0,0,0,0,2,0,0],
            [0,0,0,7,0,0,0,0,5],
            [0,0,0,1,0,0,0,0,0],
            [0,0,0,0,0,8,4,0,0],
            [0,7,0,0,4,0,0,0,0],
            [0,3,0,0,0,0,0,0,0]
        ],
        sudoku: [
            [2,1,0,0,0,0,4,0,0],
            [0,0,0,0,2,8,0,0,0],
            [0,0,0,0,0,0,1,0,6],
            [0,0,0,5,0,7,6,0,8],
            [8,3,0,0,0,0,0,0,7],
            [0,0,0,0,1,6,0,0,3],
            [0,4,2,3,0,0,0,0,0],
            [0,5,3,0,0,0,0,7,0],
            [0,0,7,9,0,0,0,0,0]
        ],
        beamRows: [false,false,false,false,false,false,false,false,false],
        beamColumns: [false,false,false,false,false,false,false,false,false],
        beamBoxes: [false,false,false,false,false,false,false,false,false],
        beamCells: [
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false,false,false]
        ],
        colorMask: [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ],
        answerButtons: [],
        suggestedNumber: 0,
        suggestedCell:[]
    },
    methods: {
        beamNumber: function(number){
            this.sudoku.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    if(cell===number){
                        this.beamRow(rowIndex);
                        this.beamColumn(columnIndex);
                    }
                });
            });
        },
        beamColumn: function(columnIndex){
            this.beamColumns.splice(columnIndex, 1, true);
        },
        offBeamColumn: function(columnIndex){
            this.beamColumns.splice(columnIndex, 1, false);
        },
        beamRow: function(rowIndex){
            this.beamRows.splice(rowIndex, 1, true);
        },
        offBeamRow: function(rowIndex){
            this.beamRows.splice(rowIndex, 1, false);
        },
        beamCell: function(rowIndex, columnIndex){
            this.beamCells[rowIndex].splice(columnIndex,1,true);
        },
        offBeamCell: function(rowIndex, columnIndex){
            this.beamCells[rowIndex].splice(columnIndex, 1, false);
        },
        offBeam: function(){
            this.beamRows.splice(0,9,false,false,false,false,false,false,false,false,false);
            this.beamColumns.splice(0,9,false,false,false,false,false,false,false,false,false);

            this.beamCells.splice(0,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(1,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(2,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(3,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(4,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(5,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(6,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(7,1,[false,false,false,false,false,false,false,false,false]);
            this.beamCells.splice(8,1,[false,false,false,false,false,false,false,false,false]);
        },
        getBoxIndex: function(rowIndex, columnIndex){
            if(rowIndex < 3){
                if(columnIndex < 3)
                    return 0;
                else if(columnIndex > 5)
                    return 2;
                else
                    return 1;
            }else if(rowIndex > 5){
                if(columnIndex < 3)
                    return 6;
                else if(columnIndex > 5)
                    return 8;
                else
                    return 7;
            }else{
                if(columnIndex < 3)
                    return 3;
                else if(columnIndex > 5)
                    return 5;
                else
                    return 4;
            }
        },
        getRowAndColumnFromBox: function(rowIndex, columnIndex){
            var row = [
                [0,0,0,1,1,1,2,2,2],
                [0,0,0,1,1,1,2,2,2],
                [0,0,0,1,1,1,2,2,2],
                [3,3,3,4,4,4,5,5,5],
                [3,3,3,4,4,4,5,5,5],
                [3,3,3,4,4,4,5,5,5],
                [6,6,6,7,7,7,8,8,8],
                [6,6,6,7,7,7,8,8,8],
                [6,6,6,7,7,7,8,8,8]]

            var column = [
                [0,1,2,0,1,2,0,1,2],
                [3,4,5,3,4,5,3,4,5],
                [6,7,8,6,7,8,6,7,8],
                [0,1,2,0,1,2,0,1,2],
                [3,4,5,3,4,5,3,4,5],
                [6,7,8,6,7,8,6,7,8],
                [0,1,2,0,1,2,0,1,2],
                [3,4,5,3,4,5,3,4,5],
                [6,7,8,6,7,8,6,7,8]]
            return [row[rowIndex][columnIndex], column[rowIndex][columnIndex]];
        },
        clickedCell: function(rowIndex, columnIndex){
            this.resetColorMask();
            var number = this.sudoku[rowIndex][columnIndex];
            this.sudoku.forEach((rows, sRowIndex) => {
                rows.forEach((cell, sColumnIndex) => {
                    if(cell === number){
                        this.colorMask[sRowIndex].splice(sColumnIndex,1,5);
                    }
                });
            });
            this.suggestAnswer(number);
        },
        getBoxMask: function(number){
            var mask = [
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]
            ];
            mask.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    var tmp = [];
                    if(this.sudoku[rowIndex][columnIndex] > 0 ||
                    this.rows[rowIndex].indexOf(number) >= 0 || 
                    this.columns[columnIndex].indexOf(number) >= 0 || 
                    this.boxes[this.getBoxIndex(rowIndex, columnIndex)].indexOf(number) >= 0){
                        mask[rowIndex].splice(columnIndex,1,1);
                    }
                });
            });
            return mask;
        },
        updatedCell: function(rowIndex, columnIndex){
            var val = 0;
            if(parseInt(this.sudokuObjectArray[rowIndex][columnIndex].value) > 0){
                val = parseInt(this.sudokuObjectArray[rowIndex][columnIndex].value);
            }
            this.sudoku[rowIndex].splice(columnIndex, 1, val);
            if(val > 0){
                //this.beamNumber(val);
            }else
                this.offBeam();
        },
        getMaskRows: function(mask){
            var tmpRows = [];
            mask.forEach(row => {
                tmpRows.push(row);
            });
            return tmpRows;
        },
        getMaskColumns: function(mask){
            var tmpColumns = [[],[],[],[],[],[],[],[],[]];
            mask.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    tmpColumns[columnIndex].push(cell);
                });
            });
            return tmpColumns;
        },
        getMaskBoxes: function(mask){
            var tmpBoxes = [[],[],[],[],[],[],[],[],[]];
            mask.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    if(rowIndex < 3){
                        if(columnIndex < 3)
                            tmpBoxes[0].push(cell);
                        else if(columnIndex > 5)
                            tmpBoxes[2].push(cell);
                        else
                            tmpBoxes[1].push(cell);
                    }else if(rowIndex > 5){
                        if(columnIndex < 3)
                            tmpBoxes[6].push(cell);
                        else if(columnIndex > 5)
                            tmpBoxes[8].push(cell);
                        else
                            tmpBoxes[7].push(cell);
                    }else{
                        if(columnIndex < 3)
                            tmpBoxes[3].push(cell);
                        else if(columnIndex > 5)
                            tmpBoxes[5].push(cell);
                        else
                            tmpBoxes[4].push(cell);
                    }
                    return tmpBoxes;
                });
            });
            return tmpBoxes;
        },
        resetColorMask: function(){
            this.colorMask.splice(0,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(1,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(2,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(3,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(4,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(5,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(6,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(7,1,[0,0,0,0,0,0,0,0,0]);
            this.colorMask.splice(8,1,[0,0,0,0,0,0,0,0,0]);
            this.suggestedCell.splice(0,2);
        },
        updateColorMask: function(answer){
            var number = answer.number;
            var rows = answer.rows;
            var columns = answer.columns;
            var box = answer.box;
            this.resetColorMask();

            this.suggestedNumber = number;
            this.suggestedCell.splice(0,2,answer.row, answer.column);

            this.boxes[box].forEach((b, bIndex) => {
                if(b > 0){
                    this.colorMask[this.getRowAndColumnFromBox(box, bIndex)[0]].splice(this.getRowAndColumnFromBox(box, bIndex)[1],1,3);
                }
            });
            //this.beamBoxes.splice(box,1,true);

            if(this.getMaskBoxes(this.colorMask)[box].filter(c => c == 0).length === 1)
                return;
            
            for(var i = 0; i < rows.length; i++){
                this.colorMask.splice(rows[i], 1, [1,1,1,1,1,1,1,1,1]);
                this.colorMask[rows[i]].splice(this.rows[rows[i]].indexOf(number),1,2);
                if(this.getMaskBoxes(this.colorMask)[box].filter(c => c == 0).length === 1)
                    break;
            }

            if(this.getMaskBoxes(this.colorMask)[box].filter(c => c == 0).length === 1){
                this.colorMask[answer.row].splice(answer.column,1,4);
                return;
            }

            for(var i = 0; i < columns.length; i++){
                this.colorMask.forEach(m => {
                    m.splice(columns[i],1,1);
                });
                this.colorMask[this.columns[columns[i]].indexOf(number)].splice(columns[i],1,2);
                if(this.getMaskBoxes(this.colorMask)[box].filter(c => c == 0).length === 1)
                    break;
            }

            if(this.getMaskBoxes(this.colorMask)[box].filter(c => c == 0).length === 1){
                this.colorMask[answer.row].splice(answer.column,1,4);
                return;
            }
            
            this.colorMask[answer.row].splice(answer.column,1,4);
            return;            
            
        },
        suggestAnswer: function(number){
            var mask = this.getBoxMask(number);
            var maskRows = this.getMaskRows(mask);
            var maskColumns = this.getMaskColumns(mask);
            var maskBoxes = this.getMaskBoxes(mask);

            /* Looping thru each maskBoxes to find if in any box has
            exactly 1 vacant spot for the number. if yes we can fill the answer there */
            for(var i = 0; i < 9; i++){
                var beamRows = [];
                var beamColumns = [];
                //If exactly one vacant spot?
                if(maskBoxes[i].filter(e => e == 0).length == 1){
                    var answerRow = this.getRowAndColumnFromBox(i, maskBoxes[i].indexOf(0))[0];
                    var answerColumn = this.getRowAndColumnFromBox(i, maskBoxes[i].indexOf(0))[1];
                    var answerBoxRow = i;
                    var answerBoxColumn = maskBoxes[i].indexOf(0);

                    /* Go thru each cell of the box to find the contributing factors for answer */
                    for(var j = 0; j < 9; j++){
                        var assessmentRow = this.getRowAndColumnFromBox(i, j)[0];
                        var assessmentColumn = this.getRowAndColumnFromBox(i, j)[1];
                        var assessmentBoxRow = i;
                        var assessmentBoxColumn = j;

                        /*  */
                        if(this.rows[assessmentRow].indexOf(number) >= 0){
                            //if(this.getBoxIndex(assessmentRow, this.rows[assessmentRow].indexOf(number))[0] != answerBoxRow){
                                if(beamRows.length>0){
                                    if(beamRows.indexOf(assessmentRow) < 0){
                                        beamRows.push(assessmentRow);
                                        //console.log(this.getBoxIndex(answerRow, answerColumn));
                                    }
                                }else{
                                    beamRows.push(assessmentRow);
                                    //console.log(this.getBoxIndex(answerRow, answerColumn));
                                }
                            //}
                        }

                        if(this.columns[assessmentColumn].indexOf(number) >= 0){
                            //if(this.getBoxIndex(this.columns[assessmentColumn].indexOf(number), assessmentColumn)[0] != answerBoxRow){
                                if(beamColumns.length > 0){
                                    if(beamColumns.indexOf(assessmentColumn) < 0){
                                        beamColumns.push(assessmentColumn);
                                        console.log(this.getBoxIndex(answerRow, answerColumn));
                                    }
                                }else{
                                    beamColumns.push(assessmentColumn);
                                    console.log(this.getBoxIndex(answerRow, answerColumn));
                                }
                            //}
                        }
                    }
                    
                    var answer = {
                        'row':this.getRowAndColumnFromBox(i, maskBoxes[i].indexOf(0))[0],
                        'column':this.getRowAndColumnFromBox(i, maskBoxes[i].indexOf(0))[1],
                        'box': i,
                        'number':number,
                        'text': `i = ${i} : Box logic: ${number} at row ${this.getRowAndColumnFromBox(i, maskBoxes[i].indexOf(0))[0] + 1} column ${this.getRowAndColumnFromBox(i, maskBoxes[i].indexOf(0))[1] + 1}`,
                        'show':true,
                        'logic': 'Box',
                        'rows': beamRows,
                        'columns': beamColumns
                    }
                    if(this.answerButtons.filter(e => e.row === answer.row && e.column === answer.column).length === 0){
                        this.answerButtons.push(answer);
                       
                    }
                    console.log(answer);
                    break;
                }
                /*
                if(maskRows[i].filter(e => e == 0).length == 1){
                    var answer = {
                        'row':i,
                        'column':maskRows[i].indexOf(0),
                        'number':number,
                        'text': `i = ${i} : Row logic: ${number} at row ${i} column ${maskRows[i].indexOf(0)}`,
                        'show':true,
                        'logic': 'Row'
                    }
                    this.answerButtons.push(answer);
                    break;
                }

                if(maskColumns[i].filter(e => e == 0).length == 1){
                    var answer = {
                        'row':maskColumns[i].indexOf(0),
                        'column':i,
                        'number':number,
                        'text': `i = ${i} : Column logic: ${number} at row ${maskColumns[i].indexOf(0)} column ${i}`,
                        'show':true,
                        'logic': 'Column'
                    }
                    this.answerButtons.push(answer);
                    break;
                }  */
            }
        },
        updateAnswer: function(answer){
            this.resetColorMask()
            this.sudoku[answer.row].splice(answer.column, 1, answer.number);
            answer.show = false;
            this.suggestAnswer(answer.number);
        },
        getMaskColor: function (id){
            switch(id){
                case 1:
                    return '#ff000023'
                    break;
                case 2:
                    return '#ff000023'
                    break;
                case 3:
                    return '#ff000023'
                    break;
                default:
                    return '#f4433600';
            }
            
        },
        isCellType: function(type, rowIndex, columnIndex){
            switch(type){
                case 'normal':
                    if(this.colorMask[rowIndex][columnIndex] === 0){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                case 'highlight':
                    if(this.colorMask[rowIndex][columnIndex] === 1 || this.colorMask[rowIndex][columnIndex] === 3){
                        return true;
                    }else{
                        return false;
                    }
                    break;
                case 'highlight-emphasise':
                    if(this.colorMask[rowIndex][columnIndex] === 2){
                        return true;
                    }else{
                        return false;
                    }
                    break; 
                case 'suggestion':
                    if(this.colorMask[rowIndex][columnIndex] === 4){
                        return true;
                    }else{
                        return false;
                    }
                    break; 
                case 'yellow-highlight':
                    if(this.colorMask[rowIndex][columnIndex] === 5){
                        return true;
                    }else{
                        return false;
                    }
                    break;               
                default:
                    return false;
            }
        },
        isSuggestedBox(rowIndex, columnIndex){
            return rowIndex === this.suggestedCell[0] && columnIndex === this.suggestedCell[1];
        }
    },
    computed: {
        sudokuObjectArray: function(){
            var sudokuObjectArray = [];
            this.sudoku.forEach((row, rowIndex) => {
                var tmpRows = [];
                row.forEach((cell, columnIndex) => {
                    if(cell > 0){
                        tmpRows.push({'value': cell, 'type':'q'});
                    }else{
                        tmpRows.push({'type': 'a'});
                    }
                });
                sudokuObjectArray.push(tmpRows);
            });
            return sudokuObjectArray;
        },
        rows: function(){
            var tmpRows = [];
            this.sudoku.forEach(row => {
                tmpRows.push(row);
            });
            return tmpRows;
        },
        columns: function(){
            var tmpColumns = [[],[],[],[],[],[],[],[],[]];
            this.sudoku.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    tmpColumns[columnIndex].push(cell);
                });
            });
            return tmpColumns;
        },
        boxes: function(){
            var tmpBoxes = [[],[],[],[],[],[],[],[],[]];
            this.sudoku.forEach((row, rowIndex) => {
                row.forEach((cell, columnIndex) => {
                    if(rowIndex < 3){
                        if(columnIndex < 3)
                            tmpBoxes[0].push(cell);
                        else if(columnIndex > 5)
                            tmpBoxes[2].push(cell);
                        else
                            tmpBoxes[1].push(cell);
                    }else if(rowIndex > 5){
                        if(columnIndex < 3)
                            tmpBoxes[6].push(cell);
                        else if(columnIndex > 5)
                            tmpBoxes[8].push(cell);
                        else
                            tmpBoxes[7].push(cell);
                    }else{
                        if(columnIndex < 3)
                            tmpBoxes[3].push(cell);
                        else if(columnIndex > 5)
                            tmpBoxes[5].push(cell);
                        else
                            tmpBoxes[4].push(cell);
                    }
                    return tmpBoxes;
                });
            });
            return tmpBoxes;
        },
        
    }
});