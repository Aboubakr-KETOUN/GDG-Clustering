$(document).ready(function () {
    $("#togglePassword").click(function () {
        let input = $("#psw");
        let isPassword = input.attr("type") === "password";
        input.attr("type", isPassword ? "text" : "password");
        $(this).attr("src", isPassword ? "./eye_hide.png" : "./eye.png");
    });
});


function generatePassword() {
    while (true) {
      let password = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 10; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      if(regex_psw.test(password)){
        return password;
      }
      else{
        generatePassword();
      }
    
    }
}


$(function(e) {
  $("#generate-btn").click(function() {
    let newPassword = generatePassword();
    $("#psw").val(newPassword);
    psw_tester();
  });
});


const regex_mail=/^[a-zA-Z0-9_.-]{1,64}@[a-zA-Z0-9-.]{1,63}\.[a-zA-Z]{2,63}$/;
const regex_psw=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var mailvalid=false;
var pswvalid=false;

mail_tester=()=>{
    let mail=$("#email").val();
    if(!regex_mail.test(mail)){
        $(".mail_ready").css('display','none');
        $(".mail_error").css('display','inline');
        mailvalid=false;    
    }else{
        $(".mail_ready").css('display','inline');
        $(".mail_error").css('display','none');
        mailvalid=true;
    }
    combined_tester();
}

psw_tester=()=>{
    let psw=$("#psw").val();
    if(!regex_psw.test(psw)){   
        $(".psw_ready").css('display','none');
        $(".psw_error").css('display','inline');
        pswvalid=false;
    }else{
        $(".psw_ready").css('display','inline');
        $(".psw_error").css('display','none');
        pswvalid=true;
    }
    combined_tester();
}

function combined_tester() {
    if (mailvalid && pswvalid) {
        $("#btn").removeAttr("disabled");
        $(".form_ready").css('display', 'inline');
    } else {
        $("#btn").attr("disabled", "disabled");
        $(".form_ready").css('display', 'none');
    }
}