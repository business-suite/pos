odoo.define('pos.tour.TicketScreen', function (require) {
    'use strict';

    const { ProductScreen } = require('pos.tour.ProductScreenTourMethods');
    const { ReceiptScreen } = require('pos.tour.ReceiptScreenTourMethods');
    const { PaymentScreen } = require('pos.tour.PaymentScreenTourMethods');
    const { ClientListScreen } = require('pos.tour.ClientListScreenTourMethods');
    const { TicketScreen } = require('pos.tour.TicketScreenTourMethods');
    const { ErrorPopup } = require('pos.tour.ErrorPopupTourMethods');
    const { Chrome } = require('pos.tour.ChromeTourMethods');
    const { getSteps, startSteps } = require('pos.tour.utils');
    var Tour = require('web_tour.tour');

    startSteps();

    ProductScreen.do.confirmOpeningPopup();
    ProductScreen.do.clickHomeCategory();
    ProductScreen.exec.addOrderline('Desk Pad', '1', '2');
    ProductScreen.do.clickCustomerButton();
    ProductScreen.do.clickCustomer('Nicole Ford');
    ProductScreen.do.clickSetCustomer();
    Chrome.do.clickTicketButton();
    TicketScreen.check.nthRowContains(2, 'Nicole Ford');
    TicketScreen.do.clickNewTicket();
    ProductScreen.exec.addOrderline('Desk Pad', '1', '3');
    ProductScreen.do.clickCustomerButton();
    ProductScreen.do.clickCustomer('Brandon Freeman');
    ProductScreen.do.clickSetCustomer();
    ProductScreen.do.clickPayButton();
    PaymentScreen.check.isShown();
    Chrome.do.clickTicketButton();
    TicketScreen.check.nthRowContains(3, 'Brandon Freeman');
    TicketScreen.do.clickNewTicket();
    ProductScreen.exec.addOrderline('Desk Pad', '2', '4');
    ProductScreen.do.clickPayButton();
    PaymentScreen.do.clickPaymentMethod('Bank');
    PaymentScreen.do.clickValidate();
    ReceiptScreen.check.isShown();
    Chrome.do.clickTicketButton();
    TicketScreen.check.nthRowContains(4, 'Receipt');
    TicketScreen.do.selectFilter('Receipt');
    TicketScreen.check.nthRowContains(2, 'Receipt');
    TicketScreen.do.selectFilter('Payment');
    TicketScreen.check.nthRowContains(2, 'Payment');
    TicketScreen.do.selectFilter('Ongoing');
    TicketScreen.check.nthRowContains(2, 'Ongoing');
    TicketScreen.do.selectFilter('All active orders');
    TicketScreen.check.nthRowContains(4, 'Receipt');
    TicketScreen.do.search('Customer', 'Nicole');
    TicketScreen.check.nthRowContains(2, 'Nicole');
    TicketScreen.do.search('Customer', 'Brandon');
    TicketScreen.check.nthRowContains(2, 'Brandon');
    TicketScreen.do.search('Receipt Number', '-0003');
    TicketScreen.check.nthRowContains(2, 'Receipt');
    // Close the TicketScreen to see the current order which is in ReceiptScreen.
    // This is just to remove the search string in the search bar.
    TicketScreen.do.clickDiscard();
    ReceiptScreen.check.isShown();
    // Open again the TicketScreen to check the Paid filter.
    Chrome.do.clickTicketButton();
    TicketScreen.do.selectFilter('Paid');
    TicketScreen.check.nthRowContains(2, '-0003');
    // Pay the order that was in PaymentScreen.
    TicketScreen.do.selectFilter('Payment');
    TicketScreen.do.selectOrder('-0002');
    PaymentScreen.do.clickPaymentMethod('Cash');
    PaymentScreen.do.clickValidate();
    ReceiptScreen.check.isShown();
    ReceiptScreen.do.clickNextOrder();
    ProductScreen.check.isShown();
    // Check that the Paid filter will show the 2 synced orders.
    Chrome.do.clickTicketButton();
    TicketScreen.do.selectFilter('Paid');
    TicketScreen.check.nthRowContains(2, 'Brandon Freeman');
    TicketScreen.check.nthRowContains(3, '-0003');
    // Invoice order
    TicketScreen.do.selectOrder('-0003');
    TicketScreen.check.orderWidgetIsNotEmpty();
    TicketScreen.do.clickControlButton('Invoice');
    Chrome.do.confirmPopup();
    ClientListScreen.check.isShown();
    ClientListScreen.exec.setClient('Colleen Diaz');
    TicketScreen.check.customerIs('Colleen Diaz');
    // Reprint receipt
    TicketScreen.do.clickControlButton('Print Receipt');
    ReceiptScreen.check.isShown();
    ReceiptScreen.do.clickBack();
    // When going back, the ticket screen should be in its previous state.
    TicketScreen.check.filterIs('Paid');

    // Test refund //
    TicketScreen.do.clickDiscard();
    ProductScreen.check.isShown();
    ProductScreen.check.orderIsEmpty();
    ProductScreen.do.clickRefund();
    // Filter should be automatically 'Paid'.
    TicketScreen.check.filterIs('Paid');
    TicketScreen.do.selectOrder('-0003');
    TicketScreen.check.customerIs('Colleen Diaz');
    TicketScreen.do.clickOrderline('Desk Pad');
    TicketScreen.do.pressNumpad('3');
    // Error should show because 2 is more than the number
    // that can be refunded.
    ErrorPopup.do.clickConfirm();
    TicketScreen.do.clickDiscard();
    ProductScreen.check.isShown();
    ProductScreen.check.orderIsEmpty();
    ProductScreen.do.clickRefund();
    TicketScreen.do.selectOrder('-0003');
    TicketScreen.do.clickOrderline('Desk Pad');
    TicketScreen.do.pressNumpad('1');
    TicketScreen.check.toRefundTextContains('To Refund: 1.00');
    TicketScreen.do.confirmRefund();
    ProductScreen.check.isShown();
    ProductScreen.check.selectedOrderlineHas('Desk Pad', '-1.00');
    // Try changing the refund line to positive number.
    // Error popup should show.
    ProductScreen.do.pressNumpad('2');
    ErrorPopup.do.clickConfirm();
    // Change the refund line quantity to -3 -- not allowed
    // so error popup.
    ProductScreen.do.pressNumpad('+/- 3');
    ErrorPopup.do.clickConfirm();
    // Change the refund line quantity to -2 -- allowed.
    ProductScreen.do.pressNumpad('+/- 2');
    ProductScreen.check.selectedOrderlineHas('Desk Pad', '-2.00');
    // Check if the amount being refunded changed to 2.
    ProductScreen.do.clickRefund();
    TicketScreen.do.selectOrder('-0003');
    TicketScreen.check.toRefundTextContains('Refunding 2.00');
    TicketScreen.do.clickDiscard();
    // Pay the refund order.
    ProductScreen.do.clickPayButton();
    PaymentScreen.do.clickPaymentMethod('Bank');
    PaymentScreen.do.clickValidate();
    ReceiptScreen.check.isShown();
    ReceiptScreen.do.clickNextOrder();
    // Check refunded quantity.
    ProductScreen.do.clickRefund();
    TicketScreen.do.selectOrder('-0003');
    TicketScreen.check.refundedNoteContains('2.00 Refunded');

    Tour.register('TicketScreenTour', { test: true, url: '/pos/ui' }, getSteps());
});
