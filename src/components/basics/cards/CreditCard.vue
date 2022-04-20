<template>
    <div class="credit-card"
         :class="{
            flipped,
            'card-email-mode': cardEmail
         }"
         :style="{
            '--credit-card-text-color': color,
            '--credit-card-bg-color': background
        }"
    >
        <div class="credit-card-true">
            <div class="front">
                <img class="credit-card-logo" :src="logo">
                <svg version="1.1" class="credit-card-front" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 471"
                     style="enable-background:new 0 0 750 471;" xml:space="preserve">
                <g id="Front">
                <g id="credit-card-background">
                <g id="Page-1_1_">
                <g id="amex_1_">
                    <path class="top-card" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40 C0,17.9,17.9,0,40,0z"></path>
                </g>
                </g>
                    <path class="bottom-card" d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"></path>
                </g>
                    <text transform="matrix(1 0 0 1 60.106 295.0121)" class="svg-label-identification st2 st3 st4">{{ cardNumber ? cardNumberTranslated : cardEmail ? cardEmail : '' }}</text>
                    <text transform="matrix(1 0 0 1 54.1064 428.1723)" class="svg-label-name st2 st5 st6">{{ name }}</text>
                    <text transform="matrix(1 0 0 1 54.1074 389.8793)" class="svg-label-holder st7 st5 st8">cardholder name</text>
                    <text transform="matrix(1 0 0 1 479.7754 388.8793)" class="svg-label-expiration st7 st5 st8">expiration</text>
                    <text transform="matrix(1 0 0 1 65.1054 241.5)" class="st7 st5 st8">{{ cardNumber ? 'card number' : cardEmail ? 'email' : '' }}</text>
                    <g>
                <text transform="matrix(1 0 0 1 574.4219 433.8095)" class="svg-value-expiration st2 st5 st9">{{ cardExpire }}</text>
                        <text transform="matrix(1 0 0 1 479.3848 417.0097)" class="svg-label-expiration st2 st10 st11">VALID</text>
                        <text transform="matrix(1 0 0 1 479.3848 435.6762)" class="svg-label-expiration st2 st10 st11">THRU</text>
                        <polygon class="svg-label-expiration st2" points="554.5,421 540.4,414.2 540.4,427.9"></polygon>
                </g>
                    <g id="cchip">
                <g>
                <path class="st2"
                      d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3 c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"></path>
                </g>
                        <g>
                <g>
                <rect x="82" y="70" class="st12" width="1.5" height="60"></rect>
                </g>
                            <g>
                <rect x="167.4" y="70" class="st12" width="1.5" height="60"></rect>
                </g>
                            <g>
                <path class="st12"
                      d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3 c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3 C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5 c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5 c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"></path>
                </g>
                            <g>
                <rect x="82.8" y="82.1" class="st12" width="25.8" height="1.5"></rect>
                </g>
                            <g>
                <rect x="82.8" y="117.9" class="st12" width="26.1" height="1.5"></rect>
                </g>
                            <g>
                <rect x="142.4" y="82.1" class="st12" width="25.8" height="1.5"></rect>
                </g>
                            <g>
                <rect x="142" y="117.9" class="st12" width="26.2" height="1.5"></rect>
                </g>
                </g>
                </g>
                </g>
                    <g id="Back"></g>
            </svg>
            </div>
            <div class="back">
                <svg version="1.1" class="credit-card-back" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 750 471"
                     style="enable-background:new 0 0 750 471;" xml:space="preserve"
                >
                <g id="Front">
                <line class="st0" x1="35.3" y1="10.4" x2="36.7" y2="11"></line>
                </g>
                    <g id="Back">
                <g id="Page-1_2_">
                <g id="amex_2_">
                <path class="back-card" d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40 C0,17.9,17.9,0,40,0z"></path>
                </g>
                </g>
                        <rect y="61.6" class="st2" width="750" height="78"></rect>
                        <g>
                <path class="st3"
                      d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5 C707.1,246.4,704.4,249.1,701.1,249.1z"></path>
                            <path class="svg-label-expiration st5"
                                  d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"></path>
                </g>
                        <text transform="matrix(1 0 0 1 621.999 227.2734)" class="svg-value-security st6 st7">XXX</text>
                        <g class="st8">
                <text transform="matrix(1 0 0 1 518.083 280.0879)" class="svg-label-security st9 st6 st10">security code</text>
                </g>
                        <rect x="58.1" y="378.6" class="st11" width="375.5" height="13.5"></rect>
                        <rect x="58.1" y="405.6" class="st11" width="421.7" height="13.5"></rect>
                        <text transform="matrix(1 0 0 1 59.5073 228.6099)" class="st12 st13">{{ name }}</text>
                </g>
            </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "MasterCard",

    props: {
        logo: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        // background-color
        background: {
            type: String,
            required: false
        },
        // text-color
        color: {
            type: String,
            required: false
        },
        // credit card
        cardNumber: {
            type: String,
            required: false
        },
        cardExpire: {
            type: String,
            required: false
        },
        // only payments (ex: paypal)
        cardEmail: {
            type: String,
            required: false
        },
        // show back of card
        flipped: {
            type: Boolean,
            default: () => {
                return false;
            }
        }
    },

    computed: {
        cardNumberTranslated() {
            if(!this.cardNumber || this.cardNumber.length < 8){
                return '';
            }
            return this.cardNumber.match(/.{1,4}/g)!.join(" ");
        },
    }
});
</script>

<style lang="scss">

.credit-card {

    .credit-card-true{
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom:63%;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        transition: transform 0.6s, transform 0.6s;
        cursor: pointer;
    }

    .credit-card-front,
    .credit-card-back {
        overflow: hidden;
        width: 100%;
        // -webkit-box-shadow: 1px 5px 6px 0px black;
        // box-shadow: 1px 5px 6px 0px black;
        border-radius: 22px;
    }

    .credit-card-front,
    .back-card{
        fill: var(--credit-card-bg-color);
    }

    .credit-card-back{
        fill: #212121;
    }
    .bottom-card{
        fill: #000000;
        opacity: 0.2;
    }

    .front,
    .back {
        position: absolute;
        width: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
    }
    .back {
        transform: rotateY(180deg);
    }

    // ----- FRONT -----
    .credit-card-logo {
        position: absolute;
        right: 15px;
        top: 20px;
        max-width: 40%;
        max-height: 25%;
    }
    #cchip{
         .st2{
             fill: #FFFFFF;
         }
    }
    .svg-label-name {
        text-transform: uppercase;
    }
    .credit-card-front {
        .st2 {
            fill: var(--credit-card-text-color);
        }
        .st3 {
            font-family: 'Source Code Pro', monospace;
            font-weight: 600;
        }
        .st4 {
            font-size: 54.7817px;
        }
        .st5 {
            font-family: 'Source Code Pro', monospace;
            font-weight: 400;
        }
        .st6 {
            font-size: 33.1112px;
        }
        .st7 {
            opacity: 0.6;
            fill: var(--credit-card-text-color);
        }
        .st8 {
            font-size: 24px;
        }
        .st9 {
            font-size: 36.5498px;
        }
        .st10 {
            font-family: 'Source Code Pro', monospace;
            font-weight: 300;
        }
        .st11 {
            font-size: 16.1716px;
        }
        .st12 {
            fill: #4C4C4C;
        }
    }

    // ----- BACK -----
    .credit-card-back {
        .st0 {
            fill: none;
            stroke: #0F0F0F;
            stroke-miterlimit: 10;
        }
        .st2 {
            fill: #111111;
        }
        .st3 {
            fill: #F2F2F2;
        }
        .st4 {
            fill: #D8D2DB;
        }
        .st5 {
            fill: #C4C4C4;
        }
        .st6 {
            font-family: 'Source Code Pro', monospace;
            font-weight: 400;
        }
        .st7 {
            font-size: 27px;
        }
        .st8 {
            opacity: 0.6;
        }
        .st9 {
            fill: var(--credit-card-text-color);
        }
        .st10 {
            font-size: 24px;
        }
        .st11 {
            fill: #EAEAEA;
        }
        .st12 {
            font-family: 'Rock Salt', cursive;
        }
        .st13 {
            font-size: 37.769px;
        }
    }


    &.card-email-mode{
        .svg-label-identification{
            font-size: 32px;
        }
        .svg-label-expiration,
        .svg-value-expiration,
        .svg-label-security,
        .svg-value-security{
            display: none;
        }
    }
    &.flipped {
        .credit-card-true{
            transform: rotateY(180deg);
        }
    }
}
</style>