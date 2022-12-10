{
    "name": "POS Full Screen",
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
            'pos_fullscreen/static/src/js/FullScreen.js',
        ],
        'web.assets_qweb': [
            'pos_fullscreen/static/src/xml/FullScreen.xml',
        ],
    },
    "auto_install": False,
    "installable": True,
    'license': 'OPL-1'
}
