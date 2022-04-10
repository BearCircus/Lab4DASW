async function getCart() {
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
  let crd = document.querySelector("#cartItem");
  crd.innerHTML = data.cart
    .map(
      (m) => `       <div class="media border border-muted tarFinal">
              <div class="media-body mx-3 my-3">
                <h5 class="mt-0">${m.product.title}<span class="badge badge-danger"><i class="bi bi-trash" onclick="deleteProduct('${m.product.uuid}')"></i></span></h5>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Cantidad:</span>
                  </div>
                  <input type="number" class="form-control col-5" id="quantity-${m.product.uuid}" value="${m.amount}" />
                  <div class="input-group-append" onclick="editCart('${m.product.uuid}')">
                    <span class="input-group-text text-light bg-info"><i class="bi bi-pencil"></i></span>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Precio:</span>
                  </div>
                  <input type="text" class="form-control col-4" value="${m.product.pricePerUnit}" disabled=""/>
                  <div class="input-group-append">
                    <span class="input-group-text">$m.n.</span>
                  </div>
                </div>
              </div>
              <div class="media-right">
                <img class="mr-3 mt-1 mb-1 imageSize" src="${m.product.imageUrl}" alt="Generic placeholder image"/>
              </div>
            </div>`
    )
    .join("");
}
async function activateEdit(uuid) {
  inputElement = document.getElementById("#quantity-" + uuid);
  console.log(inputElement.parentNode);
}
async function editCart(uuid) {
  let quantity = document.querySelector("#quantity-" + uuid).value;
  //   console.log(quantity);
  const response = await fetch(
    "https://products-dasw.herokuapp.com/api/carts/" + uuid,
    {
      method: "POST",
      headers: {
        "x-expediente": "726487",
        "x-user": sessionStorage.user,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: quantity,
      }),
    }
  );
  getCart();
  getCartAmount();
  TotalOrder();
}
async function deleteProduct(uuid) {
  const response = await fetch(
    "https://products-dasw.herokuapp.com/api/carts/" + uuid,
    {
      method: "DELETE",
      headers: {
        "x-expediente": "726487",
        "x-user": sessionStorage.user,
      },
    }
  );
  getCart();
  getCartAmount();
  TotalOrder();
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

async function TotalOrder() {
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
  let order = document.querySelector("#TotalOrder");
  let htmlToAdd = "";
  data.cart.forEach(
    (p) =>
      (htmlToAdd += `<p class="card-text">
                    ${p.product.title}:    $${p.product.pricePerUnit * p.amount}
                  </p>`)
  );
  //   console.log(htmlToAdd);
  //   console.log(order);
  htmlToAdd += `<p class="card-text">Monto a pagar: ${data.total}</p>
  <a href="./confirmation.html" class="btn btn-outline-success col-12 mb-2 btn-lg">Pagar</a>
                  <a href="./index.html" class="btn btn-outline-danger col-12">Cancelar</a>`;
  order.innerHTML = htmlToAdd;
}
getCart();
TotalOrder();
getCartAmount();
