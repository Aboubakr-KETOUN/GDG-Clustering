$(function() {
    let existingPasswords = ['password1', 'secret123', 'letmein'];

    function generatePassword() {
      while (true) {
        let password = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
          password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (!existingPasswords.includes(password)) {
          existingPasswords.push(password);
          return password;
        }
      }
    }

    $("#generate-btn").click(function() {
      let newPassword = generatePassword();
      $("#psw").val(newPassword);
    });
  });



  $(document).ready(function () {
    $("#togglePassword").click(function () {
        let input = $("#psw");
        let isPassword = input.attr("type") === "password";

        // Toggle input type
        input.attr("type", isPassword ? "text" : "password");

        // Toggle eye icon image
        $(this).attr("src", isPassword ? "./eye_hide.png" : "./eye.png");
    });
});
