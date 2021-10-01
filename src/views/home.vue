<template>
  <div
    class="
      flex flex-col
      gap-20
      px-5
      md:px-20
      lg:px-36
      xl:px-56
      py-10
      bg-green-50
      min-h-screen
    "
  >
    <div class="flex flex-col gap-3" v-if="user && !isMobile">
      <div class="user flex gap-3 items-center">
        <img :src="user.profilePic" class="w-8 h-8 rounded-full" />
        {{ user.name }}
      </div>
      <div
        class="
          makeBlog
          bg-gray-100
          border
          rounded-md
          flex
          gap-1
          items-center
          px-7
          py-4
          text-xl text-gray-800
          cursor-pointer
          transition-all
          duration-300
          hover:bg-gray-50
        "
        @click="$router.push('/blog/create')"
      >
        <svg
          viewBox="0 0 512 512"
          class="
            w-6
            h-6
            mr-4
            text-gray-700
            opacity-75
            fill-current
            dark:text-gray-300
          "
        >
          <path
            d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"
          ></path>
        </svg>
        Create a blog 🤑
      </div>
    </div>

    <div v-for="(blog , blogIndex) in blogs" class="flex flex-col gap-5">
      <div class="flex justify-between items-center">
        <div class="user flex gap-3 items-center">
          <img
            :src="blog.user.profilePic"
            class="w-8 h-8 rounded-full"
            alt=""
          />
          <p>{{ blog.user.name }}</p>
        </div>
        <div class="flex gap-5 items-center">
          <div class="flex gap-2 items-center" v-if="blog.user._id == user._id">
            <img
              class="w-5 h-5 cursor-pointer"
              @click="
                $router.push(
                  `/blog/edit/${blog.user.username}/${
                    blog.blogTitle + '_' + blog.blogId
                  }`
                )
              "
              src="https://img.icons8.com/material-outlined/24/000000/edit--v4.png"
            />
            <img
              class="w-6 h-6 cursor-pointer"
              src="https://img.icons8.com/color-glass/48/000000/delete-sign.png"
              @click="deleteBlog({user : blog.user.username , blog : blog.blogTitle + '_' + blog.blogId , index : blogIndex})"
            />
          </div>
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
    <loader :loading="loading" />
  </div>
</template>

<script>
import { mapState , mapActions } from "vuex";
import day from "dayjs";
import relative from "dayjs/plugin/relativeTime";
import reactions from "../components/getBlogRoute/reactions.vue";
import loader from "../components/loader.vue";

export default {
  components: { reactions, loader },
  computed: mapState(["user" , 'blogs' , 'loading']),
  data() {
    return {
      isMobile: false,
      pageNo: 1,
    };
  },
  methods: {
    ...mapActions(['getBlogs' , 'deleteBlog']),
    
    handleScroll() {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (
        clientHeight + scrollTop >= scrollHeight - 5 &&
        this.pageNo * 4 == this.blogs.length
      ) {
        this.pageNo++;
        this.getBlogs(this.pageNo);
      }
    },
    updateDateFormat(date) {
      day.extend(relative);
      return day(date).fromNow();
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 650;
    window.onresize = () => {
      this.isMobile = window.innerWidth < 650;
    };
    if(!this.blogs.length){
      this.getBlogs(this.pageNo);
      window.addEventListener("scroll", this.handleScroll);
    }
  },
};
</script>

<style lang="scss">
.navUser:hover{
  .logout{
    opacity: 100%;
  }
}
.mdSearch{
  transform: translateX(-50%);
}
</style>