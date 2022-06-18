<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div id="app">
          <v-app id="inspire">
            <div>
              <v-sheet
                tile
                height="54"
                class="d-flex"
              >
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.prev()"
                >
                  <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-select
                  v-model="type"
                  :items="types"
                  dense
                  outlined
                  hide-details
                  class="ma-2"
                  label="type"
                ></v-select>
                <v-select
                  v-model="weekday"
                  :items="weekdays"
                  dense
                  outlined
                  hide-details
                  label="weekdays"
                  class="ma-2"
                ></v-select>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  class="ma-2"
                  @click="$refs.calendar.next()"
                >
                  <v-icon>chevron_right</v-icon>
                </v-btn>
              </v-sheet>
              <v-sheet height="900">
                <v-calendar
                  ref="calendar"
                  v-model="value"
                  :weekdays="weekday"
                  :type="type"
                  :events="events"
                  :event-overlap-mode="mode"
                  :event-overlap-threshold="30"
                  :event-color="getEventColor"
                  event-text-color="black"
                  @change="getEvents"
                  @click:date="showDialog"
                  @click:event="showEvent"
                  @click:more="viewDay"
                ></v-calendar>
                <v-menu
                  v-model="selectedOpen"
                  :close-on-content-click="false"
                  :activator="selectedElement"
                  offset-y
                >
                  <v-card
                    color="grey lighten-4"
                    flat
                  >
                    <v-toolbar
                      :color="colors[selectedEvent.color]"
                    >
                      <v-btn 
                        icon
                        @click="edit(selectedEvent)"
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn 
                        icon
                        @click="deleteSchedule(selectedEvent)"  
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-text>
                      <span v-html="selectedEvent.content"></span>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                      >취소</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
                <v-dialog
                  max-width="600"
                  v-model="dialog"
                >
                  <cal-dialog
                    :select-id="sch.id"
                    :select-start-date="parameter"
                    :select-end-date="sch.end"
                    :select-title="sch.title"
                    :select-contents="sch.contents"
                    :select-locate="sch.locate"
                    :select-alert="sch.alert"
                    :select-again="sch.again"
                    :select-file="sch.file"
                    :select-colors="sch.color"
                    :submit-button="sch.editText"
                    :select-is-edit="sch.isedit"
                    @hide="hideDialog"
                    @submit="submitDialog"
                  />
                </v-dialog>
              </v-sheet>
            </div>
          </v-app>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import MainFooter from '@/layout/MainFooter';
import CalandarDialog from './Calandar-Dialog';
export default {
  name: 'calender-page',
  bodyClass: 'calender-page',
  components: {
    MainFooter,
    'cal-dialog': CalandarDialog,
  },
  beforeCreate() {
    let token = this.$cookies.get('jwt');
    if (!token) {
      alert("로그인 먼저 해주세요.");
      this.$router.push("/login");
      return;
    }

    this.$http.post('/api/user/login_check', {
      jwt: token
    })
    .then(res => {
      if (!res.data.status) {
        alert("로그인 시간이 만료되었습니다. 다시 로그인해주세요.");
        this.$router.push("/login");
        return;
      }
    })
  },
  data: () => ({
    isTop: true,
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    colors: ['#EEAFAF', '#AFC4E7', '#BAE7AF', '#FFF77F', '#FF7F7F', '#FDC4F8', '#CB9FFD', '#A9E1ED', '#F3CDAD', '#DFD4E4', '#83A7A3'],
    dialog: false,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    parameter: '',
    sch: {
      id: null,
      end: null,
      title: null,
      contents: null,
      locate: null,
      alert: null,
      again: null,
      file: null,
      color: null,
      editText: null,
      isedit: null
    },
  }),
  methods: {
    deleteSchedule(event) {
      if(confirm("정말 삭제하시겠습니까?")) {
        this.$http.delete('/api/schedule', {
          data: {
            jwt: this.$cookies.get('jwt'),
            id: event.id
          }
        })
        .then(_ => {
          this.$router.go();
        })
      }
    },
    edit(event) {
      this.selectedOpen = false;
      this.parameter = event.start;
      this.sch.id = event.id;
      this.sch.end = event.end;
      this.sch.title = event.name;
      this.sch.contents = event.content;
      this.sch.locate = event.locate;
      this.sch.alert = event.alert;
      this.sch.again = event.again;
      this.sch.file = event.file;
      this.sch.color = event.color;
      this.sch.editText = "수정";
      this.sch.isedit = true;
      this.dialog = true;
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    viewDay ({ date }) {
      this.value = date;
      this.type = 'day';
    },
    getEvents () {
      const events = []

      this.$http.post('/api/schedule/get', {
        jwt: this.$cookies.get('jwt')
      })
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          events.push({
            id: res.data[i].id,
            name: res.data[i].title,
            start: new Date(res.data[i].startdate),
            end: new Date(res.data[i].enddate),
            content: res.data[i].memo,
            alert: res.data[i].alert,
            again: res.data[i].again,
            locate: res.data[i].locate,
            file: res.data[i].file,
            color: res.data[i].color ? res.data[i].color : 0
          })
        }
      })

      this.events = events;
    },
    getEventColor (event) {
      return this.colors[event.color]
    },
    showDialog(date) {
      const today = new Date();
      const selectDay = new Date(date.date);
      if (today.getFullYear() <= selectDay.getFullYear() &&
          today.getMonth() <= selectDay.getMonth() &&
          today.getDate() <= selectDay.getDate()) {
        this.parameter = selectDay;
        this.sch.end = selectDay;
        this.sch.editText = "확인";
        this.sch.color = Math.floor((this.colors.length) * Math.random());
        this.sch.title = null;
        this.sch.contents = null;
        this.sch.locate = null;
        this.sch.alert = null;
        this.sch.again = null;
        this.sch.file = null;
        this.sch.id = null;
        this.sch.isedit = false;
        this.dialog = true;
      }
    },
    hideDialog() {
      this.dialog = false;
    },
    submitDialog() {
      this.dialog = false;
    },
  },
};
</script>
<style>
.v-application--wrap {
  min-height: 0px !important;
}
</style>
