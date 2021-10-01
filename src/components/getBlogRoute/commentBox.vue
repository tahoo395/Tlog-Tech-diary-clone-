<template>
  <div class="makeComment flex flex-col gap-5" v-if="user">
    <textarea
      v-model="existingComment"
      placeholder="Write a comment"
      class="focus:outline-none p-3 resize-none h-40 bg-gray-200 rounded-md"
    ></textarea>
    <button @click="saveComment" class="py-1 bg-green-300 hover:bg-green-500 transition-all duration-300 rounded-sm w-20">
      Submit
    </button>
  </div>
  <div class="comments flex flex-col gap-8">
    <comments
      v-for="(comment, commentIndex) in comments"
      :key="comment.id"
      :comment="comment"
      :index="commentIndex"
      @delete="comments.splice(commentIndex, 1)"
    ></comments>
    <loader :loading="loading" />
  </div>
</template>

<script>
import loader from "../loader.vue";
import comments from "./comments.vue";
import api from "../../api";
import { mapState } from "vuex";

export default {
  components: { comments , loader },
  computed: mapState(["user"]),
  data() {
    return {
      existingComment: "",
      commentsInThisSession: [],
      comments: [],
      pageNo: 1,
      loading: false,
    };
  },
  methods: {
    async saveComment() {
      if (this.existingComment) {
        let comment = await api().post(
          `/blogs/comment${this.$route.fullPath.replace("/blog", "")}`,
          { text: this.existingComment }
        )
        this.comments.unshift(comment.data)
        this.existingComment = "";
      }
    },
    async getComments() {
      this.loading = true;
      let comments = await api().get(
        `/blogs/comment${this.$route.fullPath.replace("/blog", "")}/${
          this.pageNo
        }`
      );
      if (comments) {
        this.comments.push(...comments.data);
      }
      this.loading = false;
    },
    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (
        clientHeight + scrollTop >= scrollHeight - 5 &&
        this.pageNo * 4 == this.comments.length
      ) {
        this.pageNo++;
        this.getComments();
      }
    },
  },
  mounted() {
    this.getComments();
    window.addEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="scss">
.editing {
  @apply focus:outline-none border-2 border-green-400 px-2;
}
</style>