<template>
  <div class="reaction flex gap-2 items-center">
    <svg
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="cursor-pointer w-5 transition-all duration-300"
      :class="{
        'stroke-1': !reacted,
        'text-gray-700': !reacted,
        'fill-current': reacted,
        'text-red-500': reacted,
      }"
      @click="react"
    >
      <path
        d="M1.79691 3.77795C2.00422 3.23198 2.30807 2.7359 2.69111 2.31804C3.07415 1.90017 3.52889 1.5687 4.02936 1.34255C4.52984 1.1164 5.06624 1 5.60795 1C6.14965 1 6.68605 1.1164 7.18653 1.34255C7.687 1.5687 8.14174 1.90017 8.52478 2.31804L9.73295 3.63604L10.9411 2.31804C11.7147 1.47412 12.7639 1.00001 13.8579 1.00001C14.952 1.00001 16.0012 1.47412 16.7748 2.31804C17.5484 3.16196 17.983 4.30656 17.983 5.50004C17.983 6.69352 17.5484 7.83812 16.7748 8.68204L9.73295 16.364L2.69111 8.68204C2.30807 8.26417 2.00422 7.7681 1.79691 7.22213C1.58961 6.67616 1.48291 6.09099 1.48291 5.50004C1.48291 4.90909 1.58961 4.32392 1.79691 3.77795Z"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="stroke-current"
      ></path>
    </svg>
    {{ reactions }}
  </div>
</template>

<script>
import api from "../../api";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  props: ["userId", "username", "blog"],
  data() {
    return {
      reacted: false,
      reactions: 0,
    };
  },
  methods: {
    async react() {
      if (this.userId) {
        this.reacted = !this.reacted;
        this.reactions += this.reacted ? 1 : -1;
        if (this.reacted) {
          await api().post(
            `/blogs/reactions/${this.username}/${this.blog}/inc`
          );
        } else {
          await api().post(
            `/blogs/reactions/${this.username}/${this.blog}/dec`
          );
        }
      }
      else{
        this.toast('danger' , 'You must be signed up to react')
      }
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
  async mounted() {
    let reactions = (
      await api().get(`/blogs/reactions/${this.username}/${this.blog}`)
    ).data;
    this.reactions = reactions.length;
    this.reacted = reactions.includes(this.userId);
  },
};
</script>