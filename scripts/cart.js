let cart;
let products = [];

const fetchCart = async () => {
    try {
        const response = await fetch("https://cloth-ecommerce-backend.onrender.com/cart/getItems", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        cart = data.cartItems;
        await fetchProducts();
       
    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}

const removeProduct = async(id)=>{
  try {
    const response = await fetch("https://cloth-ecommerce-backend.onrender.com/cart/removeItem", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
            body: JSON.stringify({
            productId : id
          }),
    });
    const data = await response.json();
    
    location.reload();
   
  } catch (error) {
      console.error("Error fetching cart items:", error);
  }
}

const fetchProducts = async () => {
    try {
        const promises = cart.map(async (cartItem) => {
            const response = await fetch("https://cloth-ecommerce-backend.onrender.com/product/product-id", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: cartItem.productId
                }),
            });
            const data = await response.json();
            products.push(data);
        });
        await Promise.all(promises);
        renderCart();
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

const renderCart = () => {
    const productDiv = document.querySelector('.products-div');
    let items = '';
    

    products.forEach((item)=>{

      items += `
      <div class="product-item">
          <div class="img">
              <img src="${item[0].image[0]}" class="fill-img">
          </div>
          <div class="details">
              <p class="name limit-text-to-2-lines">${item[0].name}</p>
              <p class="description limit-text-to-2-lines">${item[0].discription}</p>
              <div class="tmp1">
                  <div class="size tmp1-d">
                      size
                      <select name="size" id="">
                          <option value="s">s</option>
                      </select>
                  </div>
                  <div class="qty tmp1-d">
                      quantity
                      <select name="qty" id="">
                          <option value="s">1</option>
                          <option value="s">2</option>
                          <option value="s">3</option>
                          <option value="s">4</option>
                      </select>
                  </div>
              </div>
              <p class="price">
                  <span class="s-price">&#8377; ${item[0].price}</span>
                  <span class="m-price">&#8377; ${item[0].price}</span> 
                  <span class="offer">${item[0].discount}% OFF</span>
              </p>
          </div>
          <button class="remove_btn" data-id="${item[0]._id}">
              <img src="../img/x.png" alt="" class="fill-img">
          </button>
      </div>`;
    })
    productDiv.innerHTML = items;

    document.querySelectorAll('.remove_btn').forEach((btn)=>{
      btn.addEventListener('click', ()=>{
        removeProduct(btn.dataset.id)
      })
    }) 

    renderPrice();
}

const renderPrice = ()=>{
  const pricediv = document.querySelector('.price-div');
  
  let mrp = 0;
  let price = 0;
  let disc = 0;

  products.forEach((p)=>{
    let m = p[0].price;
    let d = (m/100)*p[0].discount;
    let pr = m - d;
    disc += d;
    mrp += m;
    price += pr;
  })

  let item = ``;
  item += `
          <p class="item-no">
                PRICE DETAILS (${cart.length} Item)
            </p>

            <div class="price-details">
                <p class="price-div-items">
                    <span>
                        Total MRP
                    </span>
                    <span>
                      &#8377; ${mrp.toFixed(2)}
                    </span>
                </p>
        
                <p class="price-div-items">
                    <span>
                        Discount on MRP
                    </span>
                    <span class="g-color">
                      &#8377; ${disc.toFixed(2)}
                    </span>
                </p>
        
                <p class="price-div-items">
                    <span>
                        Platform Fee
                    </span>
                    <span class="g-color">
                        FREE
                    </span>
                </p>
        
                <p class="price-div-items ">
                    <span>
                        Shipping Fee
                    </span>
                    <span class="g-color">
                        FREE
                    </span>
                </p>    
            </div>

            <p class="price-div-items total">
                <span>
                    Total Amount
                </span>
                <span>
                  &#8377; ${price.toFixed(2)}
                </span>
            </p>

            <div class="order-div">
                <button class="order">
                    PLACE ORDER
                </button>
            </div>`;

        pricediv.innerHTML = item;
}

const displayCart = () => {
    fetchCart();
}

displayCart();
