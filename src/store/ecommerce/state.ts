export default {
    // schedule records
    scheduleRecords: {},
    // archive with clones of scheduleRecords for comparation purposes
    scheduleArchive: {},
    // users (all)
    users: {},
    // game stations
    stations: {},
    // games
    games:{},
    // ecommerce settings
    scheduleTimeStep: 1800000,      // 1800 seconds = 30 min
    scheduleEditableTime: 1800000,  // 1800 seconds = 30 min
    scheduleTimeCost: {
        0: 500, // default price PER STEP
        10: 4000,
        20: 5000
    }
}