<template>
  <a href="http://localhost:8000/auth/google">Login with google</a>
  <a href="http://localhost:8000/auth/github">Login with github</a>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState(['user'])
}
</script>