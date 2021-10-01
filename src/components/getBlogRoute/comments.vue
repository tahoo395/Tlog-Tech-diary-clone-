<template>
   <div class="comment px-5 py-4 flex flex-col gap-4 bg-green-200 rounded-md">
    <div class="top flex justify-between">
      <div class="user flex gap-3 items-center">
        <img :src="comment.user['profilePic']" class="w-10 h-10 rounded-full" />
        <div class="left leading-5">
          <p>{{ comment.user["name"] }}</p>
          <p class="text-sm">{{ updateDateFormat(comment.publishTime) }}</p>
        </div>
      </div>
      <div
        class="functionalities flex gap-3"
        v-if="comment.user.id == user.id"
      >
        <button
          @click="editComment(commentIndex)"
          class="edit px-2 bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 h-6 rounded-sm"
        >
          {{ isEditing ? "Done" : "Edit" }}
        </button>
        <button
          @click="removeComment(commentIndex)"
          class="delete px-2 bg-red-400 hover:bg-red-500 transition-all duration-300 h-6 rounded-sm"
        >
          Delete
        </button>
      </div>
    </div>
    <div
      class="content leading-7"
      :contenteditable="isEditing"
      :class="{ editing: isEditing }"
      :ref="comment.id"
    >
      {{ this.comment.text.length >= 200 && !this.isEditing && displaySeeMore ? comment.text.substring(0, 200) : comment.text }} <span class="cursor-pointer" @click="displaySeeMore = false" v-if="comment.text.length >= 200 && !isEditing && displaySeeMore"><b>... See more</b></span>
    </div>
  </div>
  <!-- {{comment.text}} {{comment.id}} {{comment.user.id === user.id}} {{updateDateFormat(comment.publishTime)}} {{comment.user["name"]}} {{comment.user['profilePic']}} -->
</template>

<script>
import api from "../../api";
import day from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import { mapState } from "vuex";

export default {
  computed: { ...mapState(["user"]) },
  props:['comment' , 'index'],
  data() {
    return {
      loading: false,
      isEditing: false,
      displaySeeMore : true,
    };
  },
  methods: {
    async removeComment() {
      await api().delete(
        `/blogs/comment${this.$route.fullPath.replace("/blog", "")}/${
          this.comment.id
        }`
      );
      this.$emit('delete')
    },
    async editComment() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        let updatedComment = this.$refs[this.comment.id].innerText;
        this.comment.text = updatedComment;
        await api().put(
          `/blogs/comment${this.$route.fullPath.replace("/blog", "")}/${
            this.comment.id
          }`,
          { text: updatedComment }
        );
      }
    },
    updateDateFormat(date) {
      day.extend(relative);
      return day(date).fromNow();
    },
  },
  emits : ['delete'],
  created() {
    // console.log(this.comment.user.id  , !!this.user)
  }
};
</script>