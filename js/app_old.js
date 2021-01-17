"use strict"

class Storage{
    static saveProducts(products){
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    static saveCart(cart){
        localStorage.setItem('basket', JSON.stringify(cart));
    }
    
    static getCart(){
        return localStorage.getItem('basket')?JSON.parse(localStorage.getItem('basket')):[];
    }
    
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find (product=>product.id===+(id));
    }

    static getProducts(){
        return JSON.parse(localStorage.getItem('products'));
    }
};

class Product{
    getProducts(products){
        return products.map(item =>{
            const id = item.id;
            const name = item.name;
            const price = item.price;
            const image = item.image;
            const category = item.category;
            return {id,name,price,image,category};
        })
    }
};

class App {
    cart = [];
    cartItems = document.querySelector('.cart-items');
    clearCart = document.querySelector('.clear-cart');
    sidebar = document.querySelector('.sidebar');
    cartTotal = document.querySelector('.cart-total');
    countItemsInCart = document.querySelector('.count-items-in-cart');
    constructor(){
        const sidebarToggle = document.querySelector('.sidebar-toggle'); 
        const closeBtn = document.querySelector('.close-btn');
        sidebarToggle.addEventListener('click',()=> this.openCart());
        closeBtn.addEventListener('click', ()=> this.closeCart());

        if (document.querySelector('.categories')){
            this.makeCategories(categories);
        };

        this.makeShowcase(products);

        let data = new Product();
        Storage.saveProducts(data.getProducts(products));
        this.makeShowcase(Storage.getProducts());
        this.cart = Storage.getCart();   
    };

    getProduct = (id)=>products.find(product=>product.id === +(id));
    // getProduct = (id)=>Storage.getProducts().find(product=>product.id===+(id));    

    createProduct = (data)=>
         `
        <div class="col-xl-3 col-lg-4 col-sm-6">
            <div class="product text-center" data-id="${data.id}">
                <div class="position-relative mb-3">
                    <a class="d-block" href="detail.html"><img class="img-fluid w-100" src="${data.image}"alt="${data.name}"></a>
                    <div class="product-overlay">
                        <ul class="mb-0 list-inline">
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark choose" href="#"><i class="fab fa-gratipay"></i></a></li>
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart" href="#">Buy book</a></li>
                            <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i class="fas fa-book-reader"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <h6> <a class="reset-anchor product-name" href="detail.html">${data.name}</a></h6>
                <p class="small text-muted product-price">${data.price}</p>
            </div>
        </div>
        ` ;    
        
    makeShowcase(products){
        let result = '';
        products.forEach (item => result+=this.createProduct(item));
        document.querySelector('.showcase').innerHTML=result;
    };

    openCart(){
        document.querySelector('.over').classList.add('active');
        this.sidebar.classList.toggle('show-sidebar');
        this.cartItems.innerHTML='';
        this.cart = Storage.getCart();
        this.populateCart(this.cart);
        this.setCartTotal(this.cart);
        this.subtotals();
    };

    closeCart(){
        this.sidebar.classList.toggle('show-sidebar');
        document.querySelector('.over').classList.remove('active');
    };

    

    subtotals(){
        let itemsInCart = document.querySelectorAll('.cart-item');
        // console.log(itemsInCart);
        for(let item of itemsInCart)
        // console.log(item);
        {
            let price = item.querySelector('.product-price').textContent;
            // console.log(price);
            let quantity = item.querySelector('.amount').textContent;
            // console.log(quantity);
            item.querySelector('.product-subtotal').textContent = quantity*price;
            
        }
    }

    populateCart(cart){
        cart.forEach(item => this.createCartItem(item));
    };

    createCartItem(item){
        const div = document.createElement('div');
        div.className = "cart-item";
        div.setAttribute('id', item.id);
        div.innerHTML = `
        <div class="picture product-img">
            <img src="${item.image}" alt="${item.name}" class="img-fluid w-100">
            </div>
            <div class="product-name p-auto">${item.name}</div>
            <div class="remove-btn text-right">
                <a class="reset-anchor m-auto" href="#">
                    <i class="fas fa-trash-alt" data-id=${item.id}></i>
                </a>
            </div>
            <div class="quantity">
                <div class="border d-flex justify-content-around mx-auto">
                    <i class="fas fa-caret-left inc-dec-btn" data-id=${item.id}></i>
                    <span class="border-1 p-1 amount">${item.amount}</span>
                    <i class="fas fa-caret-right inc-dec-btn" data-id=${item.id}></i>
                </div>
            </div>
            <div class="prices">
                <span class="price">&#8372<span class="product-price">${item.price}</span></span>
                <span class="subtotal">Total: &#8372 <span class="product-subtotal"></span></span>
            </div>
    
        `;  
        this.cartItems.appendChild(div);
    };

    addProductToCart(){
        const addToCartButtons = [...document.querySelectorAll('.add-to-cart')];
        const listDesires = document.getElementById('list-Desires');
        addToCartButtons.forEach(button=>{
            button.addEventListener('click', event=>{
                let product = this.getProduct(event.target.closest('.product').getAttribute('data-id'));

                let exist = this.cart.some(elem=>elem.id===product.id);
                if(exist){
                    this.cart.forEach(elem=>{
                        if(elem.id===product.id){
                            elem.amount += 1;
                        }
                    })
                } else{
                    let cartItem = { ...product, amount: 1 };
                    this.cart = [...this.cart, cartItem];
                    +this.countItemsInCart.textContent++;
                    if (+this.countItemsInCart.textContent>0){
                        this.countItemsInCart.classList.add('notempty');
                    } else {
                        this.countItemsInCart.classList.remove('notempty');
                    }
                    
                }
                
                Storage.saveCart(this.cart);
                this.subtotals();
                this.setCartTotal(this.cart);   
            })
        })
    
        let choose = document.querySelectorAll('.choose');
        for (let i = 0; i<choose.length; i++){
   
    };
    
        for (let i = 0; i<choose.length; i++){
        choose[i].addEventListener('click',function(){
                listDesires.textContent++;       
                if (listDesires.textContent>0){
                listDesires.classList.add('notempty');    
                } else{
                listDesires.classList.remove('notempty');
            }
        })
          
    };
    
    };
 
    clearAll(){
    this.cart = [];
    while(this.cartItems.children.length>0){
        this.cartItems.removeChild(this.cartItems.children[0]);    
    }
    this.subtotals();
    this.setCartTotal(this.cart);
    };

    filterItem = (cart, filteredItem) => cart.filter(item => item.id !== +(filteredItem.dataset.id));
    findItem = (cart, findingItem) => cart.find(item => item.id === +(findingItem.dataset.id));

    renderCart(){
        this.clearCart.addEventListener('click',()=> this.clearAll());
        this.cartItems.addEventListener("click", event => {
            if (event.target.classList.contains("fa-trash-alt")) {
              this.cart = this.filterItem(this.cart, event.target);
              this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
              Storage.saveCart(this.cart);
              this.setCartTotal(this.cart);
              this.subtotals();
            } else if (event.target.classList.contains("fa-caret-right")) {
              let tempItem = this.findItem(this.cart, event.target);
              tempItem.amount = tempItem.amount + 1;
              event.target.previousElementSibling.innerText = tempItem.amount;
              Storage.saveCart(this.cart);
              this.setCartTotal(this.cart);
              this.subtotals();
            } else if (event.target.classList.contains("fa-caret-left")) {
              let tempItem = this.findItem(this.cart, event.target);
              tempItem.amount = tempItem.amount - 1;
              if (tempItem.amount > 0) {
                  event.target.nextElementSibling.innerText = tempItem.amount;
              } else {
                this.cart = this.filterItem(this.cart, event.target);
                this.cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
              }              
              this.subtotals();
              this.setCartTotal(this.cart);
              Storage.saveCart(this.cart);
            }
          });
    };

    setCartTotal(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
          tempTotal += item.price*item.amount;
          itemsTotal += item.amount;
        });
        this.cartTotal.textContent = parseFloat(tempTotal.toFixed(2));
        this.countItemsInCart.textContent = itemsTotal;
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

    renderCategory(){
        const categories = document.querySelector('.categories');
       
        categories.addEventListener('click',(event)=>{
            const target = event.target;
            
            if (target.classList.contains('category-item')){
                const category = target.dataset.category;
                console.log(category);
                const categoryFilter = items => items.filter(item => item.category.includes(category));
                this.makeShowcase(categoryFilter(Storage.getProducts()));
            } else{
                this.makeShowcase(Storage.getProducts());
            }
            this.addProductToCart();
            this.renderCart();
        });
    };

    createCategory(category){
        return `
        <a class="category-item" data-category="${category.name}" href="#"><img class="img-fluid" src="${category.image}" alt="Horror"><strong class="category-item-title category-item" data-category="${category.name}">${category.name}</strong></a> 
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
    }

};

(function(){
    const app = new App();
    
    app.addProductToCart();
    app.renderCart();
    app.renderDesires();
    app.renderCategory();
})();


