document.addEventListener('DOMContentLoaded', () => {
    var tokenKey = "accessToken";

    $("#auth").click(function (e) {

        let username = $("#typeEmailX").val();
        let password = $("#typePasswordX").val();

        


        $.post( "https://localhost:7299/api/Authentication/Reg",
        {
            username: username,
            password: password

            }).done(function (response) {
                sessionStorage.setItem(tokenKey, response.token);
                $("#IsLog").text("Successfully registration").css('color', 'green');
                document.location.href = "Main_Page/Main.html";
            })
            .fail((response) => {
                $("#IsLog").text("Error autarization").css('color', 'red');
                alert(response.status);
            }); });




});