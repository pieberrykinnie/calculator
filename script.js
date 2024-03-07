const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";

add = (num1, num2) => num1 + num2;
subtract = (num1, num2) => num1 - num2;
multiply = (num1, num2) => num1 * num2;
divide = (num1, num2) => num1 / num2;

function operate(operation, num1, num2) {
    let result;

    switch (operation) {
        case ADD:
            result = add(num1, num2);
            break;

        case SUBTRACT:
            result = subtract(num1, num2);
            break;

        case MULTIPLY:
            result = multiply(num1, num2);
            break;

        case DIVIDE:
            result = divide(num1, num2);
            break;

        default:
            break;
    }

    return result;
}

const container = document.querySelector("#container");
const output = container.querySelector(".output");
const buttons = container.querySelectorAll(".button");

let num1, num2, operation;
const buffer = [];
let inputBuffer = "";

buttons.forEach(button => button.addEventListener("click", (e) => {
    const option = e.target.value;
    const type = e.target.classList[1];
    
    if (option !== "Clear") {
        switch (type) {
            case "number":
                switch (inputBuffer) {
                    case ADD:
                    case SUBTRACT:
                        if (buffer.length > 0
                            && !isNaN(buffer[buffer.length - 1])) {
                            buffer.push(inputBuffer);
                            inputBuffer = "";
                        }
                        break;

                    case MULTIPLY:
                    case DIVIDE:
                        buffer.push(inputBuffer);
                        inputBuffer = "";
                        break;

                    default:
                        break;
                }

                inputBuffer += option;
                output.textContent = buffer.reduce((total, e) => total + " " + e, "") + " " + inputBuffer;
                break;

            case "operation":
                switch (inputBuffer) {
                    case "":
                        if (buffer.length !== 0 || option === ADD || option === SUBTRACT) {
                            inputBuffer = option;
                        }
                        break;

                    case ADD:
                    case SUBTRACT:
                        if ((buffer.length !== 0
                                && buffer[buffer.length - 1] !== MULTIPLY
                                && buffer[buffer.length - 1] !== DIVIDE)
                            || option === ADD || option === SUBTRACT) {
                            inputBuffer = option;
                        }
                        break;
                    
                    case MULTIPLY:
                    case DIVIDE:
                        if (option === ADD || option === SUBTRACT) {
                            buffer.push(inputBuffer);
                        }
                        inputBuffer = option;
                        break;

                    default:
                        buffer.push(Number(inputBuffer));
                        inputBuffer = option;
                        break;
                }
                output.textContent = buffer.reduce((total, e) => total + " " + e, "") + " " + inputBuffer;
                break;

            case "result":
                buffer.push(Number(inputBuffer));
                
                buffer[0] = computeResult(buffer);
                buffer.length = 1;

                output.textContent = buffer[0];

                inputBuffer = "";
                break;

            default:
                break;
        }
    } else {
        buffer.length = 0;
        inputBuffer = "";
        output.textContent = "";
    }
}))

function computeResult(arr) {
    let result = 0;

    if (arr.length === 1) {
        result = arr[0];
    } else if (arr.length > 1) {
        if (isNaN(arr[arr.length - 1])) {
            arr.pop();
        }

        let indexSign;

        do {
            indexSign = arr.findIndex(e => e === MULTIPLY || e === DIVIDE);

            if (indexSign !== -1) {
                result = arr[indexSign] === MULTIPLY
                ? multiply(arr[indexSign - 1], arr[indexSign + 1])
                : divide(arr[indexSign - 1], arr[indexSign + 1]);
            
                arr.splice(indexSign - 1, 3, result);
            }

        } while (indexSign !== -1)

        do {
            indexSign = arr.findIndex(e => e === ADD || e === SUBTRACT);

            if (indexSign !== -1) {
                result = arr[indexSign] === ADD
                ? add(arr[indexSign - 1], arr[indexSign + 1])
                : subtract(arr[indexSign - 1], arr[indexSign + 1]);
            
                arr.splice(indexSign - 1, 3, result);
            }

        } while (indexSign !== -1)
    }

    return result;
}
