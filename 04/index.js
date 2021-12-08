import { readFile } from 'fs/promises';
import { strict as assert } from 'assert';

const rows = 5, cols = 5;

const calls = JSON.parse(
    await readFile(
      new URL('./data/calls.json', import.meta.url)
    )
);

const parseBoards = data => {
    let boards = [], board = [], i = 0, lines = data.split("\n");

    lines.forEach(line => {
        if(line === "") return;

        let numbers = line.trim().split(/\s+/).map(n => Number(n));
        board = board.concat(...numbers);
        ++i;
        
        if (i === rows) {
            boards.push(board);
            board = [];
            i = 0;
        }
    });

    return boards;
}

const checkBoardIsWinner = (board, calls) => {
    for(let row = 0; row < rows; row++) {
        if (
            board
                .filter( (_, i) => (i >= (row * cols)) && (i < ((row * cols) + cols)) )
                .every(number => calls.includes(number))
        ) {
            return true;
        }
    }

    for(let column = 0; column < cols; column++) {
        if (
            board
                .filter( (_, i) => (i - column) % rows === 0)
                .every(number => calls.includes(number))
        ) {
            return true;
        }
    }

    return false;
}

const findFirstOrLastWinner = (calls, boards, getFirstWinner = true) => {
    return calls.reduce( (winningBoard, call, i, calls) => {
        if(winningBoard) return winningBoard;

        let currentCalls = calls.slice(0, i + 1);
        let winningBoards = boards.filter(board => checkBoardIsWinner(board, currentCalls));

        if(getFirstWinner === true && winningBoards.length === 1) {
            return winningBoard = calculateScore(winningBoards[0], call, currentCalls);
        } else if(getFirstWinner === false && winningBoards.length === boards.length) {
            let previousCalls = calls.slice(0, i);
            let previousWinners = boards.filter(board => checkBoardIsWinner(board, previousCalls));
            let lastWinner = boards.filter(board => previousWinners.includes(board) === false);

            return winningBoard = calculateScore(lastWinner[0], call, currentCalls);
        }
    }, 0);
}

const calculateScore = (board, lastCall, callsMade) => {
    const unmarkedNumbers = board
        .filter(number => callsMade.includes(number) === false)
        .reduce( (a, b) => a + b );

    return unmarkedNumbers * lastCall;
}

const getScores = async (mode, calls) => {
    const data = await readFile(`./data/${mode}.txt`, { encoding: "utf8" });
    const boards = parseBoards(data);

    return {
        first: findFirstOrLastWinner(calls[mode], boards, true),
        last: findFirstOrLastWinner(calls[mode], boards, false)
    }
}

// Tests must pass to run task
const testResult = await getScores('test', calls);
assert.equal(testResult.first, 4512);
assert.equal(testResult.last, 1924);

console.log(await getScores('task', calls));