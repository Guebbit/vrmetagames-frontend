<template>
    <div :id="id"
        class="leaflet-map"
        :style="{
            height: height,
        }"
    />
</template>

<script setup lang="ts">
import { defineProps, ref, computed, onMounted, PropType } from "vue";
import { getUUID } from "guebbit-javascript-library";
import "leaflet/dist/leaflet.css";
import L, {
    latLng,
    tileLayer,
    marker,
    circle,
    polygon,
    icon,
} from "leaflet";
import type {
    Map,
    MapOptions,
    Icon,
    LatLngExpression,
    TileLayerOptions,
    IconOptions,
    MarkerOptions,
    PopupOptions,
    CircleMarkerOptions,
    PolylineOptions
} from "leaflet";

interface leafletIconMap extends IconOptions {
    name :string
}

interface leafletDrawMap {
    type: string,
    coordinates: [number, number][],
    options: CircleMarkerOptions | PolylineOptions,
    popup: PopupOptions // TODO
}

interface leafletMarkerMap {
    coordinates: [number, number],
    icon: string
    options: MarkerOptions
    popup: PopupOptions // TODO
}



const props = defineProps({
    // http://maps.stamen.com/#terrain/12/37.7706/-122.3782
    // https://leaflet-extras.github.io/leaflet-providers/preview/
    map: {
        type: String,
        default: () => {
            return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
    },
    mapAttribution: {
        type: String,
        default: () => {
            return '© OpenStreetMap'
        },
    },
    mapOptions: {
        type: Object as PropType<TileLayerOptions>,
        default: () => {
            return {}
        }
    },

    center: {
        type: Object as PropType<[number, number]>,
        required: true
    },

    // https://leafletjs.com/examples/custom-icons/
    icons: {
        type: Array as PropType<leafletIconMap[]>,
        default: () => {
            return [];
        }
    },

    // https://leafletjs.com/reference.html#marker-option
    markers: {
        type: Array as PropType<leafletMarkerMap[]>,
        default: () => {
            return [];
        }
    },

    // https://leafletjs.com/reference.html#circle
    // https://leafletjs.com/reference.html#polygon
    draw: {
        type: Array as PropType<leafletDrawMap[]>,
        default: () => {
            return [];
        }
    },

    // OPTIONS
    height: {
        type: String,
        default: () => {
            return '300px';
        }
    },
    zoom: {
        type: Number,
        default: () => {
            return 16;
        }
    },
    options: {
        type: Object as PropType<MapOptions>,
        default: () => {
            return {};
        }
    }
});

const id = getUUID();
const map = ref<Map>();
const icons = ref<Record<string, Icon>>({});
const center = computed<LatLngExpression>(() => latLng(props.center));

onMounted(() => {
    let i :number;

    map.value = L.map(id, props.options)
        .setView(center.value, props.zoom);

    tileLayer(props.map, {
        ...props.mapOptions,
        attribution: props.mapAttribution
    }).addTo(map.value);

    for(i = props.icons.length; i--; )
        icons.value[props.icons[i].name] = icon(props.icons[i]);

    for(i = props.markers.length; i--; ){
        const options = { ...props.markers[i].options };
        if(Object.prototype.hasOwnProperty.call(icons.value, props.markers[i].icon))
            options.icon = icons.value[props.markers[i].icon] as Icon; // TODO non dovrebbe essere necessario specificarlo
        marker(latLng(props.markers[i].coordinates), options)
            .addTo(map.value)
        // .bindPopup(props.markers[i].popup);
    }

    for(i = props.draw.length; i--; ){
        if(props.draw[i].type === 'circle')
            circle(latLng(props.draw[i].coordinates[0]), props.draw[i].options as CircleMarkerOptions)
                .addTo(map.value);
                // .bindPopup(props.draw[i].popup);
        if(props.draw[i].type === 'polygon')
            map.value.fitBounds(
                polygon(props.draw[i].coordinates, props.draw[i].options as PolylineOptions)
                    .addTo(map.value)
                    // .bindPopup(props.draw[i].popup)
                    .getBounds()
            )
    }

    // wheel disable until first click
    map.value.scrollWheelZoom.disable();
    map.value.on('click', () => { map.value?.scrollWheelZoom.enable();});
    map.value.on('mouseout', () => { map.value?.scrollWheelZoom.disable();});
})
</script>

<style lang="scss">
.leaflet-map{
    //
}
</style>