let SelectedProduct;

let select_size;
let selected_color;

const displayProduct = async () => {
  let id = localStorage.getItem("id");

  await fetch("https://cloth-ecommerce-backend.onrender.com/product-id", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      SelectedProduct = data;
      console.log(SelectedProduct);
    });

  renderProduct();
};

const renderProduct = () => {
  // image slider
  const imageSlider = document.querySelector(".img-sliderbox");
  let imageSliderImage = ``;
  SelectedProduct[0].image.forEach((i) => {
    imageSliderImage += `
      <div class="slider-img"  >
        <img src="${i}" class="fill-img" alt="" />
      </div>
    `;
  });
  imageSlider.innerHTML = imageSliderImage;

  // main img
  const mainImgDiv = document.querySelector(".slider-main-img");
  let mainImg = `
      <img src="${SelectedProduct[0].image[0]}" class="fill-img" alt="" />
  `;
  mainImgDiv.innerHTML = mainImg;

  // product title
  const title = document.querySelector(".product-title");
  title.innerHTML = `${SelectedProduct[0].name}`;

  // product disc
  const disc = document.querySelector(".product-disc");
  disc.innerHTML = `${SelectedProduct[0].discription}`;

  // price
  const mrp = document.querySelector(".og-price");
  mrp.innerHTML = `
    <span>
      &#8377;
    </span>
    ${SelectedProduct[0].price}
  `;

  const discount = document.querySelector(".offer");
  discount.innerHTML = `(${SelectedProduct[0].discount}% OFF)`;

  let calculatedprice =
    SelectedProduct[0].price -
    SelectedProduct[0].price * (SelectedProduct[0].discount / 100);
  const sellingPrice = document.querySelector(".sell-price");
  sellingPrice.innerHTML = `
    <span>
      &#8377;
    </span>
    ${calculatedprice}
  `;

  // size
  let sizes = ``;
  SelectedProduct[0].size.forEach((item) => {
    sizes += `
      <div class="s-item">${item}</div>
    `;
  });

  const SizeDiv = document.querySelector(".s-box");
  SizeDiv.innerHTML = sizes;

  // colors
  let colors = ``;
  SelectedProduct[0].color.forEach((item) => {
    colors += ` <div class="c-item">
    <img src=${item}" alt="" class="fill-img">
  </div>`;
  });

  const colorsDiv = document.querySelector(".c-box");
  colorsDiv.innerHTML = colors;

  Events();
};

const Events = () => {
  document.querySelectorAll(".slider-img").forEach((img) => {
    img.addEventListener("click", (e) => {
      const mainImgDiv = document.querySelector(".slider-main-img");
      let mainImg = `
      <img src="${e.target.src}" class="fill-img" alt="" />
  `;
      mainImgDiv.innerHTML = mainImg;
    });
  });


  document.querySelectorAll('.s-item').forEach((item)=>{
    item.addEventListener('click', (e)=>{
      select_size = e.target;

      document.querySelectorAll('.s-item').forEach((i)=>{
        i.style.border = "";
      })

      select_size.style.border = "1px solid #9452c7"
    })
  })

  
  document.querySelectorAll('.c-item').forEach((item)=>{
    item.addEventListener('click', (e)=>{
      selected_color = e.target.parentElement;
      console.log(selected_color);

      document.querySelectorAll('.c-item').forEach((i)=>{
        i.style.border = "";
      })

      selected_color.style.border = "1px solid #9452c7"
    })
  })
};

displayProduct();
