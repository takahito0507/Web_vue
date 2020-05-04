import { mapGetters, mapActions } from 'vuex'
import { 
  GET_CHANNELS,
  // SET_MESSAGE
 } from '../../store/mutation-types'


export default {
  name: 'chat',
  mounted(){
    this.GET_CHANNELS()
    this.GET_MESSAGES(this.$route.params.cname)
  },

  computed: {
    ...mapGetters([
      'messages',
      'channels'
    ]),
  },

  methods:{
    ...mapActions([
      // SET_MESSAGE,
      GET_CHANNELS,
      // GET_MESSAGEとPOST_MESSAGEをマッピングする
      "GET_MESSAGES",
      "POST_MESSAGES"
    ]),

    send_message(){
      // this.SET_MESSAGE(this.messages) 
      // this.messages.push(this.message) -> this.SET_MESSAGE(this.message)
      this.POST_MESSAGES({"canme": this.$route.params.cname, "message": this.message})
      this.message = ""
    }
  },
  data() {
    return {
      message: ""
    }
  }
}