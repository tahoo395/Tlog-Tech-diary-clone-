<template>
  <input
    type="file"
    accept=".jpeg,.jpg,.png,image/jpeg,image/png"
    class="hidden"
    ref="file"
    @change="uploadCover"
  />
  <div class="flex gap-4 items-center">
    <button
      class="button bg-green-100 hover:bg-green-300"
      @click="$refs.file.click()"
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M4.75 16L7.49619 12.5067C8.2749 11.5161 9.76453 11.4837 10.5856 12.4395L13 15.25M10.915 12.823C11.9522 11.5037 13.3973 9.63455 13.4914 9.51294C13.4947 9.50859 13.4979 9.50448 13.5013 9.50017C14.2815 8.51598 15.7663 8.48581 16.5856 9.43947L19 12.25M6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25Z"
        ></path>
      </svg>
      <p>Cover Pic</p>
    </button>
    {{ coverName }}
  </div>
</template>


<script>
import api from "../../api";
export default {
  data() {
    return {
      coverName: "",
    };
  },
  methods: {
    async uploadCover() {
      if (this.$refs.file.files[0]) {
        const formData = new FormData();
        formData.append("image", this.$refs.file.files[0]);
        this.coverName = "waitin.....";
        let cover = await api().post("/upload/cover", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.$emit("upload", cover.data.file.url);
        this.coverName = cover.data.file.name
      }
    },
  },
  emits: ["upload"]
};
</script>