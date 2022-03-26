(function(window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.lenght === 0) {
      throw new Error('Could not fine element with selector ' + selector);
    }
  }
  CheckList.prototype.addClickHandler = function (fn){
    this.$element.on('click', 'input', function (event){
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };
  CheckList.prototype.addRow = function(coffeeOrder) {
    //Remove any existing rows that match the emial email address
    this.removeRow(coffeeOrder.emailAddress);



    //Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);

    //add the new row instance's $element property to the CheckList
    this.$element.append(rowElement.$element);
  };
  CheckList.prototype.removeRow = function(email) {
    this.$element.find('[value="' + email + '"]').closest('[data-coffee-order="checkbox"]').remove();
  };

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    }).css({"border":"1px solid #ccc", "border-radius":"4px", "padding":"6px"});

    var rowColor;

    var $label = $('<label></label>');
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
      if(coffeeOrder.flavor === 'caramel'){
        rowColor = '#fff8dc';
      }else if (coffeeOrder.flavor === 'almond') {
        rowColor = ' #EADDCA';
      }else {
        rowColor = '#e6e6fa';
      }
      $div = $('<div></div>', {
        'data-coffee-order': 'checkbox',
        'class': 'checkbox'
      }).css({"background-color":rowColor, "border":"1px solid #ccc", "border-radius":"4px", "padding":"6px"});
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strenght + 'X]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
