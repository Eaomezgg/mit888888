
function closemodal()
{
    $(".modal").css('display','none')
}



// var product =[{
//     id: 1,
//     img:'https://plus.unsplash.com/premium_photo-1694540110932-0c03eaae840c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Matcha Green Tea',
//     price: 60,
//     temptype: '',
//     type: 'CoffeeTea',
// }, {
//     id: 2,
//     img:'https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Latte',
//     price: 50, 
//     temptype: '',
//     type: 'CoffeeTea',
// }, {
//     id: 3,
//     img:'https://plus.unsplash.com/premium_photo-1675667390417-d9d23160f4a6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Orang juice',
//     price: 40,
//     temptype: '',
//     type: 'FruitSyrups',
// }, {
//     id: 4,
//     img:'https://plus.unsplash.com/premium_photo-1695554950204-ef8551c70d83?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Blue Hawaii',
//     price: 40,
//     temptype: '',
//     type: 'FruitSyrups',
// }, {
//     id: 5,
//     img:'https://plus.unsplash.com/premium_photo-1664647903543-2ef213d1e754?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Milk',
//     price: 45,
//     temptype: '',
//     type: 'MilkDairy',
// }, {
//     id: 6,
//     img:'https://images.unsplash.com/photo-1686638745403-d21193f16b2f?q=80&w=1906&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Pink Milk',
//     price: 40,
//     temptype: '',
//     type: 'MilkDairy',
// }];

var product;

$(document).ready(() => {


    $.ajax({ 
        method: 'GET', 
        url: './api/getallproduct.php', 
        dataType: 'json', //  บอก jQuery ว่าต้องการ JSON
        success: function(response) { 
            if (response. RespCode == 200) {

                product = response.Result; 

                var html = '';
                for (let i = 0; i < product.length; i++) {
                    html += `
                        <div onclick="openproductdetail(${i})" class="product-items ${product[i].type}" data-name="${product[i].name.toLowerCase()}" > 
                            <img src="./img/${product[i].img}" class="product-img" alt="">
                            <div class="product-nameprice">
                                <div class="font-tea">${product[i].name}</div>
                                <div class="font-teaprice">${product[i].price} THB</div>
                            </div>
                        </div>`;
                }
                $("#product-list").html(html);
            
                $(".serch").on("input", function () {
                    let searchText = $(this).val().toLowerCase();
                    $(".product-items").each(function () {
                        let productName = $(this).data("name");
                        if (productName.includes(searchText)) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    });
                }); 

            } 
            console.log("✅ API Response:", response);
            if (Array.isArray(response.Result)) {
                console.log("Products:", response.Result);
            } else {
                console.error("❌ Invalid response format", response);
            }
        }, 
        error: function(xhr, status, error) { 
            console.error("❌ AJAX Error:");
            console.error("Status:", status);
            console.error("Error:", error);
            console.error("Response Text:", xhr.responseText); //  ดู response ที่ได้รับจริงๆ
        } 
    });
    
    


});


function searchproduct(param)
{
    console.log(param)
    $(".product-items").css('display','none')

    if (true) {
        $("."+param).css('display','block')
    }

    $(".product-items").hide();
    $("." + param).show();

    
    let categoryText = "";
    switch (param) {
        case "CoffeeTea":
            categoryText = "Coffee & Tea";
            break;
        case "FruitSyrups":
            categoryText = "Fruit & Syrups";
            break;
        case "MilkDairy":
            categoryText = "Milk & Dairy";
            break;
    }
    $("#category-name").text(categoryText);

   
    $("#dropdown-menu").hide();
    isDropdownOpen = false;
    $("#dropdown-icon").css("transform", "rotate(0deg)");
    

}

var productindex = 0;
function openproductdetail(index)
{

    productindex = index;
    console.log(productindex)
    $("#modaldesc").css('display','flex')
    $("#mdd-img").attr('src','./img/' + product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(product[index].price + ' THB')
    
}




var cart = [];

function addtocart() {
    
    var selectedTemp = document.querySelector('input[name="temperature"]:checked').value;
    
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index && cart[i].temptype === selectedTemp) {
            console.log('Found same product with same temperature');
            cart[i].count++;
            pass = false;
        }
    }

    if (pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1,
            temptype: selectedTemp  
        };
        cart.push(obj);
    }

    console.log(cart); 

    Swal.fire({
        icon: 'success',
        title: 'Added ' + product[productindex].name + ' (' + selectedTemp + ') to Cart',
    });

    $('#cart-count').css('display', 'flex').text(cart.length);
}



function opencart()
{
    $('#modalcart').css('display','flex')
    rendercart()
}


function rendercart() {
    if (cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="./img/${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name} (${cart[i].temptype})</p> <!-- 🔥 แสดง Hot, Cold, Blended -->
                                <p style="font-size: 1.2vw;" id="price${i}">${cart[i].price * cart[i].count} THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html);
    } else {
        $("#mycart").html(`<h3>Not found product-list</h3>`);
    }

    $("#cart-count").text(cart.length);
}





let isDropdownOpen = false;

function toggleDropdown() {
    const menu = document.getElementById("dropdown-menu");
    const icon = document.getElementById("dropdown-icon");

   
    isDropdownOpen = !isDropdownOpen;
    menu.style.display = isDropdownOpen ? "block" : "none";

   
    icon.style.transform = isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)";
}



function deinitems(action, index) {
    if (action === '+') {
        cart[index].count++; 
    } else if (action === '-' && cart[index].count > 1) {
        cart[index].count--; 
    } else if (action === '-' && cart[index].count === 1) {
        cart.splice(index, 1); 
    }

    rendercart(); 
}


document.querySelectorAll('.temp-option').forEach(label => {
    label.addEventListener('click', function () {
        console.log("Clicked:", this.textContent.trim()); 

        
        document.querySelectorAll('.temp-option').forEach(item => {
            item.classList.remove('selected');
        });

        
        this.classList.add('selected');

        console.log("Selected class added to:", this.textContent.trim());
    });
});


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM Loaded, JavaScript is now running!");

    document.querySelectorAll('.temp-option').forEach(label => {
        label.addEventListener('click', function () {
            console.log("Clicked:", this.textContent.trim());
            document.querySelectorAll('.temp-option').forEach(item => {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
            console.log("Selected class added to:", this.textContent.trim());
        });
    });
});


function buynow() {
    if (cart.length === 0) {
        Swal.fire("Alert", "No products in cart", "warning");
        return;
    }

    $.ajax({ 
        method: 'POST', 
        url: './api/buynow.php', 
        contentType: 'application/json', 
        dataType: 'json',
        data: JSON.stringify({ product: cart }), 
        success: function(response) { 
            console.log("✅ คำสั่งซื้อสำเร็จ:", response);

            if (response.RespCode === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank You!',
                    html: `
                        <p><b>amount:</b> ${response.amount.toFixed(2)} THB</p>
                        <p><b>VAT (7%):</b> ${response.vat} THB</p>
                        <p><b>NatAmount:</b> ${response.netamount} THB</p>
                    `,
                    confirmButtonText: "OK"
                });

                cart = [];  
                rendercart();
            } else {
                Swal.fire("ข้อผิดพลาด", response.RespMessage, "error");
            }
        }, 
        error: function(xhr, status, error) { 
            console.error("❌ เกิดข้อผิดพลาด:", xhr.responseText);
            Swal.fire("Error", "มีบางอย่างผิดพลาด!", "error");
        } 
    });
}

