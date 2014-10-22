define([
    "jquery",
    "../public/assets/js/modules/field"
    ], function($, field) {

    describe("A suite", function () {

        beforeEach(function() {
            $('body').append('<div class="js-my-field"></div>');
            $('body').append('<div class="js-enemy-field"></div>');
        });

        it("checks if grid was correctly rendered", function () {
            field.render('.js-my-field');
            expect($('.js-my-field').find('.field_cell').length).not.toBe(0);
            expect($('.js-my-field').find('.field_cell').length).toBe(100);
        });

        it("data is prepared right", function () {
            var grid = field.getGrid();
            var allHere = true;

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var current = grid[i][j];

                    if (current.hasShip !== false && current.isHit !== false) {
                        allHere = false;
                        break;
                    }
                }

                if (!allHere) {
                    break;
                }
            }

            expect(allHere).toBe(true);
        });

    });
});