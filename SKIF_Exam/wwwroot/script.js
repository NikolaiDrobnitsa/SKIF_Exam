var min = 0;
var max = 100000;
var category = "skif";
var page = 1;
var isLogin = false;
async function AddProduct(){
    const token = sessionStorage.getItem(tokenKey);
    await $.ajax({
        url: '/api/Skif/CreateKnife',
        type: 'POST',
        data: {
            id: 0,
            name: $("#productName").val(),
            description: $("#productDescription").val(),
            cost: $("#productCost").val(),
            stock: $("#productStock").val(),
            imgUrl: $("#productImageUrl").val(),
            steelHardness: $("#productSteelHardness").val(),
            steelGrade: $("#productSteelGrade").val(),
            liningMaterial: $("#productLiningMaterial").val(),
        },
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        success: function (data){
            console.log(data);
            AdminGetProducts();
        },
        error: function (data){
            console.error(data);  
        }
    });
}

async function UpdateProduct(product){
    await $.post( "/api/Skif/UpdateKnife", product)
    .done(function(data) {
        console.log(data);
    });
}

function DeleteProduct(id){
    const token = sessionStorage.getItem(tokenKey);
    $.ajax({
        url: "/api/Skif/DeleteKnife?id=" + id,
        type: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + token
        },
        success: function(data) {
            console.log(data);
            AdminGetProducts();
        },
        error: function(data) {
            console.error(data);
        }
    });
}


function GetKnifes() {
    $("#KnifeForm").children().remove();
    $.get('/api/Skif/KnifesList?page=1')

        .done(async (data) => {
            for (const iterator of data) {
                let Knife = $("<div></div>").addClass('card').css('padding', '0rem').css('margin', '1rem').css('width', '18rem').css('height', '32rem')
                    .mouseenter(function () {
                        Knife.addClass("shadow");
                        Knife.css({ transition: "transform 0.2s", transform: "scale(1.05, 1.05)" });
                    })
                    .mouseleave(function () {
                        Knife.removeClass("shadow");
                        Knife.css({ transition: "transform 0.1s", transform: "scale(1.0, 1.0)" });
                    });
                let KnifeBody = $("<div></div>").addClass('card-body d-flex flex-column p-4');
                let KnifeName = $("<h5></h5>").css('cursor', 'pointer').css('font-family', "'oswald',sans-serif").text(`${iterator['knifeName'].toLocaleUpperCase()}`);

                let KnifeImage = $("<img></img>").addClass('h-100 mx-auto').css('display', 'block').attr("src", iterator['knifeImgUrl']);
                let divImageAndDescription = $("<div></div>").addClass('w-100').css('height', '13rem').css('cursor', 'pointer');

                divImageAndDescription.append(KnifeImage);

                let KnifeSteelHardness = $("<li></li>").css('font-family', "'oswald',sans-serif").css('font-size', '13px').text('Марка стали/Материал клинка: ' + iterator['knifeSteelHardness']);
                let KnifeSteelGrade = $("<li></li>").css('font-family', "'oswald',sans-serif").css('font-size', '13px').text('Материал накладки/рукояти: ' + iterator['knifeSteelGrade']);
                let KnifeLiningMaterial = $("<li></li>").css('font-family', "'oswald',sans-serif").css('font-size', '14px').text('Материал накладки: Сталь ' + iterator['knifeLiningMaterial']);

                let KnifeCost = $("<h5></h5>").addClass('mt-auto').css('font-family', "'oswald',sans-serif").text(`${iterator['knifeCost']} грн.`);

                let KnifeButton = $("<button></button>").addClass('button__style').text("КУПИТЬ").click(async function () {
                    if (iterator['knifeStock'] > 0) {
                        iterator['knifeStock'] = iterator['knifeStock'] - 1;
                        await UpdateKnife(iterator);
                        GetKnifes();
                    }
                });

                KnifeBody.append(divImageAndDescription);
                KnifeBody.append(KnifeName);
                if (iterator['knifeStock'] > 0) {
                    let KnifeAvailability = $("<small></small>").addClass('text-success mb-3').text("В наличии");
                    KnifeBody.append(KnifeAvailability);
                }
                if (iterator['knifeSteelHardness'] != "no") {
                    KnifeBody.append(KnifeSteelHardness);
                }
                if (iterator['knifeSteelGrade'] != "no") {
                    KnifeBody.append(KnifeSteelGrade);
                }
                if (iterator['knifeLiningMaterial'] != "no") {
                    KnifeBody.append(KnifeLiningMaterial);
                }
                KnifeBody.append(KnifeCost);
                if (iterator['knifeStock'] <= 0) {
                    KnifeCost.css('color', 'gray');
                }
                else {
                    KnifeBody.append(KnifeButton);
                }
                Knife.append(KnifeBody);
                $("#KnifeForm").append(Knife);
            }
        })
        .fail(() => {
            console.warn(data.status);
        });
}


var tokenKey = "accessToken";





document.addEventListener('DOMContentLoaded', (e) => {

        // $("#typeCheckBox").change(()=>{
        //     SelectCheckBox();
        // });
        
        $("#BtnSingIn").click(()=>{
            document.location.href = "reg/login.html";

        });
        
        // $("#buttonLogOut").click(()=>{
        //     Exit();
        //     sessionStorage.removeItem(tokenKey);
        //     GetProducts();
        // });
 
        // $("#buttonSignIn").click(()=>{
        //     SignIn();

        // });

        // $("#buttonLoginClose").click(()=>{
        //     CloseSignIn();
        // });

        $("#buttonAddProduct").click(()=>{
            AddProduct();
        });

        // $("#button__filter").click(()=>{
        //     let minPrice = $("#input__min-price").val();
        //     let maxPrice = $("#input__max-price").val();

        //     if(minPrice > 0) min = minPrice;
        //     else min = 0;

        //     if(maxPrice > 0 && maxPrice < 100000) max = maxPrice;
        //     else max = 100000;

        //     page = 1;
        //     GetPages();
        //     if(isLogin)AdminGetProducts();
        //     else GetProducts();
        // });


        
    GetKnifes();

});