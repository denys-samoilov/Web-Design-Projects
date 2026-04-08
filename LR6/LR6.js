'use strict';

 let products = [];
 let editingProductId = null;
 let currentFilter = "All";
 let currentSort = "";

 let totalPrice = document.querySelector('#total-price');

 let filterDiv = document.querySelector('#filter');

 let sortDiv = document.querySelector('#sort');

 let addProductBtn = document.querySelector('#addProductButton');

 let addForm = document.querySelector('#add-form');
 let addModal = document.querySelector('#add-modal');
 let addName = document.querySelector('[name = "add-name"]');
 let addPrice = document.querySelector('[name = "add-price"]');
 let addCurrency = document.querySelector('[name = "add-currency"]');
 let addCategory = document.querySelector('[name = "add-category"]');
 let addImage = document.querySelector('[name = "add-image"]');
 let addSubmitBtn = document.querySelector('[name = "add-submit-btn"]');
 let addCancelBtn = document.querySelector('[name = "add-cancel-btn"]');

 let editForm = document.querySelector('#edit-form');
 let editModal = document.querySelector('#edit-modal');
 let editName = document.querySelector('[name = "edit-name"]');
 let editPrice = document.querySelector('[name = "edit-price"]');
 let editCurrency = document.querySelector('[name = "edit-currency"]');
 let editCategory = document.querySelector('[name = "edit-category"]');
 let editImage = document.querySelector('[name = "edit-image"]');
 let editSubmitBtn = document.querySelector('[name = "edit-submit-btn"]');
 let editCancelBtn = document.querySelector('[name = "edit-cancel-btn"]');

 let productCards = document.querySelector('#product-cards');

 let snackbar = document.querySelector('#snackbar');
 


 let generateId = () => {
    return Math.random().toString(36).substring(2, 9);
 }

 let getCurrentDate = () => {
    return new Date().toISOString();
 }

 addProductBtn.addEventListener('click', () => {
    addModal.style.display = 'block';
    });

let openEditModal = (productId) => {
    editingProductId = productId; 
    let product = products.find(product => product.id === productId);

    editName.value = product.name;
    editPrice.value = product.price.amount;
    editCategory.value = product.category;
    editImage.value = product.image;


    return product;
};

editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let productData = {
        productName: editName.value,
        productPrice: {
            amount: editPrice.value,
            currency: editCurrency.value},
        productCategory: editCategory.value,
        productImage: editImage.value
    };

    updateProduct(editingProductId, productData);

    editName.value = '';
    editPrice.value = '';
    editCategory.value = '';
    editImage.value = '';

    editingProductId = null; 
    editModal.style.display = 'none';
});

editCancelBtn.addEventListener('click', () => {
    editModal.style.display = 'none';
});

 addForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let productData = {
        productId: generateId(),
        productName: addName.value,
        productPrice: {
            amount: parseFloat(addPrice.value),
            currency: addCurrency.value
        },
        productCategory: addCategory.value,
        productImage: addImage.value,
        productCreatedAt: getCurrentDate(),
        productUpdatedAt: getCurrentDate()
    };

    addProduct(productData);

    addForm.reset();
    addModal.style.display = 'none';
});

    addCancelBtn.addEventListener('click', () => {
        addModal.style.display = 'none';
    });

filterDiv.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        currentFilter = event.target.textContent;

        let filteredProds = filterProducts(currentFilter);
        let sortedProds = sortProducts(filteredProds, currentSort);
        refreshProductList(sortedProds);
    }
});

sortDiv.addEventListener('click', (event) => {
     if (event.target.tagName === 'BUTTON') {
        let text = event.target.textContent.toLowerCase();
        if(text.includes("price")) currentSort = "price";
        else if(text.includes("created")) currentSort = "created";
        else if(text.includes("updated")) currentSort = "updated";
        else currentSort = "";

        let filteredProds = filterProducts(currentFilter);
        let sortedProds = sortProducts(filteredProds, currentSort);
        refreshProductList(sortedProds);
    }
});

let filterProducts = (category) => {

    let handledProducts = [...products];

    if (category !== 'All') 
    {
        handledProducts = handledProducts.filter(product => product.category === category);
    }
    return handledProducts;

    }



 let addProduct = (productData) => {

    let newProduct = {
        id: productData.productId,
        name: productData.productName,
        price: productData.productPrice,
        category: productData.productCategory,
        image: productData.productImage,
        createdAt: productData.productCreatedAt,
        updatedAt: productData.productUpdatedAt
    };

   products.push(newProduct);
   filterProducts(currentFilter);

   let categories = products.map(product => product.category);
   refreshFilters(categories);

    let filteredProds = filterProducts(currentFilter);
    let sortedProds = sortProducts(filteredProds, currentSort);
    refreshProductList(sortedProds);

    return newProduct;
};


let updateProduct = (productId, productData) => {
    products = products.map(product => {
        if (product.id === productId) {
            return {
                ...product,
                name: productData.productName,
                price: productData.productPrice,
                category: productData.productCategory,
                image: productData.productImage,
                updatedAt: getCurrentDate()
            };
        }

        return product;

        
    });
    let filteredProds = filterProducts(currentFilter);
    let sortedProds = sortProducts(filteredProds, currentSort);
    refreshProductList(sortedProds);
    return products.find(product => product.id === productId);
};

let refreshFilters = (categories) => {
    let uniqueCategories = new Set(categories);

    filterDiv.innerHTML = '<button name="filter-all-btn">All</button>';

    uniqueCategories.forEach(category => {
        let button = document.createElement('button');
        button.textContent = category;
        button.name = `filter-${category}-btn`;
        filterDiv.appendChild(button);
    });

    return uniqueCategories;
}

 let deleteProduct = (productId) => {
    let productToDelete = products.find(product => product.id === productId);

    if (!productToDelete) return null;

    products = products.filter(product => product.id !== productId);

    let filteredProds = filterProducts(currentFilter);
    let sortedProds = sortProducts(filteredProds, currentSort);
    refreshProductList(sortedProds);

    return productToDelete;
};



let createProductCard = (product) => {
    let card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}"  class="product-image">
        <div class="product-info">
            <p class="product-id">ID: ${product.id}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price.amount}${product.price.currency}</p>
            <p class="product-category">${product.category}</p>
            <div class="product-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;

    let editBtn = card.querySelector('.edit-btn');
    let deleteBtn = card.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        editModal.style.display = 'block';
        openEditModal(product.id);
    });

    deleteBtn.addEventListener('click', () => {
    card.classList.add('removing');

    setTimeout(() => {
        deleteProduct(product.id);
    }, 300);
});

    return card;
};

let refreshProductList = (filteredProducts) => {
    productCards.innerHTML = '';

    if(filteredProducts.length === 0){
        snackbar.innerHTML = "List of products is empty. Add new product";
    }
    else snackbar.innerHTML = "";

    let categories = filteredProducts.map(product => product.category);
    refreshFilters(categories)

    let sum = 0;
    totalPrice.innerHTML = ``;

    filteredProducts.forEach(product => {
        sum += parseFloat(getPriceInUah(product.price).amount);
        let productCard = createProductCard(product);
        productCards.appendChild(productCard);
    });
    totalPrice.innerHTML = `Total Price (UAH): ${sum}`;




    return filteredProducts;
}

let getPriceInUah = (price) => {
    let amount = price.amount;
    let currency = price.currency;

    switch(currency){
        case "EUR": { amount = amount * 50; break; }
        case "USD": { amount = amount * 43.5; break; }
        default: {break;}
    }

    return { amount, currency };
}

let sortProducts = (products, sortType) => {
    let sorted = [...products];
    if(sortType === 'price'){
        sorted.sort((a, b) => getPriceInUah(b.price).amount - getPriceInUah(a.price).amount);
    }
    else if(sortType === 'created'){
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    else if(sortType === 'updated'){
        sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    return sorted;
}

let initApp = () => {
    refreshProductList(products);
}

initApp();



