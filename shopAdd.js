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

    const showPic = (e) => {
        const file = e.target.files[0];
        const imageType = /image*/;
    
        if (file.type.match(imageType)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            $('#picPreview').css('background-image', `url(${reader.result})`);
            var uPic = reader.result;
            localStorage.setItem('uPic', uPic);
        };
        }
    };

    $('#pic').on('change', showPic);

    $("#addProduct").click(addItem);

    checkUser();
})

//random 3 digit
const r3d = Math.floor(Math.random() * 900) + 100;

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

function addItem() {
    var name = $("#name").val();
    var price = $("#price").val();
    if (localStorage.getItem("uPic") == null) {
        alert("Please enter a photo");
        return;
    } else {
        var image = localStorage.getItem("uPic");
    }
    var featured = $("#featured").is(":checked");
    var id = r3d;

    if (name == "") {
        alert("Please enter a name");
        return;
    } else if (price == "") {
        alert("Please enter a price");
        return;
    } else if (isNaN(price) || price < 0) {
        alert("Please enter a valid price");
    } else {
        var item = {
            name: name,
            price: price,
            image: image,
            featured: featured,
            productID: id
        }
    
        items.push(item);
        localStorage.setItem("shopitems", JSON.stringify(items));

        $("#name").val("");
        $("#price").val("");
        $("#featured").prop("checked", false);
        $("#picPreview").css("background-image", "");
        $("#pic").val("");
    }
}

//All

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
    console.log(current)
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

console.log(cart);

function showCart() {
    show = document.getElementById("cartCount");
    if (cart.length == 0) {
        show.innerHTML = "<span><i class='bi-cart'></i></span>" + "0";
    }
    show.innerHTML = "<span onclick='goCart()'><i class='bi-cart'></i></span>" + cart.length;
}