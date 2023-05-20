$(document).ready(function() {
    var table = $('#dtBasicExample').DataTable({
      "columnDefs": [
        { "type": "numeric", "targets": [2, 3] },
        { "type": "string", "targets": [1] }
      ],
      "order": [[0, 'asc']], // Orden ascendente inicial en la columna 0
      "dom": 'lfrtip',
      "buttons": [
        'colvis',
        { extend: 'csv', text: 'Exportar CSV' },
        { extend: 'excel', text: 'Exportar Excel' },
        { extend: 'pdf', text: 'Exportar PDF' }
      ],
      "initComplete": function(settings, json) {
        updateArrows();
      }
    });
  
    function updateArrows() {
      $('#dtBasicExample thead th').each(function(index) {
        var column = $(this);
        var arrow = column.find('.sort-arrow');
        arrow.removeClass('arrow-up arrow-down');
        if (table.order()[0][0] === index) {
          if (table.order()[0][1] === 'asc') {
            arrow.addClass('arrow-up');
          } else {
            arrow.addClass('arrow-down');
          }
        } else {
          arrow.removeClass('arrow-up arrow-down');
        }
      });
    }
  
    $('#dtBasicExample thead th').each(function(index) {
      if (index === 0 || index === 2 || index === 3 || index === 4) {
        var column = $(this);
        var arrow = column.find('.sort-arrow');
        arrow.on('click', function() {
          var currentOrder = table.order()[0];
          if (currentOrder[0] === index && currentOrder[1] === 'asc') {
            table.order([index, 'desc']).draw();
          } else {
            table.order([index, 'asc']).draw();
          }
          updateArrows();
        });
      }
    });
  
    updateArrows();
  });
  