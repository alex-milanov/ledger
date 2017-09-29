'use strict';

// dom
const {
	h1, a, div,
	section, button, span
} = require('iblokz-snabbdom-helpers');
// components
const account = require('./account');

module.exports = ({state, actions}) => section('#ui', [
	h1('Ledger Prototype'),
	account({state, actions})
]);
