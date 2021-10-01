<template>
  <div class="fixed w-screen">
    <nav
      class="
        flex
        justify-between
        bg-gray-800
        px-10
        py-2
        h-12
        items-center
        text-green-50 text-2xl
        relative
      "
    >
      <router-link to="/">Tlog</router-link>
      <div
        class="
          relative
          hidden
          text-base
          w-full
          h-full
          mx-5
          md:block
          lg:mx-10
          md:w-6/12
        "
      >
        <input
          type="text"
          placeholder="Search something !"
          class="
            w-full
            h-full
            px-3
            text-gray-300
            bg-gray-600
            rounded-lg
            focus:outline-none
          "
          v-model="searchText"
          @keypress.enter="search"
        />
        <svg
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          @click="search"
          class="
            absolute
            top-0
            right-0
            mt-2
            mr-2
            text-gray-500
            fill-current
            dark:text-gray-400
          "
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="md:hidden cursor-pointer" @click="showSearch = !showSearch;search()">
        <svg
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="text-gray-500 fill-current dark:text-gray-400 w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search something !"
        class="
          w-full
          h-full
          px-3
          text-gray-300
          bg-gray-600
          rounded-b-lg
          focus:outline-none
          absolute
          left-1/2
          text-base
          mt-3
          transform
          -translate-x-1/2
          transition-all
          duration-300
        "
        v-if="isMobile"
        v-model="searchText"
        :class="{
          'translate-y-10': showSearch,
          '-translate-y-14': !showSearch,
        }"
      />
      <div class="md:hidden cursor-pointer" v-if="user">
        <a href="https://za011b128-z699745d2-gtw.qovery.io/auth/logout">
          <svg
            class="text-gray-500 fill-current dark:text-gray-400 w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
            style="enable-background: new 0 0 330 330"
            xml:space="preserve"
          >
            <path
              d="M51.213 180h173.785c8.284 0 15-6.716 15-15s-6.716-15-15-15H51.213l19.394-19.393c5.858-5.857 5.858-15.355 0-21.213-5.856-5.858-15.354-5.858-21.213 0L4.397 154.391c-.348.347-.676.71-.988 1.09-.076.093-.141.193-.215.288-.229.291-.454.583-.66.891-.06.09-.109.185-.168.276-.206.322-.408.647-.59.986-.035.067-.064.138-.099.205-.189.367-.371.739-.53 1.123-.02.047-.034.097-.053.145-.163.404-.314.813-.442 1.234-.017.053-.026.108-.041.162-.121.413-.232.83-.317 1.257-.025.127-.036.258-.059.386-.062.354-.124.708-.159 1.069a14.612 14.612 0 0 0 0 2.995c.035.366.099.723.16 1.08.022.124.033.251.058.374.086.431.196.852.318 1.269.015.049.024.101.039.15.129.423.28.836.445 1.244.018.044.031.091.05.135.16.387.343.761.534 1.13.033.065.061.133.095.198.184.341.387.669.596.994.056.088.104.181.162.267.207.309.434.603.662.895.073.094.138.193.213.285.313.379.641.743.988 1.09l44.997 44.997C52.322 223.536 56.161 225 60 225s7.678-1.464 10.606-4.394c5.858-5.858 5.858-15.355 0-21.213L51.213 180z"
            />
            <path
              d="M207.299 42.299c-40.944 0-79.038 20.312-101.903 54.333-4.62 6.875-2.792 16.195 4.083 20.816 6.876 4.62 16.195 2.794 20.817-4.083 17.281-25.715 46.067-41.067 77.003-41.067C258.414 72.299 300 113.884 300 165s-41.586 92.701-92.701 92.701c-30.845 0-59.584-15.283-76.878-40.881-4.639-6.865-13.961-8.669-20.827-4.032-6.864 4.638-8.67 13.962-4.032 20.826 22.881 33.868 60.913 54.087 101.737 54.087C274.956 287.701 330 232.658 330 165S274.956 42.299 207.299 42.299z"
            />
          </svg>
        </a>
      </div>
      <div class="navUser" v-if="user">
        <div class="flex gap-3 items-center text-base">
          <img :src="user.profilePic" class="w-8 h-8 rounded-full" alt="" />
          <p class="hidden md:block">{{ user.name }}</p>
        </div>
        <a
          href="https://za011b128-z699745d2-gtw.qovery.io/auth/logout"
          class="
            logout
            hidden
            md:flex
            transition-all
            duration-300
            cursor-pointer
            gap-2
            items-center
            bg-green-100
            text-gray-800
            rounded
            absolute
            px-5
            mt-3
            opacity-0
          "
        >
          <img
            class="w-4 h-4"
            src="https://img.icons8.com/ios/50/000000/logout-rounded--v1.png"
          />
          <p class="text-lg">Logout</p>
        </a>
      </div>
      <div class="flex gap-5" v-else>
        <a href="https://za011b128-z699745d2-gtw.qovery.io/auth/google"
          ><svg
            width="20"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="
              transition-all
              duration-300
              cursor-pointer
              ter
              text-white
              fill-current
            "
          >
            <title>Google icon</title>
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            ></path></svg
        ></a>
        <a href="https://za011b128-z699745d2-gtw.qovery.io/auth/github"
          ><svg
            width="20"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="
              transition-all
              duration-300
              cursor-pointer
              ter
              text-white
              fill-current
            "
          >
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            ></path></svg
        ></a>
      </div>
    </nav>
  </div>
  <router-view class="pt-20"></router-view>
</template>


<script>

import { mapState  } from "vuex";
export default {
  computed: mapState(["user"]),
  data() {
    return {
      showSearch:false,
      searchText : '',
      isMobile : false,
    }
  },
  methods:{
    search(){
      if(this.searchText){
        location.assign(`/search?q=${this.searchText}`)
      }
    }
  },
  mounted() {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener("resize",() => {
      this.isMobile = window.innerWidth < 768;
    })
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}
</style>