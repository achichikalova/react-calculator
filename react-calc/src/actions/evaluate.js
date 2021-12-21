// Global constant variables for actions
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

export default function evaluate({ currentOperand, previousOperand, operation }) {
  // Change provided string to number
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) {
    return '';
  }

  let calculation = '';

  // Handle operations button functionality
  switch (operation) {
    case '÷':
      calculation = prev / current;
      break;
    case '*':
      calculation = prev * current;
      break;
    case '+':
      calculation = prev + current;
      break;
    case '-':
      calculation = prev - current;
      break;
  }
  // Change result to string and return it
  return calculation.toString();
}