odoo.define('pos.CategoryButton', function(require) {
    'use strict';

    const PosComponent = require('pos.PosComponent');
    const Registries = require('pos.Registries');

    class CategoryButton extends PosComponent {
        get imageUrl() {
            const category = this.props.category
            return `/web/image?model=pos.category&field=image_128&id=${category.id}&write_date=${category.write_date}&unique=1`;
        }
    }
    CategoryButton.template = 'CategoryButton';

    Registries.Component.add(CategoryButton);

    return CategoryButton;
});
