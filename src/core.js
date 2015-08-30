import {List} from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}
