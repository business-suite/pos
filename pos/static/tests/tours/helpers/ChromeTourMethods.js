odoo.define('pos.tour.ChromeTourMethods', function (require) {
    'use strict';

    const { createTourMethods } = require('pos.tour.utils');

    class Do {
        confirmPopup() {
            return [
                {
                    content: 'confirm popup',
                    trigger: '.popups .modal-dialog .button.confirm',
                },
            ];
        }
        clickTicketButton() {
            return [
                {
                    trigger: '.pos-topheader .ticket-button',
                },
                {
                    trigger: '.subwindow .ticket-screen',
                    run: () => {},
                },
            ];
        }
    }

    return createTourMethods('Chrome', Do);
});
