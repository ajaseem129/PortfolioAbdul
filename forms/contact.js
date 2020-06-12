formResult();
function formResult()
{
    $.ajax({
    type: 'POST',
    url: "/forms/contactme",
    dataType: "json",
    success: function(result)
        {
           var loading= document.getElementsByClassName("loading");
           loading.style.display="none";
           var sent= document.getElementsByClassName("sent-message");
           sent.style.display="block";
        }
    })
}