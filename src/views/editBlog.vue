<template>
  <div
    class="wrapper min-h-screen w-full flex justify-center bg-green-50"
    v-if="!isMobile"
  >
    <div class="blog-creator min-h-full w-9/12 flex flex-col gap-10 pt-5">
      <div class="header flex justify-between">
        <button
          class="
            button
            border-yellow-200 border-solid border-2
            hover:bg-yellow-200
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          <p>Articles</p>
        </button>
        <div class="left flex gap-5">
          <button
            class="
              button
              border-purple-200 border-solid border-2
              hover:bg-purple-200
            "
            @click="showSettings = !showSettings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-1 w-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <p>Settings</p>
          </button>
          <button @click="save" class="button bg-green-300 hover:bg-green-100">
            Save
          </button>
        </div>
      </div>
      <div class="content flex flex-col gap-5">
        <coverUpload @upload="upload"></coverUpload>
        <input type="text" placeholder="Start with Title 😀" v-model="blogTitle" class="blogTitle text-3xl focus:outline-none w-full bg-transparent" />
        <editor v-if="textLoaded" :text="blog" ref="editor"></editor>
      </div>
      <settings-modal ref="settings" @close="showSettings = false" v-show="showSettings" @done="getTags"></settings-modal>
    </div>
  </div>
  <div
    class="
      w-screen
      h-screen
      flex
      justify-center
      items-center
      text-xl text-center
      bg-green-50
    "
    v-else
  >
    <p>Blog editing is not supported on mobile devices</p>
  </div>
</template>

<script>
import editor from "../components/editorRoute/editor.vue";
import settingsModal from "../components/editorRoute/settings-modal.vue";
import coverUpload from "../components/editorRoute/coverUpload.vue";
import { mapActions , mapState } from "vuex";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import api from "../api";

export default {
  data() {
    return {
      isMobile: false,
      blogTitle: "",
      showSettings: false,
      showError: false,
      tags: [],
      coverUrl: "",
      saveErr : "",
      username: this.$route.params.user,
      blogTitle: this.$route.params.blog.split("_")[0].replace("%20", " "),
      blogId: this.$route.params.blog.split("_")[1],
      blog : {},
      textLoaded : false,
    };
  },
  computed : mapState(["user"]),
  components: { editor, settingsModal , coverUpload},
  mounted() {
    this.isMobile = window.innerWidth < 650;
    window.onresize = () => {
      this.isMobile = window.innerWidth < 650;
    };
  },
  methods: {
    ...mapActions(["redirectUser" , "getBlog" , "postBlog"]),
    async save() {
      let blogText = await this.$refs.editor.save();

      if(!blogText.length){
        this.toast('danger' , 'Blog content is required')  
      }
      else if(!this.coverUrl){
        this.toast('danger' , 'Blog cover is required . People will first see it')
      }
      else if(!this.blogTitle){
        this.toast('danger' , 'Blog title is required . People will decide to click on the blog by it.')
      }
      else if(!this.tags.length){
        this.toast('danger' , 'Blog tags are required . It will rank your blogs better.')
      }
      else{
        await this.postBlog({
          blog : blogText,
          blogCover: this.coverUrl,
          blogTitle: this.blogTitle,
          tags: this.tags,
          edit: true,
          blogId : this.blogId,
        })

        this.$router.push(`/blog/${this.user.username}/${this.blogTitle}_${this.blogId}`)
      }
    },
    getTags(tags) {
      this.showSettings = false;
      this.tags = tags;
    },
    upload(url){
      this.coverUrl = url
    },
    toast(type , title , description){
      createToast({
          title: title,
          description: description
        },
        {
          timeout: 5000,
          position: 'bottom-right',
          type: type,
          transition: 'bounce',
          showIcon: true,
      })
    }
  },
  async created() {
    this.redirectUser();
    let blogData = await this.getBlog({user : this.username , blog : `${this.blogTitle}_${this.blogId}` , edit : true})
    this.blog = {time : blogData.publishTime , blocks : blogData.blog , version : "2.22.2"}
    this.toast('success' , "Cover was uploaded ! But the name wasn't saved")
    this.tags = blogData.tags
    this.$refs.settings.tags = blogData.tags
    this.coverUrl = blogData.blogCover
    this.textLoaded = true
  },
};
</script>

<style lang="scss">
.button {
  @apply flex w-32 gap-1 px-2 py-1 justify-center items-center rounded-md transition-all duration-500;
}
</style>