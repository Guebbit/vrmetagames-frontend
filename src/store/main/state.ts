export default {
    // open business
    businessHours: [
        // ['10.00', '24.00'],
        ['9.00', '23.30'],
        [], // lunedì riposo
        ['10.00', '24.00'],
        // ['10.00', '24.00'],
        ['12.00', '20.00'],
        ['10.00', '24.00'],
        ['10.00', '24.00'],
        ['10.00', '24.00']
    ],
    // ignore hours and open or close (special occasions)
    forceClose: false,  // TODO GRAPHIC & USE
    forceOpen: false,   // TODO GRAPHIC & USE
    // generic
    modals: {
        login: false,
        play: false
    },
    // on loading list
    loading: [],
    // already loaded list
    loaded: [], // TODO
    // timestamp of last update (TTL)
    lastUpdate: {},
    // refresh time (TTL) default: 3600000
    refresh: {}
}