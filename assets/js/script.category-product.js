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
        if(editing > 0){
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
        const id = this.nextProductId;
        this.nextProductId++;

        const product = new Product(id, name, price, category);

        this.products.push(product);
        category.products.push(product);

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

function createProduct() {
    const productName1 = 'Choco';
    const productPrice1 = 0.5;
    const productCategory1 = categoriesList.categories[0];

    const productName2 = 'Sneakers';
    const productPrice2 = 100;
    const productCategory2 = categoriesList.categories[1];

    const productName3 = 'Harry Potter';
    const productPrice3 = 50;
    const productCategory3 = categoriesList.categories[2];

    productsList.addProducts(productName1, productPrice1, productCategory1);
    productsList.addProducts(productName2, productPrice2, productCategory2);
    productsList.addProducts(productName3, productPrice3, productCategory3);

    console.log(productsList.products);
}

function findCategory(id) {
    const category = categoriesList.getCategoryById(id);
    console.log(category.name);

}

function displayCategories() {
    let html = '';
    categoriesList.categories.forEach(category => {
        html += `
        <li><span>${category.name}</span><div class="controls"><i onclick="editCategory(${category.id},'${category.name}')" class="fa-solid fa-pen" style="color: #363636;"></i><i onclick="deleteCategory(${category.id})" class="fa-solid fa-trash" style="color: #fd1b1b;"></i></div></li>
        `;
    });
    document.getElementById('categoriesList').innerHTML = html;
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

function cleanFields(){
    document.getElementById('categoryNameInput').value = '';
}