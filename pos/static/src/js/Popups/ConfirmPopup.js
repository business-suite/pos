odoo.define('pos.ConfirmPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('pos.AbstractAwaitablePopup');
    const Registries = require('pos.Registries');
    const { _lt } = require('@web/core/l10n/translation');

    // formerly ConfirmPopupWidget
    class ConfirmPopup extends AbstractAwaitablePopup {}
    ConfirmPopup.template = 'ConfirmPopup';
    ConfirmPopup.defaultProps = {
        confirmText: _lt('Ok'),
        cancelText: _lt('Cancel'),
        title: _lt('Confirm ?'),
        body: '',
    };

    Registries.Component.add(ConfirmPopup);

    return ConfirmPopup;
});
