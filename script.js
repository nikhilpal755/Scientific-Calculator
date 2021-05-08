// I need to catch my keys and output window
const operation_element = document.querySelector(".operation .value");

const result_element = document.querySelector(".result .value");

const input_element = document.querySelector(".keys");


const POWER = "POWER(", FACTORIAL = "FACTORIAL(";
//------------------------------------------- CALCULATOR BUTTONS----------------------------------------------------
let calculator_buttons = [
    {
        name: "rad",
        symbol: "Rad",
        formula: false,
        type: "key"
    },
    {
        name: "deg",
        symbol: "Deg",
        formula: false,
        type: "key"
    },
    {
        name: "square-root",
        symbol: "√",
        formula: "Math.sqrt",
        type: "math_function"
    },
    {
        name: "square",
        symbol: "x²",
        formula: POWER,
        type: "math_function"
    },
    {
        name: "open-parenthesis",
        symbol: "(",
        formula: "(",
        type: "number"
    },
    {
        name: "close-parenthesis",
        symbol: ")",
        formula: ")",
        type: "number"
    },
    {
        name: "clear",
        symbol: "C",
        formula: false,
        type: "key"
    },
    {
        name: "delete",
        symbol: "⌫",
        formula: false,
        type: "key"
    },
    {
        name: "pi",
        symbol: "π",
        formula: "Math.PI",
        type: "number"
    },
    {
        name: "cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    }, {
        name: "sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    }, {
        name: "tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    }, {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    }, {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    }, {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    },
    {
        name: "division",
        symbol: "÷",
        formula: "/",
        type: "operator"
    },
    {
        name: "e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },
    {
        name: "acos",
        symbol: "acos",
        formula: "inv_trigo(Math.acos,",
        type: "trigo_function"
    }, {
        name: "asin",
        symbol: "asin",
        formula: "inv_trigo(Math.asin,",
        type: "trigo_function"
    }, {
        name: "atan",
        symbol: "atan",
        formula: "inv_trigo(Math.atan,",
        type: "trigo_function"
    },
    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    }, {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    }, {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    }, {
        name: "multiplication",
        symbol: "×",
        formula: "*",
        type: "operator"
    }, {
        name: "factorial",
        symbol: "×!",
        formula: FACTORIAL,
        type: "math_function"
    }, {
        name: "exp",
        symbol: "exp",
        formula: "Math.exp",
        type: "math_function"
    }, {
        name: "ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    }, {
        name: "log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    }, {
        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    }, {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    }, {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    }, {
        name: "subtraction",
        symbol: "–",
        formula: "-",
        type: "operator"
    }, {
        name: "power",
        symbol: "x<span>y</span>",
        formula: POWER,
        type: "math_function"
    }, {
        name: "ANS",
        symbol: "ANS",
        formula: "ans",
        type: "number"
    }, {
        name: "percent",
        symbol: "%",
        formula: "/100",
        type: "number"
    }, {
        name: "comma",
        symbol: ".",
        formula: ".",
        type: "number"
    }, {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    }, {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    }, {
        name: "addition",
        symbol: "+",
        formula: "+",
        type: "operator"
    }
];

const OPERATORS = ["+", "-", "*", "/"];
let ans = 0;
var flag =0;


//------------------------------------------- creating calculator buttons-------------------------------------------

function createCalculatorbutton() {
    const btn_per_row = 8;
    let added_btns = 0;
    calculator_buttons.forEach(button => {

        // Add rows in input_element
        if (added_btns % btn_per_row == 0) {
            input_element.innerHTML += `<div class="row">  </div>`;
        }
        row = document.querySelector(".row:last-child");

        row.innerHTML += `<button id = "${button.name}"> ${button.symbol}  </button>`;
        added_btns++;
    })

}

createCalculatorbutton();

// Now we need make our keys function
//------------------------- Using AddEventListener----------------------------

input_element.addEventListener("click", event => {
    let target_btn = event.target;// gives an element which is been clicked

    calculator_buttons.forEach(button => {
        if (button.name == target_btn.id) {
            functionality(button);// do all the functionality of button
        }
    })
})

//--------------------- Rad and Deg-----------------------
let Radian = true;

const rad_btn = document.getElementById('rad');
const deg_btn = document.getElementById('deg');

// selecting default key as rad
rad_btn.classList.add("active-angle");

// this function is used to toggle between 2 buttons i.e if someone clicks on the "deg" button then deg button must be activated,else if someone clicks on the rad button then it must be activated,so to perform those kind of actions i need to use the toggle method present in the classList as shown ↓


function angletoggler() {
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}
//---------------------------------------------------------------------------

//  Stroing data
let data = {
    operation: [],// storing operation
    formula: [],// storing result
}


/// -------------------------------------  Functaionlity of each button -----------------------------------------------------

function functionality(button) {
    console.log(button);
    // if the pressed button is number -->> 0-9 , (, ) , PI , e , ANS , % , .
    if (button.type == "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    }

    // if the pressed button is operator  -->> + , - , / , * 

    else if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    }

    // if the pressed button is -->  rad , deg , clear , delete
    else if (button.type == "key") {

        if (button.name == "clear") {
            data.operation = [];
            data.formula = [];
            update_output_result(0);

        }

        else if (button.name == "delete") {
            data.operation.pop();
            data.formula.pop();
        }

        // working on deg and rad button 
        else if (button.name == "rad") {
            radian = true;
            angletoggler();
        }
        else if (button.name == "deg") {
            radian = false;
            angletoggler();

        }

    }

    // if the pressed button is math_function -->> sqrt , x^2 , ! , exp , ln , log , pow 
    else if (button.type == "math_function") {
        if (button.name == 'factorial') {
            symbol = "!";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);


        }
        else if (button.name == 'power') {
            symbol = "^(";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);

        }
        else if (button.name == 'square') {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");

        }
        else if (button.name == 'square-root') {
            flag = 1;
            // document.getElementById('square-root').innerHTML = button.formula;   
            data.operation.push(button.symbol);



        }
        else if (button.name == 'ln' || button.name == 'log' || button.name == 'exp') {
            data.operation.push(button.symbol + '(');
            data.formula.push(button.formula + '(');

        }
        else {

            data.operation.push(button.symbol);
            data.formula.push(button.formula);
            console.log(data.formula);

        }

    }

    // if the pressed button is trigo_function -->> sin , cos, tan , asin , acos , atan
    else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + '(');
        data.formula.push(button.formula);

    }
    else if (button.type == 'calculate') {// calculate

        formula_str = data.formula.join('');

        //------------------------------------- Fixing power base ---------------------------------------------

        // powersearch result will find the indices where the "^" was present,as in case of formula string there was a problem,it would be like : 4mathpow10,which is wrong,so we need to replace that with mathpow(4,10),so we need to update that!,so for that we need the indices of "^",same is the case with "!"

        // searching at which indexes our power keyword is present in our formula array

        let POWER_SEARCH_RESULT = search(data.formula, POWER);



        // POWER_SEARCH_RESULT is an array which conatain all the indexes of where keyword "POWER" has occured  


        // powerbasegetter function,this function will return the bases which are to be used as exponents!

        const BASES = powerbasegetter(data.formula, POWER_SEARCH_RESULT);

        // after getting the bases,we're gonna replace those bases,originally it was like : 4pow10 so after getting the bases,the bases list will be having 4 as in this case as the i/p is 4pow10,so we will change this 4pow10 to pow(4,10) which is exaclty what we want!

        console.log(BASES);

        // this for loop will replace all the power strings having strings like 4pow10 to pow(4,10)..

        BASES.forEach(base => {
            let toreplace = base + POWER;  // base POWER(
            let replacement = "Math.pow(" + base + ","; // pow(base, )

            formula_str = formula_str.replace(toreplace, replacement);
            // console.log(formula_str);
        })


        //-------------------------------------- fixing the factorial count------------------------------------
        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

        const NUMBERS = factorialnumgetter(data.formula, FACTORIAL_SEARCH_RESULT);

        //  console.log(NUMBERS);

        // replacing the factorial
        NUMBERS.forEach(number => {
            // console.log(number.toReplace)
            // console.log(number.replacement)
            formula_str = formula_str.replace(number.toReplace, number.replacement);
        })


    



        // this try-catch block is used to check whether the computation is possible or not,so always the try block will be executed the first and if that block throws an error,it is caught by the catch block and the error is checked which type is it and all!

        let result;

        try {
            result = eval(formula_str);


        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "SyntaxError"
                update_output_result(result);
                return;
            }
        }

        // storing the curretly calculated expression,so that i can use it for further use!
        ans = result; // this is used in my ANS key
        data.operation = [result];
        data.formula = [result];

        update_output_result(result);
        return;
    }


    // data.operation.join('') will join all the characters of the data.operation array and will make a single string!,and inorder to evalute that string we simply need to pass that sting into the "eval()" method which will compute the value!



    update_output_operation(data.operation.join(''));


}


//--------------------- Updation of output window ---------------------------------------------------

function update_output_operation(operation) {
    operation_element.innerHTML = operation;
}

function update_output_result(result) {
    result_element.innerHTML = result;
}



//-------------------------------Trigo and inverse trigo function-----------------------------------

function trigo(callback, angle) {
    if (radian == false) {
        angle = angle * Math.PI / 180;// converting angle to radian
    }
    return callback(angle);

}
function inv_trino(callback, value) {
    let angle = callback(value);
    if (radian == false) {
        angle = angle * Math.PI / 180;// converting angle to radian
    }
    return angle;


}






// ---------------------------------------factorialnumbergetter----------------------------------------

function factorialnumgetter(formula, FACTORIAL_SEARCH_RESULT) {

    // store all the numbers in this array
    let numbers = [];

    // consider 3 cases here also ---
    // 1)    20 + 4! --->> operator
    // 2)    20 + (2+(4*4+1))! --->>> parenthesis
    // 3)    20 + 4!!! --->>> factorial sequence

    let factorial_sequence = 0;

    FACTORIAL_SEARCH_RESULT.forEach(fact_index => {

        // store the current number in this array

        let number = [];

        let next_index = fact_index + 1;

        let next_input = formula[next_index];

        if (next_index == FACTORIAL) {
            factorial_sequence++;
            return;
        }

        // if there was a factorial sequence we need to get the index of the very first fact function

        let first_fact_index = fact_index - factorial_sequence;

        let prev_idx = first_fact_index - 1;

        let parenthesis_count = 0;

        while (prev_idx >= 0) {

            if (formula[prev_idx] == '(') {
                parenthesis_count--;
            }
            if (formula[prev_idx] == ')') {
                parenthesis_count++;
            }

            let is_operator = false;

            OPERATORS.forEach(OPERATOR => {
                if (formula[prev_idx] == OPERATOR) {
                    is_operator = true
                }
            })

            if (is_operator && parenthesis_count == 0) {
                break;
            }

            number.unshift(formula[prev_idx]);

            prev_idx--;


        }

        let number_str = number.join('');


        const factorial = "factorial(";

        let times = factorial_sequence + 1;

        let toreplace = number_str + FACTORIAL.repeat(times);
        let close_parenthesis = ')';

        let replacement = factorial.repeat(times) + number_str + close_parenthesis.repeat(times);

        // pushing the modified object and at the reciving end of the function i'll replace the toreplace with the replacement!

        numbers.push({
            toReplace: toreplace,
            replacement: replacement
        })


        // reset the factorial sequence

        factorial_sequence = 0;
    })

    return numbers;


}


//--------------------------------------------- PowerBaseGetter ---------------------------------------------


function powerbasegetter(formula, POWER_SEARCH_RESULT) {

    // here i will store all the bases !
    let powers_base = [];

    // handling of 3 cases --
    // 1) i/p -->>    20 + 4pow(10) 
    // 2) i/p -->>    20 + (2 + (4*10 + 45/2))pow(3) 
    // 3) i/p -->>    20pow(2)2pow(4)

    POWER_SEARCH_RESULT.forEach(power_index => {
        let base = [];

        let parenthesis_count = 0;

        let prev_idx = power_index - 1;

        while (prev_idx >= 0) {

            if (formula[prev_idx] == '(') {
                parenthesis_count--;
            }
            else if (formula[prev_idx] == ')') {
                parenthesis_count++;
            }

            let is_operator = false;

            OPERATORS.forEach(operator => {
                if (formula[prev_idx] == operator) {
                    is_operator = true;
                }
            })

            let is_power = formula[prev_idx] == POWER;

            if ((is_operator && parenthesis_count == 0) || is_power) {
                break;
            }

            base.unshift(formula[prev_idx]);

            prev_idx--;


        }

        powers_base.push(base.join(''));
    })

    return powers_base;
}





// --------------------------------------SEARCH FUNCTION-----------------------------------------
// Just like linear Search
function search(array, keyword) {
    let search_res = [];

    array.forEach((element, index) => {
        if (element == keyword) {
            search_res.push(index);
        }
    })

    return search_res;

}


//---------------------------------- factorial function------------------------------------------------

function factorial(number) {

    // if the number is decimal like 0.5! or so then call the gamma function

    if (number % 1 != 0) {

        return gamma(number + 1);

    }

    if (number == 0 || number == 1) {
        return 1;
    }

    let result = 1;

    for (let i = 1; i <= number; i++) {
        result *= i;
    }
    if (result == Infinity) {
        return Infinity;
    }

    return result;
}






//----------------------- GAMMA FUNCTINON-- to calculate factorial of fraction number------------------------------------- 
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}
// ------------------------------------------------------------------------------------------------------------------------------