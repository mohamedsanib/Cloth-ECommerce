
const displayAllProduct = async() => {
    
    let fetchedData;
    
    const response = await fetch("https://cloth-ecommerce-backend.onrender.com/allproduct", {
            method: "GET", 
    });
      
    fetchedData = await response.json();
    console.log("Success:", fetchedData);

    const outerDiv = document.querySelector(".contents");
    let result = '';

    fetchedData.forEach((element) => {
        result += `<div class="main-items" data-about="${element._id}">
            <div class="main-item-img">
                <img class="fill-img" src="${element.image[0]}" alt="" />
            </div>
            <div class="main-item-detail">
                <h2 class="main-item-title limit-text-to-2-lines">${element.name}</h2>
                <p class="main-item-disc limit-text-to-2-lines">${element.discription}</p>
            </div>
            <div class="main-item-price">
                <p class="price-sell">&#8377; ${(element.price - (element.price * (element.discount/100))).toFixed(0)}</p>
                <div class="price-tmp">
                    <p class="price-original">&#8377; ${element.price}</p>
                    <p class="price-offer">(${element.discount}% OFF)</p>
                </div>
          </div>
        </div>`;
    });
    outerDiv.innerHTML = result;

    const productElements = document.querySelectorAll(".main-items");
    productElements.forEach((product) => {
        product.addEventListener("click", () => {
            localStorage.setItem("id", product.dataset.about);
            window.location.href = "../pages/product.html";
        });
    });
};


displayAllProduct();