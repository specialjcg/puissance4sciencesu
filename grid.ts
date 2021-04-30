import {COLUMN, Ring} from "./ring";

export class Grid {
    private readonly LINE = 6;
    private readonly COLUMN = 7;
    winner=0;
    gridColumn: COLUMN[];

    empty(): boolean {

        return this.gridColumn.reduce((noRing, column) => noRing + (column.filter(val => val === 0).length), 0) === this.LINE * this.COLUMN;
    }

    numberRings(column: number): number {

        return this.gridColumn[column].filter(lig => lig !== 0).length;
    }

    addRing(column: number, ring: Ring) {
        const numColRing = this.numberRings(column);
        if (numColRing < this.LINE) {
            this.gridColumn[column][numColRing] = ring
        }
    }
    theWinnerIs():number{
        this.win()
        return this.winner
    }
    win(): boolean {
        if (this.isFourRingDiagAscentLeftToRight(Ring.BLUE)||this.isFourRingInSuite(Ring.BLUE) ||this.isFourRingInLineSuite(Ring.BLUE) || this.isFourRingDiagDescentLeftToRight(Ring.BLUE)) this.winner=Ring.BLUE
        if(this.isFourRingInSuite(Ring.RED) || this.isFourRingInLineSuite(Ring.RED)|| this.isFourRingDiagDescentLeftToRight(Ring.RED)|| this.isFourRingDiagAscentLeftToRight(Ring.RED)) this.winner=Ring.RED
           return this.winner!==0
    }
    private isFourRingDiagAscentLeftToRight(ring: Ring) {
        const listDiag = this.GiveDiagAscentLeftToRight();
        return listDiag.some(column => {
            return column.toString().includes([ring, ring, ring, ring].toString());
        });
    }
    isFourRingDiagDescentLeftToRight(ring: Ring) {
        const listDiag = this.GiveDiagDescentLeftToRight();
        return listDiag.some(column => {
            return column.toString().includes([ring, ring, ring, ring].toString());
        });

    }
    private GiveDiagAscentLeftToRight() {
        let listDiag: COLUMN[] = Array.from({length: this.LINE+this.COLUMN}).map(() => []);
        for (let diag = 0; diag < this.LINE+this.COLUMN; diag++) {
            for (let col = 0; col < this.COLUMN; col++) {
                for (let lin = 0; lin < this.LINE; lin++) {
                    if (this.COLUMN-col-1 + lin === diag) listDiag[diag].push(this.gridColumn[col][lin])
                }
            }
        }
        return listDiag;
    }
    private GiveDiagDescentLeftToRight() {
        let listDiag: COLUMN[] = Array.from({length: this.LINE+this.COLUMN}).map(() => []);
        for (let diag = 0; diag < this.LINE+this.COLUMN; diag++) {
            for (let col = 0; col < this.COLUMN; col++) {
                for (let lin = 0; lin < this.LINE; lin++) {
                    if (col + lin === diag) listDiag[diag].push(this.gridColumn[col][lin])
                }
            }
        }
        return listDiag;
    }

    private isFourRingInSuite(ring: Ring) {
        return this.gridColumn.some(column => {
            return column.toString().includes([ring, ring, ring, ring].toString());
        });
    }

    private isFourRingInLineSuite(ring: Ring) {
        const gridlign = this.gridColumn.map((_, index) => this.gridColumn.map(col => col[index]));
        return gridlign.some(column => {
            return column.toString().includes([ring, ring, ring, ring].toString());
        });

    }

    constructor() {
        this.gridColumn = Array.from({length: this.COLUMN}).map(() => Array.from({length: this.LINE}).map(() => 0));
    }



}
