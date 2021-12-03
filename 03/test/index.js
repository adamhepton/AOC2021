import { strict as assert } from 'assert';
import { getPower, getOxygen, getCO2, getLifeSupport, interestingBit } from '../lib/ratings.js';

const testData = "00100 \
11110 \
10110 \
10111 \
10101 \
01111 \
00111 \
11100 \
10000 \
11001 \
00010 \
01010".split(" ");

const equallySplitArray = [0,1,0,1,0,1,0,1,0,1,0,1];
const anotherEquallySplitArray = [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0];

// Check to see arrays with equal 1s and 0s return 1 for "Most Common" and 0 for "Least Common"
assert.equal(interestingBit(equallySplitArray, true), 1);
assert.equal(interestingBit(equallySplitArray, false), 0);
assert.equal(interestingBit(anotherEquallySplitArray, true), 1);
assert.equal(interestingBit(anotherEquallySplitArray, false), 0);

assert.equal(getPower(testData), 198);
assert.equal(getOxygen(testData), 23);
assert.equal(getCO2(testData), 10);
assert.equal(getLifeSupport(testData), 230);