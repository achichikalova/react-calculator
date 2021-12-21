import { ACTIONS } from "../actions/evaluate";

export default function DigitButton({ dispatch, digit }) {
  return (
    <button 
      onClick={() => 
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })
      }
    >
    {digit}
    </button>)
}