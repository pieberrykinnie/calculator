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
                            && (buffer[buffer.length - 1] === MULTIPLY
                            || buffer[buffer.length - 1] === DIVIDE)) {
                                break;
                        }

                    case MULTIPLY:
                    case DIVIDE:
                        buffer.push(inputBuffer);
                        inputBuffer = "";
                        break;

                    default:
                        break;
                }

                inputBuffer += option;
                break;

            case "operation":
                switch (inputBuffer) {
                    case "":
                        if (option === ADD || option === SUBTRACT) {
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
                break;

            case "result":
                break;

            default:
                break;
        }
    } else {
        buffer.length = 0;
        inputBuffer = "";
        output.textContent = "";
    }

    output.textContent = buffer.reduce((total, e) => total + " " + e, "") + " " + inputBuffer;
    console.log(buffer);
    
}))
