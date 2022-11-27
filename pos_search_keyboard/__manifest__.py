{
    "name": "POS Search Keyboard",
    "version": "1.0",
    "category": "Point of Sales",
    'summary': '',
    "description": "",
    "author": "Business Suite Team",
    "depends": ['base', 'pos', 'pos_search'],
    "data": [
    ],
    'assets': {
        'pos.assets': [
            'pos_search_keyboard/static/src/css/numpad.css',
            'pos_search_keyboard/static/src/js/*.js',
        ],
        'web.assets_qweb': [
                'pos_search_keyboard/static/src/xml/NumpadWidget.xml',
        ],
    },
    "auto_install": False,
    "installable": True,
    'license': 'OPL-1'
}
