import Api from "./api.js"
const api = new Api()

$(document).ready(function() {
    $(window).scroll(() => {
        if($(window).scrollTop() >= 150) {
            $('.cardProduct').css({"animation": "fadeInUp", "animation-duration": "2s"});
            $('.billContainer').css({"animation": "bounceInUp", "animation-duration": "2s"})
        }
        if($(window).scrollTop() >= 450) {
            $('#avatar').css({"animation": "fadeInUp", "animation-duration": "2s"});
            $('#avatar1').css({"animation": "fadeInUp", "animation-duration": "3s"});
            $('#avatar2').css({"animation": "fadeInUp", "animation-duration": "4s"});
            $('#avatar3').css({"animation": "fadeInUp", "animation-duration": "5s"})
        }
        if($(window).scrollTop() >= 825) {
            $('.who').css({"animation": "wobble", "animation-duration": "2s"})
        }
    })	

    api.getData('https://haidang-vending-machine.herokuapp.com/machine01')
    // api.getData('http://localhost:6969/machine01')
        .then((snapshot) => {
            let docs = snapshot.data
            for(let i in docs) {
                $('#ProductContents').append(`<div class="col-3 card cardProduct">
                                                <img class="card-img-top" src="${docs[i].imgUrl}" alt="Card image cap">
                                                <div class="card-body">
                                                    <h5 class="card-title">${docs[i].name}</h5>
                                                    <p class="card-text">${docs[i].price} VNĐ</p>
                                                    <p class="card-text">quantity: ${docs[i].quantity}</p>
                                                    <button onclick="addToCart('${docs[i].name}', '${docs[i].price}', '${docs[i].imgUrl}')" class="btn btn-outline-success btnBuy">Buy</button>
                                                </div>
                                            </div>`)
            }
    })

    var sumValue = 0;
    var orderInfo = [];
    var qty;
    var qtyRes 
    function addToCart(name, price, imgUrl) {
        if($(`#${name}`)[0]) {
            qty++;
            $(`#${name}qty`).text(qty);
        }else {
            qty = 1;
            $('#billContent').append(`<div class="row" id="${name}">
                                        <div class="col-2">
                                            <img class="STT" src="${imgUrl}" />
                                        </div>
                                        <div class="col-4">
                                            <p class="prodName">${name}</p>
                                        </div>
                                        <div class="col-2">
                                            <p class="price">${price}</p>
                                        </div>
                                        <div class="col-2">
                                            <p class="quantityCustomer" id="${name}qty">${qty}</p>
                                        </div>
                                        <div class="col-2" onclick="deleteToCart('${name}', '${price}')">
                                            <i class="fas fa-trash-alt"></i>
                                        </div>
                                    </div>`)
        }
        sumValue += parseFloat(price)
        $('#sumValue').html(sumValue)
    }

    function deleteToCart(name, price) {
        $(`#${name}`).remove();
        sumValue -= parseFloat(price);
        $('#sumValue').html(sumValue)
    }

    $('#btnSubmit').click(() => {
        let amount = $('#sumValue').html().toString();
        var orderInfo = "";
        $('p.prodName').each(function() {
            orderInfo += $(this).html() + " ";
        })
        $('p.quantityCustomer').each(function() {
            orderInfo += $(this).html() + " ";
        })
        api.payTheBill('https://haidang-vending-machine.herokuapp.com/payTheBill', {
        // api.payTheBill('http://localhost:6969/payTheBill', {
            amount: amount,
            orderInfo: orderInfo
        })
            .then((ref) => {
                window.open(ref.data, '_blank')
            })
            .catch((err) => {
                console.log(err)
            })
    })

    window.addToCart = addToCart;
    window.deleteToCart = deleteToCart;
})