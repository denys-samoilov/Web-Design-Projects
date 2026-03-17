function Fibonacci() {
    let array = [0, 1];
    let i = 1;
    let sum = 1;
    while (i < 9) {
        let nextNum = array[i-1]+array[i];
        sum += nextNum;
        array.push(nextNum);
        i++;
    }
    alert(array);
    alert(sum);
}

function SumOfSimpleNumbers() {
    let sum = 0;
    for(let i = 0; i <= 1000; i++) {
        for(let j = 2; j <= i; j++) {

            if(j === i) {
                sum = sum + i;
            }

            else if(i % j === 0) {
                break;
            }
            
        }
    }
    alert(sum);
}

function DayOutput() {
    let day = parseInt(document.getElementById("dayInput").value);
    switch(day) {
        case 1:{
            alert("Monday");
            break;
        }
        case 2:{
            alert("Tuesday");
            break;
        }
        case 3:{
            alert("Wednesday");
            break;
        }
        case 4:{
            alert("Thursday");
            break;
        }
        case 5:{
            alert("Friday");
            break;
        }
        case 6:{
            alert("Saturday");
            break;
        }
        case 7:{
            alert("Sunday");
            break;
        }
        default:{
            alert("Wrong value");
        }
    }
}

function OutputOddStrings() {
    let result = [];
    let string1 = document.getElementById("string1").value;
    let string2 = document.getElementById("string2").value;
    let string3 = document.getElementById("string3").value;

    let arrayOfStrings = [string1, string2, string3];
    arrayOfStrings.forEach(str => {

        if (str.length % 2 !== 0) {
            result.push(str);
        }
    });
    alert(result);
}

function IncreaseNumbers() {
    let increase = (num) => num + 1;
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let newArray = [];

    array.forEach(num => {
        newArray.push(increase(num));
    });
    alert(newArray);
}


function SumMoreThan10() {
    let a = parseInt(document.getElementById("number1").value);
    let b = parseInt(document.getElementById("number2").value);

    let sum = a + b;

    let isMoreOrEqualTo10 = sum >= 10 ? true : false;
    
    alert(isMoreOrEqualTo10);
}