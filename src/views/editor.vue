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
        <imageUpload @upload="upload"></imageUpload>
        <input type="text" placeholder="Start with Title 😀" v-model="blogTitle" class="blogTitle text-3xl focus:outline-none w-full bg-transparent" />
        <editor ref="editor"></editor>
      </div>
      <settings-modal @close="showSettings = false" v-show="showSettings" @done="getTags"></settings-modal>
      <warning v-if="showError">{{saveErr}}</warning>
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
import warning from "../components/editorRoute/warning.vue";
import imageUpload from "../components/editorRoute/imageUpload.vue";
import { mapActions } from "vuex";
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
      saveErr : ""
    };
  },
  components: { editor, settingsModal, warning , imageUpload},
  mounted() {
    this.isMobile = window.innerWidth < 650;
    window.onresize = () => {
      this.isMobile = window.innerWidth < 650;
    };
  },
  methods: {
    ...mapActions(["redirectUser"]),
    async save() {
      let blog = await this.$refs.editor.save();

      let blogErr = await api().post("/blogs/newBlog", {
        blog,
        blogCover: this.coverUrl,
        blogTitle: this.blogTitle,
        tags: this.tags,
      });
      if(blogErr.data){
        this.saveErr = blogErr.data
        this.showError = true
        setTimeout(()=>{
            this.showError = false;
        } , 5000)
      }
    },
    getTags(tags) {
      this.showSettings = false;
      this.tags = tags;
    },
    upload(url){
      this.coverUrl = url
    }
  },
  created() {
    this.redirectUser();
  },
};
</script>

<style lang="scss">
.button {
  @apply flex w-32 gap-1 px-2 py-1 justify-center items-center rounded-md transition-all duration-500;
}
</style>