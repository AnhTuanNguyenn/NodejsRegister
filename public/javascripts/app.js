$(function () {

    $("#register").on('click', function (event) {
        event.preventDefault();
        var fullname = $("#fullname").val();
        var email = $("#email").val();
        var address = $("#address").val();
        var dob = $("#dob").val();
        var job = $("#job").val();
        var gender = $('input[name="gender"]:checked').val();
        var tel = $("#tel").val();
        var terms = $('input[name="terms"]:checked').val();
        var ques1 = $("#ques1").val();
        var ques2 = $("#ques2").val();
        var ques3 = $("#ques3").val();
        var ques4 = $("#ques4").val();
        var ques5= $("#ques5").val();

        
        if (!fullname || !email || !address || !dob || !job || !gender || !tel || !ques1 || !ques2|| !ques3|| !ques4|| !ques5) {
            $("#msgDiv").show().html("Tous les champs sont requis.");
        } else if (!terms) {
            $("#msgDiv").show().html("Veuillez accepter les termes et conditions.");
        } else if (!tel) {
            $("#msgDiv").show().html("Veuillez saisir votre numéro portable.");
        } else if (!ques1) {
            $("mesgDiv").show().html("Veuillez répondre les question");
        } else {
            $.ajax({
                url: "/register",
                method: "POST",
                data:{
                    full_name: fullname,
                    email: email,
                    address: address,
                    dob: dob,
                    job: job,
                    gender: gender,
                    tel: tel,
                    terms: terms,
                    ques1: ques1,
                    ques2: ques2,
                    ques3: ques3,
                    ques4: ques4,
                    ques5: ques5
                    // cv: cv,
                },
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
                        $("#msgDiv").removeClass('alert-danger').addClass('alert-success').html(data.message).show()
                        a();
                    }
                }
            });
        }
    });
    function a(){
    setTimeout(function() {
        top.location.href= '/success';
      }, 3000);
    }
});