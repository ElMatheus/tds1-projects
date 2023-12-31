// Cada Categoria posui vários produtos
// Cada Produto é pertencente a uma Categoria

let editing = -1;

class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = [];
    }
}

class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class CategoryService {
    constructor() {
        this.categories = [];
        this.nextCategoryId = 1;
    }
    // CRUD => Create, Read, Update, Delete
    // C => Create
    addCategory(name) {
        if (emptyInput(name) == true) {
            sendMessageError('message');
        } else {
            if (editing > 0) {
                this.getCategoryById(editing).name = name;
                editing = -1;
            } else {
                const id = this.nextCategoryId;
                this.nextCategoryId++;

                const category = new Category(id, name);
                this.categories.push(category);

                console.log(categoriesList.categories);
            }
        }
    }

    // R => Read
    getCategoryById(id) {
        return this.categories.find((category) => category.id == id)
    }

    // U => Update

    updateCategory(id, name) {
        const category = this.getCategoryById(id);
        category.name = name;
    }

    // D => Delete
    deleteCategory(id) {
        const category = this.getCategoryById(id);
        const index = this.categories.indexOf(category);

        this.categories.splice(index, 1);
    }
}

class ProductService {
    constructor() {
        this.products = [];
        this.nextProductId = 1;
    };

    addProducts(name, price, category) {
        if (emptyInput(name, price) == true) {
            sendMessageError('message2');
        } else {
            const id = this.nextProductId;
            this.nextProductId++;

            const product = new Product(id, name, price, category);

            this.products.push(product);
            category.products.push(product);
            displayCategories();

        }

    }
    // R => Read

    getProductById(id) {
        return this.products.find((product) => product.id == id);
    }

}


const categoriesList = new CategoryService();
const productsList = new ProductService();

function createCategory() {
    const categoryName = document.getElementById('categoryNameInput').value;

    categoriesList.addCategory(categoryName);
    displayCategories();
    cleanFields();

}

function createProduct(categoryId) {

    const productName = document.getElementById('productNameInput-' + categoryId).value;
    const productPrice = document.getElementById('productPriceInput-' + categoryId).value;
    const productCategory = categoriesList.getCategoryById(categoryId);
    productsList.addProducts(productName, productPrice, productCategory);
    console.log(productsList.products);
}

function sendMessageError(idMsg) {
    document.getElementById(idMsg).innerHTML = 'O campo não pode estar vazio';
    document.getElementById(idMsg).classList.add('error');

    setTimeout(() => {
        document.getElementById(idMsg).innerHTML = '';
        document.getElementById(idMsg).classList.remove('error');
    }, 2000);
}

function emptyInput(input, price) {
    if (price) {
        if (input == '' || price == '') {
            return true;
        } else {
            return false;
        }
    } else {
        if (input == '') {
            return true;
        } else {
            return false;
        }
    }

}

function findCategory(id) {
    const category = categoriesList.getCategoryById(id);
    console.log(category.name);

}

function displayCategories() {
    let html = '';
    categoriesList.categories.forEach(category => {
        html += `
        <li>
            <span>${category.name}</span>
            <div class="controls">
                <i onclick="showCreateProductArea(${category.id})" class="fa-solid fa-plus"></i>
                <i onclick="editCategory(${category.id},'${category.name}')" class="fa-solid fa-pen"></i>
                <i onclick="deleteCategory(${category.id})" class="fa-solid fa-trash"></i>
            </div>
            <ul id="productsOnCategory">
                ${displayProducts(category.products)}
            </ul>
            <div id="productsArea-${category.id}" class="hidden">
                <h2>Criar Produto</h2>
                <input type="text" id="productNameInput-${category.id}" placeholder="Nome do Produto">
                <input type="number" id="productPriceInput-${category.id}" placeholder="Preço do Produto">
                <button class="btn" id="green" onclick="createProduct(${category.id})">Criar Produto</button>
                <p id="message2"></p>
            </div>
        
        </li>
        `;
    });
    document.getElementById('categoriesList').innerHTML = html;
}

function displayProducts(products) {
    let html = '';
    products.forEach(product => {
        html += `
        <li>
            <p>${product.name}</p>
            <p><strong>${product.price}</strong></p>
        </li>
        `;
    });
    return html;
}

function showCreateProductArea(id) {
    const hiddenDiv = document.getElementById('productsArea-' + id);
    hiddenDiv.classList.toggle('hidden');
}

function editCategory(id, name) {
    document.getElementById('categoryNameInput').value = name;
    editing = id;
    categoriesList.updateCategory(id, name);
    displayCategories();
    console.log(categoriesList.categories);
}

function deleteCategory(id) {
    categoriesList.deleteCategory(id);
    displayCategories();

    console.log(categoriesList.categories);
}

function findProduct(id) {
    const product = productsList.getProductById(id);

    console.log(product);
}

function cleanFields() {
    document.getElementById('categoryNameInput').value = '';
}

