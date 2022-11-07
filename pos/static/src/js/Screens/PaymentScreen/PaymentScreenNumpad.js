odoo.define('pos.PaymentScreenNumpad', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class PaymentScreenNumpad extends PosComponent {
        constructor() {
            super(...arguments);
            this.decimalPoint = this.env._t.database.parameters.decimal_point;
        }
    }
    PaymentScreenNumpad.template = 'PaymentScreenNumpad';

    Registries.Component.add(PaymentScreenNumpad);

    return PaymentScreenNumpad;
});
