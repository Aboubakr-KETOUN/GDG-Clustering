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

// Handling data with Axios to send HTTP requests to the server (backend)

BASE_URL = 'http://localhost:5000/api';

$(document).ready(function () {
    $("#submit-btn").click(function (event) {
        event.preventDefault();

        const user = {
            firstName: $("#f_name").val(),
            lastName: $("#l_name").val(),
            email: $("#email").val(),
            password: $("#psw").val(),
            gender: $('input[name="gender"]:checked').val(),
            dateOfBirth: $("#dob").val(),
        }

        axios.post(BASE_URL + '/users/register', user)
            .then(response => {
                console.log(response.data);
                window.location.href = 'users.html';
            })
            .catch(error => {
                console.error(error);
            });
    });
});

$(document).ready(function () {
    function fetchUsers() {
        axios.get(BASE_URL + '/users')
            .then(response => {
                const users = response.data;
                const usersTableBody = $('#users-table-body');
                usersTableBody.empty();

                users.forEach(user => {
                    const userRow = `
                        <tr>
                            <td class="py-2 px-4 border-b">${user.firstName}</td>
                            <td class="py-2 px-4 border-b">${user.lastName}</td>
                            <td class="py-2 px-4 border-b">${user.email}</td>
                            <td class="py-2 px-4 border-b">${user.gender}</td>
                            <td class="py-2 px-4 border-b">${new Date(user.dateOfBirth).toLocaleDateString()}</td>
                            <td class="py-2 px-4 border-b">
                                <button class="edit-btn text-blue-500 mr-2" data-id="${user._id}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="delete-btn text-red-500" data-id="${user._id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                    usersTableBody.append(userRow);
                });

                $('.edit-btn').click(function () {
                    const userId = $(this).data('id');
                    const user = users.find(u => u._id === userId);
                    $('#editUserId').val(user._id);
                    $('#editFirstName').val(user.firstName);
                    $('#editLastName').val(user.lastName);
                    $('#editEmail').val(user.email);
                    $('#editGender').val(user.gender);
                    $('#editDateOfBirth').val(new Date(user.dateOfBirth).toISOString().split('T')[0]);
                    $('#editUserModal').removeClass('hidden');
                });

                $('.delete-btn').click(function () {
                    const userId = $(this).data('id');
                    if (confirm('Are you sure you want to delete this user?')) {
                        deleteUser(userId);
                    }
                });
            })
            .catch(error => {
                console.error('❌ Error fetching users:', error);
            });
    }

    function deleteUser(userId) {
        axios.delete(BASE_URL + '/users/' + userId)
            .then(response => {
                console.log('✅ User deleted successfully:', response.data);
                fetchUsers();
            })
            .catch(error => {
                console.error('❌ Error deleting user:', error);
            });
    }

    $('#editUserForm').submit(function (event) {
        event.preventDefault();
        const userId = $('#editUserId').val();
        const updatedUser = {
            firstName: $('#editFirstName').val(),
            lastName: $('#editLastName').val(),
            email: $('#editEmail').val(),
            gender: $('#editGender').val(),
            dateOfBirth: $('#editDateOfBirth').val(),
        };

        axios.put(BASE_URL + '/users/' + userId, updatedUser)
            .then(response => {
                console.log('✅ User updated successfully:', response.data);
                $('#editUserModal').addClass('hidden');
                fetchUsers();
            })
            .catch(error => {
                console.error('❌ Error updating user:', error);
            });
    });

    $('#cancelEditBtn').click(function () {
        $('#editUserModal').addClass('hidden');
    });

    fetchUsers();
});