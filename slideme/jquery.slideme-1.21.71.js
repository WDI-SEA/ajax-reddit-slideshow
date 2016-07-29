(function ($) {

    var methods = {

        init: function (params) {
            var version = "1.21.71";
            var options = {
                arrows: false,
                transition: 'slide',
                autoslide: false,
                autoslideHoverStop: true,
                css3: false,
                interval: 500,
                itemsForSlide: 1,
                labels: {
                    next: 'next',
                    prev: 'prev'
                },
                loop: false,
                onCreatedCallback: '',
                onEndCallback: '',
                onStartCallback: '',
                pagination: '',
                resizable: {
                    width: '',
                    height: ''
                },
                thumbs: {
                    width: 50,
                    height: 40
                },
                speed: 500
            }

            if (params) {
                $.extend(options, params);
            }

            return this.each(function () {

                if (options.itemsForSlide > 1) {
                    var slides = $('.slideme', this).eq(0).children();
                    $('.slideme', this).eq(0).children().addClass('itemsForSlide');
                    var n = options.itemsForSlide;
                    for (var i = 0; i < slides.length; i += n) {
                        slides.slice(i, i + n).wrapAll("<li class='new'/>");
                    }
                }

                $(this).data({'version': version, 'current': 0, 'slides': calculate.childrens(this), 'direction': 1, 'speed': options.speed, 'ready': true, 'transition': 'slideme-' + options.transition }).addClass('slideme_container');

                if ($(this).data('slides') == 0) {
                    $(this).data({ 'single': true }).addClass('single');
                }

                if (options.loop) {
                    $(this).data({ 'loop': true });
                }

                if (options.autoslide) {
                    $(this).data({ 'autoslide': true, 'interval': options.interval });
                    autoslide.setTimeOut(this, options.interval);
                }

                if (options.autoslide && options.autoslideHoverStop) {
                    $(this).data({ 'autoslideHoverStop': options.autoslideHoverStop, 'pause': false });
                    autoslide.mouseControl(this);
                }

                if (options.arrows) {
                    $('<button />').addClass('prev').click(events.onArrowClicked).text(options.labels.prev).appendTo(this);
                    $('<button />').addClass('next').click(events.onArrowClicked).text(options.labels.next).appendTo(this);
                    if ($(this).data('single')) {
                        $('.prev, .next', this).attr({ 'disabled': 'disabled' });
                    } else if (!$(this).data('loop')) {
                        $('.prev', this).attr({ 'disabled': 'disabled' });
                    }
                }

                if (options.pagination) {
                    $('<div />').addClass('pagination').appendTo(this);
                }

                if (options.pagination == 'thumbs' || options.pagination == 'both') {
                    $(this).data({ 'thumbs': { 'width': options.thumbs.width, 'height': options.thumbs.height } });
                    init.thumbs(this, options.thumbs.width, options.thumbs.height);
                }

                if (options.pagination == 'numbers' || options.pagination == 'both') {
                    $(this).data({ 'numbers': true })
                    init.numbers(this);
                }

                if (options.onStartCallback) {
                    $(this).data({ 'onStartCallback': options.onStartCallback });
                }

                if (options.onEndCallback) {
                    $(this).data({ 'onEndCallback': options.onEndCallback });
                }

                if (options.css3 && css3Supports.transitions()) {
                    $(this).data({ 'css3': true });
                }

                if (options.resizable.width && options.resizable.height) {
                    $(this).data({ 'resizable': true, 'width': options.resizable.width, 'height': options.resizable.height }).addClass('resizable').find('.slideme').eq(0).css({ 'height': calculate.height(this) });
                }

                if ($('.resizable').length == 1) {
                    $(window).bind('resize.slideme', events.onResize);
                }

                comands.setCurrent(this, 0);

                if (options.onCreatedCallback) {
                    options.onCreatedCallback({ 'instance': this, 'index': 0 });
                }

            });
        },
        current: function () {
            return $(this).data('current');
        },
        destroy: function () {
            return this.each(function () {
                $(this).removeClass('slideme_container single').removeData();
                $('.slideme li', this).removeClass('current');
                $('.pagination li, .next, .prev', this).off('click');
                $('.pagination, .next, .prev', this).remove();
            });
        },
        update: function () {
            return this.each(function () {
                comands.update(this);
            });
        },
        playTo: function (params) {
            return this.each(function () {
                var index = calculate.index(this, params);
                if (index != $(this).data('current') && $(this).data('ready')) {
                    var direction = index > $(this).data('current') ? 1 : -1;
                    $(this).data({ 'direction': direction });
                    animate.playTo(this, index, direction);
                }
            });
        },
        playToId: function (params) {
            return this.each(function () {
                var index = calculate.indexById(this, params);
                if (index != $(this).data('current') && $(this).data('ready')) {
                    var direction = index > $(this).data('current') ? 1 : -1;
                    $(this).data({ 'direction': direction });
                    animate.playTo(this, index, direction);
                }
            });
        },
        jumpTo: function (params) {
            return this.each(function () {
                var index = calculate.index(this, params);
                animate.jumpTo(this, index);
            });
        },
        jumpToId: function (params) {
            return this.each(function () {
                var index = calculate.indexById(this, params);
                if (index != $(this).data('current')) {
                    animate.jumpTo(this, index);
                }
            });
        },
        stop: function () {
            return this.each(function () {
                $(this).data({ 'stop': true });
                $(this).data({ 'pause': true });
                autoslide.clearTimeOut(this);
            });
        },
        play: function() {
            $(this).data({ 'stop': false });
            $(this).data({ 'pause': false });
            autoslide.setTimeOut(this);
        },
        version: function () {
            return $(this).data('version');
        }
    }; // end methods.

    var events = {
        onPaginationClicked: function (event) {
            var target = $(event.currentTarget).parents('.slideme_container').eq(0);
            var index = $(event.currentTarget).index();
            if (!$(event.currentTarget).is('.current') && $(target).data('ready')) {
                var direction = index > $(target).data('current') ? 1 : -1;
                $(target).data({ 'direction': direction });
                animate.playTo(target, index, direction);
            }
        },
        onArrowClicked: function (event) {
            var target = $(event.currentTarget).parents('.slideme_container').eq(0);
            if ($(target).data('ready')) {
                var direction = $(event.currentTarget).attr('class') == 'next' ? 1 : -1;
                $(target).data({ 'direction': direction });
                var index = calculate.index(target, target.data('current') + direction);
                animate.playTo(target, index, direction);
            }
        },
        onResize: function () {
            $(".resizable").each(function (index) {
                $('.slideme', this).eq(0).css({ 'height': calculate.height(this) }).stop(true, true);
            });
        }
    } // end events.

    var calculate = {
        childrens: function (target) {
            return $('.slideme', target).eq(0).children().length - 1;
        },
        height: function (target) {
            return Math.round($(target).data('height') * $('.slideme', target).eq(0).width() / $(target).data('width'));
        },
        index: function (target, index) {
            if (index < 0) {
                if ($(target).data('loop')) {
                    return $(target).data('slides');
                } else {
                    return 0;
                }
            } else if (index > $(target).data('slides')) {
                if ($(target).data('loop')) {
                    return 0;
                } else {
                    return $(target).data('slides');
                }
            } else {
                return index;
            }
        },
        indexById: function (target, id) {
            var index = $(id, target).index();
            return index;
        }
    }; // end calculate.

    var animate = {
        playTo: function (target, index, direction) {
            autoslide.clearTimeOut(target);
            $(target).addClass('workingSlideme').data({ 'current': index, 'ready': false });
            if ($(target).data('onStartCallback')) {
                $(target).data('onStartCallback')({ 'instance': target, 'index': index });
            }
            if ($(target).data('transition') == "slideme-fade") {
                $('.slideme', target).eq(0).children().eq(index).addClass('next').css({ 'opacity': 1 });
                if ($(target).data('css3')) {
                    $(target).addClass($(target).data('transition'));
                    $('.slideme', target).eq(0).children('.current').css({ 'opacity': 0 });
                    $('.current', target).on('otransitionend transitionend webkitTransitionEnd', function () {
                        $(this).off('otransitionend transitionend webkitTransitionEnd');
                        comands.onEndSlide(target, index);
                    });
                } else {
                    $('.slideme', target).eq(0).children('.current').css({ 'z-index': 300 }).animate({
                        'opacity': 0
                    }, $(target).data('speed'), function () {
                        comands.onEndSlide(target, index);
                    });
                }
            } else if ($(target).data('transition') == "slideme-page") {
                $('.slideme', target).eq(0).children().eq(index).addClass('next').attr({ 'style': 'left: ' + direction * '100' + '%;' });
                if ($(target).data('css3')) {
                    $(target).addClass($(target).data('transition'));
                    $('.slideme', target).eq(0).children('.next').show().attr({ 'style': 'left: 0%;' }).on('otransitionend transitionend webkitTransitionEnd', function () {
                        $(this).off('otransitionend transitionend webkitTransitionEnd');
                        comands.onEndSlide(target, index);
                    });
                } else {
                    $('.slideme', target).eq(0).children('.next').css({ 'z-index': 300 }).animate({
                        'left': '0%'
                    }, $(target).data('speed'), function () {
                        comands.onEndSlide(target, index);
                    });
                }
            } else {
                $('.slideme', target).eq(0).children().eq(index).addClass('next').attr({ 'style': 'left: ' + direction * '100' + '%;' });
                if ($(target).data('css3')) {
                    $(target).addClass($(target).data('transition'));
                    $('.slideme', target).eq(0).children('.current').show().attr({ 'style': 'left: ' + (-direction * '100' + '%;') });
                    $('.slideme', target).eq(0).children('.next').show().attr({ 'style': 'left: 0%;' }).on('otransitionend transitionend webkitTransitionEnd', function () {
                        $(this).off('otransitionend transitionend webkitTransitionEnd');
                        comands.onEndSlide(target, index);
                    });
                } else {
                    $('.slideme', target).eq(0).children('.current').animate({
                        'left': direction === 1 ? '-100%' : '100%'
                    }, $(target).data('speed'));
                    $('.slideme', target).eq(0).children('.next').animate({
                        'left': '0%'
                    }, $(target).data('speed'), function () {
                        comands.onEndSlide(target, index);
                    });
                }
            }
        },
        jumpTo: function (target, index) {
            autoslide.clearTimeOut(target);
            $(target).data({ 'current': index });
            $('.slideme', target).eq(0).children().eq(index).addClass('next').css({ 'left': 0, 'opacity': 1, 'z-index': 100 });
            comands.onEndSlide(target, index);
        }
    } // end animate.

    var check = {
        arrows: function (target, index) {
            if (!$(target).data('loop')) {
                $('.next, .prev', target).removeAttr('disabled');
                if (index == $(target).data('slides')) {
                    $('.next', target).attr({ 'disabled': 'disabled' });
                } else if (index == 0) {
                    $('.prev', target).attr({ 'disabled': 'disabled' });
                }
            }
            if ($(target).data('single')) {
                $('.next, .prev', target).attr({ 'disabled': 'disabled' });
            }
        }
    }; // end check.

    var comands = {
        setCurrent: function (target, index) {
            $('.slideme', target).eq(0).children().removeClass('current').eq(index).addClass('current');
            if ($(target).data('numbers')) {
                $('.numbers ol', target).children().removeClass('current').eq(index).addClass('current');
            }
            if ($(target).data('thumbs')) {
                $('.thumbs ol', target).children().removeClass('current').eq(index).addClass('current');
            }
        },
        onEndSlide: function (target, index) {
            $(target).removeClass($(target).data('transition')).find('.current, .next').removeAttr('style');
            $('.slideme', target).eq(0).children().removeClass('current next');
            autoslide.clearTimeOut(this);
            comands.setCurrent(target, index);
            check.arrows(target, index);
            $(target).removeClass('workingSlideme').data({ 'ready': true });
            if ($(target).data('onEndCallback')) {
                $(target).data('onEndCallback')({ 'instance': target, 'index': index });
            }
            if ($(target).data('autoslide') && $(target).data('autoslideHoverStop') && !$(target).data('pause') && !$(target).data('stop') || $(target).data('autoslide') && !$(target).data('autoslideHoverStop')) {
                autoslide.setTimeOut(target);
            }
        },
        update: function (target) {
            $(target).data({ 'current': 0, 'slides': calculate.childrens(target) });
            if ($(target).data('thumbs')) {
                $('.thumbs', target).remove();
                init.thumbs(target);
            }
            if ($(target).data('numbers')) {
                $('.numbers', target).remove();
                init.numbers(target);
            }
            if ($(target).data('slides') == 0) {
                $(target).data({ 'single': true }).addClass('single');
            } else {
                $(target).data({ 'single': false }).removeClass('single');
            }
            $('.slideme', target).eq(0).children().eq(0).addClass('next').css({ 'left': 0, 'opacity': 1, 'z-index': 100 });

            comands.onEndSlide(target, 0);

        }
    }; // end comands.

    var css3Supports = {
        transitions: function () {
            var b = document.body || document.documentElement;
            var s = b.style;
            var t = 'transition';
            if (typeof s[t] == 'string') {
                return true;
            }
            var browsers = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'],
		    t = t.charAt(0).toUpperCase() + t.substr(1);
            for (var i = 0; i < browsers.length; i++) {
                if (typeof s[browsers[i] + t] == 'string') {
                    return true;
                }
            }
            return false;
        }
    } // end css3Supports.

    var autoslide = {
        clearTimeOut: function (target) {
            clearTimeout($(target).data('timer'));
        },
        mouseControl: function (target) {
            $(target).on('mouseenter.interval', function () {
                if (!$(target).data('stop')) {
                    $(this).data({ 'pause': true });
                    autoslide.clearTimeOut(target);
                }
            }).on('mouseleave.interval', function () {
                if (!$(target).data('stop')) {
                    $(this).data({ 'pause': false });
                    autoslide.setTimeOut(target);
                }
            });
        },
        setTimeOut: function (target) {
            clearTimeout($(target).data('timer'));
            $(target).data('timer', setTimeout(function () {
                var index = calculate.index(target, $(target).data('current') + 1);
                if ($(target).data('loop') || (index <= $(target).data('slides') && index != $(target).data('current'))) {
                    animate.playTo(target, index, +1);
                }
            }, $(target).data('interval')));
        }
    } // end autoslide.

    var init = {
        numbers: function (target) {
            var pagination = $('.pagination', target);
            var numbers = $('<ol />');
            $('.slideme', target).eq(0).children().each(function (index) {
                $('<li />').text(index + 1).on('click', events.onPaginationClicked).appendTo(numbers);
            });
            $(numbers).appendTo(pagination);
            $(numbers).wrap('<nav class="numbers" />');
        },
        thumbs: function (target) {
            var pagination = $('.pagination', target);
            var thumbs = $('<ol />');
            var w = $(target).data('thumbs').width;
            var h = $(target).data('thumbs').height;
            $('.slideme', target).eq(0).children().each(function (index) {
                var url = $(this).find('img:first').attr('src');
                var img = $('<img />').css({ 'width': w, 'height': h }).attr({ 'src': url });
                $('<li />').on('click', events.onPaginationClicked).html(img).appendTo(thumbs);
            });
            $(thumbs).appendTo(pagination);
            $(thumbs).wrap('<nav class="thumbs" />');
        }
    }; // end init.

    $.fn.slideme = function (config) {
        if (methods[config]) {
            return methods[config].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof config == 'object' || !config) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + config + ' does not exist on jQuery.slideme');
        }
    };

})(jQuery);