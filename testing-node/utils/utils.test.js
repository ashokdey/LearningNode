const expect = require('expect');
const utils = require('./utils');

it('should add 2 numbers', () => {
    let res = utils.add(11, 33);
    if (res != 44) {
        throw Error(`Expected 44, got ${res}`);
    }
});

it('should square a number', () => {
    let res = utils.square(5);
    // using expect here instead of the if-else block

    expect(res).toBe(25).toBeA('number');

    // if (res != 25) {
    //     throw Error(`Expected 4 but got ${res}`);
    // }
});

it('should set first and last name', () => {
    let user = {age : 23, location: 'Delhi'};
    let res = utils.setName(user, 'Ashok Dey');
    expect(res).toInclude({
        firstName : 'Ashok',
        lastName: 'Dey'
    })
});

//testing async functions

it('should async add two numbers', () => {
    utils.asyncAdd(3, 4, (sum) => {
        expect(sum).toBe(7).toBeA('number');
    });
});