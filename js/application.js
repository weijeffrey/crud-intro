var APIAction = function(){
  

}

APIAction.prototype.getPostSuccess = function(response){
  var constructHtml = function(response){
    var html = '';
    
    for (i = 0 ; i<response.length; i++){
      html += '<tr>'
      html +=    '<td>'+response[i]._id+'</td>'
      html +=    '<td>'+response[i].text+'</td>'
      html +=    '<td>'+response[i].title+'</td>'
      html +=    '<td>'+response[i].user+'</td>'
      html +=    '<td><button class="cancel">Delete</button></td>'
      html += '</tr>'
    }
    return html;
  };

  html = constructHtml(response);
  console.log(response);
  $('#details').html(html);
}

APIAction.prototype.getAllPost = function(){
  $.ajax({
    type: 'GET',
    url: 'http://ga-wdi-api.meteor.com/api/posts/',
    dataType: 'json',
    success: this.getPostSuccess
  });
}

APIAction.prototype.getNamePost = function(){
  $.ajax({
    type: 'GET',
    url: 'http://ga-wdi-api.meteor.com/api/posts/search/'+userInfo,
    dataType: 'json',
    success: this.getPostSuccess
  });
}

APIAction.prototype.getIDPost = function(){
  $.ajax({
    type: 'GET',
    url: "http://ga-wdi-api.meteor.com/api/posts/"+idInfo,
    dataType: 'json',
    success: function(response){
      console.log(response);
      html = ""
      html += '<tr>'
      html +=    '<td>'+response._id+'</td>'
      html +=    '<td>'+response.text+'</td>'
      html +=    '<td>'+response.title+'</td>'
      html +=    '<td>'+response.user+'</td>'
      html +=    '<td><button class="cancel">Delete</button></td>'
      html += '</tr>'
      $('#details').replaceWith(html);
    }
  });
}

APIAction.prototype.Post = function(){
  $.ajax({
    type: 'POST',
    url: 'http://ga-wdi-api.meteor.com/api/posts/',
    data: {
      user: userInfo,
      title: titleInfo,
      text: textInfo,
      x: Date.parse(Date()),
      dateCreated: new Date()
    },
    dataType: 'json',
    success: function(response){
      console.log(response);
      html = ""
      html += '<tr>'
      html +=    '<td>'+response+'</td>'
      html +=    '<td>'+textInfo+'</td>'
      html +=    '<td>'+titleInfo+'</td>'
      html +=    '<td>'+userInfo+'</td>'
      html +=    '<td><button class="cancel">Delete</button></td>'
      html += '</tr>'
      $('#details').prepend(html);
    }
  });
}

APIAction.prototype.Put = function(){
  $.ajax({
    type: 'PUT',
    url: 'http://ga-wdi-api.meteor.com/api/posts/'+idInfo,
    data: {
      user: userInfo,
      title: titleInfo,
      text: textInfo,
      dateModified: new Date()
    },
    dataType: 'json',
    success: function(response){
      console.log(response);
      html = ""
      html += '<tr>'
      html +=    '<td>'+idInfo+'</td>'
      html +=    '<td>'+textInfo+'</td>'
      html +=    '<td>'+titleInfo+'</td>'
      html +=    '<td>'+userInfo+'</td>'
      html +=    '<td><button class="cancel">Delete</button></td>'
      html += '</tr>'
      $('#details').prepend(html);
      apiAction.getAllPost();
    }

  });
}

APIAction.prototype.deletePost = function(){
  $.ajax({
    type: 'DELETE',
    url: 'http://ga-wdi-api.meteor.com/api/posts/'+idOfDeleteRow,
    success: function(response){
      console.log(response);
    }
  });
}

var apiAction = new APIAction();

$(document).ready(function(){

  $('.action').click(function(){
    actionType = $('#request-selector').val();
    idInfo = $('#id_info').val();
    userInfo = $('#user_info').val();
    titleInfo = $('#title_info').val();
    textInfo = $('#text_info').val();
    

    if((actionType == "GET") && (idInfo!== "")){
      apiAction.getIDPost();
    } else if ((actionType == "GET") && (userInfo!== "")){
      apiAction.getNamePost();
    } else if(actionType == "GET"){
      apiAction.getAllPost();
    } else if(actionType == "POST"){
      apiAction.Post();
    } else if(actionType == "PUT"){
      apiAction.Put();
      
    };
    $('#id_info').val("");
    $('#user_info').val("");
    $('#title_info').val("");
    $('#text_info  ').val("");  

  })

  $(document).on('click', '.cancel', function(){
  console.log("Cancel button is clicked")
  idOfDeleteRow = $(this).parent().prev().prev().prev().prev().text();
  apiAction.deletePost(idOfDeleteRow);
  $(this).parent().parent().remove()

  });
  










})