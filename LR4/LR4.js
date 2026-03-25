function fruitArrayHandler() {
    let arr = ["Apple", "Strawberry", "Pear", "Grape"];

    alert(arr);
    let index = arr.length - 1;
    arr.splice(index, 1);
    arr.splice(0, 0, "Pineapple");
    alert(arr);

    arr.sort().reverse();

    alert(arr);

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

    alert("Longest: " + longest);

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

    arr.sort((a, b) => a.name - b.name).reverse();

    for(e of arr)
    {
        alert("Sorted: " + e.name + " " + e.age + " " + e.position);
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

    for(e of arr)
    {
        alert("Age > 30: " + e.name + " " + e.age + " " + e.position);
    }

}

function studentHandler()
{
    let arr = [];

    arr.push ({
        name: "Oleksii",
        age: 23,
        course: 5
    });

    arr.push ({
        name: "Denys",
        age: 20,
        course: 2
    });

    arr.push ({
        name: "Anna",
        age: 19,
        course: 2
    });


    for(st of arr) {
        alert("Inserted: " + st.name + " " + st.age + " " + st.course);
    }


    for(let i = 0; i < arr.length; i++) {
        if(arr[i].name === "Oleksii")
        {
            arr.splice(i, 1);
            i--;
        }
    }

    arr.push({
        name: "Nina",
        age: 21,
        course: 3
    });

    for(st of arr) {
        alert("Pushed: " + st.name + " " + st.age + " " + st.course);
    }

    arr.sort((a, b) => a.age - b.age);

    for(st of arr) {
        alert("Sorted + inserted: " + st.name + " " + st.age + " " + st.course);
    }

    for(st of arr)
    {
        if(st.course === 3)
        {
            alert ("Course 3: " + st.name + " " + st.age + " " + st.course)
        }
    }
}

function numberArrayHandler() {

    let arr = [6, 1, 3, 5, 2, 4];


    arr.map((x) => x * x);

    let sum = arr.reduce((x, y) => x+y);

    alert('Sum: ' + sum);

    let newNumArr = [10, 0, -2, 3];
    
    arr.push(newNumArr);

    alert("Combined Array: " + arr);

    arr.splice(0, 3);

    alert("After Splice: " + arr);
}


function libraryManager()
{
    let library = [];

    addBook (library, "Harry Potter", "J.K. Rowling", "Fantasy", 300);

    addBook (library, "Star Wars", "George Lucas", "Sci-Fi", 400);


    for (book of library)
    {
        alert(book.title + " " + book.author + " " + book.genre + " " + book.pages + " " + book.isAvailable);
    }

    addBook (library, "The Lord of the Rings", "J.R.R. Tolkien", "Fantasy", 500);

    for (book of library)
    {
        alert("Library after new book added: " + book.title + " " + book.author + " " + book.genre + " " + book.pages + " " + book.isAvailable);
    }

    removeBookByName(library, "Harry Potter");

    for (book of library)
    {
        alert("Library after book removed: " + book.title + " " + book.author + " " + book.genre + " " + book.pages + " " + book.isAvailable);
    }

    alert("Books by Tolkien: " + findBooksByAuthor(library, "Tolkien").map(b => b.title).join(", "));

    toggleBookAvailability(library, "Star Wars");

    for (book of library)
    {
        alert("Library after toggling availability: " + book.title + " " + book.author + " " + book.genre + " " + book.pages + " " + book.isAvailable);
    }   

    sortBooksByPages(library);

    for (book of library)
    {
        alert("Library after sorting by pages: " + book.title + " " + book.author + " " + book.genre + " " + book.pages + " " + book.isAvailable);
    }

    let stats = getBooksStatistics(library);

    alert("Total books: " + stats.totalBooks);
    alert("Available books: " + stats.availableBooks);
    alert("Unavailable books: " + stats.unavailableBooks);
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
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === title) {
            library.splice(i, 1);
        }
    }
}

function findBooksByAuthor(library, author) {
    return library.filter((b) => b.author.includes(author));
}

function toggleBookAvailability(library, title) {
    library.map((b) => {
        if(b.title === title) {
            b.isAvailable = !b.isAvailable;
        }
    });
}

function sortBooksByPages(library) {
    library.sort((a, b) => a.pages - b.pages).reverse();
}

function getBooksStatistics(library) {
    let totalBooks = library.length;
    let availableBooks = library.filter(book => book.isAvailable === true).length;
    let unavailableBooks = library.filter(book => book.isAvailable === false).length;

    return {
        totalBooks,
        availableBooks,
        unavailableBooks
    }
}


function studentObjectHandler() {
    let student = {
        name: "Denys",
        age: 20,
        course: 2
    };

    student.topics = ["Web-Technologies", "NoSql", "Java"];

    delete student.age;

    alert(student.name + " " + student.age + " " + student.course + " " + student.topics);
}

