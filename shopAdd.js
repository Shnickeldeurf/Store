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

    checkUser();
})

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

function showItem() {
    item = $(this>"h6").text();
    console.log(item);
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
    console.log(current)
}

function logout() {
    localStorage.removeItem("sCurrent");
    window.location.reload();
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
if (current != null && localStorage.getItem(current.name + "cart") == null) {
    cart=[];
    localStorage.setItem(current.name + "cart", JSON.stringify(cart));
} else if (current == null && localStorage.getItem("guestcart") == null) {
    cart=[];
    localStorage.setItem("guestcart", JSON.stringify(cart));
} else if (current != null && localStorage.getItem(current.name + "cart") != null) {
    cart = JSON.parse(localStorage.getItem(current.name + "cart"));
} else if (current == null && localStorage.getItem("guestcart") != null) {
    cart = JSON.parse(localStorage.getItem("guestcart"));
}