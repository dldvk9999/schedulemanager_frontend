<template>
  <navbar
    type="primary"
    menu-classes="ml-auto"
  >
    <template>
      <router-link v-popover:popover1 class="navbar-brand" to="/">
        Schedule Manager
      </router-link>
    </template>
    <template slot="navbar-menu">
      <!--li class="nav-item">
        <a
          class="nav-link"
          href="https://www.creative-tim.com/product/vue-now-ui-kit"
          target="_blank"
        >
          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
          <p>Download</p>
        </a>
      </li-->
      <drop-down
        tag="li"
        title="Components"
        icon="now-ui-icons design_app"
        class="nav-item"
      >
        <nav-link to="/">
          <i class="now-ui-icons business_chart-pie-36"></i> All components
        </nav-link>
        <nav-link to="/calendar">
          <i class="now-ui-icons design_bullet-list-67"></i> Calandar
        </nav-link>
      </drop-down>
      <drop-down
              tag="li"
              title="Examples"
              icon="now-ui-icons design_image"
              class="nav-item"
      >
        <nav-link to="/landing">
          <i class="now-ui-icons education_paper"></i> Landing
        </nav-link>
        <nav-link to="/logout" v-if="get_login()">
          <i class="now-ui-icons users_circle-08"></i> Logout
        </nav-link>
        <nav-link to="/login" v-else>
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/profile">
          <i class="now-ui-icons users_single-02"></i> Profile
        </nav-link>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover
  },
  methods: {
    get_login() {
      return this.$cookies.isKey("jwt");
    },
    login_check() {
      let token = this.$cookies.get('jwt');
      if (!token) return 0;

      this.$http.post('/api/user/login_check', {
        jwt: token
      })
      .then(res => {
        if (res.data.status) {
          return 1;
        } else {
          if (res.data.print) {
            alert(res.data.data);
          }
          return 0;
        }
      })
    }
  }
};
</script>

<style scoped></style>
