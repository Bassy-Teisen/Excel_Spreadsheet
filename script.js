const grid = document.getElementById("grid");
const inputArray = []

makeGrid(20, 20)


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
    let sideNum = 0
    let top = true
    makeInputId(rows, cols)
    for (i = 0; i < (rows * cols ); i++) {
        let cellKey = Object.keys(inputArray[i])
        let cellValue = Object.values(inputArray[i])
        
        // console.log(cellKey)
        const inputCell = document.createElement("input");
        
        // Get input from local storage
        const storage = localStorage.getItem(cellKey)
        
        // if the input has value from sotrage add it here
        if (storage) {
            inputCell.value = storage
        } 

        // Once a input cell is reached this stops they grey class being applied
        if (cellKey == "A1") {
            top = false
        }

        // applies the grey class to top row for nasic styling and disabling intput
        if (top == true) {
            inputCell.className = "grey"
            inputCell.disabled = true
            inputCell.value = convertToNumberingScheme(i )
        }
        // create the top and side of the grid from the stored ids for the input cells
        if (cellKey[0].includes("@") ){
            cellKey = sideNum
            inputCell.className = "grey"
            inputCell.disabled = true
            inputCell.value = cellKey
            sideNum++
            if (cellKey == 0 ) {
                cellKey = "Select All"
                // input.appendChild(cell).className = "grey"
                inputCell.classList.remove('grey') 
                inputCell.disabled = true
            }
        } 

        if (!inputCell.className) {
            inputCell.className = "cell"
        }


        inputCell.id = cellKey;
        inputCell.placeholder = cellKey;
        inputCell.type = "text"

        inputCell.addEventListener('change', valueCatcher);
        inputCell.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                const ans = addition(event)
                if (ans) {
                    inputCell.value = ans
                }
            }
        });
        inputCell.addEventListener('keypress', function(event) {
            if (event.key === "Enter") {
                const ans = sum(event)
                console.log(ans)
                if (ans) {
                    inputCell.value = ans
                }
            }

            // handles the font changes
            if (event.code === "KeyB" && event.ctrlKey) {
                addBold(event)
            }
            if (event.code === "KeyI" && event.ctrlKey) {
                addItalic(event)
            }
            if (event.code === "KeyU" && event.ctrlKey  && event.shiftKey) {
                addUnderline(event)
            }
        });
        grid.appendChild(inputCell);
        
    }
}

// function that clears local storage
function refreshCells() {
    localStorage.clear()
    reload = location.reload();
}

// function that adds and removes bold font
function addBold(e) { 
    let target = e.target
    console.log(e.target)

    if(target.style.fontWeight=="bold")
      target.style.fontWeight="normal";
    else
      target.style.fontWeight="bold";
}

// function that adds and removes italic font italic
function addItalic(e) { 
    let target = e.target
    console.log(e.target)

    if(target.style.fontStyle=="italic")
      target.style.fontStyle="normal";
    else
      target.style.fontStyle="italic";
}

// function that adds and removes underline font
function addUnderline(e) { 
    let target = e.target
    console.log(e.target)

    if(target.style.textDecoration =="underline")
      target.style.textDecoration="none";
    else
      target.style.textDecoration="underline";
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
function inputArrayPusher(key, val) {
    inputArray.forEach( item => {
        let itemKey = Object.keys(item)
        const inpValue = document.getElementById(itemKey)
        if (itemKey == key) {
            item[itemKey] = val.toString()
            // set the local storage
            localStorage.setItem(itemKey, val)
        }
    })
}

// handle the event and set value in array
function valueCatcher(e) {
    let textValue = e.target.value;
    let inputId = inputCollection.textId = e.target.id;
    let cellValue = inputArrayPusher(inputId , textValue)
    if (cellValue == true) {

    }
}

function addition(e) {
    let inputValue = e.target.value
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
        return ans
    }
}

//  addition math function 
function inputAdder( first, second) {
    let ans = 0
    ans = Math.round(first) + Math.round(second) 
    return ans
}


//  need to seprate numbers from letters then subtract the ids number then iterate over each value in column for ans anount of times
function sum(e) {
    let inputValue = e.target.value
    let itemId = e.target.id
    if (inputValue.includes("=sum")) {
        const removeSum = inputValue.replace('=sum(', '')
        const removeAll = removeSum.replace(')', '')
        const splitFirst = removeAll.split(":")
        
        let containNumbers = []
        let containCharacters = []
        let count = 0
        for (i = 0; i < splitFirst.length; i++) {
            const splitAll = splitFirst[i].split("")
            let containNumber = []
            let containCharacter = []
            for (x = 0; x < splitAll.length; x++) {
                const parsed = parseInt(splitAll[x])
                if (Number.isInteger(parsed)) {
                    containNumber.push(parsed)
                } else {
                    if (typeof(splitAll[x]) == "string")
                    containCharacter.push(splitAll[x])
                }
            }
            containNumbers.push(containNumber)
            containCharacters.push(containCharacter)
        }
// Need to add option for firstNum and secondNum to be swapped
        const character = containCharacters[0].join('')
        const firstNum = containNumbers[1].join('')
        const secondNum = containNumbers[0].join('')
        count = Math.round(firstNum) - Math.round(secondNum)
        let answer = 0
        
        // Need to retrieve values of cells using their id which is created by adding to the number
        for (i = 0; i < count; i++) {
            let iteratNum = Math.round(secondNum) + Math.round(i)
            let iteratKey =  character + iteratNum 
            inputArray.forEach( item => {
                itemKey = Object.keys(item)
                const inputCell = document.getElementById(itemKey)
                const cellInt = inputCell ? parseInt(inputCell.value) : ""
                if (itemKey == iteratKey) {
                    if (Number.isInteger(cellInt)) {
                        answer = Math.round(answer) + Math.round(cellInt)
                        
                    }
                }
            })
            // item[itemKey] = answer.toString()
        }
        inputArrayPusher(itemId, answer)
        return answer
    }
}


