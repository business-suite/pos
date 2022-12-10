odoo.define('pos_fullscreen.FullScreen', function (require) {
    'use strict';
    const Chrome = require('pos.Chrome');
    const Registries = require('pos.Registries');

    const PosResChrome = (Chrome) =>
        class extends Chrome {
            onClickFull(event) {

                var element = document.body;

                if (event instanceof HTMLElement) {
                    element = event;
                }

                var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

                element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () {
                    return false;
                };
                document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () {
                    return false;
                };

                isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
            }
        }

    Registries.Component.extend(Chrome, PosResChrome);

})