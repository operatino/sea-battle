"use strict";

define([''], function() {
    var field = {
        init: function(){
            this.prepareField('my');
            this.prepareField('enemy');
        },

        prepareField: function (field) {
            this.render('.js-field-' + field);

            var grid = this.prepareGridData(field);

            if (!this.grids) {
                this.grids = {}
            }

            this.grids[field] = grid;
        },

        getGridData: function(field) {
            return this.grids[field];
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

        fieldClick: function(_this, e, field){
            e.preventDefault();

            var $this = $(_this);

            var row = $this.data('row');
            var col = $this.data('col');

            if (field === 'my') {
                this.setMyShip(row, col);
            } else if (field === 'enemy') {
                this.fire(row, col);
            }
        },

        setMyShip: function(row, col) {

            if (this.grids && this.grids.my && this.grids.my[row] && this.grids.my[row][col]) {
                this.grids.my[row][col].hasShip = true;
            }
        },

        validate: function(grid) {
            var filled = 0;
            for (var i = 1; i < 11; i++) {
                for (var j = 1; j < 11; j++) {
                    if (grid[i][j].hasShip) {
                        filled++;
                    }
                }
            }

            return (filled == 20) ? true : false;
        }
    };

    return field;
});