export const SERVER_LOCATION = process.env.NODE_ENV === 'development' ? 'https://xoma-star.space/' : process.env.REACT_APP_HOST_URL
export const TRACK_DATA_LOCATION = SERVER_LOCATION + 'tracks/'
export const USER_DATA_LOCATION = SERVER_LOCATION + 'users/'