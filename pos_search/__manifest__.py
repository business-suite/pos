{
    "name": "POS Search",
    "version": "1.0",
    "category": "Point of Sales",
    'summary': '',
    "description": "",
    "author": "Business Suite Team",
    "depends": ['base', 'pos'],
    "data": [
    ],
    'assets': {
        'pos.assets': [
            'pos_search/static/src/js/*.js',
        ],
        'web.assets_qweb': [
            'pos_search/static/src/xml/search_keyboard.xml',
        ],
    },
    "auto_install": False,
    "installable": True,
    'license': 'OPL-1'
}
