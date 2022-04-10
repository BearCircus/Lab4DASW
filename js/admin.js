async function getProductsAdmin() {
  let queryCat = encodeURIComponent(document.querySelector("#buscarCat").value);
  //   console.log("Cat", typeof queryCat);
  let queryMin = encodeURIComponent(document.querySelector("#buscarMin").value);
  let queryMax = encodeURIComponent(document.querySelector("#buscarMax").value);
  let url = "https://products-dasw.herokuapp.com/api/products?";
  if (queryCat) {
    url += "&category=" + queryCat;
  }
  if (queryMin) {
    url += "&min=" + queryMin;
  }
  if (queryMax) {
    url += "&max=" + queryMax;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-expediente": "726487",
      "x-auth": "admin",
    },
  });
  console.log(url);
  const data = await response.json();
  let prod = document.querySelector("#newProduct");
  prod.innerHTML =
    data
      .map(
        (p) => `<tr>
      <div class="prod">
      <td>${p.uuid}</td>
      <td>${p.title}</td>
      <td>${p.description}</td>
      <td>${p.unit}</td>
      <td>${p.stock}</td>
      <td>${p.pricePerUnit}</td>
      <td>${p.category}</td>
      <td>${p.imageUrl}</td>
      <td><button type="button" class="btn btn-primary" >Edit Product</button></td>
      </div>
      </tr>`
      )
      .join("") +
    `<tr>
        
        <div class="prod" id="prodToAdd">
            <td>no id</td>
            <td><input type="text" id="title" style="width: 100%;" placeholder="title" id="title"></td>
            <td><input type="text" id="description" style="width: 100%;" placeholder="description" id="title"></td>
            <td><input type="text" id="unit" style="width: 100%;" placeholder="unit" id="title"></td>
            <td><input type="text" id="stock" style="width: 100%;" placeholder="stock" id="title"></td>
            <td><input type="text" id="pricePerUnit" style="width: 100%;" placeholder="price" id="title"></td>
            <td><input type="text" id="category" style="width: 100%;" placeholder="category" id="title"></td>
            <td><input type="text" id="imageUrl" style="width: 100%;" placeholder="image" id="title"></td>
            <td><input type="submit" onclick="addProduct()" value="Add product"></td>
        </div>
        
    </tr>`;
}

async function addProduct() {
  let title = document.querySelector("#title").value;
  console.log(title);
  let description = document.querySelector("#description").value;
  console.log(description);
  let unit = document.querySelector("#unit").value;
  console.log(unit);
  let stock = document.querySelector("#stock").value;
  console.log(stock);
  let pricePerUnit = document.querySelector("#pricePerUnit").value;
  console.log(pricePerUnit);
  let category = document.querySelector("#category").value;
  console.log(category);
  let imageUrl = document.querySelector("#imageUrl").value;
  console.log(imageUrl);

  const response = await fetch(
    "https://products-dasw.herokuapp.com/api/products",
    {
      method: "POST",
      headers: {
        "x-expediente": "726487",
        "x-auth": "admin",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        pricePerUnit: pricePerUnit,
        stock: stock,
        category: category,
        imageUrl: imageUrl,
        unit: unit,
      }),
    }
  );
  getProductsAdmin();
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
getCartAmount();
getProductsAdmin();
