<template>
    <!-- Menu Start -->
    <div class="px-8 hidden lg:block">
        <nav>
            <ul class="flex">
                <li class="relative mr-14 group z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100">
                    <router-link to="/" class="text-white uppercase font-bold font-exo relative">Home</router-link>
                </li>
                <li class="relative mr-14 group z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100">

                    <router-link to="/" class="text-white uppercase font-bold font-exo relative">Match</router-link>
                    <ul class="flex flex-col bg-white absolute w-56 px-5 py-5 rounded left-0 right-auto top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all group-hover:top-9">
                        <li>
                            <router-link to="/match" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Match Page</router-link>
                        </li>
                        <li>
                            <router-link to="/match/1" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Match Details</router-link>
                        </li>
                    </ul>

                </li>
                <li class="relative mr-14 group z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100">

                    <router-link to="/" class="text-white uppercase font-bold font-exo relative">Pages</router-link>
                    <ul class="flex flex-col bg-white absolute w-56 px-5 py-5 rounded left-0 right-auto top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all group-hover:top-9">
                        <li>
                            <router-link to="/about" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">About Us</router-link>
                        </li>
                        <li>
                            <router-link to="/game" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">All Games</router-link>
                        </li>
                        <li>
                            <router-link to="/game/1" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Game Details</router-link>
                        </li>
                        <li>
                            <router-link to="/player" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Players</router-link>
                        </li>
                        <li>
                            <router-link to="/player/1" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Player Details</router-link>
                        </li>
                        <li>
                            <router-link to="/FAQ" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">FAQ</router-link>
                        </li>
                        <li>
                            <router-link to="/404Error" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">404-Error</router-link>
                        </li>
                        <li>
                            <router-link to="/signup" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">SignUp</router-link>
                        </li>
                    </ul>

                </li>
                <li class="relative mr-14 group z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100">
                    <router-link to="/" class="text-white uppercase font-bold font-exo relative">Blog</router-link>
                    <ul class="flex flex-col bg-white absolute w-56 px-5 py-5 rounded left-0 right-auto top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all group-hover:top-9">
                        <li>
                            <router-link to="/blog-without-sidebar" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Without Sidebar Page</router-link>
                        </li>
                        <li>
                            <router-link to="/blog-right-sidebar" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Right Sidebar</router-link>
                        </li>
                        <li>
                            <router-link to="/blog-left-sidebar" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Left Sidebar</router-link>
                        </li>
                        <li>
                            <router-link to="/blog-grid-right-sidebar" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Grid Right Sidebar</router-link>
                        </li>
                        <li>
                            <router-link to="/blog-grid-left-sidebar" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Grid Left Sidebar</router-link>
                        </li>
                        <li>
                            <router-link to="/blog-grid-without-sidebar" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Grid Without Sidebar</router-link>
                        </li>
                        <li>
                            <router-link to="/blog/1" class="text-sm font-medium block leading-8 capitalize text-black transition-all hover:text-primary">Blog Details</router-link>
                        </li>
                    </ul>
                </li>
                <li class="relative mr-14 z-10 before:bg-nav-shape before:content-[''] before:absolute before:w-23.5 before:h-11 before:z-n1 before:top-1/2 before:left-1/2 before:transform before:-translate-x-2/4 before:-translate-y-2/4 before:transition-all before:opacity-0 hover:before:opacity-100">
                    <router-link to="/contact" class="text-white uppercase font-bold font-exo relative">Contact</router-link>
                </li>
            </ul>
        </nav>
    </div>
    <!-- Menu End -->
</template>