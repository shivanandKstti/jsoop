class Product {
    title = 'DEFAULT';
    imageUrl;
    price;
    description;
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

class ShoppingCart {
    items = [];

    addProduct(product) {
        this.items.push(product);
        this.totalOutput.innerHTML = `<h2>Total: ${1}</h2>`
    }

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        cartEl.className = 'cart';
        this.totalOutput = cartEl.querySelector('h2')
        return cartEl;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        console.log('Adding product to cart...');
        console.log(this.product);
    }

    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
        return prodEl;
    }
}

class ProductList {
    products = [
        new Product(
            'A Pillow',
            'https://i.insider.com/5fdcca6cd366e60018098e14?width=1136&format=jpeg',
            'A soft pillow!',
            19.99
        ),
        // { 
        //     title: 'A Pillow', 
        //     imageUrl: 'https://i.insider.com/5fdcca6cd366e60018098e14?width=1136&format=jpeg',
        //     price: 19.99,
        //     description: 'A soft pillow!'
        // },
        new Product(
            'A Carpet',
            'https://thumbs.dreamstime.com/b/persian-carpet-texture-21684751.jpg',
            'A carpet which you might like - or not.',
            89.99
        ),
        // { 
        //     title: 'A Carpet', 
        //     imageUrl: 'https://thumbs.dreamstime.com/b/persian-carpet-texture-21684751.jpg',
        //     price: 89.99,
        //     description: 'A carpet which you might like - or not.'
        // }
    ];

    constructor() {

    }

    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const prodItem = new ProductItem(prod);
            const prodEl = prodItem.render();
            prodList.append(prodEl);
        }
        return prodList;
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app');
        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList();
        const productEl = productList.render();
        renderHook.append(cartEl);
        renderHook.append(productEl);
    }
}

class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();