function task1() {
    let numbers = [10, 5, 3, 8, 2, 1, 4, 12, 7, 6];
    if (numbers.length === 0) { 
        alert("Array is empty");
        return;
    }

    let max = numbers[0];
    let min = numbers[0];
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    alert("Array: " + numbers + "\nMax: " + max + ", Min: " + min);
}

function task2() {
    let number = document.getElementById("numberInput").value;
    let from = parseInt(document.getElementById("fromInput").value);
    let to = parseInt(document.getElementById("toInput").value);

    if(number != parseInt(number) && from != parseInt(from) && to != parseInt(to)) {
        alert("Please enter valid numbers");
        return;
    }

    if(number >= from && number <= to) {
        alert("Number " + number + " is in the range");
    } 
    else {
        alert("Number " + number + " is NOT in the range");
    }
}

function task3() {
    let grade = document.getElementById("gradeInput").value;


    let gradeString = "";
    if(grade >= 90){
        gradeString = "Відмінно";
    }
    else if(grade >=70 && grade < 90){
        gradeString = "Добре";
    }
    else if(grade >= 50 && grade < 70){
        gradeString = "Задовільно";
    }
    else {
        gradeString = "Незадовільно";
    }

    alert("Оцінка: " + gradeString + "\nВідрахування: " + (grade < 50 ? "Так" : "Ні"));
    
}
