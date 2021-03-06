

// data events
var content = document.querySelector('.content'),
    title = document.querySelector('header'),
    lead = document.querySelector('.lead'),
    shareBtn = document.querySelector('#share');

// save content to localStorage when element is changed
content.onkeyup= function(){
    // saving current caret position
    var caret = getCaretCharacterOffsetWithin(content);
    localStorage.setItem('cursor', caret);
    localStorage.setItem('content', content.innerHTML);
    localStorage.setItem('currentElement', 'content');
    };

title.onkeyup= function(){
    var caret = getCaretCharacterOffsetWithin(title);
    localStorage.setItem('cursor', caret);
    localStorage.setItem('title', title.innerHTML);
    localStorage.setItem('currentElement', 'title');
    };

lead.onkeyup= function(){
    var caret = getCaretCharacterOffsetWithin(lead);
    localStorage.setItem('cursor', caret);
    localStorage.setItem('lead', lead.innerHTML);
    localStorage.setItem('currentElement', 'lead');

    };

shareBtn.addEventListener('click', function(){
  var text = {
    title: title.innerHTML,
    lead: lead.innerHTML,
    content: content.innerHTML
  };

  if(window.location.pathname != '/') {
    text.docId = window.location.pathname;
  } else {
    text.docId = null;
  }

  console.log(text.docId);

  $.ajax({
    type: 'POST',
    contentType: "application/x-www-form-urlencoded",
    url: '/save',
    data: "docid=" + text.docId+ "&title=" + text.title +"&lead=" + text.lead + "&content=" + text.content,
    success: function(data){
      window.location = data.redirect;
    }
  });
});
// View events

$('#editor').on('click', '*', function(){
  var clicked = $(this);

  var childs = $('#editor').children().each(function(){
    $(this).removeClass('active');
  });

  clicked.addClass('active');
  var elClass = clicked.attr('class');

  switch(elClass){
    case 'title active':
    var howMuch = '30px';
    break;

    case 'lead active':
    howMuch = '50px';
    break;

    case 'content active':
    howMuch = '100px';
    break;
  }

  $('#editor').css('transform', 'translateY(-'+ howMuch+')');
  });

  $('.url-box button').click(function(){
    $('#link').hide();
  });
