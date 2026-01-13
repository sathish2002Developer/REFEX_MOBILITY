// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Depends on https://github.com/stylelint/stylelint
// Uses the styleline-config-standard rules from https://www.npmjs.com/package/stylelint-config-standard minus some rules


var configRules = {
	'alpha-value-notation': [
		'percentage',
		{
			exceptProperties: [
				'opacity',
				'fill-opacity',
				'flood-opacity',
				'stop-opacity',
				'stroke-opacity',
			],
		},
	],
	'at-rule-no-vendor-prefix': true,
	'color-function-notation': 'modern',
	'color-hex-length': 'short',
	'comment-whitespace-inside': 'always',
	'declaration-block-no-redundant-longhand-properties': true,
	'declaration-block-single-line-max-declarations': 1,
	'font-family-name-quotes': 'always-where-recommended',
	'function-name-case': 'lower',
	'function-url-quotes': 'always',
	'hue-degree-notation': 'angle',
	'import-notation': 'url',
	'keyframe-selector-notation': 'percentage-unless-within-keyword-only-block',
	'length-zero-no-unit': [
		true,
		{
			ignore: ['custom-properties'],
		},
	],
	'media-feature-range-notation': 'context',
	'number-max-precision': 4,
	'selector-attribute-quotes': 'always',
	'selector-not-notation': 'complex',
	'selector-pseudo-element-colon-notation': 'double',
	'selector-type-case': 'lower',
	'shorthand-property-no-redundant-values': true,
	'value-keyword-case': 'lower',
};



(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.registerHelper("lint", "css", async function(text, options) {

    var found = [];
    if ( !window.stylelint) {
        console.log("Error: window.Stylelint not defined, CodeMirror CSS linting cannot run.");
		return found;
    }

	await stylelint.lint({
		code: text,
		config: {
			rules: configRules,
			formatter: () => {}
		}
	}).then(output => {
		for ( var i = 0; i < output.results[0].warnings.length; i++) {
			var message = output.results[0].warnings[i];
			found.push({
				from: CodeMirror.Pos(message.line - 1, message.column - 1),
				to: CodeMirror.Pos(message.endLine - 1, message.endColumn),
				message: message.text,
				severity : message.severity
			});
		}
    }).catch(err => {
		console.warn(`Failed to lint CSS! \n\n ${err}`);
    });


    return found;

});

});
