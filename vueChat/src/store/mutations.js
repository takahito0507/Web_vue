import { 
  SET_MESSAGE,
  GET_CHANNELS
} from './mutation-types'

export default {
  [SET_MESSAGE](state, message) {
    state.message.push(message)
  },
  [GET_CHANNELS](state, channels) {
    state.channels = channels
  }
}