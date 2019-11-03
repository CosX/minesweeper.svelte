import settings from './settings';

const containsBombsAtElement = (bombPositions, width, height) => 
    bombPositions.some(bomb => bomb.width === width && bomb.height === height);

const applyNearbyBomb = (slot) => typeof(slot) !== 'undefined' ? slot+1 : 1;

const createBombPositions = () => 
    [...Array(settings.bombs).keys()].reduce((bombPositions) => {
        while (bombPositions.length < settings.bombs){
            const width = Math.floor(Math.random() * settings.board.width);
            const height = Math.floor(Math.random() * settings.board.height);
            if (!containsBombsAtElement(bombPositions, width, height)) {
                return [...bombPositions, { width, height }];
            }
        }
    }, []);

export const createMinesweeperBoard = () => {
    const minesweeperSlot = { 
        isFlagged: false,
        isBomb: false,
        isOpen: false,
        isNearbyBomb: false,
        numberOfBombsNearby: 0
    };

    const bombPositions = createBombPositions();
    const nearbyBombsMap = bombPositions.reduce((bombPositions, currentvalue) => {
        for (let i = -1; i <= 1; i++) {
            for (let ii = -1; ii <= 1; ii++) {
                if(i === 0 && ii === 0) continue;
                if(currentvalue.width+i < 0 || currentvalue.height+ii < 0) continue;
                if(currentvalue.width+i >= settings.board.width || currentvalue.height+ii >= settings.board.height) continue;
                bombPositions[`${currentvalue.width+i},${currentvalue.height+ii}`] = 
                    applyNearbyBomb(bombPositions[`${currentvalue.width+i},${currentvalue.height+ii}`]);
            }
        }
        return bombPositions;
    }, []);

    const board = new Array(settings.board.height).fill(null)
        .map(() => new Array(settings.board.width).fill(minesweeperSlot));

    return board.map((row, rowIndex) => 
        row.map((slot, slotIndex) => {
            const newSlot = {...slot};
            if (typeof(nearbyBombsMap[`${slotIndex},${rowIndex}`]) !== 'undefined'){ 
                newSlot.numberOfBombsNearby = nearbyBombsMap[`${slotIndex},${rowIndex}`];
                newSlot.isNearbyBomb = true;
            }
            return containsBombsAtElement(bombPositions, slotIndex, rowIndex) ? {...newSlot, isBomb: true } : newSlot}
    ));
}

const crawl = (board, ri, si, toCrawl) => {
    if(ri < 0 || ri > settings.board.width+1) return;
    if(si < 0 || si > settings.board.height+1) return;
    const slot = board[ri][si];
    if (typeof(slot) === 'undefined') return;
    if (!slot.isNearbyBomb && !slot.isOpen && !slot.isBomb) {
        slot.isOpen = true;
        toCrawl.push({ ri, si });
    }
}

export const crawlOpenSlots = (board, ri, si) => {
    let toCrawl = [{ri, si}];
    while(toCrawl.length){
        const { ri, si } = toCrawl[0];
        crawl(board, ri-1, si, toCrawl);
        crawl(board, ri, si-1, toCrawl);
        crawl(board, ri, si+1, toCrawl);
        crawl(board, ri+1, si, toCrawl);

        toCrawl = toCrawl.filter(position => position.ri !== ri || position.si !== si);
    }
    
    return board;
}

export const reveal = board => board.map(row => row.map(slot => { slot.isOpen = true; return slot; } ));
