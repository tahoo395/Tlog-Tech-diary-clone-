<template>
  <div class="px-5 md:px-20 lg:px-36 xl:px-56 py-10 bg-green-50 min-h-screen">
    <div v-for="blog in blogs" class="flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <div class="user flex gap-3 items-center">
          <img
            :src="blog.user.profilePic"
            class="w-8 h-8 rounded-full"
            alt=""
          />
          <p>{{ blog.user.name }}</p>
        </div>
        <div>
          <reactions
            :userId="user._id"
            :username="blog.user.username"
            :blog="blog.blogTitle + '_' + blog.blogId"
          />
        </div>
      </div>
      <div
        class="cursor-pointer"
        @click="
          $router.push(
            `/blog/${blog.user.username}/${blog.blogTitle + '_' + blog.blogId}`
          )
        "
      >
        <img :src="blog.blogCover" alt="" class="w-full rounded mb-5" />
        <div>
          <p class="text-2xl">{{ blog.blogTitle }}</p>
          <p>{{ updateDateFormat(+blog.publishTime) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import { mapState } from "vuex";
import day from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import reactions from "../components/getBlogRoute/reactions.vue";

export default {
  components: { reactions },
  computed: mapState(["user"]),
  data() {
    return {
      blogs: [],
    };
  },
  mounted() {
    this.getResults();
  },
  methods: {
    updateDateFormat(date) {
      day.extend(relative);
      return day(date).fromNow();
    },
    async getResults() {
      if (this.$route.query.q) {
        let blogs = (await api().get(`search?q=${this.$route.query.q}`)).data;
        this.blogs = blogs;
      }
    },
  },
};
</script>