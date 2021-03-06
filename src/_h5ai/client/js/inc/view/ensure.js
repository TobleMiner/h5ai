
modulejs.define('view/ensure', ['$', 'config', 'core/event'], function ($, config, event) {

	var selb = '#bottombar',
		selr = selb + ' .right',
		sela = selr + ' a',
		sequence = 'powered by h5ai ' + config.setup.VERSION,
		url = 'http://larsjung.de/h5ai/',
		isVisible = ':visible',
		styleKey = 'style',
		styleVal = 'display: inline !important',

		ensure = function () {

			if (
				$(selr).text() !== sequence ||
				$(sela).filter(isVisible).length !== 1 ||
				$(selr).filter(isVisible).length !== 1 ||
				$(selb).filter(isVisible).length !== 1
			) {
				if ($(selb).filter(isVisible).length !== 1) {
					$(selb).remove();
					$('<div id="bottombar"/>').attr(styleKey, styleVal).appendTo('body');
				}
				$(selr).remove();
				$('<span><a/></span>')
					.addClass('right')
					.attr(styleKey, styleVal)
					.find('a')
						.attr('href', url)
						.attr('title', sequence)
						.text(sequence)
						.attr(styleKey, styleVal)
					.end()
					.prependTo(selb);
			}
		},

		init = function () {

			event.sub('ready', function () {

				ensure();
				setInterval(ensure, 60000);
			});
		};

	init();
});
