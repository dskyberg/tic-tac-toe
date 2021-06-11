import { action, makeObservable, observable } from "mobx"
import Player from '../classes/Player';
import {isTerminal} from '../classes/Board'

const depths = [-1, 1, 2, 3, 4]
export default class Settings {
    depth = -1
    starting = 1
    round = 1
    openDialog = false
    gameResult = 'Round 1'

    player = new Player(-1);
    board = ['', '', '', '', '', '', '', '', ''];

    constructor() {
        makeObservable(this, {
            depth: observable,
            starting: observable,
            round: observable,
            openDialog: observable,
            player: observable,
            board: observable,
            gameResult: observable,
            setDepth: action,
            setStarting: action,
            setRound: action,
            nextRound: action,
            setOpenDialog: action,
            setPlayer: action,
            setBoard: action,
            setGameResult: action,
            reset: action,
            move: action,
        })
    }

    setDepth(value) {
        if (value in depths) {
            this.depth = value
        }
    }

    setStarting(value) {
        if (value === 0 || value === 1) {
            this.starting = value
        }
    }

    setRound(round) {
        this.round = round
    }

    nextRound() {
        this.round += 1
        this.gameResult = `Round ${this.round}`
    }

    setOpenDialog(value) {
        this.openDialog = value;
    }

    setPlayer(depth) {
        this.player = new Player(depth);
    }

    setBoard(board) {
        this.board = ['', '', '', '', '', '', '', '', '']
    }

    setGameResult(result) {
        this.gameResult = result
    }

    reset(board = ['', '', '', '', '', '', '', '', '']) {
        this.player = new Player(this.depth);
        this.board = board;
        this.round = 1;
        this.gameResult = 'Round 1'
        if (!this.starting) {
           const  [symbol, position] = this.player.firstMove(this.board);
           this.board[position] = symbol;
          }

    }

    move(symbol, position) {
        if (position > 8 || this.board[position]) return false; //Cell is either occupied or does not exist
        this.board[position] = symbol;
        return isTerminal(this.board);
    }

}
