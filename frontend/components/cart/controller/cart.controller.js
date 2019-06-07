restaurantangular.controller('cartCtrl', function($scope,$rootScope){
    var restaurants = [];
    restaurants.push({
        "name":"jordilg13",
        "quantity":1,
        "price":3,
        "img":"frontend/assets/img/bgrestaurant.jpg"
    });
    restaurants.push({
        "name":"raulojeda22",
        "quantity":8,
        "price":10,
        "img":"frontend/assets/img/bgrestaurant.jpg"
    });
    
    localStorage.setItem('cart',JSON.stringify({"restaurants":restaurants}));

    var cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart.restaurants);

    var totalprice = 0;
    angular.forEach(cart.restaurants,function(r){
        totalprice += (r.quantity*r.price)
    });
    
    $scope.cart = {
        restaurants: cart.restaurants,
        totalprice: totalprice
    };
});


// $(document).ready(function(){
//     if (! localStorage.getItem('cart')){
//         var cart = {};
//         cart.restaurants = [];
//         localStorage.setItem('cart', JSON.stringify(cart));
//         $('#cart_number').html(0);
//     } else {
//         var cart = JSON.parse(localStorage.getItem('cart'));
//         // console.log(cart.restaurants.length);
        
//         $('#cart-number').html(cart.restaurants.length);
//     }
    
//     /////////////////////////////////////
//     function getQueryVariable(variable){
        
//         var query = window.location.search.substring(1);
//         var vars = query.split("&");
//         for (var i=0;i<vars.length;i++) {
//             var pair = vars[i].split("=");
//             if(pair[0] == variable){return pair[1];}
//         }
//         return(false);
//     }
    
//     if (getQueryVariable('page') == 'controller_cart'){        
//         if (localStorage.getItem('cart')){
//             var cart = JSON.parse(localStorage.getItem('cart'));
//             var total = 0;
//             $.each(cart.restaurants, function(index, restaurant){
//                 var tr = document.createElement("tr");
//                 total += (restaurant.price*restaurant.quantity);
//                 var temp = 
//                 `<td><img src='view/img/restaurant1.jpg' alt='No image available'></td>`+
//                 `<td>${restaurant.name}</td>`+
//                 `<td>${restaurant.quantity}</td>`+
//                 `<td>${(restaurant.price*restaurant.quantity)}</td>`+
//                 '<td><a type=button class="site-btn sb-red">-</a><a type=button class="site-btn sb-c3">+</a></td>'
                
//                 tr.innerHTML = (temp);
    
//                 tr.childNodes[4].childNodes[0].addEventListener('click', function(){
//                     var carttotal = document.getElementById('carttotal');
//                     restaurant.quantity--;
//                     if (restaurant.quantity < 1){
//                         tr.innerHTML = "";
//                         carttotal.innerHTML= (Number(carttotal.innerHTML)-Number(restaurant.price));
//                         if (cart.restaurants.length == 1){
//                             cart.restaurants.pop();
//                         } else {
//                             cart.restaurants.splice(index, 1);
//                         }
//                         $('#cart-number').html(cart.restaurants.length);
//                     } else {
//                         tr.childNodes[2].innerHTML = restaurant.quantity;
//                         $.ajax({
//                             url: "components/cart/controller/controller_cart.php?op=price",
//                             data: restaurant,
//                             type: 'POST',
//                             success: function(data){
//                                 data = JSON.parse(data);
//                                 tr.childNodes[3].innerHTML = (restaurant.quantity*data[0].price);
//                                 carttotal.innerHTML= (Number(carttotal.innerHTML)-Number(data[0].price));
//                             }
//                         });
//                     }
    
//                     localStorage.setItem('cart', JSON.stringify(cart));
//                 });
    
//                 tr.childNodes[4].childNodes[1].addEventListener('click', function(){
//                     var carttotal = document.getElementById('carttotal');
//                     restaurant.quantity++;
//                     tr.childNodes[2].innerHTML = restaurant.quantity;
//                     $.ajax({
//                         url: "components/cart/controller/controller_cart.php?op=price",
//                         data: restaurant,
//                         type: 'POST',
//                         success: function(data){
//                             data = JSON.parse(data);
//                             tr.childNodes[3].innerHTML = (restaurant.quantity*data[0].price);
//                             carttotal.innerHTML= (Number(carttotal.innerHTML)+Number(data[0].price));
//                         }
//                     });
//                     localStorage.setItem('cart', JSON.stringify(cart));
//                 });
    
//                 $('#tbody').append(tr);

//             });

//         }
//         $('#table_cart').DataTable();
//         $('#carttotal').html(total);
//     }

//     function checkLogin(){
//         var check = false;
//         $.ajax({
//             url: "components/login/controller/controller_login.php?op=checklogin",
//             type: 'GET',
//             async: false,
//             success: function(data){
//                 data = JSON.parse(data);
//                 if (data != 'notlogged'){
//                     check = true;
//                 } else {
//                     check = false;
//                 }
//             }
//         });
//        return check;
//     }
    
//     $('#emptybtn').on('click', function(){
//         if (localStorage.getItem('cart')){
//             emptyCart();
//         }
//     });

//     $('#checkoutbtn').on('click', function(){
//         if (localStorage.getItem('cart')){
//             var cart = JSON.parse(localStorage.getItem('cart'));
//             if (cart.restaurants.length > 0){
//                 if (checkLogin()){
//                     // console.log(cart.restaurants);
//                     $.ajax({
//                         url: "components/cart/controller/controller_cart.php?op=purchase",
//                         data: cart,
//                         type: 'POST',
//                         success: function(data){
//                             data = JSON.parse(data);
//                             if (data == "success"){
//                                 emptyCart();
//                                 alert('Purchase successful');
//                                 window.location.href = 'index.php';
//                             }
//                         }
//                     });
//                 } else {
//                     $('#login-block').fadeIn(300);
//                 }
//             } else {
//                 alert('Cart empty');
//             }
//         }

//     });

//     function emptyCart(){
//         var cart = JSON.parse(localStorage.getItem('cart'));
//         cart.restaurants = [];
//         localStorage.setItem('cart', JSON.stringify(cart));

//         $('#tbody').html("");
//         $('#cart-number').html(cart.restaurants.length);
//         $('#carttotal').html(0);
//     }
// });