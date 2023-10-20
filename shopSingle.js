$(document).ready(function () {
    $("#regTab").click(function () {
        $("#login").hide();
        $("#register").show();
    });
    $("#logTab").click(function () {
        $("#login").show();
        $("#register").hide();
    });

    $("#liBtn").click(function () {
        $(".modal").modal("show");
    });

    $("#loBtn").click(function () {
        logout();
    })

    $("#log").click(login);

    showItem();

    checkUser();

    showCart();
})

//add to cart
function addToCart() {
    quantity = $("#quantity").val();
    item.quantity = quantity;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].productID == item.productID) {
            newQuantity = +cart[i].quantity + +item.quantity;
            cart[i].quantity = newQuantity;
            localStorage.setItem(current.name + "cart", JSON.stringify(cart));
            return;
        }
    }
    cart.push(item);
    if (localStorage.getItem("current") != null) {
        localStorage.setItem(current.name + "cart", JSON.stringify(cart));
    } else {
        localStorage.setItem("guestCart", JSON.stringify(cart));
    }
    showCart();
}

//show item
if (localStorage.getItem("currentItem") == null) {
    window.location.href = "shop.html";
} else {
    item = JSON.parse(localStorage.getItem("currentItem"));
}

function showItem() {
    show = $("#singleShow");
    show.empty();
    show.append("<div class='container d-flex'>" +
        "<div class='col-8'>" +
        "<img id='singleImg' src='" + item.image + "' class='img-fluid'>" +
        "</div>" +
        "<div class='col-4'>" +
        "<h3>" + item.name + "</h3>" +
        "<p>" + item.productID + "</p>" +
        "<h5>$" + item.price + "</h5>" +
        "<label for='quantity'>Quantity</label><br>" +
        "<input type='number' id='quantity' value='1'><br>" +
        "<button type='button' onclick='addToCart()'>Add To Cart</button>" +
        "<div id='singleInfo'>" +
        "<h5>PRODUCT INFO</h5>" +
        "<h5>RETURN & REFUND POLICY</h5>" +
        "<h5>SHIPPING INFO</h5>" +
        "</div>" +
        "</div>" +
        "</div>");
}

//All

//go to cart
function goCart() {
    window.location.href = "cart.html";
}

//add user
function addUser() {
    var name = $("#rName").val();
    var email = $("#rEmail").val();
    var phone = $("#rPhone").val();
    var password = $("#rPass").val();
    user = {}
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if (name == "") {
        alert("Please enter a name");
        return;
    } else if (email == "") {
        alert("Please enter an email");
        return;
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("Please enter a valid email");
        return;
    }else if (phone == "") {
        alert("Please enter a phone number");
        return;
    } else if (!re.test(phone)) {
        alert("Please enter a valid phone number");
        return;
    } else if (password == "") {
        alert("Please enter a password");
        return;
    } else {
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.password = password;
        users.push(user);
        localStorage.setItem("shopusers", JSON.stringify(users));

        $("#rName").val("");
        $("#rEmail").val("");
        $("#rPhone").val("");
        $("#rPass").val("");

        $("#login").show();
        $("#register").hide();
    }
}

//check user
function checkUser() {
    if (current != null) {
        $("#username").text(current.name);
        $("#liBtn").hide();
        $('#loBtn').show();
        if (current.name == "Admin") {
            $("#adminStuff").show();
        }
    }
}

//login/logout
function login() {
    var email = $("#lEmail").val();
    var pass = $("#lPass").val();

    for (var i = 0; i < users.length; i++) {
        console.log(users[i])
        if (users[i].email == email && users[i].password == pass) {
            current = users[i];
            localStorage.setItem("sCurrent", JSON.stringify(current));
            window.location.reload();
            email.value = "";
            pass.value = "";
        }
    }
    
    if (cart.length > 0) {
        if (localStorage.getItem(current.name + "cart") != null) {
            currentCart = JSON.parse(localStorage.getItem(current.name + "cart"));
            for (i = 0; i < cart.length; i++) {
                currentCart.push(cart[i]);
                localStorage.setItem(current.name + "cart", JSON.stringify(currentCart));
                localStorage.removeItem("guestCart");
            }
        } else {
            localStorage.setItem(current.name + "cart", JSON.stringify(cart));
            localStorage.removeItem("guestCart");
        }
    }
}

function logout() {
    localStorage.removeItem("sCurrent");
    window.location.reload();
}

//get items
if (localStorage.getItem("shopitems") == null) {
    items=[];
    localStorage.setItem("shopitems", JSON.stringify(items));
} else {
    items = JSON.parse(localStorage.getItem("shopitems"));
}

//get users
var admin = {
    name: "Admin",
    email: "admin",
    password: "admin"
}

if (localStorage.getItem("shopusers") == null) {
    users=[admin];
    localStorage.setItem("shopusers", JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem("shopusers"));
}

if (localStorage.getItem("sCurrent") == null) {
   current = null;
   localStorage.setItem("sCurrent", JSON.stringify(current));
} else {
    current = JSON.parse(localStorage.getItem("sCurrent"));
}

//get cart
if (current != null) {
    if (localStorage.getItem(current.name + "cart") == null) {
        cart = [];
        localStorage.setItem(current.name + "cart", JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem(current.name + "cart"));
    }
} else if (current == null) {
    if (localStorage.getItem("guestCart") == null) {
        cart = [];
        localStorage.setItem("guestCart", JSON.stringify(cart));
    } else {
        cart = JSON.parse(localStorage.getItem("guestCart"));
    }
    
}

function showCart() {
    show = document.getElementById("cartCount");
    if (cart.length == 0) {
        show.innerHTML = "<span><i class='bi-cart'></i></span>" + "0";
    }
    show.innerHTML = "<span onclick='goCart()'><i class='bi-cart'></i></span>" + cart.length;
}