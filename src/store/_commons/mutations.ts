import { createNestedProperty, removeNestedProperty } from "guebbit-javascript-library";

/**
 *
 * @param data - data from which take the param info
 * @param {string} paramLang - parameter containing language (default: lang)
 * @param {string | number} paramId - parameter containing identifier (default: ID)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBranchTree = (data: any, paramLang :string | undefined = "lang", paramId :string | number | undefined = "id") => [
    // paramLang can be falsy, in that case they will be put in the root (standard javascript behaviour)
    data[paramLang] || "",
    // paramId is the last leaf
    data[paramId]
];

/**
 * SET generic record data
 * Put the data in the required nested property (create if it doesn't exist)
 *
 * @param {Object} state - central state
 * @param {string} branches - parameters of state (branch of tree, the first should always exist because it's state root)
 * @param {Object} data - data to insert in state
 * @param {string} paramLang - parameter containing language (default: lang)
 * @param {string | number} paramId - parameter containing identifier (default: ID)
 * @param {string} language - language (optional)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDataRecord = (state: any, [branches, data, paramLang = "lang", paramId = "id"]: [string | number | Array<string | number>, Record<string, any>, string | undefined, string | number | undefined]) => {
    // paramId must exist within data
    if(!Object.prototype.hasOwnProperty.call(data, paramId) || !data[paramId])
        return;
    // if not array, it must become one
    if(!Array.isArray(branches))
        branches = [branches];
    // put the data in the required nested property (WARNING: state will be edited within this function)
    createNestedProperty(state, [...branches, ...createBranchTree(data, paramLang, paramId)], data);
};


/**
 * REMOVE generic record data
 *
 * @param {Object} state - central state
 * @param {string[]} branches - parameter of state (branches of tree)
 * @param {string} id - id of to remove from records
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeDataRecord = (state: any, [branches, id]: [string | number | Array<string | number>, string | number]) => {
    if(!Array.isArray(branches))
        branches = [branches];
    branches.push(id);
    removeNestedProperty(state, branches)
};


/**
 * SET generic array data
 *
 * @param {Object} state - central state
 * @param {string} branch - parameter of state (branch of tree)
 * @param {Object} data - data to insert in state
 * @param {string | number} identifier - OPTIONAL, required only to maintain data univocity
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDataArray = (state: Record<string, any[]>, [branch, data, identifier = '']: [string, Record<string, unknown>, string | number]) => {
    // has to exist in the state object and not be empty
    if (!Object.prototype.hasOwnProperty.call(state, branch) || !state[branch])
        return;
    // no identifier: direct push
    if(!identifier){
        state[branch].push(data);
        return;
    }
    // check if element already exist
    const index = state[branch].findIndex((item) => item[identifier] === data[identifier]);
    // if it exist: edit the old one, if not: push new
    if(index >= 0)
        state[branch][index] = data;
    else
        state[branch].push(data);
};


/**
 * REMOVE generic record data
 *
 * @param {Object} state - central state
 * @param {string} branch - parameter of state (branch of tree)
 * @param {string} id - id of to remove from state
 * @param {string | number} identifier - if numeric it can be the index to remove
 */
export const removeDataArray = (state: Record<string, Record<string, unknown>>, [branch, id, identifier = '']: [string, string | number, string | number]) => {
    // has to exist in the state object and not be empty
    if (!Object.prototype.hasOwnProperty.call(state, branch) || !state[branch])
        return;
    // TODO
};

// TODO sia per record che per array data
/*
addWallet({ users }: stateEcommerceMap, [id, amount = 0]: [string, number]) {
    if(!Object.prototype.hasOwnProperty.call(users, id))
        return;
    users[id].wallet = (users[id].wallet || 0) + amount;
},

subtractWallet({ users }: stateEcommerceMap, [id, amount = 0]: [string, number]) {
    if(!Object.prototype.hasOwnProperty.call(users, id))
        return;
    users[id].wallet = (users[id].wallet || 0) - amount;
},
*/