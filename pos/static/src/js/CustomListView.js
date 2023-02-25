odoo.define('pos.CustomListView', function (require) {
    'use strict';
    const ListController = require('web.ListRenderer');

    ListController.include({
        _onToggleCheckbox: function (ev) {
            this._super.apply(this, arguments);
            var $recordSelector = $(ev.target).closest('.custom-control-input');
            var $trSelector = $(ev.target).parent().parent().parent();
            if($recordSelector.is(':checked')) {
                $trSelector.css('background', '#E8F0FE');
            } else {
                $trSelector.css('background', '#f8f9fa');
            }
        }
    })
})