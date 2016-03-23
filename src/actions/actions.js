import fetch from 'isomorphic-fetch'

export const REQUEST_LIST = 'REQUEST_LIST'
export function requestList () {
  return {
    type: REQUEST_LIST
  }
}

export const RECEIVE_LIST = 'RECEIVE_LIST'
export function receiveList (json) {
  return {
    type: RECEIVE_LIST,
    items: json,
    receivedAt: Date.now()
  }
}

export function fetchList() {
  return (dispatch) => {
    dispatch(requestList());

    return fetch(`http://localhost:3000/api`)
      .then(response => response.json())
      .then(json => dispatch(receiveList(json)))
      .catch(error => console.log(error))
  }
}