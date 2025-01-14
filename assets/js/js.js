$(document).ready(function () {
    $("#togglePassword").click(function () {
        let input = $("#psw");
        let isPassword = input.attr("type") === "password";
        input.attr("type", isPassword ? "text" : "password");
        $(this).attr("src", isPassword ? "./assets/images/eye_hide.png" : "./assets/images/eye.png");
    });
    document.querySelectorAll('input[name="gender"]').forEach(input => {
      input.addEventListener('change', () => {
          combined_tester();
      });
    });    
    document.getElementById('dob').addEventListener('input', combined_tester);
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


var l_name_verification=false;
var f_name_verification=false;
const regex_mail=/^[a-zA-Z0-9_.-]{1,64}@[a-zA-Z0-9-.]{1,63}\.[a-zA-Z]{2,63}$/;
const regex_psw=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var mailvalid=false;
var pswvalid=false;
var psw_confirmation=false;

f_name_checker=()=>{
  let f_name=$("#f_name").val().trim();
  if(f_name !== ""){
    $(".first-name-ready").css('display','inline');
    $(".first-name-error").css('display','none');
    f_name_verification=true;
  }else{
    $(".first-name-ready").css('display','none');
    $(".first-name-error").css('display','inline');
    f_name_verification=false;
  }
  combined_tester();
}

l_name_checker=()=>{
  let l_name=$("#l_name").val().trim();
  if(l_name !== ""){
    $(".last-name-ready").css('display','inline');
    $(".last-name-error").css('display','none');
    l_name_verification=true;
  }else{
    $(".last-name-ready").css('display','none');
    $(".last-name-error").css('display','inline');
    l_name_verification=false;
  }
  combined_tester();
}

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
    psw_confirmer();
    combined_tester();
}

psw_confirmer=()=>{
  let psw=$("#psw").val();
  let cnf_psw=$("#cnf_psw").val();
  if(psw!==cnf_psw){
    $(".psw_confirm_ready").css('display','none');
    $(".psw_confirm_error").css('display','inline');
    psw_confirmation=false;
  }else{
    $(".psw_confirm_ready").css('display','inline');
    $(".psw_confirm_error").css('display','none');
    psw_confirmation=true;
  }
  combined_tester();
}


function combined_tester() {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  let dob=$("#dob").val();
  console.log(gender)
  let formattedDob = new Date(dob).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
      if (f_name_verification && l_name_verification && mailvalid && pswvalid && psw_confirmation && dob!=="" && gender!=="other") {
        $("#submit-btn").removeAttr("disabled");
        $(".form_ready").css('display', 'inline');
    } else {
        $("#submit-btn").attr("disabled", "disabled");
        $(".form_ready").css('display', 'none');
    }
}