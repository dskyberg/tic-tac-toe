import React from "react";
import clsx from 'clsx'
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from '@material-ui/core/SvgIcon'
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core//Typography"
import Fade from '@material-ui/core/Fade'
import { green } from '@material-ui/core/colors'
import { isTerminal, printFormattedBoard } from "../classes/Board";
import { ReactComponent as XMark } from '../assets/x-mark.svg'
import { ReactComponent as OMark } from '../assets/o-mark.svg'

const margin = 3

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: 'column',
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    cell: {
        backgroundColor: "white",
        margin: margin,
    },
    winningCell: {
        color: 'white',
        backgroundColor: green[400],
    }
}));



const BoardView = observer((props) => {
    const { settings } = useStore()
    const classes = useStyles();
    const { board, starting } = settings

    const printWinner = (winner) => {
        if (winner === 'draw') {
            return "It's a draw!"
        }
        let noun = "You";
        if ((winner === 'x' && starting === 0) || (winner === 'o' && starting === 1)) {
            noun = 'I'
        }
        return noun + ' won!'
    }

    const handleClick = event => {
        const index = event.target.getAttribute('data-index')
        let symbol = settings.starting ? 'x' : 'o';
        if(index === null) {
            console.log(event.target)
        } else {
        console.log('symbol:',symbol,'index:',index)
        }
        let found_a_winner = settings.move(symbol, index)
        //printFormattedBoard(board)
        if (found_a_winner) {
            settings.setGameResult(printWinner(found_a_winner.winner))
        }
        // If the game isn't over, then let the ai make a move
        else {
            // Give the appearance that the AI is thinking about the move
            // by delaying the move just a bit
            const delay = Math.random() * (1000 - 750) + 750
            setTimeout(() => {
                const best = settings.player.getBestMove(board, !starting)
                symbol = !starting ? 'x' : 'o';
                found_a_winner = settings.move(symbol, best);
                printFormattedBoard(board)
                // Check again for a winner.  If there was a winner, then format the result for the app bar
                if (found_a_winner) {
                    settings.setGameResult(printWinner(found_a_winner.winner))
                } else { // Otherwise just move on to the next round
                    settings.nextRound()
                }
            }, delay);
        }

    }


    const Cell = React.memo((props) => {
        const { mark, index } = props

        return (
            <Fade in={true} appear={false}>
                <Typography component="div" variant="h4">
                    <Box padding={2} width={100} height={100} data-index={index} display="flex" alignItems="center" justifyContent="center"  >
                        {mark === 'x' ? <XMark style={{fill: 'green', height:'96', width: '96'}}/> : mark === 'o' ? <OMark style={{ height:'96', width: '96'}}/> : ' '}
                    </Box>
                </Typography>
            </Fade>
        )
    })

    const win = isTerminal(board)

    const isWin = (w, cell) => {

        return w && w.winner !== 'draw' && w.cells.includes(cell)
    }

    return (
        <div id="game-board" className={classes.root}>
            <div id="game-board-row-0" className={classes.row}>
                <div id="game-board-row-0-cell-0" className={clsx(classes.cell, isWin(win, 0) && classes.winningCell)} data-index={0} onClick={handleClick}>
                    <Cell mark={settings.board[0]} index={0} />
                </div>
                <div id="game-board-row-0-cell-1" className={clsx(classes.cell, isWin(win, 1) && classes.winningCell)} data-index={1} onClick={handleClick}>
                    <Cell mark={settings.board[1]} index={1} />
                </div>
                <div id="game-board-row-0-cell-2" className={clsx(classes.cell, isWin(win, 2) && classes.winningCell)} data-index={2} onClick={handleClick}>
                    <Cell mark={settings.board[2]} index={2} />
                </div>
            </div>
            <div id="game-board-row-1" className={classes.row}>
                <div id="game-board-row-1-cell-0" className={clsx(classes.cell, isWin(win, 3) && classes.winningCell)} data-index={3} onClick={handleClick}>
                    <Cell mark={settings.board[3]} index={3} />
                </div>
                <div id="game-board-row-1-cell-1" className={clsx(classes.cell, isWin(win, 4) && classes.winningCell)} data-index={4} onClick={handleClick}>
                    <Cell mark={settings.board[4]} index={4} />
                </div>
                <div id="game-board-row-1-cell-2" className={clsx(classes.cell, isWin(win, 5) && classes.winningCell)} data-index={5} onClick={handleClick}>
                    <Cell mark={settings.board[5]} index={5} />
                </div>
            </div>
            <div id="game-board-row-2" className={classes.row}>
                <div id="game-board-row-2-cell-0" className={clsx(classes.cell, isWin(win, 6) && classes.winningCell)} data-index={6} onClick={handleClick}>
                    <Cell mark={settings.board[6]} index={6} />
                </div>
                <div id="game-board-row-2-cell-1" className={clsx(classes.cell, isWin(win, 7) && classes.winningCell)} data-index={7} onClick={handleClick}>
                    <Cell mark={settings.board[7]} index={7} />
                </div>
                <div id="game-board-row-2-cell-2" className={clsx(classes.cell, isWin(win, 8) && classes.winningCell)} data-index={8} onClick={handleClick}>
                    <Cell mark={settings.board[8]} index={8} />
                </div>
            </div>
        </div>
    );
});

export default BoardView;
