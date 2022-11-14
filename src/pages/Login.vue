<template>
    <div class="page-header clear-filter" filter-color="orange">
        <div
            class="page-header-image"
            style="background-image: url('img/login.jpg')"
        ></div>
        <div class="content" style="margin-top: 8rem">
            <div class="container">
                <div class="col-md-5 ml-auto mr-auto">
                    <card type="login" plain>
                        <div slot="header" class="logo-container">
                            <img v-lazy="'img/now-logo.png'" alt="" />
                        </div>

                        <form v-on:submit="onSubmitForm">
                            <fg-input
                                id="email"
                                class="no-border input-lg"
                                addon-left-icon="now-ui-icons users_circle-08"
                                placeholder="Email"
                                v-model="email"
                                type="email"
                            >
                            </fg-input>

                            <fg-input
                                class="no-border input-lg"
                                addon-left-icon="now-ui-icons text_caps-small"
                                placeholder="Password"
                                v-model="password"
                                type="password"
                            >
                            </fg-input>

                            <div class="card-footer text-center">
                                <button
                                    class="btn btn-primary btn-round btn-lg btn-block"
                                >
                                    Get Started
                                </button>
                            </div>
                        </form>

                        <template slot="raw-content">
                            <div class="pull-left">
                                <h6>
                                    <a href="/#/signup" class="link footer-link"
                                        >Create Account</a
                                    >
                                </h6>
                            </div>
                            <div class="pull-right">
                                <h6>
                                    <a class="link footer-link">Need Help?</a>
                                </h6>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
        <main-footer></main-footer>
    </div>
</template>
<script>
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
export default {
    name: "login-page",
    bodyClass: "login-page",
    components: {
        Card,
        MainFooter,
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput,
    },
    methods: {
        onSubmitForm(e) {
            e.preventDefault();

            if (!this.email || !this.password) {
                alert("이메일 혹은 비밀번호를 입력해주세요");
                return;
            }

            this.$http
                .post("http://127.0.0.1:8080/api/user/login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    if (response.data.message) {
                        alert(response.data.message);
                        this.email = "";
                        this.password = "";
                        document.getElementById("email").focus();
                    } else {
                        this.$router.push("/");
                        this.$router.go();
                    }
                })
                .catch((err) => {
                    if (this.$cookies.isKey("jwt")) {
                        alert(err.response.data.message);
                    }
                });
        },
    },
    data() {
        return {
            email: "",
            password: "",
        };
    },
};
</script>
<style></style>
