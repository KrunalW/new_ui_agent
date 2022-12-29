$(document).ready(function () {
    $('#emailManage, #emailManage1').DataTable({
        "searching": true,
        "ordering": true,
        "pagingType": "full_numbers",
        responsive: true
    });
    $('#emailManage').click(function(){
        $('#emailContainer').addClass('row');
        $('#email-box').addClass('col-sm-3');
        $('#emailManage_wrapper').hide();
        $('#emailManage1_wrapper').show();
        $('#emailManage1').show();
        $('#emailBody').show();
    });

    $('#replyBtn').click(function(){
        $('.send-email-container').show();
    });
    $('#filterBtn').click(function(){
        $('.filter-container').slideDown();
    });
    $('#closeFilters').click(function(){
        $('.filter-container').slideUp();
    });

    $('#backBtn').click(function(){
        $('#emailContainer').removeClass('row');
        $('#email-box').removeClass('col-sm-3');
        $('#emailManage_wrapper').show();
        $('#emailManage1_wrapper').hide();
        $('#emailManage1').hide();
        $('#emailBody').hide();
    });
    $('#emailManage1_wrapper').hide();
});