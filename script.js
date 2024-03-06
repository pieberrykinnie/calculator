add = (num1, num2) => num1 + num2;
subtract = (num1, num2) => num1 - num2;
multiply = (num1, num2) => num1 * num2;
divide = (num1, num2) => num1 / num2;

let num1, num2, operation;

function operate(operation, num1, num2) {
    const ADD = "+";
    const SUBTRACT = "-";
    const MULTIPLY = "*";
    const DIVIDE = "/";

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
