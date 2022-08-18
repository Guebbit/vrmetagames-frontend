<template>
    <v-card
        v-show="currentUserInfo.id && currentUserInfo.id !== 'none'"
        class="schedule-user-card"
    >
        <div class="d-flex align-center">
            <v-avatar class="flex-shrink-0 me-4" size="64">
                <!-- <v-img :src="userInfo.avatar" /> TODO VUETIFY FIX -->
                <img class="avatar-image" alt="user avatar" :src="userInfo.avatar" />
            </v-avatar>
            <div>
                <h4 class="font-600">{{ userInfo.username }}</h4>
                <small v-show="userInfo.lastVisit && userInfo.lastVisit > 0"
                    class="text-medium-emphasis"
                >
                    {{ t('play-page.schedule-details-last-visit') }}:
                    <span class="ml-3">{{ translateTimestampToString(userInfo.lastVisit) }}</span>
                </small>
            </div>
        </div>
        <div v-if="showInfo"
             class="d-flex justify-end flex-gap-6"
        >
            <v-btn v-show="userInfo.wallet"
                   variant="text"
                   color="secondary"
            >
                <font-awesome-icon class="mr-3" :icon="['fas', 'wallet']" />
                {{ userInfo.wallet }}
            </v-btn>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { computed, toRefs, defineProps } from "vue";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";
import useTimeHelpers from "@/resources/composables/useTimeHelpers";
import { defaultUserAvatar, uiFormatDate, uiFormatTime } from "@/resources/constants";

import type { userMap } from "@/interfaces";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
library.add(faWallet);

const { t } = useI18n();
const { state } = useStore();

const props = defineProps({
    id: {
        type: String,
        required: false
    },
    showInfo: {
        type: Boolean,
        default: () => {
            return true;
        }
    },
});

const { translateTimestampToString } = useTimeHelpers(uiFormatDate + ' ' + uiFormatTime);

const { userInfo: currentUserInfo } = toRefs(state.user);
const { users } = toRefs(state.ecommerce);

/**
 * Return currentUserInfo data.
 * If no authorization or error occurs: return default anonymous blank data
 *
 * @return {Object}
 */
const userInfo = computed<userMap>(() => {
    // starting ID: the one declared
    let userId = props.id;
    // NO userId and NO admin = current user creating an event
    if(!currentUserInfo.value.isAdmin && !userId){
        userId = currentUserInfo.value.id;
    }
    // YES userId and it's the current user
    if(userId === currentUserInfo.value.id){
        const { id, avatar = defaultUserAvatar, username, lastVisit, wallet } = currentUserInfo.value;
        return {
            id,
            avatar,
            username,
            lastVisit,
            wallet
        };
    }
    // YES userId (and YES Admin, security in BE) = it's the selected user (if not found it will be empty by default)
    if(userId && Object.prototype.hasOwnProperty.call(users.value, userId)){
        const { id, avatar = defaultUserAvatar, username, lastVisit, wallet } = users.value[userId];
        return {
            id,
            avatar,
            username,
            lastVisit,
            wallet
        };
    }
    // NO userId = it's the admin placeholder
    if(!userId){
        return {
            id: 'none',
            avatar: defaultUserAvatar,
            username: '',
            lastVisit: 0,
        }
    }
    // NO userId OR YES userId but NO admin
    return {
        id: 'none',
        avatar: defaultUserAvatar,
        username: t('generic.user'),
        lastVisit: 0,
    }
});
</script>

<style lang="scss">
.schedule-user-card{
    padding: 12px;
    .avatar-image{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>