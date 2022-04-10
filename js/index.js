var selectProductId = null;
async function getProducts() {
  // let params = query ? "title=" + query : "";
  const response = await fetch(
    "https://products-dasw.herokuapp.com/api/products",
    {
      method: "GET",
      headers: {
        "x-expediente": "726487",
      },
    }
  );
  const data = await response.json();
  //aquí puedes procesar data o regresar los datos y mandar llamar eta función

  // console.log(data[0]);
  // console.log(typeof data);
  // Array.from(data);
  return data;
}
var input = document.getElementById("buscador");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("boton").click;
  }
});
async function procesarInformacion(page = 1) {
  let query = encodeURIComponent(document.querySelector("#buscador").value);
  // console.log(query);
  const response = await fetch(
    "https://products-dasw.herokuapp.com/api/products?title=" + query,
    {
      method: "GET",
      headers: {
        "x-expediente": "726487",
      },
    }
  );
  //como getProducts es asíncrona debemos usar await para esperar a que se ejecute
  //por lo que esta función también debe ser asíncrona
  const data = await response.json();
  // console.log(typeof data);
  let crd = document.querySelector("#cards");

  let toShow = data.slice((page - 1) * 4, page * 4);
  crd.innerHTML = toShow
    .map(
      (m) => `<div class="col-lg2 mb-4">
                <div class="card mt-5 ml-3 mr-2" id="crd" title="La fruta no es lo único fresco">
                    <img class="card-img-top cardImage" src="${m.imageUrl}" alt="Card image cap">
                    <div class="card-body">
                      <h5 class="card-title">${m.title}</h5>
                      <p class="card-text">${m.description}</p>
                    </div>
                    <div class="mb-3">
                        <p class="card-text" style="text-align: center;">${m.unit} x ${m.pricePerUnit}</p>
                    </div>
                <div class="addToCart mb-2" style="text-align: center;">
                <button class="btn btn-primary" onclick="setProductId('${m.uuid}')" data-toggle="modal" data-target="#modalCart" style="margin: auto">Add to cart</button></div>

                </div>
            </div>`
    )
    .join("");

  // console.log(data);
  return data;
}
// console.log(getProducts());
function setProductId(uuid) {
  selectProductId = uuid;
  // console.log(selectProductId);
}

async function login() {
  let email = document.querySelector("#useremail").value;
  console.log(email);
  sessionStorage.setItem("user", email);
}
async function addtoCart() {
  let product = document.querySelector("#pNumber").value;

  // console.log(selectProductId, product.value);
  if (sessionStorage.user) {
    const response = await fetch(
      "https://products-dasw.herokuapp.com/api/carts/" + selectProductId,
      {
        method: "POST",
        headers: {
          "x-expediente": "726487",
          "x-user": sessionStorage.user,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product,
        }),
      }
    );
    console.log(response);
  }
  getCartAmount();
}
async function pagination() {
  let prod = await procesarInformacion();
  // console.log(prod);
  // console.log(typeof prod);
  let page = 1;
  // sessionStorage.setItem("page", page);
  const datalength = Math.ceil(prod.length / 4);
  let HTMLToInsert = "";
  let pages = document.querySelector("#pagination");
  for (let i = 1; i <= datalength; i++) {
    HTMLToInsert += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link "onclick="procesarInformacion(${i})">${i}</a></li>`;
  }
  pages.innerHTML = HTMLToInsert;
}

async function getCartAmount() {
  let user = sessionStorage.user;
  const response = await fetch(
    "https://products-dasw.herokuapp.com/api/carts",
    {
      method: "GET",
      headers: {
        "x-expediente": "726487",
        "x-user": user,
      },
    }
  );
  const data = await response.json();
  let number = document.querySelector("#cartCount");
  number.innerHTML = `<span class="group-text" style="color: white;">${data.cart.length}
    </span>`;
}

procesarInformacion();
pagination();
getCartAmount();
