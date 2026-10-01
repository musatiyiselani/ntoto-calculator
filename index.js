// Working on the on/off button

const on_off_btn = document.getElementById("on-Btn");
const display = document.getElementById("display");
const AnsBtn = document.getElementById("Ans-Btn");

AnsBtn.value = 0;
let math_op = "";
let isOn = false;



on_off_btn.addEventListener('click', togglePower);
    
function togglePower() {

    isOn = !isOn;
    if(isOn) {
        display.value = '0';
        math_op = "0"
        on_off_btn.textContent = 'off';
    }
    else {
        display.value = ''
        math_op = "";
        on_off_btn.textContent = 'on';
    }

}


// Working on the display value



function appendToDisplay(input) {

    if(isOn === false) {
       return;
    }

    if(input === AnsBtn.value){
        if (math_op === '0') {
            math_op = input;
            display.value = 'Ans';
            return;
        }
        math_op += input;
        display.value += 'Ans';
        return;
    }

    if((input != '.' && input != '²') && math_op === '0'){
        math_op = input;
        display.value = input;
    }

    else {
        math_op += input;
        display.value += input;
    }

    if(math_op === '') {
        display.value = '0';
        math_op = "0"
    }  
}

// The open bracket


function openBracket(input) {
    if(isOn === false) {
       return;
    }
    
    if(math_op === "0") {
        math_op = '(';
        display.value = input;
    }
    else if(math_op.length === 0 || '+*/-('.includes(math_op.at(-1))){
        math_op += '(';
        display.value += input;
    }
    else {
        math_op += '*(';
        display.value += input;
    }
}

// Working on the clear button

function clearDisplay() {
    if(isOn === false) {
       return;
    } 
    math_op = "0";
    display.value = "0";
}

// Working on the delete button

function deleteBtn() {

    if(isOn === false) {
       return;
    } 
    
    if(math_op[-1] === '(' && math_op[-2] === '*') {
        math_op = math_op.slice(0, -2);
    } else {
        math_op = math_op.slice(0, -1);
    }
    display.value = math_op
        .replace(/\*/g, '×')
        .replace(/\//g, '÷');

    if(math_op === '') {
        display.value = '0';
        math_op = "0"
    }
}


// Working on the = button

function calculate() {

    if(isOn === false) {
       return;
    } 
    try {
            
        let result = '';
           
        for(let i = 0; i < math_op.length; i++) {
                
            if(math_op[i] === '÷'){         
                result += '/'; 
            }
            else if(math_op[i] === '^'){
                result += '**';
            }
            else if(math_op[i] === 'π'){
                result += Math.PI;
            }
            else if(math_op[i] === '²'){
                result += '**2';
            }
            else if (math_op[i] === '×'){
                result += '*';
            }
            else{
                result += math_op[i];
            }
        }

        display.value = eval(result);
        math_op = display.value;
        AnsBtn.value = math_op
        result = "";
    }
    catch {
        display.value = "Error";
        math_op = "";
        result = '';
    }
}

AnsBtn.addEventListener("click",
    function showAns(){
        appendToDisplay(AnsBtn.value);
    }
)


