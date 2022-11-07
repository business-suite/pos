odoo.define('pos.tour.CompositeTourMethods', function (require) {
    'use strict';

    const { ProductScreen } = require('pos.tour.ProductScreenTourMethods');
    const { ReceiptScreen } = require('pos.tour.ReceiptScreenTourMethods');
    const { PaymentScreen } = require('pos.tour.PaymentScreenTourMethods');
    const { ClientListScreen } = require('pos.tour.ClientListScreenTourMethods');

    function makeFullOrder({ orderlist, customer, payment, ntimes = 1 , customerNote}) {
        for (let i = 0; i < ntimes; i++) {
            ProductScreen.exec.addMultiOrderlines(...orderlist);
            if (customer) {
                ProductScreen.do.clickCustomerButton();
                ClientListScreen.exec.setClient(customer);
            }
            if (customerNote) { // this will add a note to the last selected order line
                ProductScreen.exec.addCustomerNote(customerNote);
            }
            ProductScreen.do.clickPayButton();
            PaymentScreen.exec.pay(...payment);
            ReceiptScreen.exec.nextOrder();
        }
    }

    return { makeFullOrder };
});
