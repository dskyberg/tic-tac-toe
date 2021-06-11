import {getAvailableMoves, insert, isTerminal} from './Board';
class Player {
	constructor(maxDepth = -1) {
		this.maxDepth = maxDepth;
		this.nodes_map = new Map();
	}

	/**
	 * Makes the first move when the ai is starting.  It's a random move, chosen
	 * from one of the corners, or the center square.
	 *
	 * @param {string[]} board The game board array.
	 * @returns {[symbol, position]} [symbol, position] The calculated move
	 */
	firstMove(board) {
		let center_and_corners = [0, 2, 4, 6, 8];
		let first_choice = center_and_corners[Math.floor(Math.random() * center_and_corners.length)];
		let symbol = 'x';
		return [symbol, first_choice];
	}

	/**
	 * Minimax function.  Called recursively for both the maximizing and minimizing
	 * moves.
	 *
	 * @param {string[]} board The game board array
	 * @param {int} maximizing Whether this is
	 * @param {int} depth Trim the recursive look based on the depth
	 * @returns
	 */
	getBestMove(board, maximizing = true, depth = 0) {
		if (depth === 0) {
			this.nodes_map.clear();
		}
		if (isTerminal(board) || depth === this.maxDepth) {
			if (isTerminal(board).winner === 'x') {
				return 100 - depth;
			} else if (isTerminal(board).winner === 'o') {
				return -100 + depth;
			}
			return 0;
		}
		//Current player is maximizing
		if (maximizing) {
			//Initializ best to the lowest possible value
			let best = -100;
			//Loop through all empty cells
			getAvailableMoves(board).forEach(index => {
				// Initialize a new board with the current state (slice() is used
				// to create a new array and not modify the original)
				let child = board.slice();
				// Create a child node by inserting the maximizing symbol x into
				// the current emoty cell
				insert(child, 'x', index);

				//Recursively calling getBestMove this time with the new board and
				//minimizing turn and incrementing the depth
				let node_value = this.getBestMove(child, false, depth + 1);

				//Updating best value
				best = Math.max(best, node_value);

				//If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
				if (depth === 0) {
					//Comma seperated indicies if multiple moves have the same heuristic value
					var moves = this.nodes_map.has(node_value) ? `${this.nodes_map.get(node_value)},${index}` : index;
					this.nodes_map.set(node_value, moves);
				}
			});

			//If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
			if (depth === 0) {
				let ret
				if (typeof this.nodes_map.get(best) === 'string') {
					const arr = this.nodes_map.get(best).split(',');
					const rand = Math.floor(Math.random() * arr.length);
					ret = arr[rand];
				} else {
					ret = this.nodes_map.get(best);
				}
				return ret;
			}
			//If not main call (recursive) return the heuristic value for next calculation
			return best;
		}
		if (!maximizing) {
			//Initializ best to the highest possible value
			let best = 100;
			//Loop through all empty cells
			getAvailableMoves(board).forEach(index => {
				//Initialize a new board with the current state (slice() is used to create a new array and not modify the original)
				let child = board.slice();
				//Create a child node by inserting the minimizing symbol o into the current emoty cell
				insert(child, 'o', index);

				//Recursively calling getBestMove this time with the new board and maximizing turn and incrementing the depth
				let node_value = this.getBestMove(child, true, depth + 1);
				//Updating best value
				best = Math.min(best, node_value);

				//If it's the main function call, not a recursive one, map each heuristic value with it's moves indicies
				if (depth === 0) {
					//Comma seperated indicies if multiple moves have the same heuristic value
					var moves = this.nodes_map.has(node_value) ? this.nodes_map.get(node_value) + ',' + index : index;
					this.nodes_map.set(node_value, moves);
				}
			});
			//If it's the main call, return the index of the best move or a random index if multiple indicies have the same value
			if (depth === 0) {
				let ret;
				if (typeof this.nodes_map.get(best) === 'string') {
					const arr = this.nodes_map.get(best).split(',');
					const rand = Math.floor(Math.random() * arr.length);
					ret = arr[rand];
				} else {
					ret = this.nodes_map.get(best);
				}
				return ret;
			}
			//If not main call (recursive) return the heuristic value for next calculation
			return best;
		}
	}
}
export default Player;