
$('.message-chat-box').click(function(){
    $('.sidebar').removeClass('full-width');
    $('.email-container').show();
});


$('#backToEmailList').click(function(){
  $('#emailBox', parent.document).parent().siblings().addClass('full-width');
  $('.email-container').hide();
  $('#emailBox', parent.document).parent().hide();
});
$('.expand-shrink').click(function(){

    $('#expandShrinkCol').toggleClass('width-shrink');
});