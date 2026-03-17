function fruitArrayHandler() {
    let arr = ["Apple", "Strawberry", "Pear", "Grape"];
    let index = arr.length - 1;
    arr.splice(index, 1);
    arr.splice(0, 0, "Pineapple");
    alert(arr);

    arr.sort().reverse();


    let found = arr.indexOf("Apple");
    alert("Index of Apple: " + found);
}

function stringArrayHandler() {
    let arr = ["hello", "world", "javascript", "programming", "blue", "This str contains blue"];

    let longest = arr[0];
    for (s of arr) {
        if (s.length > longest.length) {
            longest = s;
        }
    }

    for(let i = 0; i < arr.length; i++) {
        if(!arr[i].includes("blue"))
        {
            arr.splice(i, 1);
            i--;
        }
    }
    alert(arr);

    let joinedString = arr.join(", ");

    alert(joinedString);
}



function employeeHandler() {
    let arr = [];
    
    arr.push({
        name: "Oleksii",
        age: 40,
        position: "Manager"
    });

    arr.push({
        name: "Denys",
        age: 20,
        position: "Developer"
    });

    arr.push({
        name: "Anna",
        age: 19,
        position: "Designer"
    });

    arr.sort((a, b) => a.name.localeCompare(b.name));

    for(e of arr)
    {
        alert(e.name + " " + e.age + " " + e.position);
    }

    for(e of arr) {
        if(e.position === "Developer")
        {
            alert("Developer: " + e.name + " " + e.age + " " + e.position);
        }
    }

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].age < 30)
        {
            arr.splice(i, 1);
            i--;
        }

    }

}

function studentArrayHandler()
{
    let arr = [];
    arr.push ({
        name: "Oleksii",
        age: 23,
        grade: 100
    });

    arr.push ({
        name: "Denys",
        age: 20,
        grade: 90
    });

    arr.push ({
        name: "Anna",
        age: 19,
        grade: 80
    });

    for(let i = 0; i < arr.length; i++) {
        if(arr[i].name === "Oleksii")
        {
            arr.splice(i, 1);
            i--;
        }

    }

    let student4 = new Student("Nina", 21, 3);

    arr.push(student4);

    arr.sort((a, b) => a.age.localeCompare(b.age));

    for(st of arr)
    {
        if(st.course === 3)
        {
            alert (st.name + " " + st.age + " " + st.course)
        }
    }

    alert(arr);
}

function numberArrayHandler() {

    let arr = [6, 1, 3, 5, 2, 4];


    arr.map((x) => x * x);

    let sum = arr.reduce((x, y) => x+y);

    alert('Sum: ' + sum);

    let newNumArr = [10, 0, -2, 3];
    
    arr.push(newNumArr);

    arr.splice(0, 3);

    alert(arr);
}


function libraryManager()
{
    let library = [];

    addBook (library, "Harry Potter", "J.K. Rowling", "Fantasy", 300);

    for (book of library)
    {
        alert(book.title + " " + book.author + " " + book.genre + " " + book.pages + " " + book.isAvailable);
    }

}

function addBook(library, title, author, genre, pages){
    library.push({
        title,
        author,
        genre,
        pages,
        isAvailable: true
    });
}



function removeBookByName(library, title) {
    library = library.filter((b) => b.title !== title);
}

function findBooksByAuthor(library, author) {
    return library.filter((b) => b.author === author);
}

function toggleBookAvailability(library, title) {
    library.map((b) => {
        if(b.title === title) {
            b.isAvailable = !b.isAvailable;
        }
    });
}

function sortBooksByPages(library) {
    library.sort((a, b) => a.pages.localeCompare(b.pages));
}

function getBooksStatistics(library) {
    let totalBooks = library.length;
    let availableBooks = library.filter(book => book.isAvailable).length;
    let unavailableBooks = totalBooks - availableBooks;

    return {
        totalBooks,
        availableBooks,
        unavailableBooks
    }
}


function studentObjectHandler() {
    let student = ({
        name: "Denys",
        age: 20,
        course: 2
    });

    student.topics = ["Web-Technologies", "NoSql", "Java"];

    student.map (s => delete s.age);

    alert(student.name + " " + student.age + " " + student.course + " " + student.topics);

}