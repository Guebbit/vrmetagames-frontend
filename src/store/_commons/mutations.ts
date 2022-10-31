import { createNestedProperty, removeNestedProperty } from "guebbit-javascript-library";

/**
 *
 * @param data - data from which take the param info
 * @param {string[]} branchKeys - parameters containing data which will become a branch (like lang, id, etc)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createBranchTree = (data: any, branchKeys :Array<string | number> = []) => {
    const branches :string[] = [];
    for(let i = 0, len = branchKeys.length; i < len; i++)
        branches.push(data[branchKeys[i]])
    return branches
};

/**
 *
 * @param data - data from which take the param info
 * @param {string[]} branchKeys - parameters that I need to check they exist
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkBranchTree = (data: any, branchKeys :Array<string | number> = []) => {
    for(let i = branchKeys.length; i--; )
        if(!branchKeys[i] || !Object.prototype.hasOwnProperty.call(data, branchKeys[i]) || !data[branchKeys[i]])
            return false;
    return true;
};

/**
 * SET generic record data
 * Put the data in the required nested property (create if it doesn't exist)
 *
 * @param {Object} state - central state
 * @param {string} branches - parameters of state (branch of tree, the first should always exist because it's state root)
 * @param {Object} data - data to insert in state
 * @param {string[]} params - parameters containing data which will become a branch (like lang, id, etc)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDataRecord = (state: any, [branches, data, params = ["id"]]: [string | number | Array<string | number>, Record<string, any>, Array<string | number>]) => {
    // requested params must exist
    if(!checkBranchTree(data, params))
        return;
    // if not array, it must become one
    if(!Array.isArray(branches))
        branches = [branches];
    // put the data in the required nested property (WARNING: state will be edited within this function)
    createNestedProperty(state, [...branches, ...createBranchTree(data, params)], data);
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
    // TODO fare e testare (sulla linea di setDataRecord)
    /*
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
    */
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
    // TODO fare e testare (sulla linea di removeDataRecord)
};

// TODO fare e testare sia per record che per array data
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