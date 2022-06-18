<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import MainFooter from '@/layout/MainFooter';
export default {
  name: 'logout-page',
  bodyClass: 'logout-page',
  components: {
    MainFooter
  },
  beforeCreate() {
    if (this.$cookies.get('jwt') == null || this.$cookies.get('jwt') == undefined) {
      alert("alread logouted!");
      this.$router.push("/");
      this.$router.go();
    } else {
      this.$http.post('/api/user/logout', {})
      .then(_ => {
        this.$router.push("/");
        this.$router.go();
      })
    }
  },
  data() {
    return {}
  }
};
</script>
<style></style>
