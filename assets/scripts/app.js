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

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId;
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}

class ShoppingCart extends Component {
    items = [];

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) =>
            prevValue + curItem.price,
            0
        );
        return sum;
    }

    constructor(renderHookId) {
        super(renderHookId);
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;

    }

    render() {
        // const cartEl = document.createElement('section');
        const cartEl = this.createRootElement('section', 'cart', )
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `;
        // cartEl.className = 'cart'; second paramert
        this.totalOutput = cartEl.querySelector('h2')
            // return cartEl; no need to return
    }
}

class ProductItem extends Component {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        // console.log('Adding product to cart...');
        // console.log(this.product);
        App.addProductToCart(this.product);
    }

    render() {
        // const prodEl = document.createElement('li');
        const prodEl = this.createRootElement('li', 'product-item')
            // prodEl.className = 'product-item';
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
        // return prodEl;
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
        this.cart = new ShoppingCart('app');
        // const cartEl = this.cart.render();
        this.cart.render();
        const productList = new ProductList();
        const productEl = productList.render();
        // renderHook.append(cartEl);
        renderHook.append(productEl);
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
        this.cart
    }
}

App.init();