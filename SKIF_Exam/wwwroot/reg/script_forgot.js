document.addEventListener('DOMContentLoaded', () => {

    $("#auth").click(function (e) {

        let username = $("#typeEmailX").val();
        let password = $("#typePasswordX").val();

        


        $.post( "http://vbu111-001-site1.dtempurl.com/User/Change",
        {
            username: username,
            password: password

        }).done(function(data) {
            if(data == 200){
                $("#IsLog").text("Successfully change password").css('color', 'green');
                Clear();
            }

        });



    });

});