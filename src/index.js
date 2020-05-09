import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


function Square(props) {
    return (
        <button className="square" onClick={ props.onClick2 }>
            { props.value2 } 
        </button>
    );
}
  
class Board extends React.Component {

    renderSquare(i) {
        return (
            <Square 
                value2 = {this.props.arr[i]} 
                onClick2 = { () => this.props.onClick2(i) }
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                arrFromGame: Array(9).fill(null),
            }],
            isNext: true,
        }
    }


    handleClick(mi) {

        const history = this.state.history;
        const current = history[history.length - 1];
        const carr = current.arrFromGame.slice();

        carr[mi] = this.state.isNext ? 'X' : 'O';

        this.setState({ 
            history: history.concat([{
                arrFromGame: carr,
            }]),
            isNext: !this.state.isNext,
        });
    }


    render() {

        const history = this.state.history;
        const current = this.state.history[history.length - 1];
        const winner = calculateWinner(current.arrFromGame);

        let status;

        if(winner) {
            status = "Wygrywa: " + winner;
        } else {
            status = 'Next player: ' + '' + (this.state.isNext ? 'X' : 'O');    
        }


        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    arr = { current.arrFromGame }
                    onClick2 = { (i) => this.handleClick(i) }
                 />
                </div>
                <div className="game-info">
                <div> { status } </div>
                <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function calculateWinner(sq) {


    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];


    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
        return sq[a];
      }
    }
    return null;
}
  