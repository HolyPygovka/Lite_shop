console.log("cart.js");

document.querySelectorAll('.one_card .tocart').forEach(function(element){
    element.onclick = addToCart;
});

function addToCart(e){
    e.preventDefault();
    console.log("add");
    let cart_val = {};
    console.log(this.getAttribute("product_id"));
};