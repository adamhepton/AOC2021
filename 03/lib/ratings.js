const interestingBit = (bits, mostCommon) => {
    // This is bullshit mainly caused by having to account for equal-length split decisions
    // Would have preferred to do bits.sort((a, b) => bits.filter(bit => bit === a).length - bits.filter(bit => bit === b).length)

    const ones = bits.filter(bit => Number(bit) === 1).length;
    const zeroes = bits.filter(bit => Number(bit) === 0).length;

    const whenSame = Number(mostCommon);
    const moreOrLess = mostCommon ? (ones > zeroes) : (zeroes > ones);

    return (ones === zeroes) ? whenSame : Number(moreOrLess);
}

const getPower = data => {
    var gamma = "";
    var epsilon = "";
    
    for(let i = 0; i < data[0].length; i++) {
        const bits = data.map(datum => datum.slice(i, i + 1));
        gamma = gamma.concat(interestingBit(bits, true));
        epsilon = epsilon.concat(interestingBit(bits, false));
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

const getOxygen = data => {
    return getElement(data, true);
}

const getCO2 = data => {
    return getElement(data, false);
};

const getElement = (data, mostOrLeastCommon, debug = false) => {
    var filteredData = data.slice(0);

    for(let i = 0; i < filteredData[0].length; i++) {
        if(filteredData.length > 1) {
            const bits = filteredData.map(datum => datum.slice(i, i + 1));
            const criterion = interestingBit(bits, mostOrLeastCommon);
        
            if(debug) {
                console.log(`Bit ${i}`)
                console.log(`Data: ${filteredData}`);
                console.log(bits);
                console.log(`Criterion: ${criterion}`);
            }
            
            filteredData = filteredData.filter((_, j) => Number(bits[j]) === Number(criterion));
        }
    }

    return parseInt(filteredData[0], 2);
}

const getLifeSupport = data => getOxygen(data) * getCO2(data);

export { getPower, getOxygen, getCO2, getLifeSupport, interestingBit };