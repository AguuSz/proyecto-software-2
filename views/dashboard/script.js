$(document).ready(function() {
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      dataType: 'json',
      success: function(users) {
        var tableBody = '';
        $.each(users, function(index, user) {
          var banIcon = user.isBanned ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check text-success" viewBox="0 0 16 16"><path d="M12.97 4.97a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06L6 10.94l5.47-5.47a.75.75 0 0 1 1.06 0z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x text-danger" viewBox="0 0 16 16"><path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586l6.293-6.293a1 1 0 0 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707A1 1 0 0 1 .293.293z"/></svg>';
          tableBody += '<tr>' +
            '<td>' + user.nickname + '</td>' +
            '<td><input type="checkbox" ' + (user.isBanned ? 'checked' : '') + ' data-user-id="' + user.id + '"></td>' +
            '<td class="ban-status">' + banIcon + '</td>' +
            '</tr>';
        });
        $('tbody').html(tableBody);
  
        // Evento de escucha del checkbox
        $('input[type="checkbox"]').click(function() {
          var userId = $(this).data('user-id');
          var isBanned = $(this).prop('checked');
          updateUserStatus(userId, isBanned);
        });
      },
      error: function() {
        console.log('Error al cargar los usuarios.');
      }
    });
  });
  
  // Función para actualizar el estado de isBanned en el servidor JSON
  function updateUserStatus(userId, isBanned) {
    $.ajax({
      url: 'http://localhost:3000/users/' + userId,
      type: 'PATCH',
      data: JSON.stringify({ isBanned: isBanned }),
      contentType: 'application/json',
      success: function() {
        console.log('Estado de usuario actualizado correctamente.');
        // Actualizar la columna "Banned" en la tabla
        var banIcon = isBanned ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check text-success" viewBox="0 0 16 16"><path d="M12.97 4.97a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06L6 10.94l5.47-5.47a.75.75 0 0 1 1.06 0z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x text-danger" viewBox="0 0 16 16"><path d="M.293.293a1 1 0 0 1 1.414 0L8 6.586l6.293-6.293a1 1 0 0 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707A1 1 0 0 1 .293.293z"/></svg>';
        $('input[data-user-id="' + userId + '"]').closest('tr').find('.ban-status').html(banIcon);
      },
      error: function() {
        console.log('Error al actualizar el estado del usuario.');
      }
    });
  }
  