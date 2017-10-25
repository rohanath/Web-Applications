$(document).ready(function(){

  $('#add').on('click', function(){

      var item1 = $('#val1');
      var toDo1 = item1.val();

      var item2 = $('#val2');
      var toDo2 = item2.val();

      var result = $('#result');

      $.ajax({
        type: 'POST',
        url: '/',
        data: {val1:toDo1,val2:toDo2,task:"add"},
        success: function(data){
          //do something with the data via front-end framework
          //result.val(data);
            if(data.flag == 0)
            {
              $('#msg').text("")
              result.text(data.result);
            }
          else if(data.flag == 1)
            {
              $('#msg').text(data.message);
            }
        }
      });
      return false;
  });

  $('#subtract').on('click', function(){

      var item1 = $('#val1');
      var toDo1 = item1.val();

      var item2 = $('#val2');
      var toDo2 = item2.val();

      var result = $('#result');

      $.ajax({
        type: 'POST',
        url: '/',
        data: {val1:toDo1,val2:toDo2,task:"subtract"},
        success: function(data){
          //do something with the data via front-end framework
          if(data.flag == 0)
          {
            $('#msg').text("")
            result.text(data.result);
          }
        else if(data.flag == 1)
          {
            $('#msg').text(data.message);
          }
        }
      });
      return false;
  });

  $('#multiply').on('click', function(){

      var item1 = $('#val1');
      var toDo1 = item1.val();

      var item2 = $('#val2');
      var toDo2 = item2.val();

      var result = $('#result');

      $.ajax({
        type: 'POST',
        url: '/',
        data: {val1:toDo1,val2:toDo2,task:"multiply"},
        success: function(data){
          //do something with the data via front-end framework
          if(data.flag == 0)
          {
            $('#msg').text("")
            result.text(data.result);
          }
        else if(data.flag == 1)
          {
            $('#msg').text(data.message);
          }
        }
      });
      return false;
  });

  $('#divide').on('click', function(){

      var item1 = $('#val1');
      var toDo1 = item1.val();

      var item2 = $('#val2');
      var toDo2 = item2.val();

      var result = $('#result');

      $.ajax({
        type: 'POST',
        url: '/',
        data: {val1:toDo1,val2:toDo2,task:"divide"},
        success: function(data){
          //do something with the data via front-end framework
          if(data.flag == 0)
          {
            $('#msg').text("")
            result.text(data.result);
          }
        else if(data.flag == 1)
          {
            $('#msg').text(data.message);
          }
        }
      });
      return false;
  });
});
