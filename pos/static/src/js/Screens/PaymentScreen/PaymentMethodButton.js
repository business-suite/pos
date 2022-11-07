odoo.define('pos.PaymentMethodButton', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class PaymentMethodButton extends PosComponent {}
    PaymentMethodButton.template = 'PaymentMethodButton';

    Registries.Component.add(PaymentMethodButton);

    return PaymentMethodButton;
});
