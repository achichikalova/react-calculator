import { ACTIONS } from '../actions/evaluate.js';
import evaluate from '../actions/evaluate.js';

// Use reducer to implement functionality
export default function reducer(state, { type, payload }) {
  switch(type) {
    // Handle add digit
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      };
      if (payload.digit === '.' && state.currentOperand === '.') {
        return state
      };
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    // Handle choose operation
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    // Handle clear button
    case ACTIONS.CLEAR:
      return {};
    // Handle delete digit button
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) {
        return state;
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    // Handle equal button
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
  }
}
