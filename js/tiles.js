var width_tiles;
var height_tiles;
var width_area;
var height_area;
var res_area;
var remainder_tiles_max;
var count_tiles_to_area;
var zoom;
var imgArr;
var src;
var this_el;
var img;
var clone_img;
var color_img;
var id_collections_tiles;
var count_tiles_to_column;
var count_tiles_to_row;
$(document).ready(function () {




    imgArr = [
        {
            img: "img/tiles/tiles_14.jpg",
        },
        {
            img: "img/tiles/tiles_13.jpg",
        },
        {
            img: "img/tiles/tiles_12.jpg",
        },
        {
            img: "img/tiles/tiles_11.jpg",
        },
        {
            img: "img/tiles/tiles_10.jpg",
        },
        {
            img: "img/tiles/tiles_6.jpg",
        },
        {
            img: "img/tiles/tiles_7.jpg",
        },
        {
            img: "img/tiles/tiles_8.jpg",
        },
        {
            img: "img/tiles/tiles_9.jpg",
        },
        {
            img: "img/tiles/tiles_10.jpg",
        },
        {
            img: "img/tiles/tiles_11.jpg",
        },
        {
            img: "img/tiles/tiles_12.jpg",
        },
        {
            img: "img/tiles/tiles_13.jpg",
        },
        {
            img: "img/tiles/tiles_14.jpg",
        }
    ];


    let collections =  `<div class="select d-flex bg-light align-items-center justify-content-between calc-tiles p-2">
                        <span class="d-flex align-items-center justify-content-between flex-column" style="height: 100px">
                            <small>К-сть плитки:</small>
                            <small>Вибір плитки:</small>
                            <small style="width: 122px">Замостити / вибрати</small>
                        </span>`;

    for (let i = 0; i < imgArr.length; i++) {
        collections += `<span class="d-flex align-items-center justify-content-start flex-column item">
                            <span id="count-tiles-collection_${i}" class="count-collection">0</span>
                            <span class="tiles_${i+1} ui-widget-content d-flex align-items-center justify-content-start flex-column-row m-2">
                                <img src=${imgArr[i].img} data-color="color_${i}" data-item="${i}" data-id="count-tiles-collection_${i}" class="color_${i}" style="width: 50px; height: 50px;" alt="img">
                            </span>
                            <span class="d-flex align-items-center justify-content-between flex-row">
                                <input type="radio" class="form-check-input opt-radio_1 mx-1" data-src="img/tiles/tiles_${i}.jpg" name="optradio" title="замостити">
                                <input type="radio" class="form-check-input opt-radio_2 mx-1" data-src="img/tiles/tiles_${i}.jpg" name="optradio" title="вибрати">
                            </span>
                        </span>`;
    }

    $('#collections-tiles').append(collections);


    $(".js-range-slider").ionRangeSlider({
        skin: "big",
        min: -9,
        max: 9,
        from: 0,
        to: 0,
        step: 1,
        grid: true,
        prefix: "X ",
        onChange: function (data) {
            zoom = data.from;
            console.log('ionRangeSlider zoom', zoom);
            change_zoom (zoom);
        }
    });

    function change_zoom (zoom){
        console.log('function zoom', zoom);
        if (zoom > 0) {
            $('.ui-widget-header img').each(function (a, b) {
                $(b).css({"width": `${  width_tiles + ((width_tiles * (zoom * 10)) / 100)  }`, "height": `${ height_tiles + ((height_tiles * (zoom * 10)) / 100) }`});
            });
            $('#pano-tiles').css({"width": `${(width_area  + 30) + ((width_area * (zoom * 10)) / 100)}`, "height": `${height_area + ((height_area * (zoom * 10)) / 100)}`});
            $('#pano-tiles > div').css({"width": `${width_area  +  ((width_area * (zoom * 10)) / 100)}`});
            $('#pano-tiles span').each(function (a, b) {
                $(b).css({"width": `${width_tiles + ((width_tiles * (zoom * 10)) / 100)}`, "height": `${height_tiles + ((height_tiles * (zoom * 10)) / 100)}`});
            });
            $(clone_img).css({"width": `${width_tiles + ((width_tiles * (zoom * 10)) / 100)}`, "height": `${height_tiles + ((height_tiles * (zoom * 10)) / 100)}`});

        } else if (zoom < 0) {
            $('.ui-widget-header img').each(function (a, b) {
                $(b).css({"width": `${ width_tiles - ((width_tiles * ((zoom * -1) * 10)) / 100) }`, "height": `${ height_tiles - ((height_tiles * ((zoom * -1) * 10)) / 100)}`});
            });
            $('#pano-tiles').css({"width": `${(width_area  + 30) - ((width_area * ((zoom * -1) * 10)) / 100)}`, "height": `${height_area - ((height_area * ((zoom * -1) * 10)) / 100)}`});
            $('#pano-tiles > div').css({"width": `${width_area - ((width_area * ((zoom * -1) * 10)) / 100)}`});
            $('#pano-tiles span').each(function (a, b) {
                $(b).css({"width": `${width_tiles - ((width_tiles * ((zoom * -1) * 10)) / 100)}`, "height": `${height_tiles - ((height_tiles * ((zoom * -1) * 10)) / 100)}`});
            });
            $(clone_img).css({"width": `${width_tiles + ((width_tiles * (zoom * 10)) / 100)}`, "height": `${height_tiles + ((height_tiles * (zoom * 10)) / 100)}`});

        } else {
            $('.ui-widget-header img').each(function (a, b) {
                $(b).css({"width": `${width_tiles}`, "height": `${height_tiles}`});
            });
            $('#pano-tiles').css({"width": `${width_area  + 30}`, "height": `${height_area}`});
            $('#pano-tiles > div').css({"width": `${width_area}`});
            $('#pano-tiles span').each(function (a, b) {
                $(b).css({"width": `${width_tiles}`, "height": `${height_tiles}`});
            });
            $(clone_img).css({"width": `${width_tiles}`, "height": `${height_tiles}`});
        }
    }

    function res_count(){
        let res = 0;
        $('.count-collection').each(function(i, b){
            res += +(b.textContent);
        });

        // if (!remainder_tiles_max) {
            $('#res_count_tiles').text('Кількість цілих плиток: ' + res);
        // } else {
        //
        //     if ($('#pano-tiles span:first>img').length > 0 && $('#pano-tiles span:last>img').length > 0) {
        //         $('#res_count_tiles').text(`Кількість плиток: ${res} + ( ${remainder_tiles_max} - на порізку )`);
            // }
        // }

        $('#area-tiles').text((res * ((width_tiles/100) * (height_tiles/100))).toFixed(2));
    }


    $('body').on('click', '.basket', function () {
        $('.js-range-slider').data('ionRangeSlider').update({
            from: 0,
            to: 0
        });
        $('.opt-radio_1, .opt-radio_2').each(function (a, b) {
            $(b).prop('checked', false);
        });

        $('.count-collection').each(function (a, b) {
            $(b).html('0');
        });

        $('#width_tiles, #height_tiles, #width_area, #height_area').val('');
        $('#pano-tiles ').html('');
        $('#size-width, #size-height, #size-width-pano, #size-height-pano, #area-tiles, #count-tiles, #cutting').text('0');
    });


    $('body').on('keyup', '.size_tiles', function () {
        $('.js-range-slider').data('ionRangeSlider').update({
            from: 0,
            to: 0
        });

        $('.count-collection').each(function(i, b){
            $(b).text(0);
        });

        $('.opt-radio_1, .opt-radio_2').each(function (a, b) {
            $(b).prop('checked', false);
        });

        width_tiles = +$('#width_tiles').val();
        height_tiles = +$('#height_tiles').val();
        $('#size-width').text(`${width_tiles}`);
        $('#size-height').text(`${height_tiles}`);

        width_area = +$('#width_area').val();
        height_area = +$('#height_area').val();
        $('#size-width-pano').text(`${width_area}`);
        $('#size-height-pano').text(`${height_area}`);
        console.log(width_area, height_area);

        res_area = (width_area * height_area) / (width_tiles * height_tiles) ;
        console.log('res area', res_area);

        count_tiles_to_row = Math.floor(width_area / width_tiles);
        console.log('count tiles to row', count_tiles_to_row);

        count_tiles_to_column = Math.floor(height_area / height_tiles);
        console.log('count tiles to column', count_tiles_to_column);

        count_tiles_to_area = count_tiles_to_row * count_tiles_to_column;
        console.log('count tiles to area', count_tiles_to_area);

        console.log('remainder tiles', res_area - count_tiles_to_area);

        remainder_tiles_max = Math.ceil(res_area - count_tiles_to_area);
        console.log('remainder tiles max', remainder_tiles_max);

        $('#pano-tiles').css({"width": `${ width_area + 30 }`, "height": `${ height_area }`});

        $('.ui-widget-header img').each(function (a, b) {
            $(b).css({"width": `${ width_tiles }`, "height": `${ height_tiles }`});
        });

        $('#pano-tiles ').html('');
        let div = '<div class="d-flex flex-wrap justify-content-center ui-widget-header parent-collections">';
        for (let i = 1; i <= count_tiles_to_area; i++) {
            div += `<span class="ui-widget-header d-flex align-items-center justify-content-center full-tiles" style="border: 1px solid #d9d9d9"></span>`;
        }
        div += '</div>';
        $('#pano-tiles').append(div);

        $('#pano-tiles span').each(function (a, b) {
            $(b).css({"width": `${width_tiles}`, "height": `${height_tiles}`});
        });

        $('#pano-tiles .cutting-tile').each(function (a, b) {
            $(b).css({"width": `${width_tiles}`, "height": `${height_tiles / 2}`});
        });

        $('#pano-tiles > div').css({"width": `${ width_area }`});

        res_count();
        change_zoom (zoom)
    });


    $('body').on('click', '.opt-radio_1', function () {
        console.log('opt-radio zoom', zoom);
        let this_el = $(this);
        $('.count-collection').each(function (a, b) {
            $(b).html('0');
        });
        $('#pano-tiles span').each(function (a, b) {
            $(b).html('');
        });
        $('#pano-tiles span').each(function (a, b) {
            $(b).html($(this_el).parents('.item').find('img').clone().css(  {"width": `${width_tiles + ((width_tiles * (zoom * 10)) / 100)}`, "height": `${height_tiles + ((height_tiles * (zoom * 10)) / 100)}`} ));
        });
        $('body').find(`${'#' + $(this).parents('.item').find('img').data('id')}`).text($(`${'.' + $(this).parents('.item').find('img').attr('class')}`).length-1 );

        clone_img = $(this).parents('.item').find('img').clone();
        change_zoom (zoom);
        res_count();


    });

    $('body').on('click', '.opt-radio_2', function () {
        src = $(this).parents('.item').find('img').attr('src');
        this_el = $(this);
        img = $(this).parents('.item').find('img');
        clone_img = $(this).parents('.item').find('img').clone();
        color_img = $(this).parents('.item').find('img').data('color');
        id_collections_tiles = $(this).parents('.item').find('.count-collection').attr('id');
        change_zoom (zoom);
    });

    $("body").on('click', 'span.ui-widget-header', function (e) {
        if (e.target.tagName == 'SPAN') {
            if ($(this_el).is(':checked') && $(this_el).parents('.flex-column').find('img').attr('src') == src) {
                if (zoom > 0 || zoom < 0) {
                    $(this).html($(img).clone().css({"width": `${width_tiles + ((width_tiles * (zoom * 10)) / 100)}`, "height": `${height_tiles + ((height_tiles * (zoom * 10)) / 100)}`}));
                } else {
                    $(this).html($(img).clone().css({"width": `${width_tiles}`, "height": `${height_tiles}`}));
                }
                $(`${'#' + id_collections_tiles}`).text(`${($(`${'.' + color_img}`).length - 1) }`);
            }
        }
        res_count();
    });

    $("body").on('click', 'span.ui-widget-header', function (e) {
        if (e.target.tagName == 'IMG') {
            $('body').find(`${'#' + $(this).find('img').data('id')}`).text(($(`${'.' + $(this).find('img').attr('class')}`).length - 2)  );
            $(this).find('img').remove();
        }
        res_count();
    });

    let paint = false;
    let erase = false;
    let clone = '';

    $("body").on('mousemove mouseup mousedown keydown keyup', 'span.ui-widget-header', function (e) {
        if (e.type == 'mousedown' && e.which == 1) {
            paint = true;
        } else if (e.type == 'mouseup' && e.which == 1) {
            $(`${'#' + id_collections_tiles}`).text(`${($(`${'.' + color_img}`).length - 1) }`);
            res_count();
            paint = false;
        } else if ( paint && $(this_el).is(':checked') ) {
            e.preventDefault();
            if (e.target.tagName == 'SPAN') {
                clone = clone_img.clone();
                $(this).html(clone);
                res_count();
            }
        }

        if (e.type == 'mousedown' && e.which == 3) {
            erase = true;
        } else if (e.type == 'mouseup' && e.which == 3) {
            res_count();
            erase = false;
        } else if (erase) {
            e.preventDefault();
            if (e.target.tagName == 'IMG') {
                console.log('parent', $('#' + `${$(this).find('img').data('id')}`).text(   $('.' + `${$(this).find('img').data('color')}`).length - 2)   );
                console.log('this', $(this).find('img').data('id'));
                $(this).find('img').remove();
                res_count();
            }
        }
        let element = document.querySelector('.parent-collections');
        element.oncontextmenu = function () {
            return false;
        };

    });

    $("body").on('change', '#favcolor', function () {
        let color = $(this).val();
        $("#pano-tiles span").each(function (a, b) {
            b.style.borderColor = `${color}`;
        })
    });

    $('body').on('click', '#calc-tiles', function () {
        $('#pano-tiles').removeClass('d-none').addClass('d-block');
    });

    $('body').on('click', '#calc-mosaic', function () {
        $('#pano-tiles').removeClass('d-block').addClass('d-none');
    });



});



