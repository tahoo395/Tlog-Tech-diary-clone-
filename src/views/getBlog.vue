<template>
  <div class="blog_content grid py-7 gap-5 bg-green-50">
      <img :src="blogData.blogCover" alt="" class="cover rounded-md object-cover object-left" width="1200">
      <h2 class="text-4xl font-bold">{{blogTitle}}</h2>
      <p>{{unixToTime(blogData.publishTime)}}</p>
      <section class="reset flex flex-col gap-7 text-lg" v-html="blogData.blog"></section>
  </div>
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
        username : this.$route.params.user,
        blogTitle : this.$route.params.blog.split('_')[0].replace('%20' , ' '),
        blogId : this.$route.params.blog.split('_')[1],
        blogData : {},
    };
  },
  async created() {
      let blogData = await api().get(`/blogs/blog/${this.username}/${this.blogTitle}_${this.blogId}`);
      this.blogData = blogData.data
  },
  methods: {
      unixToTime(unix){
          return (new Date(+unix)).toLocaleString('en' , { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour : 'numeric' , minute : 'numeric' ,  second : 'numeric'})
      }
  }
};
</script>

<style lang="scss">
*{
    &::selection{
        background-color : #c2fdffc5;
    }
}
.blog_content{
    grid-template-columns: 1fr 4fr 1fr;
    *{
        grid-column: 2/3;
    }
}
</style>