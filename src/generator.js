import settings from './settings';

const containsBombsAtElement = (bombPositions, width, height) => 
    bombPositions.some(bomb => bomb.width === width && bomb.height === height);

const createBombPositions = () => 
    [...Array(settings.bombs).keys()].reduce((bombPositions) => {
        while (true){
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
    const board = new Array(settings.board.height).fill(null)
        .map(() => new Array(settings.board.width).fill(minesweeperSlot));

    return board.map((row, rowIndex) => 
        row.map((slot, slotIndex) => (containsBombsAtElement(bombPositions, slotIndex, rowIndex)) ? {...slot, isBomb: true } : slot)
    );
}
