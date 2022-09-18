import { i18n } from "@/plugins/i18n"
const { t } = i18n.global;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetifyColors from "vuetify/lib/util/colors";
import * as yup from 'yup';

export const baseUrl = 'https://www.vrmetagames.it/'
export const assetsUrl = 'https://assets.guebbit.com/vrmetagames/';
export const imagesUrl = assetsUrl + 'images/';
export const defaultUserAvatarSrc = assetsUrl + 'images/logo/logo.jpg';
export const defaultUserAvatarThumbnail = assetsUrl + 'images/logo/logo.jpg';
export const defaultUserAvatar = {
    src: defaultUserAvatarSrc,
    thumbnail: defaultUserAvatarThumbnail
}
export const uiFormatDate = 'DD/MM/YYYY';
export const uiFormatTime = 'HH:mm';
export const contactAddressStreet = "Via C. Catellani 1/D";
export const contactAddressCity = "Carpi";
export const contactAddressProvince = "MO";
export const contactAddressCap = "41012";
export const contactEmail = "ecarpiasd@gmail.com";
export const contactNumber = "+39 3914678284";
export const contactTelegram = "loremipsum";

export const socialFacebook = "#";
export const socialInstagram = "#";
export const socialTiktok = "#";
export const socialYoutube = "#";

export const dayNames = [
    t('main.days.0'),
    t('main.days.1'),
    t('main.days.2'),
    t('main.days.3'),
    t('main.days.4'),
    t('main.days.5'),
    t('main.days.6')
];

export const dayNamesCut = [
    t('main.days-cut.0'),
    t('main.days-cut.1'),
    t('main.days-cut.2'),
    t('main.days-cut.3'),
    t('main.days-cut.4'),
    t('main.days-cut.5'),
    t('main.days-cut.6')
];

export const monthNames = [
    t('main.months.0'),
    t('main.months.1'),
    t('main.months.2'),
    t('main.months.3'),
    t('main.months.4'),
    t('main.months.5'),
    t('main.months.6'),
    t('main.months.7'),
    t('main.months.8'),
    t('main.months.9'),
    t('main.months.10'),
    t('main.months.11')
];

export const monthNamesCut = [
    t('main.months-cut.0'),
    t('main.months-cut.1'),
    t('main.months-cut.2'),
    t('main.months-cut.3'),
    t('main.months-cut.4'),
    t('main.months-cut.5'),
    t('main.months-cut.6'),
    t('main.months-cut.7'),
    t('main.months-cut.8'),
    t('main.months-cut.9'),
    t('main.months-cut.10'),
    t('main.months-cut.11')
];

export const randomColorList = [
    vuetifyColors.pink.base,
    vuetifyColors.pink.darken4,
    vuetifyColors.purple.base,
    vuetifyColors.purple.darken4,
    vuetifyColors.indigo.base,
    vuetifyColors.indigo.darken4,
    vuetifyColors.blue.base,
    vuetifyColors.blue.darken4,
    vuetifyColors.cyan.base,
    vuetifyColors.cyan.darken4,
    vuetifyColors.teal.base,
    vuetifyColors.teal.darken4,
    vuetifyColors.green.base,
    vuetifyColors.green.darken4,
    vuetifyColors.lime.base,
    vuetifyColors.lime.darken4,
    vuetifyColors.orange.base,
    vuetifyColors.orange.darken4,
    vuetifyColors.brown.base,
    vuetifyColors.brown.darken4,
    // TODO continue colori chiari?
    // vuetifyColors.yellow.base,
    // vuetifyColors.yellow.darken4,
];

// "on-surface" sarebbe automatico, ma posso customizzarlo
// https://www.color-hex.com/color/0086ff
export const themeColors = {
    primary: "#0086ff",
    'primary-darken-1': "#006bcc",
    'primary-darken-2': "#005099",
    'primary-darken-3': "#003566",
    'primary-darken-4': "#001A33",
    'primary-darken-5': "#000D19",
    'primary-lighten-1': "#339EFF",
    'primary-lighten-2': "#66B6FF",
    'primary-lighten-3': "#99CEFF",
    'primary-lighten-4': "#CCE6FF",
    'primary-lighten-5': "#E5F2FF",
    'on-primary': vuetifyColors.shades.white,
    secondary: "#ff8a23",
    'secondary-darken-1': "#CC6E1C",
    'secondary-darken-2': "#995215",
    'secondary-darken-3': "#66370E",
    'secondary-darken-4': "#331B07",
    'secondary-darken-5': "#190D03",
    'secondary-lighten-1': "#FFA14F",
    'secondary-lighten-2': "#FFB87B",
    'secondary-lighten-3': "#FFD0A7",
    'secondary-lighten-4': "#FFE7D3",
    'secondary-lighten-5': "#FFF3E9",
    'on-secondary': vuetifyColors.shades.white,
    background: vuetifyColors.grey.darken4,
    'on-background': vuetifyColors.shades.white,
    surface: "#2e2e2e",   // more dark than vuetifyColors.grey.darken3 but less than vuetifyColors.grey.darken4
    'on-surface': vuetifyColors.shades.white,
    'surface-variant': vuetifyColors.grey.darken3,   // TODO BETA not working?
    'on-surface-variant': vuetifyColors.shades.white,
    info: "#003566", // primary-darken-3
    success: vuetifyColors.green.darken3,
    error: vuetifyColors.red.darken1,    // B00020
    warning: vuetifyColors.yellow.darken2,
};


export interface scheduleStatesMap {
    variant?: string,
    icon: string,
    color: string,
    title: string,
    description: string,
}

export const scheduleStates :Record<string,scheduleStatesMap> = {
    offline: {
        variant: undefined,
        icon: 'check',
        color: vuetifyColors.red.base,
        title: 'schedule-card.offline-chip',
        description: 'schedule-card.offline-explanation',
    },
    online: {
        variant: 'outlined',
        icon: 'check',
        color: vuetifyColors.green.base,
        title: 'schedule-card.online-chip',
        description: 'schedule-card.online-explanation',
    },
    confirmed: {
        variant: undefined,
        icon: 'check',
        color: themeColors.secondary,
        title: 'schedule-card.confirmed-chip',
        description: 'schedule-card.confirmed-explanation',
    },
    notConfirmed: {
        variant: undefined,
        icon: 'check',
        color: vuetifyColors.shades.white,
        title: 'schedule-card.not-confirmed-chip',
        description: 'schedule-card.not-confirmed-explanation',
    },
    canceled: {
        variant: 'outlined',
        icon: 'check',
        color: vuetifyColors.red.base,
        title: 'schedule-card.canceled-chip',
        description: 'schedule-card.canceled-explanation',
    },
    paid: {
        variant: undefined,
        icon: 'check',
        color: themeColors.primary,
        title: 'schedule-card.paid-chip',
        description: 'schedule-card.paid-explanation',
    },
    unsaved: {
        variant: 'outlined',
        icon: 'check',
        color: vuetifyColors.yellow.darken1,
        title: 'schedule-card.unsaved-chip',
        description: 'schedule-card.unsaved-explanation',
    },
    imminent: {
        variant: 'outlined',
        icon: 'check',
        color: themeColors.secondary,
        title: 'schedule-card.imminent-chip',
        description: 'schedule-card.imminent-explanation',
    },
    expired: {
        variant: undefined,
        icon: 'check',
        color: vuetifyColors.red.base,
        title: 'schedule-card.expired-chip',
        description: 'schedule-card.expired-explanation',
    }
}