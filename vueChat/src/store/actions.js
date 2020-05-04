import {
  SET_MESSAGE,
  GET_CHANNELS
} from './mutation-types'

// メッセージ用APIパスを取得する関数
const get_message_path = cname => 'https://us-central1-demoapp-1779c.cloudfunctions.net/v1/channels' + cname + '/messages'

// メッセージ用API fetch関数
async function fetch_get_messages(cname) {
  const response = await fetch(get_message_path(cname))
  const json = await response.json()
  return json.messages
}

export default {
  // [SET_MESSAGE] ({commit}, message) {
  //   commit(SET_MESSAGE, message)
  // },
  [GET_CHANNELS]({ commit }) {
    // async/awaitに書き換え
    // fetch('https://us-central1-demoapp-1779c.cloudfunctions.net/v1/channels').then((response)=>{
    //   return response.json()
    // }).then((json)=> {
    //   commit(GET_CHANNELS, json.channels)
    // })
    async function fetch_api() {
      const response = await fetch('https://us-central1-demoapp-1779c.cloudfunctions.net/v1/channels')
      const json = await response.json()
      commit(GET_CHANNELS, json.channels)
    }
    fetch_api()
  },

  // サーバーのメッセージを取得 
  async GET_MESSAGES({ commit }, cname) {
    const messages = await fetch_get_messages(cname)
    // サーバーから取得したメッセージをコミットします
    commit(SET_MESSAGE, messages)
  },
  // サーバーにメッセージを送信します
  async POST_MESSAGES({ commit }, { cname, message }) {
    const response = await fetch(get_message_path(cname), {
      method: 'POST',
      body: JSON.stringify({
        'body': message
      }),
      headers: {
        'Accept': 'application/json',
        'Contents-Type': 'application/json'
      }
    })
    // POSTしたRESPONSEを受け取ります
    const json = await response.json()
    // POSTがOKならサーバーのメッセージを取得し、コミットします
    if (json.result === 'ok') {
      const messages = await fetch_get_messages(cname)
      commit(SET_MESSAGE, messages)
    }
  }
}
