odoo.define('pos.tour.ErrorPopupTourMethods', function (require) {
    'use strict';

    const { createTourMethods } = require('pos.tour.utils');

    class Do {
        clickConfirm() {
            return [
                {
                    content: 'click confirm button',
                    trigger: '.popup-error .footer .cancel',
                },
            ];
        }
    }

    class Check {
        isShown() {
            return [
                {
                    content: 'error popup is shown',
                    trigger: '.modal-dialog .popup-error',
                    run: () => {},
                },
            ];
        }
    }

    return createTourMethods('ErrorPopup', Do, Check);
});
