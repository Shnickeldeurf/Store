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

    if (current != null) {
        $("#liBtn").text(current.name);
    }
})

//get users
if (localStorage.getItem("shopusers") == null) {
    users=[];
    localStorage.setItem("shopusers", JSON.stringify(users));
} else {
    users = JSON.parse(localStorage.getItem("shopusers"));
}

if (localStorage.getItem("sCurrent") == null) {
   current = null;
   localStorage.setItem("sUserCurrent", JSON.stringify(current));
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