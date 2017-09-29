'use strict';

// lib
const {obj} = require('iblokz-data');

// initial state
const initial = {
	list: []
};

// actions
/*
{"type":"open","id":"Samantha","balance":1000,"timestamp":1483365228080}
{"type":"open","id":"John","balance":500,"timestamp":1483365228080}
{"type":"open","id":"Suzzy","balance":0,"timestamp":1483365228081}
{"type":"transfer","fromId":"Samantha","toId":"John","amount":500,"timestamp":1483365228085}
{"type":"transfer","fromId":"Samantha","toId":"Suzzy","amount":500,"timestamp":1483365228086}
{"type":"close","id":"Samantha","balance":0,"timestamp":1483365228086}
*/
const open = (id, balance) =>
	state => obj.patch(state, 'account', {
		list: [].concat(state.account.list, {id, balance: Number(balance)})
	});

const transfer = (from, to, amount) => (
	console.log('transfer', from, to, amount),
	state => obj.patch(state, 'account', {
		list: [].concat(
			state.account.list.filter(account => [to, from].indexOf(account.id) === -1),
			state.account.list.filter(account => account.id === from)
				.map(account => obj.patch(account, 'balance', account.balance - Number(amount))),
			state.account.list.filter(account => account.id === to)
				.map(account => obj.patch(account, 'balance', account.balance + Number(amount)))
		)
	})
);

const close = (id, balance) =>
	state => obj.patch(state, 'account', {
		list: state.account.list.filter(account => id !== account.id)
	});

module.exports = {
	initial,
	open,
	transfer,
	close
};
