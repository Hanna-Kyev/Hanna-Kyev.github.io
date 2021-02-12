"use strict"

class Storage {
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products));
    }

    static saveCart(cart){
        localStorage.setItem('basket', JSON.stringify(cart));
    }

    static saveWish(wish){
        localStorage.setItem('listDesires', JSON.stringify(wish));
    }

    static getCart(){
        return localStorage.getItem('basket')?JSON.parse(localStorage.getItem('basket')):[];
    }

    static getWish(){
        return localStorage.getItem('listDesires')?JSON.parse(localStorage.getItem('listDesires')):[];
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product=>product.id===+(id));
    }

    static getProducts(){
        return JSON.parse(localStorage.getItem('products'));
        
    }
};

class Product {
    getProducts(products){
        return products.map(item =>{
            const id = item.id;
            const name = item.name;
            const price = item.price;
            const image = item.image;
            const category = item.category;
            return {id, name, price, image, category};
        });
    }
};

class App {
    cart = [];
    cartItems = document.querySelector('.cart-items');
    clearCart = document.querySelector('.clear-cart');
    sidebar = document.querySelector('.sidebar');
    cartTotal = document.querySelector('.cart-total');
    countItemsInCart = document.querySelector('.count-items-in-cart');
    

    listDesires = [];
    wishItems = document.querySelector('.wish-items');
    wishClear = document.querySelector('.wish-clear');
    
    constructor(){

        const sidebarToggle = document.querySelector('.sidebar-toggle');    
        const closeBtn = document.querySelector('.close-btn');
        sidebarToggle.addEventListener('click', () => this.openCart());        
        closeBtn.addEventListener('click', () => this.closeCart());
        const wishToggle = document.querySelector('.wish-toggle')
        const wish = document.querySelector('.wish');
        const closenBtn = document.querySelector('.closen-btn');

        wishToggle.addEventListener('click', () => {
            document.querySelector('.over').classList.add('active');
            wish.classList.toggle('show-wish');
        });

        closenBtn.addEventListener('click', () => {
            wish.classList.toggle('show-wish');
            document.querySelector('.over').classList.remove('active');
        });

        if (document.querySelector('.collections')){
            this.makeCategories(categories);
        };

        let data = new Product();
        Storage.saveProducts(data.getProducts(products));
        this.makeShowcase(Storage.getProducts());
        this.cart = Storage.getCart();        
        this.listDesires = Storage.getWish();
    };

    getProduct = id => products.find(product => product.id === +(id));

    filterItem = (cart, filteredItem) => cart.filter(item => item.id !== +(filteredItem.dataset.id));
    findItem = (cart, findingItem) => cart.find(item => item.id === + (findingItem.dataset.id));
    
    filterWishItems = (listDesires, filterWishtItem) => listDesires.filter(item => item.id !==+(filterWishtItem.dataset.id));
    findWishItem = (listDesires , findingItem) => listDesires .find(item => item.id === + (findingItem.dataset.id));

    makeShowcase(products) {  
        let result = "";
        products.forEach((item) => result+=this.createProduct(item));
        document.querySelector('.showcase').innerHTML=result;
    };

    openCart(){
        document.querySelector('.over').classList.add('active');
        this.sidebar.classList.toggle('show-sidebar');
        this.cartItems.innerHTML='';
        this.cart = Storage.getCart();
        this.populateCart(this.cart);
        this.setCartTotal(this.cart); 
    };

    closeCart(){
        this.sidebar.classList.toggle('show-sidebar');
        document.querySelector('.over').classList.remove('active');
    };
        
    createProduct(data){
        return `
        <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="product text-center" data-id="${data.id}">
                    <div class="position-relative mb-3">
                        <a class="d-block" href="#"><img src="${data.image}" class="img-fluid w-100" alt="${data.name}"></a>
                        <div class="product-overlay">
                            <ul class="mb-0 list-inline">
                                <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark choose" href="#"><i class="fab fa-gratipay"></i></a></li>
                                <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart" href="#">Buy book</a></li>
                                <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i class="fas fa-book-reader"></i></a></li>
                            </ul>
                        </div>
                    </div>
                <section>
                    <h3><a class="reset-anchor product-name" href="#">${data.name}</a></h3>
                    &#8372<span class="small text-muted product-price">${data.price}</span>
                </section>
            </div>
        </div>
        `;
    };
   
    populateCart(cart){
        cart.forEach(item => this.createCartItem(item));
    }

    createCartItem(item){
        const div = document.createElement('div');
        div.className = "cart-item";
        div.setAttribute('id', 'id'+item.id);
        div.innerHTML = `
            <div class="picture product-img">
                <img src="${item.image}" alt="${item.name}" class="img-fluid w=100">
            </div>
                <div class="product-name">${item.name}</div>
                <div class="remove-btn text-right">
                    <a href="#" class="reset-anchor m-auto"><i class="fas fa-trash-alt" data-id="${item.id}"></i></a>
                </div>
                <div class="quantity">
                    <div class="border d-flex justify-content-around mx-auto">
                        <i class="fas fa-caret-left" data-id="${item.id}"></i>
                            <span class="border-1 p-1 amount">${item.amount}</span>
                        <i class="fas fa-caret-right" data-id="${item.id}"></i>
                    </div>
                </div>
                <div class="prices">
                    <span class="price">&#8372<spa class="product-price">${item.price}</spa></span> 
                    &#8372<span class="subtotal"><spa class="product-subtotal"></spa></span> 
            </div>             
        `;
        this.cartItems.append(div);
    };

    createCategory(category){
        return `
        <a class="category-item" data-category="${category.name}" href="#"><img class="img-fluid" src="${category.image}" alt="Thriller"><strong class="category-item-title category-item" data-category="${category.name}">${category.name}</strong></a> 
        `;
    };
    
    makeCategories(categories){
        for (let i=0;i<4;i++){
            let div = document.createElement('div');
            div.className="col-xl-3";
           if (i==0){
               div.innerHTML=this.createCategory(categories[i]);
           } else if(i==1){
            div.innerHTML=this.createCategory(categories[i]);
           } else if(i==2){
            div.innerHTML=this.createCategory(categories[i]);
           } else if(i==3){
            div.innerHTML=this.createCategory(categories[i]);
           }
           document.querySelector('.categories').append(div);
        }
    };

    renderCategory(){
        const categories = document.querySelector('.categories');               
        categories.addEventListener('click',(event)=>{
            const target = event.target;       
            if (target.classList.contains('category-item')){
                const category = target.dataset.category; 
                const categoryFilter = items => items.filter(item => item.category.includes(category));
                this.makeShowcase(categoryFilter(Storage.getProducts()));
            } else{
                this.makeShowcase(Storage.getProducts());
            }
            this.addProductToCart();
            this.renderCart();
        });
    };
    
    createWish(item){
    const div = document.createElement('div');
    div.className = "wish-item";
    div.setAttribute('id', item.id);
    div.innerHTML = `
    <div class="picture product-img">
        <img src="${item.image}" alt="${item.name}" class="img-fluid w=100">
            </div>
            <div class="product-name">${item.name}</div>
                <div class="add-btn text-right">            
                    <a href="#" class="reset-anchor m-auto"><i class="fas fa-cart-plus"></i></a>
                </div>
            <div class="prices">
            <span class="price">&#8372 <spa class="product-price">${item.price}</spa></span> 
    </div>
    `
    this.wishItems.append(div);
    };

    addProductToCart(){
    
    const addToCartButtons = [...document.querySelectorAll('.add-to-cart')];
    addToCartButtons.forEach(button => {
        button.addEventListener('click',event => {
            let product = this.getProduct(event.target.closest('.product').getAttribute('data-id'));

            let exist = this.cart.some(elem=>elem.id===product.id);
            if(exist){
                this.cart.forEach(elem=>{
                    if(elem.id===product.id){
                        elem.amount +=1;
                    }
                })
            } else {
                let cartItem = {...product,amount:1};
                this.cart = [...this.cart, cartItem];

                +this.countItemsInCart.textContent++;
                if (this.countItemsInCart.textContent>0){
                    this.countItemsInCart.classList.add('notempty');
                } else{
                    this.countItemsInCart.classList.remove('notempty');
                }               
            }
           
            Storage.saveCart(this.cart);
            this.setCartTotal(this.cart);
            });
        });
    };
    
    productChoose(){
        const countWishItems = document.querySelector('.count-wish-items');    
        const chooseButtons = [...document.querySelectorAll('.choose')];
            chooseButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    let wishItem = {...this.getProduct(event.target.closest('.product').getAttribute('data-id'))};
                    this.listDesires = [...this.listDesires, wishItem];
                        
                        this.createWish(wishItem);
                        countWishItems.textContent++;
    
                        if (countWishItems.textContent>0){
                            countWishItems.classList.add('notempty'); 
                        } else{
                            countWishItems.classList.remove('notempty');
                };
            });
        });
    };
        
    clearAll(){
        this.cart = [];
        while(this.cartItems.children.length>0){
            this.cartItems.removeChild(this.cartItems.children[0]);
        };
        this.setCartTotal(this.cart);
    };
    
    clearWish(){
        this.listDesires = [];
        while(this.wishItems.children.length>0){
            this.wishItems.removeChild(this.wishItems.children[0]);
        }
    };

    renderCart(){
    this.clearCart.addEventListener('click', () => this.clearAll());
    this.cartItems.addEventListener('click', (event) => {
        if(event.target.classList.contains('fa-trash-alt')){
            this.cart = this.filterItem(this.cart, event.target);
            this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            Storage.saveCart(this.cart);
            this.setCartTotal(this.cart);

        } else if (event.target.classList.contains('fa-caret-right')){
            let tmp = this.findItem(this.cart, event.target);
            tmp.amount = tmp.amount +1;
            event.target.previousElementSibling.innerText = tmp.amount;
            Storage.saveCart(this.cart);
            this.setCartTotal(this.cart);
        
        } else if (event.target.classList.contains('fa-caret-left')){
            let tmp = this.findItem(this.cart, event.target);
            tmp.amount = tmp.amount -1;
            if (tmp.amount >0){
                event.target.nextElementSibling.innerText = tmp.amount;
            } else {
                this.cart = this.filterItem(this.cart, event.target);
                this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
            }            
            this.setCartTotal(this.cart);
            Storage.saveCart(this.cart);    
            }
        })
    };

    setCartTotal(cart){
        
        let itemsInCart = document.querySelectorAll('.cart-item');
        
        for (let item of itemsInCart){
            let price = item.querySelector('.product-price').textContent;
            let quantity = item.querySelector('.amount').textContent;
            item.querySelector('.product-subtotal').textContent = quantity*price;
            };

        this.cartTotal.textContent = parseFloat(cart.reduce((previous, current) => previous + current.price*current.amount, 0).toFixed(2));
        this.countItemsInCart.textContent = cart.reduce((previous, current) => previous + current.amount, 0);   
    };
   
    renderWish(){
    this.wishClear.addEventListener('click', () => this.clearWish());

   // написать функцию переноса товара из ListDesires в Cart
        this.wishItems.addEventListener('click', (event) => {
            if(event.target.classList.contains('fa-cart-plus')){
            this.listDesires =  this.filterWishItems(this.listDesires, event.target);
            this.wishItems.removeChild(event.target.parentElement.parentElement.parentElement);
            } else {
            this.listDesires = this.filterWishItems(this.listDesires, event.target);            
            this.wishItems.removeChild(event.target.parentElement.parentElement.parentElement);
            }
        });
    };

    renderDesires(){
        const Desires = document.querySelector('.list-Desires');
            let choose = [...document.querySelectorAll('.choose')];
            choose.forEach(Desires=>{addEventListener('.click', () =>{
                Desires.textContent++;
                if (+Desires.textContent>0){
                Desires.classList.add('notempty');   
                } else {listDesires.classList.remove('notempty'); 
                }
            });
        });
    };

};

(function(){
    const app = new App();
    app.addProductToCart()
    app.productChoose();
    app.renderCart();
    app.renderWish();
    app.renderDesires();
    app.renderCategory();
})();

