let lamp = document.getElementById("lamp");
let inactiveTimer;

let trafficTimeoutId;

function ToggleLight() {

    if (lamp.classList.contains('lampOff')) 
    {
        lamp.classList.remove('lampOff');
        lamp.classList.add('lampOn');
    } 
    else 
    {
        lamp.classList.remove('lampOn');
        lamp.classList.add('lampOff');
    }
    activityTimeout();
}

function ChangeTypeOfLight() {
    let type = document.getElementById("lampType").value;

    lamp.classList.remove('regular', 'eco', 'led');
    lamp.classList.add(type);

    lamp.src = 'img/' + type + '.jpg';

    lamp.classList.remove('lampOff');
    lamp.classList.add('lampOn');

    setTimeout(() => {
        lamp.classList.remove('lampOn');
        lamp.classList.add('lampOff');
    }, 1000);

    activityTimeout();
}

function ChangeBrightness() {
    if(lamp.classList.contains('led'))
    {
        let brightness = prompt('Input brightness 0-100:');
        lamp.style.opacity = brightness/100;
    }        
    activityTimeout();
}

function activityTimeout() {
    clearTimeout(inactiveTimer);
    inactiveTimer = setTimeout(() => {
        lamp.classList.remove('lampOn');
        lamp.classList.add('lampOff');
    }, 5000);
}


function startTrafficLights(redInterval, yellowInterval, greenInterval, blinkInterval) {
    let trafficLight = document.getElementById("trafficLight");
    let buttonNext = document.getElementById("buttonNext");
    let trafficLightText = document.getElementById("trafficLightText");

    let nextColor = 'red';
    let blinkCount = 0;

    stopTrafficLights();

    function changeLight() {
        if (nextColor === 'red') {
            trafficLight.src = 'img/traffic lights/red.jpg';
            nextColor = 'yellow';
            trafficLightText.textContent = "Red";
            trafficTimeoutId = setTimeout(changeLight, redInterval); 
        } 
        else if (nextColor === 'yellow') {
            trafficLight.src = 'img/traffic lights/yellow.jpg';
            nextColor = 'green';
            trafficLightText.textContent = "Yellow";
            trafficTimeoutId = setTimeout(changeLight, yellowInterval);
        } 
        else if (nextColor === 'green') {
            trafficLight.src = 'img/traffic lights/green.jpg';
            nextColor = 'yellowBlink';
            blinkCount = 0; 
            trafficLightText.textContent = "Green";
            trafficTimeoutId = setTimeout(changeLight, greenInterval);
        } 
        else if (nextColor === 'yellowBlink') {
            switch(blinkCount)
            {
                case 0:
                case 2:
                {
                    trafficLight.src = 'img/traffic lights/yellow.jpg';
                    blinkCount++;
                    trafficLightText.textContent = "Yellow";
                    trafficTimeoutId = setTimeout(changeLight, blinkInterval);
                    break;
                }

                case 1:
                case 3:
                {
                    trafficLight.src = 'img/traffic lights/white.jpg';
                    blinkCount++;
                    trafficLightText.textContent = "White";
                    trafficTimeoutId = setTimeout(changeLight, blinkInterval);
                    break;
                }

                case 4: 
                {
                    trafficLight.src = 'img/traffic lights/yellow.jpg';
                    trafficLightText.textContent = "Yellow";
                    nextColor = 'red'; 
                    trafficTimeoutId = setTimeout(changeLight, blinkInterval);
                }
            }
        }
    }

    buttonNext.onclick = () => {
        stopTrafficLights();
        changeLight();
    }

    changeLight(); 
}

function inputCustomValues() {
    let redInterval = prompt("Input red interval:");
    let yellowInterval = prompt("Input yellow interval:");
    let greenInterval = prompt("Input green interval:");
    let blinkInterval = prompt("Input blink interval:");
    startTrafficLights(redInterval, yellowInterval, greenInterval, blinkInterval);
}

function stopTrafficLights() {
    if (trafficTimeoutId) {
        clearTimeout(trafficTimeoutId);
    }
    document.getElementById("trafficLight").src = 'img/traffic lights/red.jpg';
    document.getElementById("trafficLightText").textContent = "Red";
}


function clockHandler()
{
    function clockTicker()
    {
        let clock = document.getElementById("clock");
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        let timeString = "";

        if (seconds % 2 == 0)
        {
            timeString = hours + ":" + minutes + ":" + seconds;
        }
        else
        {
            timeString = hours + ":" + minutes;
        }
        clock.textContent = timeString;
    }

    setInterval(clockTicker, 1000);
}

function timer() {
    let calendar = document.getElementById("calendar").value;
    let time = document.getElementById("time").value;

    let now = new Date();

    let target = new Date(calendar + "T" + time);

    let remainingMs = target - now;

    let years = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    let hours = Math.floor(remainingMs / (1000 * 60 * 60));
    let minutes = Math.floor(remainingMs / (1000 * 60));
    let seconds = Math.floor(remainingMs / 1000);

    alert("Years: " + years + " Months: " + months + " Days: " + days + " Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds + "")
}

function getDate()
{
    let calendar = document.getElementById("dateCalendar");
    let now = new Date();

    let year = String(now.getFullYear());
    let month = String(now.getMonth() + 1);
    let day = String(now.getDate());

    if (month.length == 1)
    {
        month = "0" + month;
    }
        
    if (day.length == 1)
    {
        day = "0" + day;
    }

    let dateString = year + "-" + month + "-" + day;
    calendar.value = dateString;
}

function birthdayChecker() {
    let calendar = document.getElementById("birthdayCalendar").value;
    let time = "00:00";

    let now = new Date();

    let target = new Date(calendar + "T" + time);

    if (target < now) {
        target.setFullYear(now.getFullYear() + 1);
    }

    let remainingMs = target - now;

    let years = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor(remainingMs / (1000 * 60 * 60 * 24 * 30));
    let days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    let hours = Math.floor(remainingMs / (1000 * 60 * 60));
    let minutes = Math.floor(remainingMs / (1000 * 60));
    let seconds = Math.floor(remainingMs / 1000);

    alert("Years: " + years + " Months: " + months + " Days: " + days + " Hours: " + hours + " Minutes: " + minutes + " Seconds: " + seconds);
}

let productsMap = new Map();

let categoriesSet = new Set();

let productDetails = new WeakMap();

let viewedProducts = new WeakSet();

function addProduct(id, name, price, quantity) {

    if(productsMap.has(id)) {
        alert("Item already exists")
        return;
    }

    let product = {name, price, quantity};
    productsMap.set(id, product);

    alert("Item " + product.name + " added")
    
}


function viewProduct(id) {
    if (!productsMap.has(id)) 
    {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    
    alert(product.name + " " + product.price + " " + product.quantity)

    viewedProducts.add(product);
}

function updateProduct(id, name, price, quantity) {
    if (!productsMap.has(id)) 
    {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    productsMap.set(id, product);

    alert("Prouct " + name + " updated");
}

function deleteProduct(id) {
    if (!productsMap.has(id)) {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    productsMap.delete(id);

    alert("Product " + product.name + " deleted");
}

function makeOrder(id){
    if (!productsMap.has(id)) {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    if (product.quantity <= 0) {
        alert("Product is out of stock");
        return;
    }

    product.quantity--;
    productsMap.set(id, product);

    alert("Ordered: " + product.name + " Amount remaining: " + product.quantity);
}

function addCategory(category) {
    categoriesSet.add(category);
}

function deleteCategory(category) {
    categoriesSet.delete(category);
}

function addProductDetails(id, details) {
    if (!productsMap.has(id)) {
        alert("Product not found");
        return;
    }

    productDetails.set(productsMap.get(id), details);
    alert("Details added");
}

function viewProductDetails(id) {
    if (!productsMap.has(id)) {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    if (!productDetails.has(product)) {
        alert("No details found for this product");
        return;
    }

    alert("Details for " + product.name + ": " + productDetails.get(product));
}

function deleteProductDetails(id) {
    if (!productsMap.has(id)) {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    if (!productDetails.has(product)) {
        alert("No details found for this product");
        return;
    }

    productDetails.delete(product);
    alert("Details deleted");
}

function addHistory(id){
    if (!productsMap.has(id)) {
        alert("Product not found");
        return;
    }

    let product = productsMap.get(id);
    viewedProducts.add(product);
}

function viewHistory() {
    viewedProducts.forEach((product) => {
        alert(`Viewed Product: ${product.name}`);
    });
}
