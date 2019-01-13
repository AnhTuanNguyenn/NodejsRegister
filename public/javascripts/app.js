$(function () {

    $("#register").on('click', function (event) {
        var data = new FormData();
        event.preventDefault();
        data.append('fullName', 'qdqwdqw');
        data.append('email', ($("#email").val()));
        data.append('address', ($("#address").val()));
        data.append('dob', ($("#dob").val()));
        data.append('job', ($("#job").val()));
        data.append('gender', ($('input[name="gender"]:checked').val()));
        data.append('tel', ($("#tel").val()));
        data.append('check', ($('input[name="terms"]:checked').val()));
        data.append('pdf', $('input[type=file]')[0].files[0]);
        // Display the key/value pairs
        for (var pair of data.entries()) {
            console.log(pair);
        }
        if (!fullname || !email || !address || !dob || !job || !gender || !tel) {
            $("#msgDiv").show().html("Tous les champs sont requis.");
        } else if (!terms) {
            $("#msgDiv").show().html("Veuillez accepter les termes et conditions.");
        } else if (!tel) {
            $("#msgDiv").show().html("Veuillez saisir votre numéro portable.");
        } else {
            $.ajax({
                url: "/register",
                method: "POST",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                dataType: 'json'
            }).done(function (data) {

                if (data) {
                    if (data.status == 'error') {

                        var errors = '<ul>';
                        $.each(data.message, function (key, value) {
                            errors = errors + '<li>' + value.msg + '</li>';
                        });

                        errors = errors + '</ul>';
                        $("#msgDiv").html(errors).show();
                    } else {
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show();
                        return res.redirect('./success');
                    }
                }
            });
        }

    });
});