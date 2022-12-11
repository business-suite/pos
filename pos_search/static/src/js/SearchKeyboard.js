odoo.define('pos_search.SearchBar', function (require) {
    'use strict';

    const Registries = require('pos.Registries');
    const ProductsWidgetControlPanel = require('pos.ProductsWidgetControlPanel');

    const SearchBar = (ProductsWidgetControlPanel) =>

        class extends ProductsWidgetControlPanel {
            constructor() {
                super();
                this.searchWordInput = useRef('search-word-input');
                this.updateSearch = debounce(this.updateSearch, 100);
            }

            clearSearch() {
                this.searchWordInput.el.value = '';
                this.trigger('clear-search');
            }

            updateSearch(event) {
                this.trigger('update-search', event.target.value);
                if (event.key === 'Enter') {
                    // We are passing the searchWordInput ref so that when necessary,
                    // it can be modified by the parent.
                    this.trigger('try-add-product', {searchWordInput: this.searchWordInput});
                }
            }

            _toggleMobileSearchbar() {
                this.trigger('toggle-mobile-searchbar');
            }
        }

    Registries.Component.extend(ProductsWidgetControlPanel, SearchBar);
})