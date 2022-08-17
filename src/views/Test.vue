<template>
	<div id="test-page">
		<br /><br /><br />
		<br /><br /><br />
		<br /><br /><br />

		<section class="theme-section">
			<v-row
				justify="center"
			>
				<v-col cols="12" md="8" lg="6" xl="4">
					<PanelSwitch
						v-model="panelSwitchMode"
						:image="'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/sections-3.jpg'"
					>
						<template #primary-content>
							<h1>PRIMARY</h1>
							<br><br><br>
							<br><br><br>
							<br><br><br>
							<br><br><br>
							<br><br><br>
							<br><br><br>
						</template>
						<template #secondary-content>
							<h1>PRIMARY SWITCH</h1>
						</template>
						<template #primary-switch>
							<h1>SECONDARY SWITCH</h1>
						</template>
						<template #secondary-switch>
							<h1>SECONDARY</h1>
						</template>
					</PanelSwitch>
				</v-col>
			</v-row>
		</section>

		<section class="theme-section pa-0 bg-secondary">
			<PanoramicCard
				image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jelly.png"
				background="https://s3-us-west-2.amazonaws.com/s.cdpn.io/908370/jelly-back.png"
			/>
		</section>

		<section class="theme-section">
			<LeafletMap
				:center="[44.7793747, 10.8807905]"
				:icons="[
                {
                    name: 'leaf',
                    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
                    iconSize:     [38, 95], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                },
                {
                    name: 'logo',
                    iconUrl: 'https://assets.guebbit.com/vrmetagames/images/logo/logo.png',
                    iconSize: [40, 50]
                }
            ]"
				:markers="[
                {
                    coordinates: [44.7893747, 10.8907905],
                    options: { alt: 'lorem-ipsum-1' }
                },
                {
                    coordinates: [44.7993747, 10.8807905],
                    icon: 'logo',
                    options: { alt: 'lorem-ipsum-2' }
                },
                {
                    coordinates: [44.7793747, 10.8807905],
                    icon: 'leaf',
                    options: { alt: 'lorem-ipsum-3' }
                },
            ]"
				:draw="[
                {
                    type: 'circle',
                    coordinates: [[44.7793747, 10.7807905]],
                    options: {
                        color: themeColors.secondary,
                        fillColor: themeColors.secondary,
                        fillOpacity: 1,
                        radius: 10
                    }
                },
                {
                    type: 'polygon',
                    coordinates: [
                        [44.7793747, 10.7807905],
                        [44.8793747, 10.8807905],
                        [44.9793747, 10.9807905]
                    ],
                }
            ]"
			/>
			<v-row>
				<v-col cols="12" md="6" lg="3">
					<h1>Stiamaps Dark</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
						mapAttribution='<a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
						:mapOptions="{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                      }"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<h1>Google Maps Classic</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
						mapAttribution="© Google"
						:mapOptions="{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                      }"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<h1>Satellite</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
						mapAttribution="© Google"
						:mapOptions="{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                      }"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<h1>Hybrid</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
						mapAttribution="© Google"
						:mapOptions="{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                      }"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<h1>Stamen Toner</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png"
						mapAttribution="© Stamen"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<h1>Stamen Terrain</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png"
						mapAttribution="© Stamen"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<h1>Stamen Watercolor</h1>
					<LeafletMap
						:center="[44.7793747, 10.8807905]"
						map="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
						mapAttribution="© Stamen"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">


				</v-col>
			</v-row>
		</section>

		<section class="theme-section">
			<v-row>
				<v-col cols="12" md="6" lg="3">
					<SimpleUserCard
						:background="'http://placekitten.com/1200/800'"
						:image="'http://placekitten.com/400/400'"
						:title="'Lorem Ipsum'"
						:subtitle="'Creative Manager'"
						:info="{
                            followers: 323,
                            following: 290,
                            stories: 22,
                        }"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<SimpleUserCard
						:image="'http://placekitten.com/400/400'"
						:title="'Lorem Ipsum'"
						:subtitle="'Creative Manager'"
						:info="{
                            followers: 323
                        }"
					/>
				</v-col>
				<v-col cols="12" md="6" lg="3">
					<SimpleUserCard
						:title="'Lorem Ipsum'"
						:subtitle="'Creative Manager'"
						:info="{
                            followers: 323,
                            following: 290
                        }"
					/>
				</v-col>
			</v-row>
		</section>

		<section class="theme-section">
			<v-container>
				<ActionPanel
					class="py-10"
					:title="'LOREM IPSUM SIT DOLOR AMET'"
					@button:click="() => {}"
				>
					<template #background>
						<video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
							<source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4"
								type="video/mp4">
						</video>
					</template>
					<template #action>
						<InclinedButton
							class="panel-button"
							size="x-large"
							:double="themeColors.primary"
						>
							Lorem Ipsum
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</InclinedButton>
					</template>
				</ActionPanel>

				<v-row class="mt-5 four-panels">
					<v-col cols="12" md="6" lg="3">
						<Panel
							class="px-10 py-15 text-center"
							centered-bottom
						>
							<template #background>
								<video class="panel-background" preload="metadata" playsinline="" muted="" loop=""
									autoplay="">
									<source
										src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4"
										type="video/mp4">
								</video>
							</template>
							<template #default>
								<h3 class="theme-section-subtitle">
									LOREM IPSUM SIT DOLOR AMET
								</h3>
								<InclinedButton
									class="panel-button mt-10"
									size="x-large"
									:double="themeColors.primary"
									:to="{ name: 'AboutUs' }"
								>
									LOREM
									<font-awesome-icon :icon="['fas', 'arrow-right']" />
								</InclinedButton>
							</template>
						</Panel>
					</v-col>
					<v-col cols="12" md="6" lg="3">
						<Panel
							class="horizontal-iframe px-10 py-15 text-center"
							centered-bottom
						>
							<template #background>
								<div class="panel-background">
									<div>
										<iframe
											src="https://www.youtube.com/embed/iRwAekCcFow?playlist=iRwAekCcFow&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
											frameborder="0"
											allowfullscreen=""
											autoplay=""
											mute=""
											loop=""
										></iframe>
									</div>
								</div>
							</template>
							<template #default>
								<h3 class="theme-section-subtitle">
									LOREM IPSUM SIT DOLOR AMET
								</h3>
								<InclinedButton
									class="panel-button mt-10"
									size="x-large"
									:double="themeColors.secondary"
									:to="{ name: 'AboutVr' }"
								>
									LOREM
									<font-awesome-icon :icon="['fas', 'arrow-right']" />
								</InclinedButton>
							</template>
						</Panel>
					</v-col>
					<v-col cols="12" md="6" lg="3">
						<Panel
							class="horizontal-iframe px-10 py-15 text-center"
							centered-bottom
						>
							<template #background>
								<div class="panel-background">
									<div>
										<iframe
											src="https://www.youtube.com/embed/8ZHneHI8ooY?playlist=8ZHneHI8ooY&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
											frameborder="0"
											allowfullscreen=""
											autoplay=""
											mute=""
											loop=""
										></iframe>
									</div>
								</div>
							</template>
							<template #default>
								<h3 class="theme-section-subtitle">
									LOREM IPSUM SIT DOLOR AMET
								</h3>
								<InclinedButton
									class="panel-button mt-10"
									size="x-large"
									:double="themeColors.primary"
									:to="{ name: 'Games' }"
								>
									LOREM
									<font-awesome-icon :icon="['fas', 'arrow-right']" />
								</InclinedButton>
							</template>
						</Panel>
					</v-col>
					<v-col cols="12" md="6" lg="3">
						<Panel
							class="vertical-iframe px-10 py-15 text-center"
							centered-bottom
						>
							<template #background>
								<div class="panel-background">
									<div>
										<iframe
											src="https://www.youtube.com/embed/bdPZ2Cu1vNU?playlist=bdPZ2Cu1vNU&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
											frameborder="0"
											allowfullscreen=""
											autoplay=""
											mute=""
											loop=""
										></iframe>
									</div>
								</div>
							</template>
							<template #default>
								<h3 class="theme-section-subtitle">
									LOREM IPSUM SIT DOLOR AMET
								</h3>
								<InclinedButton
									class="panel-button mt-10"
									size="x-large"
									:double="themeColors.secondary"
									:to="{ name: 'Play' }"
								>
									LOREM
									<font-awesome-icon :icon="['fas', 'arrow-right']" />
								</InclinedButton>
							</template>
						</Panel>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<ActionPanel
			:height="'400px'"
			:title="'VIDEO YOUTUBE LOOP'"
			@button:click="() => {}"
		>
			<template #background>
				<div class="panel-background">
					<div>
						<iframe
							src="https://www.youtube.com/embed/iRwAekCcFow?playlist=iRwAekCcFow&controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
							frameborder="0"
							allowfullscreen=""
							autoplay=""
							mute=""
							loop=""
						></iframe>
					</div>
				</div>
			</template>
			<template #action>
				<InclinedButton
					class="panel-button"
					size="x-large"
					:double="themeColors.primary"
				>
					Lorem Ipsum
					<font-awesome-icon :icon="['fas', 'arrow-right']" />
				</InclinedButton>
			</template>
		</ActionPanel>

		<ScheduleFormCard
			:id="'item1'"
		/>
		<EventLongCard
			:time="Date.now()"
			image="https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png"
			:color="themeColors.primary"
			background="#FFFFFF"
			text="#3c3c3c"
			facebook="#"
			instagram="#"
			tiktok="#"
		>
			<h3 class="card-title">Independence Day</h3>
			<h5 class="card-subtitle">United States Holiday</h5>
			<p class="card-desc">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
			</p>
		</EventLongCard>

		<EventLongCard
			:time="Date.now()"
			:color="themeColors.secondary"
			background="#FFFFFF"
			text="#3c3c3c"
		>
			<h3 class="card-title">Independence Day</h3>
			<v-btn color="primary"
				elevation="24"
			>
				Button
			</v-btn>
		</EventLongCard>

		<HyperplexedCard
			image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/btc.svg"
			primary="#ff6f00"
			secondary="#ffeb3b"
			background="#FFFFFF"
			textColor="#3c3c3c"
			textRight="BTC"
		>
			<h1>CONTENTS</h1>
		</HyperplexedCard>

		<section class="theme-section">
			<v-container>
				<NeonButton
					:background="themeColors.primary"
					:color="themeColors.secondary"
					speed="1.5s"
				>
					Lorem Ipsum
				</NeonButton>
			</v-container>
		</section>

		<section class="theme-section">
			<v-container>
				<TrapezoidTitle
					class="theme-section-title text-center"
					element="h2"
					:color="themeColors.primary"
					:double="themeColors.secondary"
					outline
					big
					cross
				>
					Postazioni
				</TrapezoidTitle>

				<SlideOpenTripleCard
					:image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png'"
					:background-left="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-1.png'"
					:background-right="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-2.png'"
				>
					<template v-slot:left>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
					</template>
					<template v-slot:right>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
						<h1>LOREM IPSUM</h1>
					</template>
				</SlideOpenTripleCard>

				<v-row
					align="center"
					justify="center"
				>
					<v-col cols="12" md="5" lg="4" xl="3">
						<ImageHoverCard
							:image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-main-1.png'"
						>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
						</ImageHoverCard>
					</v-col>
					<v-col cols="12" md="5" lg="4" xl="3">
						<ImageHoverCard
							:image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-1.png'"
						>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
						</ImageHoverCard>
					</v-col>
					<v-col cols="12" md="5" lg="4" xl="3">
						<ImageHoverCard
							:image="'https://assets.guebbit.com/vrmetagames/images/consoles/vr-headset-controller-2.png'"
						>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
							<h1>LOREM IPSUM</h1>
						</ImageHoverCard>
					</v-col>
				</v-row>
				<div class="d-flex justify-center mt-10">
					<CyberpunkButton
						:background="themeColors.primary"
						:border="themeColors.secondary"
						text="Details"
						@click="$router.push({ path: '/games' })"
					>
						More
					</CyberpunkButton>
				</div>
			</v-container>
		</section>

		<section class="theme-section">
			<v-container>
				<div class="typography-panel">
					<span class="panel-category">lorem ipsum</span>
					<h3 class="panel-title">Lorem ipsum dolor sit amet, <b class="text-primary">consectetur</b>
						adipiscing elit</h3>
					<p class="panel-text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud <b class="text-secondary">exercitation ullamco</b> laboris
						nisi ut aliquip ex ea commodo consequat.
					</p>
					<p class="panel-text">
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<div class="d-flex justify-center mt-10">
						<v-btn color="primary"
							class="mx-5"
							elevation="4"
							size="x-large"

						>
							Lorem
							<font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
						</v-btn>
						<v-btn color="secondary"
							class="mx-5"
							elevation="4"
							size="x-large"

						>
							Ipsum
							<font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
						</v-btn>
					</div>
					<div class="text-center mt-10">
						<InclinedButton
							size="x-large"
							:background="themeColors.primary"
							:double="themeColors.secondary"
							cross
						>
							{{ todayIsOpen ? t("generic.play-now") : t("generic.book-now") }}
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</InclinedButton>
					</div>
				</div>
			</v-container>
		</section>
		<section>
			<blockquote class="simple-blockquote">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>normal</cite>
			</blockquote>

			<blockquote class="simple-blockquote no-quote">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>no-quote</cite>
			</blockquote>

			<blockquote class="simple-blockquote right-cite">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>right-cite</cite>
			</blockquote>

			<blockquote class="simple-blockquote center-cite">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>center-cite</cite>
			</blockquote>

			<blockquote class="simple-blockquote border-right border-left">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>border-right border-left</cite>
			</blockquote>

			<blockquote class="simple-blockquote border-top border-bottom">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>border-top border-bottom</cite>
			</blockquote>

			<blockquote class="simple-blockquote border-right border-left border-top border-bottom">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>border-right border-left border-top border-bottom</cite>
			</blockquote>

			<blockquote class="simple-blockquote border-left full">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>border-left full</cite>
			</blockquote>

			<blockquote class="simple-blockquote double-quote">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>double-quote</cite>
			</blockquote>

			<blockquote class="simple-blockquote center-cite center-quote double-quote">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				<cite>center-cite center-quote double-quote</cite>
			</blockquote>

			<blockquote class="great-blockquote">
				<p>
					Design is not just what it looks like and feels like.
					Design is how it works.
				</p>
				<cite>Steve Jobs</cite>
			</blockquote>
		</section>

		<section class="theme-section">
			<v-container>
				<ul class="simple-list">
					<li class="hover-line-highlight">
						<a href="#">
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
							Lorem Ipsum
						</a>
					</li>
					<li class="hover-line-highlight active">
						<a href="#">
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
							Sit Amet
						</a>
					</li>
					<li>
						<a href="#" class="hover-line-highlight right-highlight">
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
							Dolor
						</a>
					</li>
					<li>
						<a href="#" class="hover-line-highlight bottom-highlight">
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
							Lorem Ipsum
						</a>
					</li>
					<li>
						<a href="#" class="hover-line-highlight bottom-highlight active">
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
							Sit Amet
						</a>
					</li>
					<li>
						<a href="#" class="hover-line-highlight top-highlight">
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
							Dolor
						</a>
					</li>
					<li>
						<font-awesome-icon :icon="['fas', 'arrow-right']" />
						Consectetur adipiscing elit<br />Consectetur adipiscing elit
					</li>
					<li>
						<span class="icon">LOL</span>
						Tempor incididunt
					</li>
					<li>
                    <span>
                        <ul class="simple-list">
                            <li>
                                <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                Consectetur adipiscing elit<br />Consectetur adipiscing elit
                            </li>
                            <li>
                                <font-awesome-icon :icon="['fas', 'arrow-right']" />
                                Tempor incididunt
                            </li>
                        </ul>
                    </span>
					</li>
				</ul>

				<ul class="simple-list horizontal">
					<li class="hover-line-highlight">
						<a href="#">
							horizonal (is link)
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</a>
					</li>
					<li class="hover-line-highlight">
						<a href="#">
							Consectetur adipiscing elit
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</a>
					</li>
					<li class="hover-line-highlight">
						<a href="#">
							Lorem Ipsum <br /> Lorem Ipsum
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</a>
					</li>
					<li class="hover-line-highlight">
						<a href="#">
							<span class="icon">LOL</span>
							Tempor incididunt
						</a>
					</li>
				</ul>
			</v-container>
		</section>

		<section class="theme-section">
			<Panel
				:backgroundImageCss="'https://www.virtual-room.com/app/themes/virtual-room/build/images/bg-pattern.jpg'"
				height="75vh"
				centered
				fixed
			>
				<template v-slot:default>
					<v-container>
						<h2 class="theme-section-title mb-10">
							Ready to Boost <br />
							Your Ecommerce Business?
						</h2>
						<v-row>
							<v-col cols="12" md="5" lg="4" xl="3">
								<PricingCardSimple
									class="active"
									title="Lorem Ipsum"
									:price="60"
									currency="€"
									text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
									buttonText="Lorem Ipsum"
								/>
							</v-col>
							<v-col cols="12" md="5" lg="4" xl="3">
								<PricingCardSimple
									title="Lorem Ipsum"
									:price="150"
									currency="€"
									text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
									buttonText="Lorem Ipsum"
								/>
							</v-col>
							<v-col cols="12" md="5" lg="4" xl="3">
								<PricingCardVuetify
									color="primary"
									variant="outlined"
									priceColor="secondary"
									title="Lorem Ipsum"
									:price="60"
									currency="€"
									text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
									buttonText="Lorem Ipsum"
								/>
							</v-col>
							<v-col cols="12" md="5" lg="4" xl="3">
								<PricingCardVuetify
									color="transparent"
									priceColor="secondary"
									title="Lorem Ipsum"
									:price="150"
									currency="€"
									text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod <b>tempor incididunt</b> ut labore et dolore magna aliqua."
									buttonText="Lorem Ipsum"
								/>
							</v-col>
							<v-col cols="12" md="5" lg="4" xl="3">
								<PricingCardMaterialize />
							</v-col>
						</v-row>
					</v-container>
				</template>
			</Panel>
		</section>

		<section class="theme-section">
			<v-row>
				<v-col cols="12" md="4" lg="3">
					<BookCard
						title="LOREM IPSUM"
						author="TOAST"
						color="#00ff00"
						image="https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol1.jpg"
						spine="https://assets.guebbit.com/rogheneach/images/volumes/rogh-vol1-spine.jpg"
					/>
				</v-col>
				<v-col cols="12" md="4" lg="3">
					<BookCard
						title="LOREM IPSUM"
						author="TOAST"
						color="#00ff00"
						image="https://placekitten.com/500/400"
						logo="https://placekitten.com/100/100"
					/>
				</v-col>
				<v-col cols="12" md="4" lg="3">
					<BookCard
						image="https://placekitten.com/700/200"
						logo="https://placekitten.com/200/200"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4" lg="3">
					pure ratio 4.25/6.87
					<BookCard
						ratio="4.25/6.87"
						image="https://placekitten.com/400/700"
						spine="https://placekitten.com/300/300"
					/>
				</v-col>
				<v-col cols="12" md="4" lg="3">
					pure ratio 16/9
					<BookCard
						ratio="16/9"
						image="https://placekitten.com/1600/900"
						spine="https://placekitten.com/700/700"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="4" lg="3">
					ratio 4.25/6.87 - width 200
					<BookCard
						ratio="4.25/6.87"
						width="200"
						image="https://placekitten.com/700/700"
						spine="https://placekitten.com/400/400"
					/>
				</v-col>
				<v-col cols="12" md="4" lg="3">
					ratio 4.25/6.87 - height 200
					<BookCard
						ratio="4.25/6.87"
						height="200"
						image="https://placekitten.com/700/700"
						spine="https://placekitten.com/400/400"
					/>
				</v-col>
				<v-col cols="12" md="4" lg="3">
					ratio 16/9 - height 200
					<BookCard
						ratio="16/9"
						height="200"
						image="https://placekitten.com/700/700"
						spine="https://placekitten.com/400/400"
					/>
				</v-col>
				<v-col cols="12" md="4" lg="3">
					ratio 16/9 - width 200
					<BookCard
						ratio="16/9"
						width="200"
						image="https://placekitten.com/700/700"
						spine="https://placekitten.com/400/400"
					/>
				</v-col>
			</v-row>
		</section>

		<section class="theme-section">
			<TrapezoidTitle
				class="theme-page-title text-center"
				:color="themeColors.primary"
				:double="themeColors.secondary"
				outline
				big
				cross
			>
				Lorem Ipsum
			</TrapezoidTitle>
			<TrapezoidTitle
				class="theme-section-title text-center"
				:color="themeColors.primary"
				outline
				big
			>
				Lorem Ipsum
			</TrapezoidTitle>
			<TrapezoidTitle
				class="theme-section-title text-center"
				:color="themeColors.secondary"
			>
				Lorem Ipsum
			</TrapezoidTitle>
			<TrapezoidTitle
				class="theme-section-title text-center"
				:double="themeColors.secondary"
				outline
			>
				Lorem Ipsum
			</TrapezoidTitle>
		</section>

		<section class="theme-section">

			<v-row>
				<v-col cols="12" md="6" lg="4">
					<v-card
						class="theme-elevation-primary border-primary"
						variant="outlined"
						elevation="24"
					>
						<v-card-title>
							TITLE
						</v-card-title>

						<v-card-subtitle>
							SUBTITLE
						</v-card-subtitle>

						<v-card-text>
							Greyhound divisely hello coldly fonwderfully
						</v-card-text>

						<v-card-actions>
							<v-btn variant="outlined"
								class="border-primary theme-elevation-primary"
								elevation="24"
							>
								Button
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col cols="12" md="6" lg="4">
					<v-card
						class="theme-elevation-secondary border-secondary"
						variant="outlined"
						elevation="12"
					>
						<v-card-header>
							<div>
								<div class="text-overline mb-1">
									OVERLINE
								</div>
								<div class="text-h6 mb-1">
									Headline
								</div>
								<div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
							</div>
						</v-card-header>

						<v-card-actions>
							<v-btn variant="outlined"
								class="border-secondary"
								elevation="12"
							>
								Button
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
				<v-col cols="12" md="6" lg="4">
					<v-card
						class="border-primary"
						variant="outlined"
					>
						<v-card-header>
							<div>
								<div class="text-overline mb-1">
									OVERLINE
								</div>
								<div class="text-h6 mb-1">
									Headline
								</div>
								<div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
							</div>
						</v-card-header>

						<v-card-actions>
							<v-btn variant="outlined" class="border-secondary">
								Button
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</section>

		<section class="theme-section">
			<v-container>
				<ActionPanel
					:height="'300px'"
					:title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
					@button:click="() => {}"
				>
					<template v-slot:background>
						<v-img
							cover
							class="panel-background"
							:lazy-src="'http://placekitten.com/100/100'"
							:src="'http://placekitten.com/800/400'"
						>
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular
										indeterminate
										color="grey lighten-5"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</template>
					<template v-slot:action>
						<InclinedButton
							class="panel-button"
							size="x-large"
							:double="themeColors.primary"
						>
							Lorem Ipsum
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</InclinedButton>
					</template>
				</ActionPanel>
			</v-container>

			<ActionPanel
				:height="'300px'"
				:title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
				@button:click="() => {}"
			>
				<template v-slot:background>
					<video class="panel-background" preload="metadata" playsinline="" muted="" loop="" autoplay="">
						<source src="https://cdn.virtual-room.com/app/uploads/2018/12/teaser-home-virtualroom.mp4"
							type="video/mp4">
					</video>
				</template>
				<template v-slot:action>
					<InclinedButton
						class="panel-button"
						size="x-large"
						:double="themeColors.primary"
					>
						Lorem Ipsum
						<font-awesome-icon :icon="['fas', 'arrow-right']" />
					</InclinedButton>
				</template>
			</ActionPanel>

			<v-container>
				<ActionPanel
					:height="'300px'"
					:thumbnailImage="'http://placekitten.com/100/100'"
					:backgroundImage="'http://placekitten.com/800/400'"
					:title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
					:shadow="themeColors.primary"
				/>
			</v-container>

			<v-container>
				<ActionPanel
					:height="'300px'"
					:backgroundImageCss="'https://www.virtual-room.com/app/themes/virtual-room/build/images/bg-pattern.jpg'"
					:title="'CONNECT WITH US <br/> FOR GAMING UPDATE'"
					column-right
					fixed
				>
					<template v-slot:action>
						<InclinedButton
							class="panel-button"
							size="x-large"
							:double="themeColors.primary"
						>
							Lorem Ipsum
							<font-awesome-icon :icon="['fas', 'arrow-right']" />
						</InclinedButton>
					</template>
				</ActionPanel>
			</v-container>
		</section>

		<section class="theme-section">
			<v-row>
				<v-col cols="12" md="6" lg="4">
					<inspirationCard
						:type="'julia'"
						:image="'http://placekitten.com/500/500'"
						:color="themeColors['on-surface']"
						:background="themeColors.primary"
						:double="themeColors.secondary"
					>
						<template v-slot:content>
							<h2>Passionate <span>Julia</span></h2>
							<p class="card-text">Julia dances in the deep dark</p>
							<p class="card-text">She loves the smell of the ocean</p>
							<p class="card-text">And dives into the morning light</p>
							<a href="#" class="card-action">View more</a>
						</template>
					</inspirationCard>
				</v-col>
				<v-col v-for="inspiration in inspirationList" :key="'inspiration-'+inspiration" cols="12" md="6" lg="4">
					<inspirationCard
						:type="inspiration"
						:color="themeColors['on-surface']"
						:background="themeColors.primary"
						:double="themeColors.secondary"
						:image="'http://placekitten.com/500/500'"
						:title="'Nice ' + inspiration"
						:text="'Likes to play with crayons and pencils'"
					/>
				</v-col>
				<v-col v-for="inspiration in inspirationWithIconsList" :key="'inspiration-'+inspiration" cols="12"
					md="6" lg="4">
					<inspirationCard
						:type="inspiration"
						:color="themeColors['on-surface']"
						:background="themeColors.primary"
						:double="themeColors.secondary"
						:image="'http://placekitten.com/500/500'"
						:title="'Nice ' + inspiration"
						:text="'Likes to play with crayons and pencils'"
					>
						<template v-slot:actions>
							<a href="#">
								<font-awesome-icon :icon="['fas', 'arrow-right']" />
							</a>
							<a href="#">
								<font-awesome-icon :icon="['fas', 'arrow-right']" />
							</a>
							<a href="#">
								<font-awesome-icon :icon="['fas', 'arrow-right']" />
							</a>
						</template>
					</inspirationCard>
				</v-col>
			</v-row>
		</section>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTheme } from "vuetify";
import { useI18n } from "vue-i18n";
import SimpleUserCard from "@/components/basics/cards/SimpleUserCard.vue";
import LeafletMap from "@/components/basics/interfaces/LeafletMap.vue";
import PanoramicCard from "@/components/basics/cards/PanoramicCard.vue";
import PanelSwitch from "@/components/basics/modals/PanelSwitch.vue";
import InspirationCard from "@/components/basics/cards/InspirationCard.vue";
import BookCard from "guebbit-vue-library/src/components/cards/BookCard.vue";
import Panel from "guebbit-vue-library/src/components/blocks/Panel.vue";
import ActionPanel from "guebbit-vue-library/src/components/blocks/ActionPanel.vue";
import CyberpunkButton from "@/components/basics/buttons/CyberpunkButton.vue";
import InclinedButton from "@/components/basics/buttons/InclinedButton.vue";
import NeonButton from "@/components/basics/buttons/NeonButton.vue";
import TrapezoidTitle from "@/components/basics/typography/TrapezoidTitle.vue";
import PricingCardSimple from "@/components/basics/cards/PricingCardSimple.vue";
import PricingCardMaterialize from "@/components/basics/cards/PricingCardMaterialize.vue";
import PricingCardVuetify from "@/components/basics/cards/PricingCardVuetify.vue";
import SlideOpenTripleCard from "@/components/basics/cards/SlideOpenTripleCard.vue";
import ImageHoverCard from "@/components/basics/cards/ImageHoverCard.vue";
import HyperplexedCard from "@/components/basics/cards/HyperplexedCard.vue";
import EventLongCard from "@/components/basics/cards/EventLongCard.vue";
import ScheduleFormCard from "@/components/generic/cards/EventCard.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


library.add(faArrowRight);

const { global: { current: { value: { colors: themeColors } } } } = useTheme();
const { t } = useI18n();
const panelSwitchMode = ref(false);


const inspirationList = [
	"lily",
	"sadie",
	"honey",
	"layla",
	"oscar",
	"roxy",
	"bubba",
	"romeo",
	"dexter",
	"sarah",
	"chico",
	"milo",
	"goliath",
	"selena",
	"apollo",
	"steve",
	"moses",
	"jazz",
	"ming",
	"lexi",
	"duke",
	"marley"
];
const inspirationWithIconsList = [
	"kira",
	"winston",
	"terry",
	"zoe"
];
</script>


<style lang="scss">
#test-page {
	.simple-blockquote {
		max-width: 400px;
		margin: 4em auto;
	}

	.great-blockquote {
		max-width: 600px;
		margin: 1em auto;
	}
}
</style>