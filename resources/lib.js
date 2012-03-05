var $ = function(selector) {
	return document.querySelector(selector);
}

var $$ = function(selector) {
	return document.querySelectorAll(selector);
}

// This function is taken from http://blog.stchur.com/2011/11/07/dealing-with-css-vendor-prefixes/

var getStyleName = function () {
	var styleHash = {};
	var vendorPrefixes = [ 'O', 'ms', 'Moz', 'Webkit' ];
	return function (styleName, elem) {
		elem = elem || document.createElement('div');
		var s = styleHash[styleName];
		if (!s) {
			// hope the browser supports the "official" (non-vendor-prefixed) style first
			var camStyle = camelize(styleName);

			// if not, then ask getVendorStyle for help -- it will try the various vendor prefixes seeking
			// one that works (if it doesn't find one, it will return an empty string, in which case we
			// revert back to originally passed in styleName)
			if (elem.style[camStyle] === undefined) {
				camStyle = getVendorStyle(camStyle, elem) || styleName;
			}

			// finally, store the camelized & vendor-specific (if applicable) value in the styleHash where key = styleName that was passed in
			s = styleHash[styleName] = camStyle;
		}
		return s;
	}

	function getVendorStyle(style, elem) {
		var s = camelize('-' + style);
		var i = vendorPrefixes.length;
		while (i--) {
			style = vendorPrefixes[i] + s;
			if (elem.style[style] !== undefined) {
				return style;
			}
		}
		return '';
	}

	;

	function camelize(s) {
		return s.replace(/-(\w)/g, function (m, c) {
			return c.toUpperCase();
		});
	}
}();
