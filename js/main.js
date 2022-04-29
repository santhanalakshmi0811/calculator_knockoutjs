// Start ViewModel
function CalculatorViewModel() {
 var self = this;
  
  let input = '',
      tempVal = null,
      tempOper = '';
  self.overflownVal = ko.observable(false);
  self.screenVal = ko.observable(0);
  self.placeholder = ko.observable(' ');
  self.buttons = [
    { text: '1', onClick: clickNumber },
    { text: '2', onClick: clickNumber },
    { text: '3', onClick: clickNumber },
    { text: '+', onClick: clickOperator },
    { text: '4', onClick: clickNumber },
    { text: '5', onClick: clickNumber },
    { text: '6', onClick: clickNumber },
    { text: '-', onClick: clickOperator },
    { text: '7', onClick: clickNumber },
    { text: '8', onClick: clickNumber },
    { text: '9', onClick: clickNumber },
    { text: 'x', onClick: clickOperator },
    { text: 'C', onClick: clear },
    { text: '0', onClick: clickNumber },
    { text: '.', onClick: clickNumber },
    { text: '/', onClick: clickOperator },
    { text: 'DEL', onClick: deleteDigit },
    { text: '%', onClick: clickOperator },
    { text: '=', onClick: getTotal },
    { text: 'sub', onClick: getTotal },
    { text: 'reset', onClick: clear}
  ];
  
  // To delete last digit
  function deleteDigit(){
  
     input = input.slice(0, -1);
     let floatInput = parseFloat(input);
     if (isNaN(floatInput))
        self.screenVal(0);
     else
        self.screenVal(floatInput);
  }
  
  // To clear all inputs
  function clear () {
    input = '';
    tempVal = null;
    tempOper = '';
    self.placeholder('');
    self.overflownVal(false);
    self.screenVal('CLEAR');
    setTimeout(() => {
      self.screenVal(0)
    }, 400)
  }
  
  // click event on numbers
  function clickNumber (vm) {
    if (input === '' && vm.text === '.') {
      input = '0';
    }
    input += vm.text; 
    self.screenVal(parseFloat(input));
  }
  
  // click event on operators
  function clickOperator (vm) {
    let placeholderVal = self.screenVal();
    if (tempVal === null) {
      tempVal = self.screenVal();
    }
    else {
      if (tempOper === '/' && self.screenVal() === 0) {
        self.screenVal('ERROR');
        return;
      }
      tempVal = operate(tempOper, tempVal, self.screenVal());
      self.screenVal(tempVal);
    }
    tempOper = vm.text;
    self.placeholder(self.placeholder() + `${placeholderVal} ${tempOper} `);
    if (self.placeholder().length > 30) {
      self.overflownVal(true);
      let overflow = self.placeholder().length - 30;
      self.placeholder(self.placeholder().slice(overflow));
    }
    else {
      self.overflownVal(false);
    }
    input = '';
  }
  
  // arithmetic operation
  function operate (sign, temp, val) {
    switch (sign) {
      case '+':
        return temp + val;
      case '-':
        return temp - val;
      case 'x':
        return temp * val;
      case '*':
        return temp * val;
      case '/':
        return temp / val;
      case '%':
        return temp%val;
      default: 
        return 0;
    }
  }
  
  
  // final output
  function getTotal () {
    if (tempOper === '/' && self.screenVal() === 0) {
      self.screenVal('ERROR');
      return;
    }
    let total = operate(tempOper, tempVal, self.screenVal());
    self.screenVal(total);
    input = '';
    tempVal = null;
    tempOper = '';
    self.placeholder('');
    self.overflownVal(false);
  }
  
  // input via keyboard
  self.keycheck= function (data, e) {
    var keyValue = e.key;
    if (keyValue.match(/[0-9]/g) || keyValue=='.') {
        clickNumber_kb(keyValue);
        //return true;
    }
    if (keyValue=='+' || keyValue=='-' || keyValue=='*' || keyValue=='/' || keyValue=='%') {
        clickOperator_kb(keyValue);
        //return true;
    }
    if (keyValue=='=') {
        getTotal();
        //return true;
        document.getElementById("input_num").value = self.screenVal();
        
    }
    //return false;
      
      
  }
  
  // number input via keyboard
  function clickNumber_kb(num) {
    if (input === '') {
      input = '0';
    }
    input += num; 
    self.screenVal(parseFloat(input));
  }
  
  // operator input via keybaord
  function clickOperator_kb (ope) {
    let placeholderVal = self.screenVal();
    if (tempVal === null) {
      tempVal = self.screenVal();
    }
    else {
      if (tempOper === '/' && self.screenVal() === 0) {
        self.screenVal('ERROR');
        return;
      }
      tempVal = operate(tempOper, tempVal, self.screenVal());
      self.screenVal(tempVal);
    }
    tempOper = ope;
    self.placeholder(self.placeholder() + `${placeholderVal} ${tempOper} `);
    if (self.placeholder().length > 30) {
      self.overflownVal(true);
      let overflow = self.placeholder().length - 30;
      self.placeholder(self.placeholder().slice(overflow));
    }
    else {
      self.overflownVal(false);
    }
    input = '';
  }
  
} // end ViewModel

ko.applyBindings(new CalculatorViewModel());
