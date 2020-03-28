import { createConnectedStore } from 'undux'

// Create a store with an initial value.
export default createConnectedStore({
  error: null,
  numbers: [],
  operations: [],
  running: false, 
  cards: [],
  results: []
});
