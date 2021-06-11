import { createStore, AnyAction } from 'redux'
import { StoryType } from '../components/Story'
import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS } from './actions'

export interface RootStore {
  data?: Array<StoryType>
  isLoading: boolean
  error?: string
}

const initialState: RootStore = {
  isLoading: false,
  error: '',
}

const reducer = (state: RootStore = initialState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isDataFetched: true,
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      break
  }
  return state
}

export const configureStore = () => createStore(reducer)
