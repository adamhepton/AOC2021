import { getPower, getLifeSupport } from './lib/ratings.js';
import { readFile } from 'fs';

readFile('./data/input.txt', function(err, data) {
    if(err) throw err;
    const instructions = data.toString().split("\n");

    console.log(getPower(instructions));
    console.log(getLifeSupport(instructions));
});