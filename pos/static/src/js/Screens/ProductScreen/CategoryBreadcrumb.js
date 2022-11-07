odoo.define('pos.CategoryBreadcrumb', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class CategoryBreadcrumb extends PosComponent {}
    CategoryBreadcrumb.template = 'CategoryBreadcrumb';

    Registries.Component.add(CategoryBreadcrumb);

    return CategoryBreadcrumb;
});
