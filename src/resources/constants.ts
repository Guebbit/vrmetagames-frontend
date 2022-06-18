import { i18n } from "@/plugins/i18n"
const { t } = i18n.global;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetifyColors from "vuetify/lib/util/colors";
import { secondsToTime } from "guebbit-javascript-library";

export const baseUrl = 'https://www.vrmetagames.it/'
export const assetsUrl = 'https://assets.guebbit.com/vrmetagames';
export const defaultUserAvatar = assetsUrl + '/images/logo/logo.jpg';
export const timeFormatDate = 'DD/MM/YYYY';
export const timeFormatHours = 'HH:mm';

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

export const themeColors = {
    background: "#212121",
    surface: "#212121",
    primary: "#0086ff",
    'primary-darken-1': "#0078e5",
    'primary-darken-2': "#006bcc",
    'primary-lighten-1': "#1992ff",
    'primary-lighten-2': "#329eff",
    secondary: "#ff8a23",
    'secondary-darken-1': "#e57c1f",
    'secondary-darken-2': "#cc6e1c",
    'secondary-lighten-1': "#ff9538",
    'secondary-lighten-2': "#ffa14e",
    text: "#ffffff",
};

export const formRules = {
    required: (value :string) => !!value || 'Required.',
    min: (value :string) => value.length >= 8 || 'Min 8 characters',
    emailMatch: () => (`The email and password you entered don't match`),
    rulesCheckbox: (value :string) => !!value || 'You must agree to continue!',
};

export const labelFromToDuration = (start :number, end :number) :{
    mode :number,
    hours :number,
    minutes :number
} => {
    let mode = 0;
    const { hours = 0, minutes = 0 } = secondsToTime(end - start);
    
    if(hours === 0 && minutes > 0){
        mode = 1;
    }
    if(minutes === 0){
        if(hours === 1){
            mode = 2;
        }
        if(hours > 1){
            mode = 3;
        }
    }else{
        if(hours === 1){
            mode = 4;
        }
        if(hours > 1){
            mode = 5;
        }
    }
    
    return {
        mode,
        hours,
        minutes
    }
};