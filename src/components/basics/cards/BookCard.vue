<template>
    <div class="book-card"
         :class="{
            'book-custom-size': width || height,
            'book-custom-aspect-ratio': ratio,
            'book-hoverable': hover,
         }"
         :style="{
            '--book-card-height': trueHeight + 'px',
            '--book-card-width': trueWidth + 'px',
            '--book-card-ratio': trueRatio * 100 + '%',
            '--book-card-color': color,
            '--book-card-rotation': rotation,
            '--book-card-spine-height': spineHeight,
        }"
    >
        <div>
            <div class="book-cover">
                <img class="book-cover-image"
                     :src="image"
                     :alt="title"
                     :title="title"
                />
                <p v-show="title" class="card-top">{{ title }}</p>
                <div v-show="logo" class="card-bottom">
                    <img :src="logo">
                </div>
                <p v-show="!logo && author" class="card-bottom">{{ author }}</p>
            </div>
            <div class="book-spine">
                <img class="book-spine-image"
                     :src="spine ? spine : image"
                     :alt="author"
                     :title="author"
                />
                <p v-show="title" class="card-top">{{ title }}</p>
                <div v-show="logo" class="card-bottom">
                    <img :src="logo">
                </div>
                <p v-show="!logo && author" class="card-bottom">{{ author }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BookCard",

    props: {
        title: {
            type: String,
            required: false
        },
        author: {
            type: String,
            required: false
        },
        color: {
            type: String,
            default: () => {
                return '#FFFFFF';
            }
        },
        rotation: {
            type: Number,
            default: () => {
                return 3; // max 7.5
            }
        },
        hover: {
            type: Boolean,
            default: () => {
                return true;
            }
        },

        height: {
            type: Number,
            required: false
        },
        width: {
            type: Number,
            required: false
        },
        ratio: {
            type: String,
            required: false
        },

        image: {
            type: String,
            required: false
        },
        spine: {
            type: String,
            required: false
        },
        spineHeight: {
            type: String,
            default: () => {
                return '50px';
            }
        },
        logo: {
            type: String,
            required: false
        },
    },

    computed: {
        trueHeight(){
            return (this.height ? this.height : this.width ? (this.width * (9/6)) : null);
        },
        trueWidth(){
            return (this.width ? this.width : this.height ? (this.height * (6/9)) : null);
        },
        trueRatio(){
            if(!this.ratio){
                return 0;
            }
            const ratio = this.ratio.split('/');
            return (parseInt(ratio[1]) / parseInt(ratio[0])).toFixed(2);
        }
    }
});
</script>

<style lang="scss">
.book-card {
    position: relative;
    margin: 0 auto;
    color: var(--book-card-color);
    -webkit-perspective: 1200px;
    perspective: 1200px;
    overflow: hidden;
    padding: calc(var(--book-card-rotation) * 2%) 0;    //TODO fare meglio

    img{
        vertical-align: middle;
    }
    & > div {
        width: 100%;
        height: 100%;
        box-shadow: 2px 2px 6px rgba(black, 0.7);
        transition: 0.75s;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        &:after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 5px;
            z-index: 3;
            background: -webkit-linear-gradient(to right, transparent, rgba(black,0.2));
            background: linear-gradient(to right, transparent, rgba(black,0.2));
            transform: translateZ(1px);
        }
    }

    .book-cover {
        .book-cover-image{
            position: relative;
            width: 100%;
        }
        .card-top,
        .card-bottom {
            position: absolute;
            img{
                max-height: 100px;
                max-width: 100px;
            }
        }
        .card-top {
            top: 0;
            left: 0;
        }
        .card-bottom {
            bottom: 0;
            right: 0;
        }
        p{
            white-space: nowrap;
            text-align: left;
            margin: 24px;
            text-shadow: 0 0 4px black;
            &.card-top{
                font-size: 2em;
            }
        }
    }


    .book-spine {
        position: absolute;
        bottom: 0;
        top: 0;
        width: var(--book-card-spine-height);
        z-index: 1;
        overflow: hidden;
        transform: rotateY(-90deg) translateX(calc(-1 * var(--book-card-spine-height)));    // fake error
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;

        .book-spine-image{
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            -o-object-fit: cover;
            z-index: -1;
        }
        .card-top,
        .card-bottom {
            display: block;
            position: absolute;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .card-top {
            top: 0;
        }
        .card-bottom{
            bottom: 0;
        }
        p{
            white-space: nowrap;
            text-align: left;
            left: calc(var(--book-card-spine-height) * 0.75);
            transform: rotateZ(90deg);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
        }
        //SHADOW
        &:before {
            display: block;
            content: "";
            width: 100%;
            height: 100%;
            background: rgba(black, 0.2);
        }
    }

    &.book-custom-aspect-ratio,
    &.book-custom-size{
        .book-cover {
            position: relative;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            .book-cover-image {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                -o-object-fit: cover;
                z-index: -1;
            }
        }
    }

    // if width or height are set
    &.book-custom-size{
        height: var(--book-card-height);
        width: var(--book-card-width);
    }

    &.book-custom-aspect-ratio{
        .book-cover {
            padding-bottom: var(--book-card-ratio);
        }
    }

    &.active,
    &.book-hoverable:hover {
        & > div{
            transform:
                translateX(calc(2px * var(--book-card-rotation)))
                translateZ(calc(7px * var(--book-card-rotation)))
                translateX(calc(7px * var(--book-card-rotation)))
                rotateY(calc(12deg * var(--book-card-rotation)));
        }
    }
}

</style>