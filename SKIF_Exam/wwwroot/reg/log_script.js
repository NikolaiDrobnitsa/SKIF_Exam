document.addEventListener('DOMContentLoaded', () => {
    var tokenKey = "accessToken";
    $("#auth").click(function (e) {

        let login = $("#typeEmailX").val();
        let password = $("#typePasswordX").val();




        $.post("https://localhost:7036/api/Authentication/login", {
            login: login,
            password: password,
        })
            .done(function (response) {
                sessionStorage.setItem(tokenKey, response.token);
                $("#IsLog").text("Successfully autarization").css('color', 'green');
                document.location.href = "admi_panel/admin_panel.html";
            })
            .fail((response) => {
                $("#IsLog").text("Error autarization").css('color', 'red');
                alert(response.status);
            });
    


    });

























    // $.get("http://vbu111-001-site1.dtempurl.com/Admin")
    //     .done((data) => {
    //         SetMed(data);
    //         console.log(data);
    //     })
    //     .fail(() => {
    //         alert("400");
    //     });
    // $('#Add_btn').click(function (e) {
    //     var title_js = $('#exampleInputTitle1').val();
    //     var text_js = $('#exampleInputText1').val();
    //     console.log(title_js);
    //     console.log(text_js);
    //     if (title_js == null || title_js == "") {
    //         alert("Title not found");
    //     }
    //     if (text_js == null || text_js == "") {
    //         alert("Text not found");
    //     }
    //     var date_js = `23.10.2022`;


    //     // var DataToPost = {};
    //     // DataToPost.title = title;
    //     // DataToPost.text = text;

    //     // $.post("http://vbu111-001-site1.dtempurl.com/Admin/Put", {
    //     //     title: title_js,
    //     //     text: text_js
    //     // },
    //     //     function (data, textStatus, jqXHR) {
    //     //         console.log(textStatus);
    //     //     },
    //     //     "json")

    //     $.post("http://vbu111-001-site1.dtempurl.com/Admin/Put",
    //         {
    //             title: title_js,
    //             text: text_js,
    //             createDate: date_js,

    //         }).done(function (data) {
    //             console.log("add!");
    //         })




});



    // $('#Refresh_btn').click(function (e) {
    //     window.location.reload();

    // });


    // let container = document.getElementById(`wrapper`);
    // container.setAttribute('class', 'container mt-1 p-3 shadow');

    // let rows = document.createElement('div');
    // rows.setAttribute('class', 'row g-4');
    // rows.setAttribute('id', 'row_container')


    // function logins(data) {

    //     for (const iterator of data) {

    //         let cols = document.createElement('div');
    //         cols.setAttribute('class', 'col-12 col-md-6 col-lg-3');
    //         let cards = document.createElement('div');
    //         cards.setAttribute('class', 'card shadow');

    //         let card_body = document.createElement('div');
    //         card_body.setAttribute('class', 'card-body');

    //         let Title = document.createElement('h5');
    //         Title.setAttribute('class', 'card-title text-center');
    //         Title.innerText = `${iterator.title}`;



    //         let Price = document.createElement('p');
    //         Price.setAttribute('class', 'card-text');
    //         Price.innerText = `Text: ${iterator.text}`;

    //         let Animal = document.createElement('p');
    //         Animal.setAttribute('class', 'font-weight-bold');
    //         Animal.innerText = `Date: ${iterator.createDate}`;



    //         container.append(rows);
    //         rows.append(cols);
    //         cols.append(cards);
    //         cards.append(card_body);
    //         card_body.append(Title);
    //         card_body.append(Price);
    //         card_body.append(Animal);



    //     }

    // }




//})