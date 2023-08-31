$(document).ready(function() {
    console.log("ready!");

    $('#go').on("click", function(event){
        var full_name = $('#fname').val() + " " + $('#lname').val();
        $("#jumbotron").html(full_name);

        return false;
    });
});