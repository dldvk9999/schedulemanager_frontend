<template>
  <div
    class="section section-signup"
    style="background-image: url('img/bg11.jpg'); background-size: cover; background-position: top center; min-height: 700px;"
  >
    <div class="container">
      <div class="row">
        <card class="card-signup" header-classes="text-center" color="orange">
          <template slot="header">
            <h3 class="card-title title-up">Sign Up</h3>
            <!--div class="social-line">
              <a
                href="#pablo"
                class="btn btn-neutral btn-facebook btn-icon btn-round"
              >
                <i class="fab fa-facebook-square"></i>
              </a>
              <a
                href="#pablo"
                class="btn btn-neutral btn-twitter btn-icon btn-lg btn-round"
              >
                <i class="fab fa-twitter"></i>
              </a>
              <a
                href="#pablo"
                class="btn btn-neutral btn-google btn-icon btn-round"
              >
                <i class="fab fa-google-plus"></i>
              </a>
            </div-->
          </template>
          <template>
            <form v-on:submit="onSignup">
              <fg-input
                class="no-border"
                placeholder="Email"
                addon-left-icon="now-ui-icons ui-1_email-85"
                v-model="email"
                type="email"
              >
              </fg-input>

              <fg-input
                class="no-border"
                placeholder="Password"
                addon-left-icon="now-ui-icons ui-1_lock-circle-open"
                v-model="password1"
                type="password"
              >
              </fg-input>

              <fg-input
                class="no-border"
                placeholder="Password Again"
                addon-left-icon="now-ui-icons ui-1_lock-circle-open"
                v-model="password2"
                type="password"
              >
              </fg-input>

              <fg-input
                class="no-border"
                placeholder="Name"
                addon-left-icon="now-ui-icons users_circle-08"
                v-model="name"
                type="text"
              >
              </fg-input>

              <fg-input
                class="no-border"
                placeholder="Department Name"
                addon-left-icon="now-ui-icons business_badge"
                v-model="deptname"
                type="text"
              >
              </fg-input>

              <VueSlideToggle :open="inputAdd" tag="section" :duration="500">
                <fg-input
                  class="no-border"
                  placeholder="Job"
                  addon-left-icon="now-ui-icons text_caps-small"
                  v-model="job"
                  type="text"
                >
                </fg-input>

                <fg-input
                  class="no-border"
                  placeholder="Favorite"
                  addon-left-icon="now-ui-icons text_caps-small"
                  v-model="tag"
                  type="text"
                >
                </fg-input>

                <fg-input
                  class="no-border"
                  placeholder="Description"
                  addon-left-icon="now-ui-icons text_caps-small"
                  v-model="description"
                  type="text"
                >
                </fg-input>
              </VueSlideToggle>

              <div class="expand">
                <v-btn 
                  @click="inputAdd = !inputAdd"
                  class="expand-btn">
                  <v-icon class="toggleUpDown" :class='{ "rotate": inputAdd }' large>
                    expand_more
                  </v-icon>
                </v-btn>
              </div>

              <div class="card-footer text-center" style="margin-top: 0">
                <button
                  class="btn btn-neutral btn-round btn-lg btn-block start"
                  >Get Started</button>
              </div>
            </form>
          </template>
        </card>
      </div>
      <div class="col text-center">
        <router-link
          to="/login"
          class="btn btn-simple btn-round btn-white btn-lg"
        >
          View Login Page
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, FormGroupInput, Button } from '@/components';
import { VueSlideToggle } from 'vue-slide-toggle'

export default {
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    VueSlideToggle
  },
  data: () => ({
    email: '',
    password1: '',
    password2: '',
    usertype: 1,
    name: '',
    deptname: '',
    job: '',
    tag: '',
    description: '',
    inputAdd: false
  }),
  methods: {
    onSignup(e){
      e.preventDefault();

      if(!this.email || !this.password1 || !this.password2 || !this.name || !this.deptname) {
        alert("이메일, 비밀번호, 이름, 부서명은 필수 기재사항 입니다");
        return;
      } else if (this.password1 != this.password2) {
        alert("비밀번호가 일치하지 않습니다!");
        return;
      }

      this.$http.post('/api/user', { 
          email: this.email,
          password1: this.password1,
          password2: this.password2,
          usertype: this.usertype,
          name: this.name,
          deptname: this.deptname,
          job: this.job,
          tag: this.tag,
          description: this.description
        })
        .then((_) => {
          alert("회원가입 완료!");
          this.$router.push("/login");
        })
        .catch((err) => {
          if (this.$cookies.isKey("jwt")) {
            alert(err.response.data.message);
          }
        })
    },
  }
};
</script>
<style>
.start {
  color: black !important;
}
.start:hover {
  color: #f96332 !important;
}
.expand-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  color: white !important;
}
.expand {
  display: flex;
  justify-content: center;
}
.toggleUpDown {
    transition: transform .3s ease-in-out !important;  
}
.toggleUpDown.rotate {
    transform: rotate(180deg);
}
</style>
