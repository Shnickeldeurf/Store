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

    $(".item").click(showItem);

    $("#reg").click(addUser);

    showItems();

    checkUser();

    showCart();
})

function showItems() {
    if (items.length > 0) {
        $("#noProducts").hide();
        show = $("#products");
        show.empty();
        for (var i = 0; i < items.length; i++) {
            show.append("<div class='col-md-4 item'>" +
                "<img onclick='showItem(" + i + ")' src='" + items[i].image + "' class='img-fluid'>" +
                "<h6 onclick='showItem(" + i + ")'>" + items[i].name + "</h6>" +
                "<p onclick='showItem(" + i + ")'>$" + items[i].price + "</p>" +
                "<button onclick='deleteItem(" + i + ")' class='btn btn-danger'>Delete</button>" +
                "</div>"
            )
        }
        if (current != null && current.name == "Admin") {
            $(".btn-danger").show();
        }
    }
}

function showItem(i) {
    item = items[i];
    localStorage.setItem("currentItem", JSON.stringify(item));
    window.location.href = "single.html";
}

//delete item
function deleteItem(i) {
    items.splice(i, 1);
    localStorage.setItem("shopitems", JSON.stringify(items));
    showItems();
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
        if (users[i].email == email && users[i].password == pass) {
            current = users[i];
            localStorage.setItem("sCurrent", JSON.stringify(current));
            window.location.reload();
            email.value = "";
            pass.value = "";
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