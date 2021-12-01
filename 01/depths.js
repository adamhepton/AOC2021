const fs = require('fs');
fs.readFile('depths.txt', function(err, data) {
    if(err) throw err;
    const depths = data.toString().split("\n").map(Number);
    const arrayMemberIsLarger = (arr, a, b) => arr[a] && arr[b] && (arr[a] > arr[b]);

    // Part 1
    console.log(depths.reduce ( (val, _, i, arr) => (arrayMemberIsLarger(arr, i, i - 1)) ? ++val : val, 0));

    // Part 2
    console.log(depths.reduce ( (val, _, i, arr) => (arrayMemberIsLarger(arr, i + 2, i - 1)) ? ++val : val, 0));
});