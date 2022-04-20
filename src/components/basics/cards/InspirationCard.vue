<!-- https://tympanus.net/Development/HoverEffectIdeas/ -->
<template>
    <figure class="inspiration-card"
            :class="{
                'effect-lily':      type === 'lily',
                'effect-sadie':     type === 'sadie',
                'effect-honey':     type === 'honey',
                'effect-layla':     type === 'layla',
                'effect-zoe':       type === 'zoe',
                'effect-oscar':     type === 'oscar',
                'effect-roxy':      type === 'roxy',
                'effect-bubba':     type === 'bubba',
                'effect-romeo':     type === 'romeo',
                'effect-dexter':    type === 'dexter',
                'effect-sarah':     type === 'sarah',
                'effect-chico':     type === 'chico',
                'effect-milo':      type === 'milo',
                'effect-julia':     type === 'julia',
                'effect-goliath':   type === 'goliath',
                'effect-selena':    type === 'selena',
                'effect-terry':     type === 'terry',
                'effect-apollo':    type === 'apollo',
                'effect-kira':      type === 'kira',
                'effect-steve':     type === 'steve',
                'effect-moses':     type === 'moses',
                'effect-jazz':      type === 'jazz',
                'effect-ming':      type === 'ming',
                'effect-lexi':      type === 'lexi',
                'effect-duke':      type === 'duke',
                'effect-winston':   type === 'winston',
                'effect-marley':    type === 'marley'
            }"
            :style="{
                '--inspiration-card-color': color,
                '--inspiration-card-opacity': opacity,
                '--inspiration-card-background': background,
                '--inspiration-card-background-double': double
            }"
    >
        <slot name="image">
            <img :src="image" :alt="title" />
        </slot>
        <figcaption>
            <div class="card-content">
                <slot name="content">
                    <h2 v-show="title" class="card-title">{{ title }}</h2>
                    <p v-show="text" class="card-text">{{ text }}</p>
                    <div class="card-icon-actions">
                        <slot name="actions"></slot>
                    </div>
                </slot>
            </div>
            <a v-show="url" class="card-action" :href="url"></a>
        </figcaption>
    </figure>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "inspirationCard",

    props: {
        type: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: false
        },
        text: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },

        color: {
            type: String,
            default: () => {
                return '#FFFFFF';
            }
        },
        background: {
            type: String,
            default: () => {
                return '#000000';
            }
        },
        double: {
            type: String,
            default: () => {
                return '#000000';
            }
        },
        opacity: {
            type: Number,
            default: () => {
                return 0.7;
            }
        },
    }
});
</script>

<style lang="scss">
//https://tympanus.net/Development/HoverEffectIdeas/

$inspirationCard-font: 24px;
$inspirationCard-background-1: var(--inspiration-card-background);
$inspirationCard-background-2: var(--inspiration-card-background-double);
$inspirationCard-color: var(--inspiration-card-color);
$inspirationCard-opacity: var(--inspiration-card-opacity);

@mixin inspirationCard-prefix($declarations, $prefixes: ()) {
    @each $property, $value in $declarations {
        @each $prefix in $prefixes {
            #{'-' + $prefix + '-' + $property}: $value;
        }

        // Output standard non-prefixed declaration
        #{$property}: $value;
    }
}

.inspiration-card{
    position: relative;
    list-style: none;
    text-align: center;
    overflow: hidden;
    margin: 0 auto;
    min-height: 300px;
    width: 100%;
    height: 100%;
    background: $inspirationCard-background-1;
    color: $inspirationCard-color;
    cursor: pointer;

    img{
        position: relative;
        display: block;
        height: 100%;
        width: 100%;
        object-fit: cover;
        -o-object-fit: cover;
        opacity: $inspirationCard-opacity;
    }

    a{
        text-decoration: none;
    }

    figcaption {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 2em;
        color: $inspirationCard-color;
        font-size: $inspirationCard-font;
        text-transform: uppercase;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        &::before,
        &::after {
            pointer-events: none;
        }
        // Anchor will cover the whole item by default
        // For some effects it will show as a button
        .card-action {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            text-indent: 200%;
            white-space: nowrap;
            font-size: 0;
            opacity: 0;
        }
    }
    .card-title,
    .card-text {
        margin: 0;
    }
    .card-title {
        font-size: 1.8em;
    }
    .card-text {
        font-size: 0.8em;
    }

    &.effect-lily{
        img {
            max-width: none;
            opacity: 0.9;
            @include inspirationCard-prefix((
                width: calc(100% + 50px),
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-40px, 0, 0)
            ), webkit);
        }
        figcaption {
            text-align: left;
            .card-content {
                position: absolute;
                bottom: 0;
                left: 0;
                padding: 2em;
                width: 100%;
                height: 50%;
            }
        }
        .card-title,
        .card-text {
            @include inspirationCard-prefix((
                transform: translate3d(0,40px, 0)
            ), webkit);
        }
        .card-title {
            @include inspirationCard-prefix((
                transition: transform 0.35s
            ), webkit);
        }
        .card-text {
            color: rgba($inspirationCard-color, 0.8);
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
            ), webkit);
        }
        &.active,
        &:hover{
            img{
                opacity: 0.6;
            }
            .card-text {
                opacity: 1;
            }
            img,
            .card-title,
            .card-text {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-text {
                @include inspirationCard-prefix((
                    transition-delay: 0.05s,
                    transition-duration: 0.35s
                ), webkit);
            }
        }
    }

    &.effect-sadie{
        figcaption{
            &::before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 50%, 0),
                    transition: (opacity 0.35s, transform 0.35s)
                ), webkit);
                background: -webkit-linear-gradient(to bottom, rgba($inspirationCard-background-1, 0) 0%, rgba($inspirationCard-background-1, 0.8) 75%);
                background: linear-gradient(to bottom, rgba($inspirationCard-background-1, 0) 0%, rgba($inspirationCard-background-1, 0.8) 75%);
            }
        }
        .card-title {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            color: $inspirationCard-color;
            @include inspirationCard-prefix((
                transition: (transform 0.35s, color 0.35s),
                transform: translate3d(0,-50%, 0)
            ), webkit);
        }
        .card-text {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 2em;
            width: 100%;
            opacity: 0;
            @include inspirationCard-prefix((
                transform: translate3d(0, 10px, 0),
                transition: (opacity 0.35s, transform 0.35s)
            ), webkit);
        }
        &.active,
        &:hover{
            figcaption{
                &::before{
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: translate3d(0, 0, 0)
                    ), webkit);
                }
            }
            .card-title{
                color: $inspirationCard-color;
                @include inspirationCard-prefix((
                    transform: translate3d(0,-50%, 0) translate3d(0,-40px, 0)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-honey {
        img {
            opacity: 0.9;
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        figcaption{
            &::before {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 10px;
                background: $inspirationCard-color;
                content: '';
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: translate3d(0, 10px, 0)
                ), webkit);
            }
        }
        .card-title,
        .card-text {
            text-align: left;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0,-30px, 0)
            ), webkit);
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 1em 24px;
        }
        &.active,
        &:hover{
            img {
                opacity: 0.5;
            }
            figcaption::before,
            .card-title,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-layla {
        img{
            width: 110%;
            height: 110%;
        }
        figcaption {
            padding: 3em;
            &::before,
            &::after {
                position: absolute;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                ), webkit);
            }
            &::before {
                top: 50px;
                right: 30px;
                bottom: 50px;
                left: 30px;
                border-top: 1px solid $inspirationCard-color;
                border-bottom: 1px solid $inspirationCard-color;
                @include inspirationCard-prefix((
                    transform: scale(0, 1),
                    transform-origin: 0 0
                ), webkit);
            }
            &::after {
                top: 30px;
                right: 50px;
                bottom: 30px;
                left: 50px;
                border-right: 1px solid $inspirationCard-color;
                border-left: 1px solid $inspirationCard-color;
                @include inspirationCard-prefix((
                    transform: scale(1, 0),
                    transform-origin: 100% 0
                ), webkit);
            }
        }
        .card-title {
            padding-top: 26%;
            @include inspirationCard-prefix((
                transition: transform 0.35s
            ), webkit);
        }
        .card-text {
            padding: 0.5em 2em;
            text-transform: none;
            opacity: 0;
            @include inspirationCard-prefix((
                transform: translate3d(0,-10px, 0)
            ), webkit);
        }
        img,
        .card-title {
            @include inspirationCard-prefix((
                transform: translate3d(0,-30px, 0)
            ), webkit);
        }
        img,
        .card-text {
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.7;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            figcaption{
                &::before,
                &::after {
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: scale(1)
                    ), webkit);
                }
                &::after{
                    @include inspirationCard-prefix((
                        transition-delay: 0.15s
                    ), webkit);
                }
            }
            .card-title,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-title,
            .card-text,
            img {
                @include inspirationCard-prefix((
                    transition-delay: 0.15s
                ), webkit);
            }
        }
    }

    &.effect-zoe{
        figcaption{
            top: auto;
            bottom: 0;
            padding: 1em;
            font-size: 1em;
            height: 3.75em;
            background: $inspirationCard-background-1;
            color: $inspirationCard-color;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(0, 100%, 0)
            ), webkit);
            .card-title {
                display: inline-block;
                float: left;
                margin-top: -0.5rem;
                @include inspirationCard-prefix((
                    transition: transform 0.35s,
                    transform: translate3d(0,200%, 0)
                ), webkit);
            }
            .card-icon-actions{
                a {
                    float: right;
                    color: inherit;
                    font-size: 1.4em;
                    margin: 0 10px;
                    @include inspirationCard-prefix((
                        transition: transform 0.35s,
                        transform: translate3d(0,200%, 0)
                    ), webkit);
                    &:hover,
                    &:focus{
                        opacity: 0.5;
                    }
                }
            }
            .card-text {
                position: absolute;
                left: 0;
                bottom: 100%;
                width: 100%;
                padding: 2em;
                color: $inspirationCard-color;
                text-transform: none;
                font-size: 120%;
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: opacity 0.35s,
                    backface-visibility: hidden
                ), webkit);
            }
        }
        &:hover,
        &:focus{
            figcaption,
            .card-title{
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            figcaption{
                .card-text {
                    opacity: 1;
                }
                .card-icon-actions{
                    a{
                        @include inspirationCard-prefix((
                            transform: translate3d(0, 0, 0)
                        ), webkit);
                        &:nth-child(3){
                            @include inspirationCard-prefix((
                                transition-delay: 0.1s
                            ), webkit);
                        }
                        &:nth-child(2){
                            @include inspirationCard-prefix((
                                transition-delay: 0.15s
                            ), webkit);
                        }
                        &:nth-child(1){
                            @include inspirationCard-prefix((
                                transition-delay: 0.2s
                            ), webkit);
                        }
                    }
                }
            }
            .card-title{
                @include inspirationCard-prefix((
                    transition-delay: 0.05s
                ), webkit);
            }
        }
    }

    &.effect-oscar {
        background: -webkit-linear-gradient(45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        background: linear-gradient(45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        img {
            opacity: 0.9;
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        figcaption {
            padding: 3em;
            background-color: rgba($inspirationCard-background-2, 0.6);
            @include inspirationCard-prefix((
                transition: background-color 0.35s
            ), webkit);
            &::before {
                position: absolute;
                top: 30px;
                right: 30px;
                bottom: 30px;
                left: 30px;
                border: 1px solid $inspirationCard-color;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: scale(0)
                ), webkit);
            }
        }
        .card-title {
            margin: 20% 0 10px 0;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(0, 100%, 0)
            ), webkit);
        }
        .card-text {
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale(0)
            ), webkit);
        }
        &.active,
        &:hover{
            figcaption{
                background-color: rgba($inspirationCard-background-2, 0);
                &::before{
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: scale(1)
                    ), webkit);
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: scale(1)
                ), webkit);
            }
            img {
                opacity: 0.4;
            }
            .card-title{
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-marley{
        figcaption{
            text-align: right;
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                background-color: $inspirationCard-background-1;
                @include inspirationCard-prefix((
                    transition: opacity 0.35s
                ), webkit);
            }
        }
        .card-title,
        .card-text {
            position: absolute;
            right: 30px;
            left: 30px;
            padding: 10px 0;
        }
        .card-text {
            bottom: 30px;
            line-height: 1.5;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0, 100%, 0)
            ), webkit);
        }
        .card-title {
            top: 30px;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(0,20px, 0)
            ), webkit);
            &::after {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                height: 4px;
                background: $inspirationCard-color;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: translate3d(0,40px, 0)
                ), webkit);
            }
        }
        &.active,
        &:hover{
            figcaption{
                &::before {
                    opacity: 0.6;
                }
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
                &::after{
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: translate3d(0, 0, 0)
                    ), webkit);
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-ruby {
        img {
            opacity: 0.7;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale(1.15)
            ), webkit);
        }
        .card-title {
            margin-top: 20%;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(0,20px, 0)
            ), webkit);
        }
        .card-text {
            margin: 1em 0 0;
            padding: 3em;
            border: 1px solid $inspirationCard-color;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: (translate3d(0,20px, 0) scale(1.1))
            ), webkit);
        }
        figcaption {
            padding: 2.1em;
        }
        &.active,
        &:hover{
            img {
                opacity: 0.5;
                @include inspirationCard-prefix((
                    transform: scale(1)
                ), webkit);
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-roxy {
        background: -webkit-linear-gradient(45deg, $inspirationCard-background-1 0%,$inspirationCard-background-2 100%);
        background: linear-gradient(45deg, $inspirationCard-background-1 0%,$inspirationCard-background-2 100%);
        img {
            max-width: none;
            @include inspirationCard-prefix((
                width: calc(100% + 60px),
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-50px, 0, 0)
            ), webkit);
        }
        figcaption {
            padding: 3em;
            text-align: left;
            &::before {
                position: absolute;
                top: 30px;
                right: 30px;
                bottom: 30px;
                left: 30px;
                border: 1px solid $inspirationCard-color;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: translate3d(-20px, 0, 0)
                ), webkit);
            }
        }
        .card-title {
            padding: 30% 0 10px 0;
        }
        .card-text {
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-10px, 0, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.7;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            figcaption::before,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-bubba {
        img{
            opacity: 0.7;
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        figcaption{
            &::before,
            &::after {
                position: absolute;
                top: 30px;
                right: 30px;
                bottom: 30px;
                left: 30px;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s)
                ), webkit);
            }
            &::before {
                border-top: 1px solid $inspirationCard-color;
                border-bottom: 1px solid $inspirationCard-color;
                @include inspirationCard-prefix((
                    transform: scale(0, 1)
                ), webkit);
            }
            &::after {
                border-right: 1px solid $inspirationCard-color;
                border-left: 1px solid $inspirationCard-color;
                @include inspirationCard-prefix((
                    transform: scale(1, 0)
                ), webkit);
            }
            .card-title {
                padding-top: 30%;
                @include inspirationCard-prefix((
                    transition: transform 0.35s,
                    transform: translate3d(0,-20px, 0)
                ), webkit);
            }
            .card-text {
                padding: 20px 2.5em;
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: translate3d(0,20px, 0)
                ), webkit);
            }
        }
        &.active,
        &:hover{
            img {
                opacity: 0.4;
            }
            figcaption{
                &::before,
                &::after {
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: scale(1)
                    ), webkit);
                }
            }
            .card-title,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-romeo {
        @include inspirationCard-prefix((
            perspective: 1000px
        ), webkit);
        img {
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0, 0,300px)
            ), webkit);
        }
        figcaption{
            &::before,
            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 80%;
                height: 1px;
                background: $inspirationCard-color;
                content: '';
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: translate3d(-50%,-50%, 0)
                ), webkit);
            }
        }
        .card-title,
        .card-text {
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            @include inspirationCard-prefix((
                transition: transform 0.35s
            ), webkit);
        }
        .card-title {
            @include inspirationCard-prefix((
                transform: (translate3d(0,-50%, 0) translate3d(0,-150%, 0))
            ), webkit);
        }
        .card-text {
            padding: 0.25em 2em;
            @include inspirationCard-prefix((
                transform: (translate3d(0,-50%, 0) translate3d(0, 150%, 0))
            ), webkit);
        }
        &.active,
        &:hover{
            img{
                opacity: 0.6;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            figcaption{
                &::before,
                &::after {
                    opacity: 0.5;
                }
                &::before {
                    @include inspirationCard-prefix((
                        transform: (translate3d(-50%,-50%, 0) rotate(45deg))
                    ), webkit);
                }
                &::after {
                    @include inspirationCard-prefix((
                        transform: (translate3d(-50%,-50%, 0) rotate(-45deg))
                    ), webkit);
                }
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: (translate3d(0,-50%, 0) translate3d(0,-100%, 0))
                ), webkit);
            }
            .card-text {
                @include inspirationCard-prefix((
                    transform: (translate3d(0,-50%, 0) translate3d(0, 100%, 0))
                ), webkit);
            }
        }
    }

    &.effect-dexter {
        background: -webkit-linear-gradient(to bottom, $inspirationCard-background-1 0%,$inspirationCard-background-2 100%);
        background: linear-gradient(to bottom, $inspirationCard-background-1 0%,$inspirationCard-background-2 100%);
        img {
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        figcaption{
            padding: 3em;
            text-align: left;
            &::after {
                position: absolute;
                right: 30px;
                bottom: 30px;
                left: 30px;
                border: 7px solid $inspirationCard-color;
                content: '';
                @include inspirationCard-prefix((
                    height: calc(50% - 30px),
                    transition: transform 0.35s,
                    transform: translate3d(0,-100%, 0)
                ), webkit);
            }
        }
        .card-text {
            position: absolute;
            right: 60px;
            bottom: 60px;
            left: 60px;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0,-100px, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.4;
            }
            figcaption{
                &::after {
                    @include inspirationCard-prefix((
                        transform: translate3d(0, 0, 0)
                    ), webkit);
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-sarah {
        img {
            max-width: none;
            @include inspirationCard-prefix((
                width: calc(100% + 20px),
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-10px, 0, 0),
                backface-visibility: hidden
            ), webkit);
        }
        figcaption {
            text-align: left;
        }
        .card-title {
            position: relative;
            overflow: hidden;
            padding: 0.5em 0;
            &::after {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: $inspirationCard-color;
                content: '';
                @include inspirationCard-prefix((
                    transition: transform 0.35s,
                    transform: translate3d(-100%, 0, 0)
                ), webkit);
            }
        }
        .card-text {
            padding: 1em 0;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(100%, 0, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.4;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-title{
                &::after {
                    @include inspirationCard-prefix((
                        transform: translate3d(0, 0, 0)
                    ), webkit);
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-chico{
        img{
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale(1.12)
            ), webkit);
        }
        figcaption {
            padding: 3em;
            &::before {
                position: absolute;
                top: 30px;
                right: 30px;
                bottom: 30px;
                left: 30px;
                border: 1px solid $inspirationCard-color;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: scale(1.1)
                ), webkit);
            }
        }
        .card-title {
            padding: 20% 0 20px 0;
        }
        .card-text {
            margin: 0 auto;
            max-width: 200px;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale(1.5)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.5;
                @include inspirationCard-prefix((
                    transform: scale(1)
                ), webkit);
            }
            figcaption::before,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: scale(1)
                ), webkit);
            }
        }
    }

    &.effect-milo {
        img {
            max-width: none;
            opacity: 1;
            @include inspirationCard-prefix((
                width: calc(100% + 60px),
                transition: (opacity 0.35s, transform 0.35s),
                transform: (translate3d(-30px, 0, 0) scale(1.12)),
                backface-visibility: hidden
            ), webkit);
        }
        .card-title {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 1em 1.2em;
        }
        .card-text {
            padding: 0 10px 0 0;
            width: 50%;
            border-right: 1px solid $inspirationCard-color;
            text-align: right;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-40px, 0, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.5;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-julia {
        img {
            max-width: none;
            @include inspirationCard-prefix((
                transition: (opacity 1s, transform 1s),
                backface-visibility: hidden
            ), webkit);
        }
        figcaption {
            text-align: left;
        }
        .card-title {
            position: relative;
            padding: 0.5em 0;
        }
        .card-text {
            display: inline-block;
            margin: 0 0 0.25em;
            padding: 0.4em 1em;
            background: $inspirationCard-background-1;
            color: $inspirationCard-color;
            text-transform: none;
            font-weight: 500;
            font-size: 75%;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-120%, 0, 0)
            ), webkit);
            &:nth-of-type(1) {
                @include inspirationCard-prefix((
                    transition-delay: 0.15s
                ), webkit);
            }
            &:nth-of-type(2) {
                @include inspirationCard-prefix((
                    transition-delay: 0.1s
                ), webkit);
            }
            &:nth-of-type(3) {
                @include inspirationCard-prefix((
                    transition-delay: 0.05s
                ), webkit);
            }
        }
        &.active,
        &:hover{
            img {
                opacity: 0.4;
                @include inspirationCard-prefix((
                    transform: scale3d(1.1, 1.1, 1)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
                &:nth-of-type(1) {
                    @include inspirationCard-prefix((
                        transition-delay: 0s
                    ), webkit);
                }
                &:nth-of-type(2) {
                    @include inspirationCard-prefix((
                        transition-delay: 0.05s
                    ), webkit);
                }
                &:nth-of-type(3) {
                    @include inspirationCard-prefix((
                        transition-delay: 0.1s
                    ), webkit);
                }
            }
        }
    }

    &.effect-goliath {
        img,
        .card-title {
            @include inspirationCard-prefix((
                transition: transform 0.35s
            ), webkit);
        }
        img {
            @include inspirationCard-prefix((
                backface-visibility: hidden
            ), webkit);
        }
        .card-title,
        .card-text {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 30px;
        }
        .card-text {
            text-transform: none;
            font-size: 90%;
            opacity: 0;
            background: $inspirationCard-background-1;
            text-align: left;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0, 50px, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                @include inspirationCard-prefix((
                    transform: translate3d(0,-80px, 0)
                ), webkit);
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0,-100px, 0)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-selena {
        img {
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform-origin: 50% 50%
            ), webkit);
        }
        .card-text {
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: (perspective(1000px) rotate3d(1, 0, 0,90deg)),
                transform-origin: 50% 0%
            ), webkit);
        }
        .card-title{
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(0,20px, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img{
                @include inspirationCard-prefix((
                    transform: scale3d(0.95, 0.95, 1)
                ), webkit);
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: (perspective(1000px) rotate3d(1, 0, 0, 0))
                ), webkit);
            }
        }
    }

    &.effect-terry {
        figcaption {
            padding: 1em;
            &::before,
            &::after {
                position: absolute;
                width: 200%;
                height: 200%;
                border-style: solid;
                border-color: $inspirationCard-background-1;
                content: '';
                @include inspirationCard-prefix((
                    transition: transform 0.35s
                ), webkit);
            }
            &::before {
                right: 0;
                bottom: 0;
                border-width: 0 70px 60px 0;
                @include inspirationCard-prefix((
                    transform: translate3d(70px,60px, 0)
                ), webkit);
            }
            &::after {
                top: 0;
                left: 0;
                border-width: 15px 0 0 15px;
                @include inspirationCard-prefix((
                    transform: translate3d(-15px,-15px, 0)
                ), webkit);
            }
        }
        img{
            opacity: 0.85;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s)
            ), webkit);
        }
        .card-icon-actions {
            float: right;
            clear: both;
            text-align: left;
            text-transform: none;
            font-size: 111%;
            a {
                display: block;
                margin-bottom: 1em;
                color: $inspirationCard-color;
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: translate3d(90px, 0, 0)
                ), webkit);
                &:hover,
                &:focus {
                    i,
                    .icon{
                        color: rgba($inspirationCard-color, 0.54) !important;
                    }
                }
            }
        }
        .card-title {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 20px;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(80%, 0, 0)
            ), webkit);
        }
        .card-text{
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 20px;
            width: 100%;
            text-align: left;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(100%, 0, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.6;
            }
            figcaption::after,
            figcaption::before,
            .card-text {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0, -35%, 0)
                ), webkit);
            }
            .card-icon-actions {
                a{
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: translate3d(0, 0, 0)
                    ), webkit);
                    &:nth-child(1){
                        @include inspirationCard-prefix((
                            transition-delay: 0.025s
                        ), webkit);
                    }
                    &:nth-child(2){
                        @include inspirationCard-prefix((
                            transition-delay: 0.05s
                        ), webkit);
                    }
                    &:nth-child(3){
                        @include inspirationCard-prefix((
                            transition-delay: 0.075s
                        ), webkit);
                    }
                    &:nth-child(4){
                        @include inspirationCard-prefix((
                            transition-delay: 0.1s
                        ), webkit);
                    }
                }
            }
        }
    }

    &.effect-apollo {
        img {
            opacity: 0.95;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale3d(1.05, 1.05, 1),
            ), webkit);
        }
        figcaption{
            &::before {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba($inspirationCard-color, 0.5);
                content: '';
                @include inspirationCard-prefix((
                    transition: transform 0.6s,
                    transform: (scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1,45deg) translate3d(0,-100%, 0))
                ), webkit);
            }
        }
        .card-text {
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 3em;
            padding: 0 1em;
            max-width: 150px;
            border-right: 4px solid $inspirationCard-color;
            text-align: right;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        .card-title {
            text-align: left;
        }
        &.active,
        &:hover{
            img {
                opacity: 0.6;
                @include inspirationCard-prefix((
                    transform: scale3d(1, 1, 1)
                ), webkit);
            }
            figcaption{
                &::before {
                    @include inspirationCard-prefix((
                        transform: (scale3d(1.9, 1.4, 1) rotate3d(0, 0, 1,45deg) translate3d(0, 100%, 0))
                    ), webkit);
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transition-delay: 0.1s
                ), webkit);
            }
        }
    }

    &.effect-kira {
        text-align: left;
        img {
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        figcaption {
            z-index: 1;
        }
        .card-title{
            font-size: 1.5em;
        }
        .card-text{
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 1em 2em;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0, 4em, 0)
            ), webkit);
        }
        .card-icon-actions {
            padding: 1.5em 0.5em 0.5em 0.5em;
            font-weight: 600;
            font-size: 100%;
            line-height: 1.5;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0,-10px, 0)
            ), webkit);
            a {
                margin: 0 0.5em;
                color: $inspirationCard-color;
                &:hover,
                &:focus{
                    opacity: 0.6;
                }
            }
        }
        figcaption{
            &::before {
                position: absolute;
                top: 0;
                right: 2em;
                left: 2em;
                z-index: -1;
                height: 3em;
                background: $inspirationCard-color;
                content: '';
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s, background 0.35s),
                    transform: (translate3d(0,4em, 0) scale3d(1, 0.023, 1)),
                    transform-origin: 50% 0
                ), webkit);
            }
        }
        &.active,
        &:hover{
            img {
                opacity: 0.7;
            }
            .card-text{
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-icon-actions {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            figcaption{
                &::before {
                    background: $inspirationCard-background-1;
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: (translate3d(0, 5em, 0) scale3d(1, 1, 1))
                    ), webkit);
                }
            }
        }
    }

    &.effect-steve {
        z-index: auto;
        &::before,
        .card-title::before {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: $inspirationCard-background-1;
            content: '';
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        &::before {
            opacity: 0;
            @include inspirationCard-prefix((
                box-shadow: 0 3px 30px rgba(0, 0, 0, 0.8)
            ), webkit);
        }
        figcaption {
            z-index: 1;
        }
        img {
            opacity: 1;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: (perspective(1000px) translate3d(0, 0, 0)),
            ), webkit);
        }
        .card-title,
        .card-text {
            background: $inspirationCard-background-1;
            color: $inspirationCard-color;
        }
        .card-title {
            position: relative;
            margin-top: 2em;
            padding: 0.25em;
            &::before {
                @include inspirationCard-prefix((
                    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5)
                ), webkit);
            }
        }
        .card-text {
            margin-top: 1em;
            padding: 0.5em;
            font-weight: 800;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale3d(0.9, 0.9, 1),
            ), webkit);
        }
        &.active,
        &:hover{
            &::before {
                opacity: 1;
            }
            img {
                @include inspirationCard-prefix((
                    transform: (perspective(1000px) translate3d(0, 0,21px))
                ), webkit);
            }
            .card-title{
                &:before {
                    opacity: 0;
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: scale3d(1, 1, 1)
                ), webkit);
            }
        }
    }

    &.effect-moses {
        background: -webkit-linear-gradient(-45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        background: linear-gradient(-45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        img {
            opacity: 0.85;
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        .card-title,
        .card-text {
            padding: 20px;
            width: 50%;
            height: 50%;
            border: 2px solid $inspirationCard-color;
        }
        .card-title {
            padding: 20px;
            width: 50%;
            height: 50%;
            text-align: left;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(10px, 10px, 0)
            ), webkit);
        }
        .card-text {
            float: right;
            padding: 20px;
            text-align: right;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(-50%,-50%, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            img {
                opacity: 0.6;
            }
        }
    }

    &.effect-jazz {
        background: -webkit-linear-gradient(-45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        background: linear-gradient(-45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        img {
            opacity: 0.9;
        }
        img,
        .card-text {
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s)
            ), webkit);
        }
        figcaption{
            &::after{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-top: 1px solid $inspirationCard-color;
                border-bottom: 1px solid $inspirationCard-color;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: (rotate3d(0, 0, 1,45deg) scale3d(1, 0, 1)),
                    transform-origin: 50% 50%
                ), webkit);
            }
        }
        .card-title,
        .card-text {
            opacity: 1;
            @include inspirationCard-prefix((
                transform: scale3d(0.8, 0.8, 1)
            ), webkit);
        }
        .card-title {
            padding-top: 26%;
            @include inspirationCard-prefix((
                transition: transform 0.35s
            ), webkit);
        }
        .card-text {
            padding: 0.5em 2em;
            text-transform: none;
            opacity: 0;
        }
        &.active,
        &:hover{
            img {
                opacity: 0.7;
                @include inspirationCard-prefix((
                    transform: scale3d(1.05, 1.05, 1)
                ), webkit);
            }
            figcaption{
                &::after {
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: (rotate3d(0, 0, 1,45deg) scale3d(1, 1, 1))
                    ), webkit);
                }
            }
            .card-title,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: scale3d(1, 1, 1)
                ), webkit);
            }
        }
    }

    &.effect-ming {
        img {
            opacity: 0.9;
            @include inspirationCard-prefix((
                transition: opacity 0.35s
            ), webkit);
        }
        figcaption{
            &::before {
                position: absolute;
                top: 30px;
                right: 30px;
                bottom: 30px;
                left: 30px;
                border: 2px solid $inspirationCard-color;
                box-shadow: 0 0 0 30px rgba($inspirationCard-color, 0.2);
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    transform: scale3d(1.4, 1.4, 1)
                ), webkit);
            }
        }
        .card-title {
            margin: 20% 0 10px 0;
            @include inspirationCard-prefix((
                transition: transform 0.35s
            ), webkit);
        }
        .card-text {
            padding: 1em;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: scale(1.5)
            ), webkit);
        }
        &.active,
        &:hover{
            .card-title {
                @include inspirationCard-prefix((
                    transform: scale(0.9)
                ), webkit);
            }
            figcaption{
                background-color: rgba($inspirationCard-background-1, 0);
                &::before{
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: scale3d(1, 1, 1)
                    ), webkit);
                }
            }
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: scale3d(1, 1, 1)
                ), webkit);
            }
            img {
                opacity: 0.4;
            }
        }
    }

    &.effect-lexi {
        background: -webkit-linear-gradient(-45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        background: linear-gradient(-45deg, $inspirationCard-background-1 0%, $inspirationCard-background-2 100%);
        img {
            // margin: -10px 0 0 -10px;
            max-width: none;
            opacity: 0.9;
            @include inspirationCard-prefix((
                width: calc(100% + 10px),
                transition: (opacity 0.35s, transform 0.35s),
                // transform: translate3d(10px, 10px, 0),
                transform: scale(1.2),
                backface-visibility: hidden
            ), webkit);
        }
        .card-title{
            text-align: left;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(5px, 5px, 0)
            ), webkit);
        }
        figcaption{
            &::before{
                position: absolute;
                right: -25%;
                bottom: -25%;
                width: 75%;
                height: 75%;
                border: 2px solid $inspirationCard-color;
                border-radius: 50%;
                content: '';
                opacity: 0;
                @include inspirationCard-prefix((
                    transition: (opacity 0.35s, transform 0.35s),
                    box-shadow: 0 0 0 900px rgba(white, 0.2),
                    transform: scale3d(0.5, 0.5, 1),
                    transform-origin: 50% 50%,
                ), webkit);
            }
        }
        .card-text {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 0 1.5em 1.5em 0;
            width: 140px;
            text-align: right;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(20px,20px, 0)
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.6;
                @include inspirationCard-prefix((
                    transform: scale(1)
                ), webkit);
            }
            figcaption{
                &::before {
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: scale3d(1, 1, 1)
                    ), webkit);
                }
            }
            .card-title,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
        }
    }

    &.effect-duke {
        background: linear-gradient(-45deg, $inspirationCard-background-1 0%,$inspirationCard-background-2 100%);
        background: -webkit-linear-gradient(-45deg, $inspirationCard-background-1 0%,$inspirationCard-background-2 100%);
        img,
        .card-text {
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
            ), webkit);
        }
        .card-title {
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: scale3d(0.8, 0.8, 1),
                transform-origin: 50% 100%
            ), webkit);
        }
        .card-text {
            position: absolute;
            bottom: 0;
            left: 0;
            margin: 20px;
            padding: 30px;
            border: 2px solid $inspirationCard-color;
            text-transform: none;
            font-size: 90%;
            opacity: 0;
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: scale3d(0.8, 0.8, 1),
                transform-origin: 50% -100%
            ), webkit);
        }
        &.active,
        &:hover{
            img {
                opacity: 0.1;
                @include inspirationCard-prefix((
                    transform: scale3d(2,2, 1)
                ), webkit);
            }
            .card-title,
            .card-text {
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: scale3d(1, 1, 1)
                ), webkit);
            }
        }
    }

    &.effect-winston {
        text-align: left;
        img {
            @include inspirationCard-prefix((
                transition: opacity 0.45s,
                backface-visibility: hidden
            ), webkit);
        }
        figcaption{
            &::before {
                content: '';
                position: absolute;
                bottom: -50%;
                left: 0;
                width: 200%;
                height: 50%;
                background: $inspirationCard-background-1;
                @include inspirationCard-prefix((
                    transition: (opacity 0.45s, transform 0.45s),
                    transform: rotate(0deg),
                    transform-origin: 0 100%
                ), webkit);
            }
        }
        .card-title {
            @include inspirationCard-prefix((
                transition: transform 0.35s,
                transform: translate3d(0,20px, 0)
            ), webkit);
        }
        .card-text{
            opacity: 0;
            @include inspirationCard-prefix((
                transition: (opacity 0.35s, transform 0.35s),
                transform: translate3d(0, 50px, 0)
            ), webkit);
        }
        .card-icon-actions {
            position: absolute;
            right: 0;
            bottom: 0;
            padding: 0 1.5em 7% 0;
            a{
                margin: 0 10px;
                color: $inspirationCard-color;
                font-size: 1.5em;
                &:hover,
                &:focus{
                    opacity: 0.4;
                }
                & > *{
                    color: inherit;
                    opacity: 0;
                    @include inspirationCard-prefix((
                        transition: (opacity 0.35s, transform 0.35s),
                        transform: translate3d(0, 50px, 0)
                    ), webkit);
                }
            }
        }
        &.active,
        &:hover{
            img {
                opacity: 0.6;
            }
            .card-title {
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-text{
                opacity: 1;
                @include inspirationCard-prefix((
                    transform: translate3d(0, 0, 0)
                ), webkit);
            }
            .card-icon-actions{
                i {
                    opacity: 1;
                    @include inspirationCard-prefix((
                        transform: translate3d(0, 0, 0)
                    ), webkit);
                }
                a{
                    &:nth-child(3){
                        i{
                            @include inspirationCard-prefix((
                                transition-delay: 0.05s
                            ), webkit);
                        }
                    }
                    &:nth-child(2){
                        i{
                            @include inspirationCard-prefix((
                                transition-delay: 0.1s
                            ), webkit);
                        }
                    }
                    &:nth-child(1){
                        i{
                            @include inspirationCard-prefix((
                                transition-delay: 0.15s
                            ), webkit);
                        }
                    }
                }
            }
            figcaption{
                &::before {
                    opacity: 0.7;
                    @include inspirationCard-prefix((
                        transform: rotate(-20deg)
                    ), webkit);
                }
            }
        }
    }
}
</style>