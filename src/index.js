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


    constructor(props) {
        super(props);

        this.state = {
            arr: Array(9).fill(null),
            isNext: true,
        }
    }

    handleClick(mi) {

        const carr = this.state.arr.slice();
        carr[mi] = this.state.isNext ? 'X' : 'O';
        this.setState({ 
            arr: carr,
            isNext: !this.state.isNext,
        });

        

    }

    renderSquare(i) {
        return (
            <Square 
                value2 = {this.state.arr[i]} 
                onClick2 = { () => this.handleClick(i) }
            />
        );
    }

    render() {
        
        const winner = calculateWinner(this.state.arr);
        let status;

        if(winner) {
            status = "Wygrywa: " + winner;
        } else {
            status = 'Next player: ' + '' + (this.state.isNext ? 'X' : 'O');    
        }
        

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
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
  