import {setEntries, next, restart, vote, INITIAL_STATE} from './core';

export default function reducer(action, state = INITIAL_STATE) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'NEXT':
    return next(state);
  case 'RESTART':
    return restart(state);
  case 'VOTE':
    return state.update('vote',
                        voteState => vote(voteState, action.entry, action.clientId));
  }
  return state;
}
