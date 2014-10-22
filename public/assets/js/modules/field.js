"use strict";

define([''], function() {
    var field = {
        init: function(){
            prepareData();
        },

        prepareGrid: function(){
            var grid = [];

            //fill

            this.grid = grid;
            return grid;
        },

        getGrid: function(){
            return this.grid || this.prepareGrid();
        },

        render: function(parent){
            var field = $('<div class="field"></div>');
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    field.append('<div class="field_cell" data-row="' + i + '" data-col="' + j + '"></div>');
                }
            }
            $(parent).append(field);
        }
    };

    return field;
});