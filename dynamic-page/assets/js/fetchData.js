const BASE_URL = "https://fakestoreapi.com";

async function getAPI(url) {
    const response = await fetch(url + "/products");

    var data = await response.json();
    if (response.status === 200) {
        hideloader();
    }
    show(data);
}

getAPI(BASE_URL);

function hideloader() {
    document.getElementById("loading").style.display = "none";
}

function show(data) {
    let product = "";
    for (let item of data) {
        product += ` <div class="col-md-4" style="padding-bottom:7rem;">
                        <div class="single-product-items">
                            <div class="product-item-image text-center">
                                <a href="#"><img src="${item.image}" alt="${item.title}" style="max-width:200px;max-height:250px"></a>
                            </div>
                            <div class="product-item-content text-center mt-30">
                                <h5 class="product-title"><a href="#">${item.title}</a></h5>
                                <span class="regular-price">$${item.price}</span>
                            </div>
                        </div>
                    </div>`;
    }
    document.getElementById("products").innerHTML = product;
}
