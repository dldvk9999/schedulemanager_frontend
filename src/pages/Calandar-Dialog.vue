<template>
    <v-card @click:outside="hide()">
        <v-card-title> 일정 저장 </v-card-title>
        <v-card-text>
            <div
                style="
                    display: flex;
                    justify-content: space-evenly;
                    margin-bottom: 15px;
                "
            >
                <div>
                    <p>시작 일</p>
                    <el-date-picker
                        v-model="startDate"
                        type="date"
                        placeholder="시작 일"
                        :picker-options="startDateOption"
                    />
                </div>
                <div>
                    <p>종료 일</p>
                    <el-date-picker
                        v-model="endDate"
                        type="date"
                        placeholder="종료 일"
                        :picker-options="endDateOption"
                    />
                </div>
            </div>
            <div class="input-title-flex">
                <fg-input
                    placeholder="제목을 입력하세요"
                    addon-left-icon="now-ui-icons users_single-02"
                    v-model="isTitle"
                />
                <button
                    class="input-title input-button"
                    :style="{ 'background-color': colorInit() }"
                    @click="selectColor = !selectColor"
                ></button>
            </div>
            <div class="input-title-flex">
                <transition name="fade">
                    <div v-if="selectColor" class="change-color">
                        <button
                            v-for="(color, index) in colors"
                            :key="color"
                            :style="{ 'background-color': color }"
                            class="input-title input-button"
                            style="margin-top: 0"
                            @click="changeColor(index)"
                        ></button>
                    </div>
                </transition>
            </div>
            <div class="input-title-flex">
                <fg-input
                    placeholder="내용을 입력하세요"
                    addon-left-icon="now-ui-icons users_single-02"
                    v-model="isContent"
                />
            </div>
            <div class="input-title-flex">
                <fg-input
                    placeholder="장소를 입력하세요"
                    addon-left-icon="now-ui-icons users_single-02"
                    v-model="isLocate"
                />
            </div>
            <div style="display: flex">
                <div class="input-title-flex">
                    <v-select
                        label="알림"
                        v-model="isAlert"
                        v-on:change="changeAlert"
                        :items="alerts"
                        dense
                        outlined
                        hide-details
                        class="ma-2"
                    ></v-select>
                </div>
                <div class="input-title-flex">
                    <v-select
                        label="반복"
                        v-model="isAgain"
                        v-on:change="changeAgain"
                        :items="agains"
                        dense
                        outlined
                        hide-details
                        class="ma-2"
                    ></v-select>
                </div>
            </div>
            <div class="input-title-flex">
                <h5 class="input-title">파일</h5>
                <v-file-input
                    multiple
                    label="File input"
                    ref="file"
                    v-model="file"
                    @change="selectFile"
                    name="file"
                    accept="text/*"
                    type="file"
                ></v-file-input>
            </div>
            <n-button
                v-for="file in selectFiles"
                v-bind:key="file"
                type="primary"
                round
                simple
                @click="fileDownload(file)"
                >{{ file }}
            </n-button>
        </v-card-text>
        <v-card-actions class="justify-end mr-2 pb-4">
            <v-btn color="amber" dark rounded small @click="hide()">취소</v-btn>
            <template>
                <v-btn color="success" rounded small @click="submit()">{{
                    submitButton
                }}</v-btn>
            </template>
        </v-card-actions>
    </v-card>
</template>
<script>
import { en, ko } from "vuejs-datepicker/dist/locale";
import { Button, FormGroupInput as FgInput } from "@/components";
import { DatePicker } from "element-ui";
export default {
    name: "Dialog",
    components: {
        FgInput,
        [DatePicker.name]: DatePicker,
        [Button.name]: Button,
    },
    props: {
        selectId: {
            type: Number,
        },
        selectStartDate: {
            type: Date,
            default: new Date(),
        },
        selectEndDate: {
            type: Date,
            default: new Date(),
        },
        selectTitle: {
            type: String,
            default: "",
        },
        selectContents: {
            type: String,
            default: "",
        },
        selectLocate: {
            type: String,
            default: "",
        },
        selectAlerts: {
            type: Number,
            default: 0,
        },
        selectAgain: {
            type: Number,
            default: 0,
        },
        selectFiles: {
            type: Array,
            default: null,
        },
        selectColors: {
            type: Number,
            default: -1,
        },
        selectIsEdit: {
            type: Boolean,
            default: false,
        },
        submitButton: {
            type: String,
            default: "확인",
        },
    },
    data: () => ({
        state: {
            startDate: null,
            disabledStartDates: {
                to: new Date(),
            },
            endDate: null,
        },
        rules: {
            name: [(val) => (val || "").length > 0 || "This field is required"],
        },
        en: en,
        ko: ko,
        title: "",
        content: "",
        locate: "",
        selectColor: false,
        alert: "없음",
        alerts: [
            "없음",
            "일주일 전",
            "하루 전",
            "1시간 전",
            "30분전",
            "10분전",
            "5분전",
            "1분전",
        ],
        again: "없음",
        agains: ["없음", "매일", "매주", "매월", "매년"],
        file: null,
        colors: [
            "#EEAFAF",
            "#AFC4E7",
            "#BAE7AF",
            "#FFF77F",
            "#FF7F7F",
            "#FDC4F8",
            "#CB9FFD",
            "#A9E1ED",
            "#F3CDAD",
            "#DFD4E4",
            "#83A7A3",
        ],
        nowColor: null,
        required: false,
        isChangeColor: false,
        startDateOption: {
            disabledDate(time) {
                return (
                    time.getTime() <
                    new Date(new Date().setDate(new Date().getDate() - 1))
                );
            },
        },
        endDateOption: {
            disabledDate(time) {
                return (
                    time.getTime() <
                    new Date(new Date().setDate(new Date().getDate() - 1))
                );
            },
        },
    }),
    computed: {
        startDate: {
            get() {
                return this.state.startDate == null
                    ? this.selectStartDate
                    : this.state.startDate;
            },
            set(date) {
                this.state.startDate = date;
            },
        },
        endDate: {
            get() {
                return this.state.endDate == null
                    ? this.selectEndDate
                    : this.state.endDate;
            },
            set(date) {
                this.state.endDate = date;
            },
        },
        isAlert: {
            get() {
                return this.selectIsEdit
                    ? this.alerts[this.selectAlerts]
                    : this.alert;
            },
            set(value) {
                this.alert = value;
            },
        },
        isAgain: {
            get() {
                return this.selectIsEdit
                    ? this.agains[this.selectAgain]
                    : this.again;
            },
            set(value) {
                this.again = value;
            },
        },
        isTitle: {
            get() {
                return this.selectIsEdit ? this.selectTitle : this.title;
            },
            set(value) {
                this.title = value;
            },
        },
        isContent: {
            get() {
                return this.selectIsEdit ? this.selectContents : this.content;
            },
            set(value) {
                this.content = value;
            },
        },
        isLocate: {
            get() {
                return this.selectIsEdit ? this.selectLocate : this.locate;
            },
            set(value) {
                this.locate = value;
            },
        },
    },
    methods: {
        fileDownload(filename) {
            console.log(filename);
        },
        changeAlert(alert) {
            this.alert = this.alerts.indexOf(alert);
        },
        changeAgain(again) {
            this.again = this.agains.indexOf(again);
        },
        selectFile(event) {
            this.file = event;
        },
        changeColor(index) {
            this.nowColor = index;
            this.selectColor = false;
            this.isChangeColor = true;
        },
        colorInit() {
            if (this.selectColors == null && this.nowColor == null) {
                this.nowColor = Math.floor(this.colors.length * Math.random());
                return this.colors[this.nowColor];
            } else if (this.selectColors != null) {
                return this.isChangeColor
                    ? this.colors[this.nowColor]
                    : this.colors[this.selectColors];
            } else {
                return this.colors[this.nowColor];
            }
        },
        startdateSelected(date) {
            this.$set(this.state, "startDate", date);
        },
        enddateSelected(date) {
            this.$set(this, "endDate", date);
        },
        customFormatter(date) {
            return this.$moment(date).format("YYYY년 MM월 DD일");
        },
        hide() {
            this.required = false;
            this.title = "";
            this.content = "";
            this.alert = this.alerts[0];
            this.again = this.agains[0];
            this.locate = "";
            this.file = null;
            this.allDay = false;
            this.isChangeColor = false;
            this.state.startDate == null;
            this.state.endDate == null;
            this.$emit("hide");
        },
        submit() {
            let token = this.$cookies.get("jwt");
            if (!token) {
                alert("로그인 먼저 해주세요.");
                this.$router.push("/login");
                return;
            }

            // console.log(this.alert, this.alerts[this.alert], this.again, this.agains[this.again])
            // return;

            // 시작일 날짜 + 시간
            let startDate = new Date(
                this.state.startDate == undefined
                    ? this.selectStartDate
                    : this.state.startDate
            );
            startDate.setHours(0);
            startDate.setMinutes(0);
            startDate.setSeconds(0);

            // 종료일 날짜 + 시간
            let endDate = new Date(
                this.endDate == undefined ? this.selectEndDate : this.endDate
            );
            endDate.setHours(0);
            endDate.setMinutes(0);
            endDate.setSeconds(0);

            // 시작 날짜가 종료 날짜보다 클 경우 통일
            if (endDate < startDate) endDate = startDate;

            if (this.title != "" || this.selectTitle) {
                const fd = new FormData();
                fd.append("startdate", startDate);
                fd.append("enddate", endDate);
                fd.append("allday", this.allDay);
                fd.append(
                    "title",
                    this.title != "" ? this.title : this.selectTitle
                );
                fd.append("memo", this.content);
                fd.append("alert", this.alert);
                fd.append("again", this.again);
                fd.append("locate", this.locate);
                if (this.file == null) {
                    fd.append("file", this.file);
                } else {
                    for (let i = 0; i < this.file.length; i++) {
                        fd.append("file", this.file[i]);
                    }
                }
                fd.append("color", this.nowColor);
                fd.append("jwt", token);

                if (this.selectIsEdit) {
                    fd.append("id", this.selectId);

                    this.$http
                        .put("http://127.0.0.1:8080/api/schedule", fd)
                        .then((_) => {
                            alert("일정 수정 완료");
                            this.$emit("submit");
                            this.$router.go();
                            this.title = "";
                            this.content = "";
                            this.alert = this.alerts[0];
                            this.again = this.agains[0];
                            this.locate = "";
                            this.file = null;
                            this.allDay = false;
                            this.nowColor = "";
                        })
                        .catch((err) => {
                            if (this.$cookies.isKey("jwt")) {
                                alert(err.response.data.message);
                            }
                        });
                } else {
                    this.$http
                        .post("http://127.0.0.1:8080/api/schedule", fd)
                        .then((_) => {
                            alert("일정 생성 완료");
                            this.$emit("submit");
                            this.$router.go();
                            this.title = "";
                            this.content = "";
                            this.alert = this.alerts[0];
                            this.again = this.agains[0];
                            this.locate = "";
                            this.file = null;
                            this.allDay = false;
                            this.nowColor = "";
                        })
                        .catch((err) => {
                            if (this.$cookies.isKey("jwt")) {
                                alert(err.response.data.message);
                            }
                        });
                }
            } else {
                this.required = true;
            }
        },
    },
};
</script>
<style>
.right > .vdp-datepicker__calendar {
    right: 0px;
}
.calendar > div > div {
    border-radius: 10px;
    box-shadow: 10px 10px 20px 2px lightgray;
}
.input-custom {
    border: 1px solid gray;
    border-radius: 15px !important;
    padding-left: 5px !important;
    font-size: 14px !important;
    margin: 10px 0 !important;
}
.input-custom:visited {
    border: 2px solid #1976d2;
}
.vdp-datepicker__calendar {
    border: 0;
    border-radius: 10px;
}
.vdp-datepicker__calendar .cell.selected {
    border: 2px solid #4bd;
    border-radius: 6px;
}
.vdp-datepicker__calendar .cell.selected:hover {
    color: white;
}
.vdp-datepicker__calendar .cell:hover {
    border-radius: 6px;
}
.vdp-datepicker > div > .form-control {
    cursor: pointer;
    color: black;
    background: white;
}
.right > .vdp-datepicker__calendar {
    right: 0px;
}
.input-title-flex {
    display: flex;
    align-items: center;
    width: 100%;
}
.input-title {
    text-align: left;
    margin-bottom: 0px;
    padding-top: 1px;
    font-size: 15px;
    margin-right: 10px;
}
.v-present > div > button {
    background-color: #ffcccc !important;
}
.require-not {
    border: 2px solid red;
}
.input-button {
    margin-left: 10px;
    border-radius: 50%;
    color: transparent;
    /* border: 1px solid gray; */
    padding: 13px;
    align-self: start;
    margin-top: 5px;
}
.change-color {
    border-radius: 10px;
    background-color: white;
    border: 1px solid gray;
    padding: 5px;
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
