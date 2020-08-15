const COL=10;
const ROW=20;
const BLOCK_SIZE=30;
const SCORE=1;
const KEY={
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
    UP: 38
}

const COLORS=[
    'none',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet'
]
const SHAPES=[
    [
        [],
    ],
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [2,0,0],
        [2,2,2],
        [0,0,0]
    ],
    [
        [0,0,3],
        [3,3,3],
        [0,0,0]
    ],
    [
        [4,4,0],
        [0,4,4],
        [0,0,0]
    ],
    [
        [0,5,5],
        [5,5,0],
        [0,0,0]
    ],
    [
        [0,6,0],
        [6,6,6],
        [0,0,0]
    ],
    [
        [7,7],
        [7,7]
    ]
]


Object.freeze(KEY);