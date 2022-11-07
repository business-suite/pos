odoo.define('pos.CurrencyAmount', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class CurrencyAmount extends PosComponent {}
    CurrencyAmount.template = 'CurrencyAmount';

    Registries.Component.add(CurrencyAmount);

    return CurrencyAmount;
});
