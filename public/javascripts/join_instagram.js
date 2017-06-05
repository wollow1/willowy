$(document).ready(function() {
  $('#join').click(function() {
    //var name = $('#name').val();
    //var email = $('#email').val();
    var user_id = $('#user_name').val();
    var password = $('#password').val();
    var data =
    {
    //  'email': email,
    //  'name' : name,
      'id': user_id,
      'password': password
    }
    $.ajax({
      type: "POST",
      url: "/join",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache: false,
      datatype: "json", // expecting JSON to be returned
      data: data,
      success: function(result) {
        alert('가입 성공!');
        console.log(result);
        if (result.status == 200) {
          self.isEditMode(!self.isEditMode());
        }
      },
      error: function(error) {
        alert('가입 실패!');
      }
    }).complete(function() {
      $(window).attr('location','/');
    });
  });
});
