$(document).ready(function () {
    var arrData = [];
    $.ajax({
        url: '/api/users'
    }).done(function (data) {
        $.each(data, function (index, element) {
            arrData.push(element);
        });
        console.log(arrData);
        $('#myTable').DataTable({
            data: arrData,
            columns: [
                { data: 'firstName' },
                { data: 'lastName' },
                { data: 'age' },
                { data: 'email' },
                { data: 'address' }
            ]
        });
    });

});
