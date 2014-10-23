"use strict";

define([''], function() {

    function Game(socket) {
        this.socket = socket;
        this.playerReady = false;

        this.init();
    }

    Game.prototype = {
        init: function () {
            var _this = this;

            $('.js-ready').on('click', function (e) {
                e.preventDefault();

                _this.readyToPlay(e);
            })
        },

        readyToPlay: function(){
            this.playerReady = true;

            console.log('ready to play');

            $("body").trigger("playerReady");
            this.socket.emit('playerReady');
        }
    };

    return Game;
});