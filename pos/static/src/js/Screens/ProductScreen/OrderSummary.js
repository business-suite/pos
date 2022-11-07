odoo.define('pos.OrderSummary', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class OrderSummary extends PosComponent {}
    OrderSummary.template = 'OrderSummary';

    Registries.Component.add(OrderSummary);

    return OrderSummary;
});
