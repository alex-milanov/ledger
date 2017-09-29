'use strict';

const {
	section, div, span,
	table, thead, tbody, tr, td, th,
	form, label, button, input, fieldset, legend
} = require('iblokz-snabbdom-helpers');

const formUtil = require('../../util/form');

const fields = ['id', 'balance'];

const objToArray = (o, fields) =>
	(fields || Object.keys(o))
		.map(k => o[k]);

const handleSubmit = (submitAction, fields) => ({
	on: {
		submit: ev => (
			ev.preventDefault(),
			submitAction.apply(null, Array.from(ev.target.elements)
				.filter(el => el.name && fields.indexOf(el.name) > -1)
				.map(el => el.value)
			),
			formUtil.clear(ev.target)
		)
	}
});

module.exports = ({state, actions}) => section('.account', [
	table('[border="1"][cellspacing="2"][cellpadding="2"][width="400"]', [
		thead(tr(
			fields.map(field => th(field))
		)),
		tbody(state.account.list.map(account =>
			tr(fields.map(field =>
				td(account[field])
			))
		))
	]),
	form(handleSubmit(actions.account.open, ['id', 'balance']), fieldset([
		legend('Open'),
		label('Id'),
		input('[type="text"][name="id"]'),
		label('Balance'),
		input('[type="number"][name="balance"]'),
		button('Open')
	])),
	form(handleSubmit(actions.account.transfer, ['from', 'to', 'amount']), fieldset([
		legend('Transfer'),
		label('From'),
		input('[type="text"][name="from"]'),
		label('To'),
		input('[type="text"][name="to"]'),
		label('Amount'),
		input('[type="number"][name="amount"]'),
		button('Transfer')
	])),
	form(handleSubmit(actions.account.close, ['id', 'balance']), fieldset([
		legend('Close'),
		label('Id'),
		input('[type="text"][name="id"]'),
		label('Balance'),
		input('[type="number"][name="balance"]'),
		button('Close')
	]))
]);
