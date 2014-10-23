"use strict";

define([''], function() {

    function Field(owner) {
        this.editable = true;
        this.acceptsFire = false;

        if (owner) {
            this.owner = owner;
            this.prepareField(owner);
        }

        this.waitForReady();
    }

    Field.prototype = {
        waitForReady: function(){
            var _this = this;

            $("body" ).on("setMyShip", function(e, _this) {
                if (_this.validate()) {
                    _this.ready = true;

                    $('.js-ready').prop("disabled", false);
                } else {
                    _this.ready = false;

                    $('.js-ready').prop("disabled", true);
                }
            });

            $("body" ).on("playerReady", function() {
                _this.editable = false;
                $('.js-field-my').addClass('__ready');
            });
        },

        prepareField: function (field) {
            var _this = this;
            var hook = '.js-field-' + field;

            this.render(hook);

            $(hook).on('click','.field_cell', function(e){
                _this.fieldClick(this, e)
            });

            this.gridData = this.prepareGridData();
        },

        setGridData: function(data) {
            this.gridData = data;
        },

        getGridData: function() {
            return this.gridData;
        },

        prepareGridData: function(){
            var grid = [];

            for (var i = 1; i < 11; i++) {
                grid[i] = [];

                for (var j = 1; j < 11; j++) {
                    grid[i][j] = {
                        hasShip: false,
                        isHit: false
                    };
                }
            }

            return grid;
        },

        render: function(parent){
            var fields = '';
            for (var i = 1; i < 11; i++) {
                for (var j = 1; j < 11; j++) {
                    fields += '<div class="field_cell" data-row="' + i + '" data-col="' + j + '"></div>';
                }
            }
            $(parent).html(fields);
        },

        fieldClick: function(_this, e){
            e.preventDefault();

            var $this = $(_this);

            var row = $this.data('row');
            var col = $this.data('col');

            if (this.owner === 'my' && this.editable) {
                this.setMyShip(row, col);
            } else if (this.owner === 'enemy' && this.acceptsFire) {
                this.fire(row, col);
            }
        },

        fire: function(row, col) {
            if (this.acceptsFire && this.gridData && this.gridData[row] && this.gridData[row][col]) {
                this.gridData[row][col].isHit = true;
            }

            $('.js-field-enemy .field_cell[data-row="'+row+'"][data-col="'+col+'"]').addClass('__is-hit');
        },

        setMyShip: function(row, col) {
            if (this.editable && this.gridData && this.gridData[row] && this.gridData[row][col]) {
                this.gridData[row][col].hasShip = true;
            }

            $('.js-field-my .field_cell[data-row="'+row+'"][data-col="'+col+'"]').addClass('__has-ship');

            $("body").trigger("setMyShip", [this]);
        },

        redrawAllShips: function(){
            var $field = $('.js-field-'+this.owner);

            // Clean previous data
            $field.find('.__has-ship').removeClass('__has-ship');

            for (var i = 1; i < 11; i++) {
                for (var j = 1; j < 11; j++) {

                    if (this.gridData[i][j].hasShip) {

                        $field.find('.field_cell[data-row="'+i+'"][data-col="'+j+'"]').addClass('__has-ship');
                    }
                }
            }

            $("body").trigger("setMyShip", [this]);
        },

        setAllShips: function(){
            // Clean previous data
            this.setGridData(this.prepareGridData());

            // Temp ship full set
            this.gridData[1][1].hasShip = true;
            this.gridData[3][1].hasShip = true;
            this.gridData[5][1].hasShip = true;
            this.gridData[7][1].hasShip = true;

            this.gridData[1][3].hasShip = true;
            this.gridData[2][3].hasShip = true;
            this.gridData[4][3].hasShip = true;
            this.gridData[5][3].hasShip = true;
            this.gridData[7][3].hasShip = true;
            this.gridData[8][3].hasShip = true;

            this.gridData[1][5].hasShip = true;
            this.gridData[2][5].hasShip = true;
            this.gridData[3][5].hasShip = true;
            this.gridData[5][5].hasShip = true;
            this.gridData[6][5].hasShip = true;
            this.gridData[7][5].hasShip = true;

            this.gridData[1][7].hasShip = true;
            this.gridData[2][7].hasShip = true;
            this.gridData[3][7].hasShip = true;
            this.gridData[4][7].hasShip = true;
        },

        validate: function(data) {
            var filled = 0;
            var dataToValidate = data || this.gridData;

            for (var i = 1; i < 11; i++) {
                for (var j = 1; j < 11; j++) {
                    if (dataToValidate[i][j].hasShip) {
                        filled++;
                    }
                }
            }

            return (filled == 20) ? true : false;
        }
    };

    return Field;
});