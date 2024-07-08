import { useState } from 'react';

function Square({ value, onSquareClick }) { // le value dans la fonction square indique qu'il peut recevoir un props 
  return (
  <button className='square' onClick={onSquareClick}>
    {value}
  </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (calculateWinner(squares) || (squares[i])) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'x';
    } else {
      nextSquares[i] = 'o';
    }
    onPlay(nextSquares);
  }


  const winner = calculateWinner(squares);
   let status;
    if (winner) {
      status = winner + " bien joué ! vous avez gagné !";
    }   else {
    status = "Prochain tour : " + (xIsNext ? "x" : "o");
  }

  return  (
  <>
    <div className='status'>{status}</div>
    <div className="board-row">
      <Square  value={squares[0]} onSquareClick={() => handleClick(0)}/>
      <Square  value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square  value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>

    <div className="board-row">
      <Square  value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square  value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square  value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>

    <div className="board-row">
      <Square  value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square  value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square  value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
  </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);//setSquares est une fonction qui mets à jour la valeur stocker dans squares 
  const currentSquares = history[history.length -1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {

  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Aller au coup suivant # ' + move;
    } else {
      description = 'Revenir au bébut';
    } 
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
     <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
    }
    return null;
  }
  


// export est le mot-clé JS pour exporter les fichiers sur d'autres pages 

/*

*/