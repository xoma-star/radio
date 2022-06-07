export const SERVER_LOCATION = process.env.NODE_ENV === 'development' ? 'http://192.168.1.24:5000/' : process.env.REACT_APP_HOST_URL
export const TRACK_DATA_LOCATION = SERVER_LOCATION + 'tracks/'
export const TRACK_LOCATION = SERVER_LOCATION + '/audio/'
export const COVER_LOCATION = SERVER_LOCATION + '/covers/'