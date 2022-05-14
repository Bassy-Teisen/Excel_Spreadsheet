const grid = document.getElementById("grid");

// create input elements for grid
function makeGrid(rows, cols) {
    for (r = 0; r < (rows + 1 ); r++) {
        for (c = 0; c < (cols ); c++) {
            const inputCell = document.createElement("input");
            let cell = convertToNumberingScheme(c ).concat(r)
            inputCell.id = cell;
            inputCell.placeholder = cell;
            inputCell.type = "text"
            grid.appendChild(inputCell);

        }
    }
}

makeGrid(10,10)




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
