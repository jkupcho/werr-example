import { combineReducers } from 'redux'
import {
  REQUEST_LIST, RECEIVE_LIST
} from '../actions/actions'

function cats(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cats
});

export default rootReducer