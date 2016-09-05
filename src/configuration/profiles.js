var StructureMetric = require("../check-plugins/structure-metric/structure-metric").StructureMetric;
var HtmlW3cValidator = require("../check-plugins/html-w3c-validator/html-w3c-validator").HtmlW3cValidator;
var HtmlMetric = require("../check-plugins/html-metric/html-metric").HtmlMetric;
var CssMetric = require("../check-plugins/css-metric/css-metric").CssMetric;
var JsStyleCheck = require("../check-plugins/js-style-check/js-style-check").JsStyleCheck;
var RegexCheck = require("../check-plugins/regex-check/regex-check").RegexCheck;


module.exports = {
	general: {
		name: 'General project',
		description: 'Check file structure',
		checks: [StructureMetric]
	},
	webMetrics: {
		name: 'Web project metrics',
		description: 'Show metrics of HTML, CSS and JS',
		checks: [StructureMetric, HtmlMetric, CssMetric],
		options: {}
	},
	webCheck: {
		name: 'Web project checking',
		description: 'Show metrics of HTML, CSS and JS and check JS code style and check by custom rules.',
		checks: [StructureMetric, HtmlMetric, CssMetric, JsStyleCheck, RegexCheck],
		options: {}
	},
	webCheckAdvanced: {
		name: 'Extensive web project check',
		description: 'Show metrics of HTML, CSS and JS and check JS code style and check by custom rules and validate html by W3C',
		checks: [StructureMetric, HtmlMetric, CssMetric, JsStyleCheck, RegexCheck, HtmlW3cValidator],
		options: {}
	},
	WED1Testation: {
		name: "WED1 Testation check",
		description: "Check HTML, CSS and JS of WED1 testation.",
		checks: /*[StructureMetric, HtmlMetric, CssMetric, JsStyleCheck,*/ [RegexCheck],
		options: {
			RegexCheck: {
				rules: [
					{
						name: "Hreflang attribute for external links",
						files: "index.html",
						snippet: {
							rule: /<a[^<>]*hreflang="\w{2}"[^<>]*>[^<>\/]*<\/a>/igm,
							min: 2,
							max: 4,
							error: {
								message: "Not enough links with hreflang attribute found.",
								type: "warning",
								hideOccurrencesInReport: true
							}
						}
					},
					{
						name: "Time element usage",
						files: "index.html",
						snippet: {
							rule: /<time[^<>\/]*>[^<>\/]*<\/time>/igm,
							min: 15,
							max: null,
							error: {
								message: "Not enough or to less time elements found. Please use <time> for every time occurence.",
								type: "warning"
							}
						},
						snippetCheck: {
							rule: /<time [^<>\/]*datetime="((\d{4}(-\d{2}){0,2})|(-\d{2}){0,2}|(\d{4}-W\d{2})|(\d{4}(-\d{2}){2}(T| )\d{2}:\d{2}(:\d{2}(.\d{3})?)?)|(\d{2}:\d{2}((\+|\-)\d{2}:\d{2})?))"[^<>\/]*>[^<>\/]*<\/time>/igm,
							min: 1,
							max: 1,
							valueFormat: "NUMBER",
							error: {
								message: "Time element not used correct. Don't forget datetime attribute and value (http://www.w3schools.com/tags/att_time_datetime.asp).",
								type: "error"
							}
						}
					}
				]
			}
		}
	}
};