$(document).ready(function() {
  $('#log_in').click(function() {
    var user_id = $('#username').val();
    var password = $('#password').val();
    var data = {
      'id': user_id,
      'password': password
    }
    $.ajax({
      type: "POST",
      url: "/login",
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      cache: false,
      datatype: "json", // expecting JSON to be returned
      data: data,
      success: function(result) {
        console.log(result);
        if (result.status == 200) {
          self.isEditMode(!self.isEditMode());
        }
      },
      error: function(erro  r) {
        alert('로그인 실패!');
      }
    }).complete(function() {
      $(window).attr('location','/login');
    });
  });
});
