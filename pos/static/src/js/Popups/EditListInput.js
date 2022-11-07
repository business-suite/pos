odoo.define('pos.EditListInput', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class EditListInput extends PosComponent {
        onKeyup(event) {
            if (event.key === "Enter" && event.target.value.trim() !== '') {
                this.trigger('create-new-item');
            }
        }
    }
    EditListInput.template = 'EditListInput';

    Registries.Component.add(EditListInput);

    return EditListInput;
});
