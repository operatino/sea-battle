requirejs.config({
    paths: {
        jquery: '/bower_components/jquery/dist/jquery.min',
        bower_components: '/bower_components',
        modules: '/assets/js/modules'
    }
});

require([
    "jquery",
    "bower_components/socket.io-client/socket.io",
    "modules/field",
    "modules/game"
    ], function($, io, Field, Game) {
    var socket = io();

    var myField = new Field('my');
    var enemyField = new Field('enemy');
    var game = new Game(socket, enemyField, myField);

    $('.js-set-all-ships').on('click', function(e){
       e.preventDefault();

       myField.setAllShips();
       myField.redrawAllShips();
    });
});