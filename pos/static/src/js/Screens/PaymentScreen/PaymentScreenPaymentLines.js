odoo.define('pos.PaymentScreenPaymentLines', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class PaymentScreenPaymentLines extends PosComponent {
        formatLineAmount(paymentline) {
            return this.env.pos.format_currency_no_symbol(paymentline.get_amount());
        }
        selectedLineClass(line) {
            return { 'payment-terminal': line.get_payment_status() };
        }
        unselectedLineClass(line) {
            return {};
        }
    }
    PaymentScreenPaymentLines.template = 'PaymentScreenPaymentLines';

    Registries.Component.add(PaymentScreenPaymentLines);

    return PaymentScreenPaymentLines;
});
