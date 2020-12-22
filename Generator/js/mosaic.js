var max_count_mosaic = 304;
var thinks;
var border_color;

$(document).ready(function () {

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    $('body').on('click', '#generate', function () {
        $('#table_pano tbody').html('');
        let options = [];
        let colors = $('.percent').filter(function () {
            if ($(this).val() > 0) {
                return $(this);
            }
        });
        console.log('colors', colors);
        colors.each(function (i, e) {
            let colorData = {};
            colorData.count = Math.round((max_count_mosaic * $(e).val()) / 100);
            colorData.img = $(`.img_color_${$(e).data('id')}`).attr('src');
            for (let i = 0; i < colorData.count; i++) {
                if ($('.square_1_2 img').attr('src') == "img/black_1_2.png") {
                    options.push(`<td class="p-0"><img src="${colorData.img}" alt="" style="width: 22px; height: 22px"></td>`)
                } else if ($('.square_2_5 img').attr('src') == "img/black_2_5.png") {
                    options.push(`<td class="p-0"><img src="${colorData.img}" alt="" style="width: 25px; height: 25px"></td>`)
                } else if ($('.square_3_8 img').attr('src') == "img/black_3_8.png") {
                    options.push(`<td class="p-0"><img src="${colorData.img}" alt="" style="width: 38px; height: 38px"></td>`)
                } else if ($('.hexagon img').attr('src') == "img/black_hexagon.png") {
                    options.push(`<td class="p-0"><img src="${colorData.img}" alt="" style="width: 50px; height: 50px"></td>`)
                } else if ($('.circle img').attr('src') == "img/black_circle.png") {
                    options.push(`<td class="p-0"><img src="${colorData.img}" alt="" style="width: 50px; height: 50px"></td>`)
                }
            }
        });
        shuffle(options);

        let tr = '<tr class="d-flex flex-wrap justify-content-center">';
        for (let a = 0; a < options.length; a++) {
            tr += options[a];
        }

        tr += '</tr>';

        $('#table_pano tbody').append(tr);

        $('.select-radio').each(function (i, e) {
            $(e).css('border', 'transparent');
        });
        $('#table_pano tbody td').css('border-width', `${thinks + 'px'}`);

        $(border_color).css('border', '2px solid black');
    });


    $('body').on('keyup', '.percent', function () {
        let sum = 0;
        $('.percent').each(function (i, e) {
            sum += +$(e).val();
        });
        if (sum >= 99 && sum <= 101) {
            $('#generate').removeAttr("disabled");
            $('#res').removeClass('text-danger').addClass('text-success').text(sum + '%');
        } else {
            $('#generate').attr('disabled', 'disabled');
            $('#res').removeClass('text-success').addClass('text-danger').text(sum + '%');
        }
    });

    $('body').on('change', '#thinks', function () {
        thinks = $(this).val();
        $('#table_pano tbody td').css('border-width', `${thinks + 'px'}`)
    });


    $('body').on('click', '.select-radio', function (a) {
        // $('#thinks').val(1);
        $('.select-radio').each(function (i, e) {
            $(e).css('border', 'transparent');
        });
        border_color = a.target;
        console.log('1212', border_color);
        $(this).css('border', '2px solid black');
        $('.table-bordered td').css('border', `1px solid ${$(this).css('background-color')}`);
    });

    $('body').on('click', '#reset', function () {
        $('#table_pano tbody tr').html('');
        $('.square_1_2 img').attr("src", "img/white_1_2.png");
        $('.square_2_5 img').attr("src", "img/white_2_5.png");
        $('.square_3_8 img').attr("src", "img/white_3_8.png");
        $('.hexagon img').attr("src", "img/white_hexagon.png");
        $('.circle img').attr("src", "img/white_circle.png");
        $('.select-radio').each(function (i, e) {
            $(e).css('border', 'transparent');
        });
        $('#thinks').val(1);
        $('.percent').each(function (i, e) {
            $(e).val(0);
        });
        $('#res').removeClass('text-success').addClass('text-danger').text('0%');
        $('.img_color img').each(function (i, e) {
            $(e).attr("src", "");
        });

    });

});
