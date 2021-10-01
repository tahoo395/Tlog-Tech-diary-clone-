<template>
  <div class="blog_header flex flex-col gap-3 text-base">
    <img :src="cover" class="cover rounded-md" width="1200" />
    <h2 class="text-3xl font-bold">{{ blogTitle }}</h2>
    <p>{{ publishTimeHMS }}</p>
    <div class="flex justify-between pr-3">
      <div class="user flex gap-2 items-center">
        <img :src="blogUser.profilePic" class="w-10 h-10 rounded-full" />
        <p class="text-lg">{{ blogUser.username }}</p>
      </div>
      <reactions :userId="user._id" :username="$route.params.user" :blog="$route.params.blog"/>
    </div>
  </div>
</template>

<script>
import day from "dayjs";
import { mapState } from "vuex";
import reactions from "./reactions.vue"

export default {
  components : {reactions},
  props: ["cover", "blogTitle", "publishTime", "blogUser"],
  computed: {
    ...mapState(["user"]),
    publishTimeHMS() {
      return day(+this.publishTime).format("dddd, DD MMM YYYY, hh:mm a");
    },
  },
};
</script>
