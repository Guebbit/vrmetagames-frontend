<template>
    <div id="play-page" class="theme-page page-menu-padding">
        <v-progress-circular
            v-show="loading"
            indeterminate
            color="primary"
            class="theme-page-loading"
            :size="100"
        ></v-progress-circular>
        <v-container fluid>
            <v-row>
                <v-col cols="12" lg="3">
                    <v-sheet class="mx-auto" rounded> select // calendar</v-sheet>
                    <v-sheet class="mx-auto" rounded> riassunto // action</v-sheet>
                </v-col>
                <v-col cols="12" lg="9">
                    <Calendar
                        :admin = "true"
                        :events="scheduleDetailedList"
                        :businessHours = "businessHoursTranslated"
                        :primary="$vuetify.theme.themes.default.colors.primary"
                        :secondary="$vuetify.theme.themes.default.colors.secondary"
                        :text="$vuetify.theme.themes.default.colors.text"

                        @event:temporary:create="createTemporaryEvent"
                    >
                        <template v-slot:eventContent="{timeText, isMirror, event}">

                            <template v-if="isMirror">
                                <b style="font-size: 2em">{{ timeText }}</b>
                            </template>
                            <template v-else>
                                <!-- TODO card -->
                                <div v-if="event.extendedProps.userId && getItem('users', event.extendedProps.userId)" class="d-flex align-center">
                                    <img style="max-width: 50px; max-height: 50px;" :src="getItem('users', event.extendedProps.userId).avatar">
                                    <b>{{ timeText }} <br> {{ getItem('users', event.extendedProps.userId).username }}</b>
                                </div>
                            </template>
                        </template>
                    </Calendar>
                </v-col>
            </v-row>
        </v-container>


    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { secondsToTime, timeToSeconds } from "guebbit-javascript-library";
import Calendar from "@/components/play/Calendar.vue";
import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
import apiControllerPageList from "@/resources/mixins/apiControllerPageList";

export default defineComponent({
    name: "PlayPage",

    mixins:[
        apiControllerPageList
    ],

    components: {
        Calendar,
    },

    data: () => {
        return {
            today: new Date(),
            rangeTime: [800000, 1200000],
            loadingName: 'schedule',
        }
    },

    computed: {
        ...mapState({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            businessHours: ({ main: { businessHours } }: any) => businessHours,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            userInfo: ({ user: { userInfo } }: any) => userInfo,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            temporarySchedule: ({ ecommerce: { temporarySchedule } }: any) => temporarySchedule,
        }),
        ...mapGetters('ecommerce', [
            'scheduleDetailedList',
            'getItem'
        ]),

        businessHoursTranslated(){
            const businessHoursArray = [];
            for(let i = this.businessHours.length; i--; ){
                if(this.businessHours[i].length > 0){
                    businessHoursArray.push({
                        daysOfWeek: [i],
                        startTime: this.businessHours[i][0].replace('.', ':'),
                        endTime: this.businessHours[i][1].replace('.', ':'),
                    })
                }
            }
            return businessHoursArray;
        },

        /*
        <!-- direction="vertical" -->
            <v-range-slider
                v-model="rangeTime"
                step="1800000"
                :min="businessOpenMilliseconds"
                :max="businessCloseMilliseconds"
                show-ticks="always"
                thumb-label="always"
                tick-size="0"
            >
                <template v-slot:thumb-label="{ modelValue }">
                    {{ secondsToTime(modelValue) }}
                </template>
            </v-range-slider>


        todayBusinessHours(){
            if(!Object.prototype.hasOwnProperty.call(this.businessHours, this.today.getDay())){
                return [];
            }
            return this.businessHours[this.today.getDay()];
        },

        businessOpenMilliseconds(){
            if(this.todayBusinessHours.length === 0){
                return 0;
            }
            return timeToSeconds(this.todayBusinessHours[1], '.');
        },

        businessCloseMilliseconds(){
            if(this.todayBusinessHours.length === 0){
                return 0;
            }
            return timeToSeconds(this.todayBusinessHours[0], '.');
        },

        method:
        secondsToTime(value :number){
            const { hours, minutes } = secondsToTime(value);
            return hours + ":" + minutes.toString().padStart(2, '0');
        },
        */
    },

    methods: {
        ...mapActions('ecommerce', {
            getItems: 'getSchedules',
            addItems: 'addSchedules',
            removeItems: 'removeSchedule'
        }),
        ...mapActions('ecommerce', [
            'getStations',
            'getUsers',
        ]),
        ...mapMutations('ecommerce', [
            'setTemporarySchedule',
        ]),

        resourcePromise(){
            return Promise.all([
                this.getStations(),
                this.getUsers(),
                this.getItems()
            ])
        },

        /**
         *
         * @param {Object} start
         * @param {Object} end
         * @param {boolean} allDay
         */
        createTemporaryEvent(start :Date, end :Date, allDay :boolean){
            this.setTemporarySchedule({
                userId: this.userInfo.id,
                start,
                end,
                allDay
            });
        },
    }
});
</script>

<style lang="scss">
@import "src/assets/scss/main/global";

#play-page {
    //
}
</style>
