<template>
    <div>
        <div class="page-header clear-filter" filter-color="orange">
            <parallax
                class="page-header-image"
                style="background-image: url('img/bg5.jpg')"
            >
            </parallax>
            <div class="container">
                <div class="photo-container">
                    <img src="img/ryan.jpg" alt="" />
                </div>
                <h3 class="title">{{ name }}</h3>
                <p class="category">{{ job }}</p>
                <p class="category">{{ email }}</p>
                <p class="category">{{ deptname }}</p>
                <p class="category">{{ tag }}</p>
                <div class="content">
                    <div class="social-description">
                        <h2>26</h2>
                        <p>Comments</p>
                    </div>
                    <div class="social-description">
                        <h2>26</h2>
                        <p>Comments</p>
                    </div>
                    <div class="social-description">
                        <h2>48</h2>
                        <p>Bookmarks</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="container">
                <div class="button-container">
                    <v-btn
                        class="btn btn-primary btn-round btn-lg"
                        @click="userDelete"
                    >
                        Account Delete
                    </v-btn>
                </div>
                <h3 class="title">About me</h3>
                <h5 class="description">
                    An artist of considerable range, Ryan — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                </h5>
                <div class="row">
                    <div class="col-md-6 ml-auto mr-auto">
                        <h4 class="title text-center">My Portfolio</h4>
                    </div>
                    <tabs
                        pills
                        class="nav-align-center"
                        tab-content-classes="gallery"
                        tab-nav-classes="nav-pills-just-icons"
                        type="primary"
                    >
                        <tab-pane title="Profile">
                            <i
                                slot="label"
                                class="now-ui-icons design_image"
                            ></i>

                            <div class="col-md-10 ml-auto mr-auto">
                                <div class="row collections">
                                    <div class="col-md-6">
                                        <img
                                            src="img/bg6.jpg"
                                            class="img-raised"
                                        />
                                        <img
                                            src="img/bg11.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <img
                                            src="img/bg7.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                        <img
                                            src="img/bg8.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                    </div>
                                </div>
                            </div>
                        </tab-pane>

                        <tab-pane title="Home">
                            <i
                                slot="label"
                                class="now-ui-icons location_world"
                            ></i>

                            <div class="col-md-10 ml-auto mr-auto">
                                <div class="row collections">
                                    <div class="col-md-6">
                                        <img
                                            src="img/bg1.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                        <img
                                            src="img/bg3.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <img
                                            src="img/bg8.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                        <img
                                            src="img/bg7.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                    </div>
                                </div>
                            </div>
                        </tab-pane>

                        <tab-pane title="Messages">
                            <i
                                slot="label"
                                class="now-ui-icons sport_user-run"
                            ></i>

                            <div class="col-md-10 ml-auto mr-auto">
                                <div class="row collections">
                                    <div class="col-md-6">
                                        <img
                                            src="img/bg3.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                        <img
                                            src="img/bg8.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <img
                                            src="img/bg7.jpg"
                                            alt=""
                                            class="img-raised"
                                        />
                                        <img
                                            src="img/bg6.jpg"
                                            class="img-raised"
                                        />
                                    </div>
                                </div>
                            </div>
                        </tab-pane>
                    </tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Tabs, TabPane } from "@/components";

export default {
    name: "profile",
    bodyClass: "profile-page",
    components: {
        Tabs,
        TabPane,
    },
    beforeCreate() {
        let token = this.$cookies.get("jwt");
        if (!token) {
            alert("로그인 먼저 해주세요.");
            this.$router.push("/login");
            return;
        }

        this.$http
            .post("http://127.0.0.1:8080/api/user/login_check", {
                jwt: token,
            })
            .then((res) => {
                if (!res.data.status) {
                    alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
                    this.$router.push("/login");
                    return;
                }
            })
            .catch((err) => {
                if (this.$cookies.isKey("jwt")) {
                    alert(err.response.data.message);
                }
            });
    },
    created() {
        this.userInfo();
    },
    data: () => ({
        email: null,
        name: null,
        deptname: null,
        job: null,
        tag: null,
        usertype: null,
    }),
    methods: {
        userInfo() {
            this.$http
                .post("http://127.0.0.1:8080/api/user/find/", {
                    jwt: this.$cookies.get("jwt"),
                })
                .then((res) => {
                    (this.email = res.data.email),
                        (this.name = res.data.name),
                        (this.deptname = res.data.deptname),
                        (this.job = res.data.job),
                        (this.tag = res.data.tag),
                        (this.usertype = res.data.usertype);
                })
                .catch((err) => {
                    if (this.$cookies.isKey("jwt")) {
                        alert(err.response.data.message);
                    }
                });
        },
        userDelete() {
            if (confirm("정말 삭제하시겠습니까?")) {
                this.$http
                    .delete("/api/user", {
                        data: {
                            jwt: this.$cookies.get("jwt"),
                        },
                    })
                    .then((_) => {
                        alert("사용자 삭제 완료");
                        this.$router.push("/");
                    })
                    .catch((err) => {
                        if (this.$cookies.isKey("jwt")) {
                            alert(err.response.data.message);
                        }
                    });
            }
        },
    },
};
</script>
<style></style>
