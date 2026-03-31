'use strict';

/*
1. create static markup (layout + product list), css
2. create static modal
3. create static snack bar
2. create mock data
3. js-logic
3.1 init app function - call all functions to initialize app
3.2 collect your DOM Elements (js-prefix-name selector)
3.3 create utils functions (generateId, getCurrentDate)
3.3 calculateTotalPrice, formatPrice, updateTotalPrice
3.4 getCategories from products
3.5 updateFilterButtons - depends on categories, toggle buttons active style
3.6 filterProducts(category) - depends on categories
3.7 resetFilter
3.8 sortProducts(sortBy) + resetSort
3.9 updateSortButtons (toggle buttons active style)
3.10 func for ui showSnackbar + setTimeout, toggleModal(show = true, editMode = false)
*/

 // Core Functions
 let products = [];
 let editingProductId = null;
 let currentFilter = "All";
 let currentSort = "price";

 let totalPrice = document.querySelector('#total-price');

 let filterDiv = document.querySelector('#filter');

 let sortDiv = document.querySelector('#sort');

 let addProductBtn = document.querySelector('#addProductButton');

 let addModal = document.querySelector('#add-modal');
 let addName = document.querySelector('[name = "add-name"]');
 let addPrice = document.querySelector('[name = "add-price"]');
 let addCurrency = document.querySelector('[name = "add-currency"]');
 let addCategory = document.querySelector('[name = "add-category"]');
 let addImage = document.querySelector('[name = "add-image"]');
 let addSubmitBtn = document.querySelector('[name = "add-submit-btn"]');
 let addCancelBtn = document.querySelector('[name = "add-cancel-btn"]');

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
 
const getEmptyListMessage = () => products.length === 0 ? "List of products is empty. Add new product" : "";


 let generateId = () => {
    return Math.random().toString(36).substring(2, 9);
 }

 let getCurrentDate = () => {
    return new Date().toISOString();
 }

 addProductBtn.addEventListener('click', () => {
    addModal.style.display = 'block';
    });

const openEditModal = (productId) => {
    editingProductId = productId; 
    let product = products.find(product => product.id === productId);

    editName.value = product.name;
    editPrice.value = product.price.amount;
    editCategory.value = product.category;
    editImage.value = product.image;


    return product;
};

editSubmitBtn.addEventListener('click', () => {
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

 addSubmitBtn.addEventListener('click', () => {
    let productData = {
        productId: generateId(),
        productName: addName.value,
        productPrice: {
            amount: addPrice.value, 
            currency: addCurrency.value},
        productCategory: addCategory.value,
        productImage: addImage.value,
        productCreatedAt: getCurrentDate(),
        productUpdatedAt: getCurrentDate()
    };
    addProduct(productData);

    addName.value = '';
    addPrice.value = '';
    addCategory.value = '';
    addImage.value = '';

    addModal.style.display = 'none';
    });

    addCancelBtn.addEventListener('click', () => {
        addModal.style.display = 'none';
    });

filterDiv.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        currentFilter = event.target.textContent;
        filterProducts(currentFilter);

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
        else currentSort = ""; // reset sort

        let filteredProds = filterProducts(currentFilter);
        let sortedProds = sortProducts(filteredProds, currentSort);
        refreshProductList(sortedProds);
    }
});

const filterProducts = (category) => {

    let handledProducts = products;
    if(currentSort !== null){
        handledProducts = sortProducts(handledProducts, currentSort);
    }

    if (category !== 'All') 
    {
        handledProducts = products.filter(product => product.category === category);
        refreshProductList(handledProducts);
    }
    return handledProducts;

    }



 const addProduct = (productData) => {

    const newProduct = {
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
    // оновити список на ui
    // оновити фільтри
    // оновити ціну

    return newProduct;
};


const updateProduct = (productId, productData) => {
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



        
    });
    let filteredProds = filterProducts(currentFilter);
    let sortedProds = sortProducts(filteredProds, currentSort);
    refreshProductList(sortedProds);
    return products.find(product => product.id === productId);
   // оновити список на ui
    // оновити фільтри
    // оновити ціну
};

const refreshFilters = (categories) => {
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

 const deleteProduct = (productId) => {
    const productToDelete = products.find(product => product.id === productId);

    if (!productToDelete) return null;

    products = products.filter(product => product.id !== productId);
    // оновити список на ui
    // оновити фільтри
    // оновити ціну

    return productToDelete;
};

const deleteProductWithAnimation = (productId) => {
    deleteProduct(productId);
}

const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-id">ID: ${product.id}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price.amount}${product.price.currency}</div>
            <div class="product-category">${product.category}</div>
            <div class="product-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;

    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        editModal.style.display = 'block';
        openEditModal(product.id);
    });

    deleteBtn.addEventListener('click', () => {
        deleteProductWithAnimation(product.id);
    });

    return card;
};

const refreshProductList = (filteredProducts) => {
    productCards.innerHTML = '';

    snackbar.innerHTML = getEmptyListMessage();
    
    


    let categories = filteredProducts.map(product => product.category);
    refreshFilters(categories)

    let sum = 0;
    totalPrice.innerHTML = ``;

    filteredProducts.forEach(product => {
        sum += parseFloat(product.price.amount);
        let productCard = createProductCard(product);
        productCards.appendChild(productCard);
        totalPrice.innerHTML = `Total Price: ${sum}`;

    });

    return filteredProducts;
}

const cleanFieldValues = () => {
    

    
}

const sortProducts = (products, sortType) => {
    let sorted = [...products];
    if(sortType === 'price'){
        sorted.sort((a, b) => b.price.amount - a.price.amount);
    }
    else if(sortType === 'created'){
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    else if(sortType === 'updated'){
        sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    return sorted;
}

refreshProductList(products);
cleanFieldValues();



