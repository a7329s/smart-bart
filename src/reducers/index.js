
import {
  REQUEST_ETD, RECEIVE_ETD, ADD_NEARBY
} from '../actions';
import dotProp from 'dot-prop-immutable'

const etd = (state = {
  nearby: []

}, action) => {
  switch (action.type) {
    case ADD_NEARBY:
      return {
        ...state,
        nearby: state.nearby.concat(
          {
            isFetching: false,
            id: state.nearby.length + 1,
            stn: action.stn,
            hasETD: false,
          }
        )

      }
    case REQUEST_ETD:
      return {
        ...state
      }
    case RECEIVE_ETD:
      return dotProp.set(dotProp.set(state, 'nearby.' + action.id + '.etd', action.etd), 'nearby.' + action.id + '.hasETD', true)
    default:
      return state
  }
}

export default etd
