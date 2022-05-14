const grid = document.getElementById("grid");
const inputArray = []

makeGrid(10, 10)


// create object containing the key value of the input cells
function makeInputId(rows, cols) {

    for (r = 0; r < (rows + 1 ); r++) {
        for (c = 0; c < (cols ); c++) {
            const inputObject = {}
           
            let cellId = convertToNumberingScheme(c ).concat(r)
            inputObject[cellId] = "null"
            inputArray.push(inputObject)
        }
    }
}



// create input elements for grid using the array of key value objects
function makeGrid(rows, cols) {
    makeInputId(rows, cols)
    for (i = 0; i < (rows * cols ); i++) {
        const cellKey = Object.keys(inputArray[i])
        const cellValue = Object.values(inputArray[i])

        const inputCell = document.createElement("input");

        if (cellValue != "null") {
            inputCell.value = cellValue
        } 

        inputCell.id = cellKey;
        inputCell.placeholder = cellKey;
        inputCell.type = "text"
        grid.appendChild(inputCell);
        
    }
}




// create repeating alphabet 
function convertToNumberingScheme(number) {
    let baseChar = ("A").charCodeAt(0),
        letters  = "";
    do {
      number -= 1;
      letters = String.fromCharCode(baseChar + (number % 26)) + letters;
      number = (number / 26) >> 0; // quick `floor`
    } while(number > 0);
    return letters;
  }
