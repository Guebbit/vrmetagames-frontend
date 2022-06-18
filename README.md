TIMESTAMP: conversione secondi\millisecondi via server. PUT & POST = secondi, GET = millisecondi

RELOAD ogni secondo di station e schedule

ADMIN:
 - default event on click\drag creato a suo nome, per inserimenti istantanei, modificabile dopo

WAITING VUETIFY:
 - remove iconfont mdi & uninstall @mdi/font

SCHEDULE
 - SCHEDULE / EVENTS / BOOKINGS = scegli 1
 - "PAGINATION" of 60 days?
 - FUTURE: Sono sempre mono giornata e quindi "date" è sempre lo stesso giorno, ma ideare che possano essere più giorni per il futuro


TOAST: https://next.vuetifyjs.com/en/components/snackbars/

GUEBBIT LIBRARY: object join

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

        method: {
            secondsToTime(value :number){
                const { hours, minutes } = secondsToTime(value);
                return hours + ":" + minutes.toString().padStart(2, '0');
            },
        }

        data: () => {
            return {
                today: new Date(),
                rangeTime: [800000, 1200000],
                loadingName: 'schedule',
            }
        },
        */


/*
disclaimerList: [] as disclaimerMap[],

    <v-banner
        v-for="(item, index) in disclaimerList"
        color="deep-purple-accent-4"
        lines
    >
        <template v-slot:prepend>
            <font-awesome-icon :icon="item.icon === 'warning' ? ['fas', 'calendar'] : ['fas', 'clock']" />
        </template>

        <v-banner-text>{{ item.text }}</v-banner-text>

        <v-banner-actions>
            <v-btn @click="disclaimerList.splice(index, 1)">
                Dismiss
            </v-btn>
        </v-banner-actions>
    </v-banner>
*/