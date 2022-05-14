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
        inputCell.addEventListener('change', valueCatcher);
        inputCell.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                console.log(addition(event))
                const ans = addition(event)
                if (ans) {
                    inputCell.value = ans
                }
            }
        });

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



// Capture the value being enter into individual cells
const inputCollection = document.querySelectorAll('input');

// check input and place in array
function inputChecker(key, val) {
    inputArray.forEach( item => {
        let itemKey = Object.keys(item)
        const inpValue = document.getElementById(itemKey)
        if (itemKey == key) {
            item[itemKey] = val.toString()
        }
    })
}

// handle the event and set value in array
function valueCatcher(e) {
    let textValue = e.target.value;
    let inputId = inputCollection.textId = e.target.id;
    let cellValue = inputChecker(inputId , textValue)
    if (cellValue == true) {

    }
}

function addition(e) {
    let inputValue = e.target.value
    let inputKey = e.target.id
    let inputAns = ""
    if (inputValue.includes("=") && inputValue.includes("+")) {
        
        const removeEqual = inputValue.replace('=', '')
        const splitInput = removeEqual.split("+")

        let firstKey = splitInput[0]
        let secondKey = splitInput[1]
        let firstNum = 0
        let secondNum = 0

        inputArray.forEach( item => { 
            let itemKey = Object.keys(item)
            if (itemKey == firstKey) {
                firstNum = Object.values(item)
            }
            if (itemKey == secondKey) {
                secondNum = Object.values(item)
            }
        })
        let ans = inputAdder(secondNum, firstNum)
        inputAns = inputChecker(inputKey, ans)
        return ans
    }
}
console.log(inputArray)

//  addition math function 
function inputAdder( first, second) {
    let ans = 0
    ans = Math.round(first) + Math.round(second) 
    return ans
}


