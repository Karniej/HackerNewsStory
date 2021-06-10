import { StoryType } from '../components/Story'

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE'

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
})

export const fetchDataSuccess = (payload: Array<StoryType>) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
})

export const fetchDataFailure = (payload: string) => ({
  type: FETCH_DATA_FAILURE,
  payload,
})
