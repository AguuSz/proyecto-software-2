$(document).ready(function() {
    
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        // Meto los datos de la DB en la tabla
        var rows = '';
        $.each(data, function(index, user) {
          var row = '<tr>' +
            '<td>' + (index + 1) + '</td>' +
            '<td><a href="../my-profile/my-profile.html">' + user.nickname + '</a></td>' +
            '<td>' + user.wins + '</td>' +
            '<td>' + user.loses + '</td>' +
            '<td>' + user.mmr + '</td>' +
            '</tr>';
          rows += row;
        });
  
        // Agregar las filas a la tabla
        $('#leaderboardTable tbody').append(rows);
  
        // Inicializo la tabla
        $('#leaderboardTable').DataTable({
          responsive: {
            details: {
              display: $.fn.dataTable.Responsive.display.modal({
                header: function(row) {
                  var data = row.data();
                  return 'Details for ' + data[0] + ' ' + data[1];
                }
              }),
              renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                tableClass: 'table'
              })
            }
          }
        });
      },
      error: function() {
        console.log('Error al obtener los datos de los usuarios');
      }
    });
  });
  
