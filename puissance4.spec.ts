import {Grid} from "./grid";
import {Ring} from "./ring";

describe('test connect 4', function () {
    let grid: Grid;
    beforeEach(() => {
        grid = new Grid();
    });
    it('should grid  be empty in first', () => {

        expect(grid.empty()).toBeTruthy();
    });
    it('should grid  not empty when add 1 ring', () => {
        grid.addRing(1,Ring.RED);
        expect(grid.empty()).toBeFalsy();
    });
    it('should have two ring after add two ring', () => {

        grid.addRing(1,Ring.RED);
        grid.addRing(1,Ring.RED);
        expect(grid.numberRings(1)).toEqual(2);
    });
    it('should not  adding  ring beyond the maximum size of the grid', () => {

       for (let play=0;play<8;play++)
       {
           grid.addRing(1,Ring.RED);}
        expect(grid.numberRings(1)).toEqual(6);
    });
    it('should  not adding  ring beyond the maximun of the grid and return throw error', () => {


        expect(() => grid.addRing(8,Ring.RED)).toThrow();

    });
    it('should add 2 Ring one Red and on blue on column 1', () => {

        grid.addRing(1,Ring.RED)
        grid.addRing(1,Ring.BLUE)

        expect(grid.gridColumn[1][0]).toEqual(Ring.RED);
        expect(grid.gridColumn[1][1]).toEqual(Ring.BLUE);

    });
    it('should win when with have 4 Ring BLUE in suite', () => {


        grid.addRing(1,Ring.BLUE)
        grid.addRing(1,Ring.BLUE)
        grid.addRing(1,Ring.BLUE)
        grid.addRing(1,Ring.BLUE)
        expect(grid.win()).toBeTruthy();
    });
    it('should win when with have 4 Ring RED in suite', () => {

        grid.addRing(2,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(2,Ring.RED)
        expect(grid.win()).toBeTruthy();
    });
    it('should win when with have 4 Ring RED in suite on line', () => {

        grid.addRing(0,Ring.RED)
        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.RED)
        expect(grid.win()).toBeTruthy();
    });
    it('should win when with have 4 Ring RED in suite on line', () => {

        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.RED)
        grid.addRing(4,Ring.RED)
        expect(grid.win()).toBeTruthy();
    });
    it('should not win when with have 4 Ring RED in suite with one Red between', () => {
        grid.addRing(1,Ring.RED)
        grid.addRing(1,Ring.RED)
        grid.addRing(1,Ring.BLUE)
        grid.addRing(1,Ring.RED)
        grid.addRing(1,Ring.RED)
        expect(grid.win()).toBeFalsy();
    });
    it('should not win when with have 4 Ring Red in line in suite with one blue between', () => {

        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.BLUE)
        grid.addRing(4,Ring.RED)
        grid.addRing(5,Ring.RED)
        expect(grid.win()).toBeFalsy();
    });
    it('should  win in diag in descent to left to right ', () => {

        grid.addRing(0,Ring.RED)
        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.BLUE)
        grid.addRing(3,Ring.RED)

        grid.addRing(0,Ring.RED)
        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)

        grid.addRing(0,Ring.BLUE)
        grid.addRing(1,Ring.RED)

        expect(grid.win()).toBeFalsy();
        grid.addRing(0,Ring.RED)
        expect(grid.win()).toBeTruthy();
    });
    it('should  win in diag in descent to left to right all test', () => {

        grid.gridColumn[0][4]=Ring.RED
        grid.gridColumn[2][2]=Ring.RED
        grid.gridColumn[1][3]=Ring.RED
        grid.gridColumn[3][1]=Ring.RED
        grid.gridColumn[4][0]=0
        expect(grid.isFourRingDiagDescentLeftToRight(Ring.RED)).toBeTruthy();
        grid.gridColumn[0][4]=Ring.BLUE
        grid.gridColumn[2][2]=Ring.RED
        grid.gridColumn[1][3]=Ring.RED
        grid.gridColumn[3][1]=Ring.RED
        grid.gridColumn[4][0]=Ring.RED
        expect(grid.isFourRingDiagDescentLeftToRight(Ring.RED)).toBeTruthy();

    });
    it('should  win in diag in ascent to left to right ', () => {

        grid.addRing(0,Ring.RED)
        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.BLUE)
        grid.addRing(3,Ring.RED)

        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.RED)

        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.BLUE)

        expect(grid.win()).toBeFalsy();
        grid.addRing(3,Ring.RED)
        expect(grid.win()).toBeTruthy();
    });
    it('should  win in diag in ascent to left to right  second', () => {

        grid.addRing(0,Ring.RED)
        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.BLUE)
        grid.addRing(3,Ring.RED)
        grid.addRing(4,Ring.RED)

        grid.addRing(0,Ring.BLUE)
        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.BLUE)

        grid.addRing(1,Ring.BLUE)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.RED)

        grid.addRing(2,Ring.BLUE)
        grid.addRing(3,Ring.BLUE)

        expect(grid.win()).toBeFalsy();
        grid.addRing(3,Ring.BLUE)
        expect(grid.win()).toBeTruthy();
    });
    it('should give the coulour of winner when win', () => {

        grid.addRing(1,Ring.RED)
        grid.addRing(2,Ring.RED)
        grid.addRing(3,Ring.RED)
        grid.addRing(4,Ring.RED)
        expect(grid.theWinnerIs()).toEqual(Ring.RED);
    });
});
