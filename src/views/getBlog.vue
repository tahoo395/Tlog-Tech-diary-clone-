<template>
  <div
    class="
      flex flex-col
      gap-10
      px-5
      md:px-20
      lg:px-36
      xl:px-56
      py-10
      bg-green-50
      min-h-screen
    "
  >
    <Header
      v-if="blogData.user"
      :cover="blogData.blogCover"
      :blogTitle="blogTitle"
      :publishTime="blogData.publishTime"
      :blogUser="blogData.user"
    ></Header>
    <div
      class="blog_content reset flex flex-col gap-5 text-lg leading-10"
      v-html="blogData.html"
    ></div>
    <commentBox></commentBox>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "../components/getBlogRoute/header.vue";
import commentBox from "../components/getBlogRoute/commentBox.vue";

export default {
  components: { Header, commentBox },
  data() {
    return {
      user: this.$route.params.user,
      blogTitle: this.$route.params.blog.split("_")[0].replace("%20", " "),
      blogId: this.$route.params.blog.split("_")[1],
      blogData: {},
    };
  },
  methods: { ...mapActions(["getBlog"]) },
  async created() {
    this.blogData = await this.getBlog({user : this.user, blog : `${this.blogTitle}_${this.blogId}`});
  },
};
</script>

<style lang="scss">
@import "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/base16/ashes.min.css";

* {
  &::selection {
    background-color: #c2fdffc5;
  }
}
</style>