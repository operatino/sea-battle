define([
    "jquery",
    "../public/assets/js/modules/field"
    ], function($, Field) {

    describe("A suite", function () {
        var field = new Field();
        var myField, enemyField;
        var oneShipArr = (function(){
            var shipsArr = field.prepareGridData();
            shipsArr[1][1].hasShip = true;
            return shipsArr;
        })();

        var allShips = (function(){
            var shipsArr = field.prepareGridData();
            shipsArr[1][1].hasShip = true;
            shipsArr[3][1].hasShip = true;
            shipsArr[5][1].hasShip = true;
            shipsArr[7][1].hasShip = true;

            shipsArr[1][3].hasShip = true;
            shipsArr[2][3].hasShip = true;
            shipsArr[4][3].hasShip = true;
            shipsArr[5][3].hasShip = true;
            shipsArr[7][3].hasShip = true;
            shipsArr[8][3].hasShip = true;

            shipsArr[1][5].hasShip = true;
            shipsArr[2][5].hasShip = true;
            shipsArr[3][5].hasShip = true;
            shipsArr[5][5].hasShip = true;
            shipsArr[6][5].hasShip = true;
            shipsArr[7][5].hasShip = true;

            shipsArr[1][7].hasShip = true;
            shipsArr[2][7].hasShip = true;
            shipsArr[3][7].hasShip = true;
            shipsArr[4][7].hasShip = true;

            return shipsArr;
        })();

        beforeEach(function() {
            $('body').append('<div class="js-field-my"></div>');
            $('body').append('<div class="js-field-enemy"></div>');
            $('body').append('<input type="button" value="Ready" disabled class="js-ready">');

            myField = new Field('my');
            enemyField = new Field('enemy');
        });

        it("checks if grid was correctly rendered", function () {
            expect($('.js-field-my').find('.field_cell').length).not.toBe(0);
            expect($('.js-field-my').find('.field_cell').length).toBe(100);
        });

        it("data is prepared right", function () {
            var allHere = true;
            var grid = field.prepareGridData();

            for (var i = 1; i < 11; i++) {
                if (grid[i]) {
                    for (var j = 1; j < 11; j++) {
                        var current = grid[i][j] || undefined;

                        if (current && current.hasShip !== false && current.isHit !== false) {
                            allHere = false;
                            break;
                        }
                    }
                } else {
                    allHere = false;
                }
                if (!allHere) {
                    break;
                }
            }

            expect(allHere).toBe(true);
        });

        it('validates game field', function() {
            expect(field.validate(oneShipArr)).toBe(false);
            expect(field.validate(allShips)).toBe(true);
        });

        it('checks if cell changes state on click', function() {
            expect(myField.getGridData()[2][2].hasShip).toBe(false);

            $('.js-field-my .field_cell').on('click', function(e) {
                myField.fieldClick(this, e);
            });

            $('.js-field-my .field_cell[data-row="2"][data-col="2"]').trigger('click');

            expect(myField.getGridData()[2][2].hasShip).toBe(true);
        });

        it('check if Ready button is enabling', function() {
            expect($('.js-ready').prop("disabled")).toBe(true);

            field.setGridData(allShips);

            $("body").trigger("setMyShip", [field]);

            expect($('.js-ready').prop("disabled")).toBe(false);
        });

        it('check all ship set and validate', function() {
            myField.setAllShips();

            expect(myField.validate()).toBe(true);
        });

        it('check ship set and render', function() {
            $('body').append('<div class="js-field-test"></div>');

            var myTestField = new Field('test');

            myTestField.setAllShips();
            myTestField.redrawAllShips();

            expect($('.js-field-test').find('.__has-ship').length === 20).toBe(true);
        });
    });
});