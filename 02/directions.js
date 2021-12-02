const fs = require('fs');
fs.readFile('./directions.txt', function(err, data) {
    if(err) throw err;
    const directions = data.toString().split("\n").map(dir => dir.split(" "));

    const calculateDive = (method, directions) => {
        return Object.values(directions
                .reduce( (total, dirs) => {
                    const dir = dirs[0], val = Number(dirs[1]);

                    switch(dir) {
                        case 'forward':
                            total.forward += val;
                            if(method === 2) {
                                total.depth += (val * total.aim);
                            }
                            break;
                            
                        case 'down':
                        case 'up':
                            const targetAttribute = (method === 1 ? 'depth' : 'aim');
                            total[targetAttribute] += (dir === 'down' ? val : -val);
                            break;
                    }
                    
                    return total;
                }, { forward: 0, depth: 0, aim: 0 })
        )
        .slice(0, 2)
        .reduce( (a, b) => a * b)
    }

    console.log(calculateDive(1, directions));
    console.log(calculateDive(2, directions));
});