export const ADD_VALIDATION_TO_NEW_MARKET = 'ADD_VALIDATION_TO_NEW_MARKET';
export const REMOVE_VALIDATION_FROM_NEW_MARKET = 'REMOVE_VALIDATION_FROM_NEW_MARKET';
export const ADD_ORDER_TO_NEW_MARKET = 'ADD_ORDER_TO_NEW_MARKET';
export const REMOVE_ORDER_FROM_NEW_MARKET = 'REMOVE_ORDER_FROM_NEW_MARKET';
export const UPDATE_NEW_MARKET = 'UPDATE_NEW_MARKET';
export const CLEAR_NEW_MARKET = 'CLEAR_NEW_MARKET';

export function addValidationToNewMarket(data) {
  return { type: ADD_VALIDATION_TO_NEW_MARKET, data };
}

export function removeValidationFromNewMarket(data) {
  return { type: REMOVE_VALIDATION_FROM_NEW_MARKET, data };
}

export function addOrderToNewMarket(data) {
  return { type: ADD_ORDER_TO_NEW_MARKET, data };
}

export function removeOrderFromNewMarket(data) {
  return { type: REMOVE_ORDER_FROM_NEW_MARKET, data };
}

export function updateNewMarket(data) {
  return { type: UPDATE_NEW_MARKET, data };
}

export function clearNewMarket() {
  return { type: CLEAR_NEW_MARKET };
}
