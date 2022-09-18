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
    scheduleEditableSteps: 1,       // 1 step = 30 min
    scheduleImminentSteps: 48,      // 48 step = 1 day
    // payment for each step. 0 = default 5.00€, 1 step (half hour) special price 6.00€, no 2 step price = default price
    scheduleTimeCost: {
        0: 600, // default price PER STEP
        2: 1000,
        10: 4000,
        20: 5000
    }
}