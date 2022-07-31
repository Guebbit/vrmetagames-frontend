import { h } from 'vue'
// import type { IconSet, IconAliases, IconProps } from 'vuetify';
import { faSquare, faSquareCheck, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const aliases = {
    complete: '...',
    cancel: '...',
    close: '...',
    delete: '...',
    clear: '...',
    success: '...',
    info: '...',
    warning: '...',
    error: '...',
    prev: '...',
    next: '...',
    checkboxOn: faSquare,
    checkboxOff: faSquareCheck,
    checkboxIndeterminate: faSquareMinus,
    delimiter: '...',
    sort: '...',
    expand: '...',
    menu: '...',
    subgroup: '...',
    dropdown: '...',
    radioOn: '...',
    radioOff: '...',
    edit: '...',
    ratingEmpty: '...',
    ratingFull: '...',
    ratingHalf: '...',
    loading: '...',
    first: '...',
    last: '...',
    unfold: '...',
    file: '...',
    plus: '...',
    minus: '...',
}

const custom  = {
    component: (props :any) => h('div', props),
}

export { aliases, custom }