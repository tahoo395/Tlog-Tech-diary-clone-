<template>
  <div
    class="
      absolute
      bg-purple-400
      h-auto
      w-80
      rounded-2xl
      right-5
      top-20
      opacity-90
      flex flex-col
      justify-center
      items-center
      gap-3
      py-7
      px-3
      z-50
    "
  >
    <button
      @click="$emit('close')"
      class="
        close
        absolute
        top-2
        right-3
        px-2
        py-1
        bg-red-600
        opacity-70
        rounded-md
      "
    >
      X
    </button>
    <label class="text-xl">Tags</label>

    <div
      class="
        tags
        w-full
        flex
        gap-1
        px-2
        py-1
        border-2 border-purple-900
        rounded-lg
        flex-wrap
      "
    >
      <div
        class="px-3 py-1 bg-gray-200 rounded-sm"
        v-for="(tag, tagIndex) in tags"
      >
        {{ tag }}
        <button @click="removeTagByclick(tagIndex)" class="text-red-500">x</button>
      </div>
      <input
        type="text"
        @paste="addTagByPastedText"
        @keydown.enter="addTag"
        @keydown.space="addTag"
        @keydown.,="addTag"
        @keydown.delete="removeTag($event, tags.length - 1)"
        ref="tagInput"
        class="bg-transparent placeholder-black focus:outline-none"
        placeholder="Enter a tag"
      />
    </div>

    <button
      @click="
        addTag($event);
        $emit('done', tags);
      "
      class="button bg-green-300"
    >
      Done
    </button>
  </div>
</template>

<script>
import imageUpload from "./coverUpload.vue";

export default {
  data() {
    return {
      tags: [],
    };
  },
  components: { imageUpload },
  methods: {
    addTag(event) {
      event.preventDefault();
      let tag = this.$refs.tagInput.value.trim();
      if (tag.length > 0 && !this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.$refs.tagInput.value = "";
    },
    addTagByPastedText(event) {
      event.preventDefault();
      let pastedText = event.clipboardData.getData("Text");
      pastedText.split(",").forEach((text) => {
        this.tags.push(text.trim().replace(" ", "-"));
      });
    },
    removeTagByclick(tagIndex) {
      this.tags.splice(tagIndex, 1);
    },
    removeTag(event, tagIndex) {
      if (!event.target.value) {
        this.tags.splice(tagIndex, 1);
      }
    },
  },
};
</script>