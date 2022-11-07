odoo.define('pos.ControlButtonPopup', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('pos.AbstractAwaitablePopup');
    const Registries = require('pos.Registries');
    const { _lt } = require('@web/core/l10n/translation');

    class ControlButtonPopup extends AbstractAwaitablePopup {
        /**
         * @param {Object} props
         * @param {string} props.startingValue
         */
        constructor() {
            super(...arguments);
            this.controlButtons = this.props.controlButtons;
        }
    }
    ControlButtonPopup.template = 'ControlButtonPopup';
    ControlButtonPopup.defaultProps = {
        cancelText: _lt('Back'),
        controlButtons: []
    };

    Registries.Component.add(ControlButtonPopup);

    return ControlButtonPopup;
});
