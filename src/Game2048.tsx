import { createSignal, createEffect, For } from 'solid-js'
import './Game2048.css'

export type GameState = {
  board: number[][]
  score: number
  gameOver: boolean
  gameWon: boolean
}

const BOARD_SIZE = 4
const WIN_VALUE = 2048

// 初始化空棋盘
const initBoard = (): number[][] => {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0))
}

// 在空位置添加新的数字（2或4）
const addRandomTile = (board: number[][]): number[][] => {
  const emptyTiles: [number, number][] = []
  
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === 0) {
        emptyTiles.push([i, j])
      }
    }
  }
  
  if (emptyTiles.length === 0) return board
  
  const newBoard = board.map(row => [...row])
  const randomIndex = Math.floor(Math.random() * emptyTiles.length)
  const [row, col] = emptyTiles[randomIndex]
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4
  
  return newBoard
}

// 初始化游戏
const initGame = (): GameState => {
  let board = initBoard()
  board = addRandomTile(board)
  board = addRandomTile(board)
  
  return {
    board,
    score: 0,
    gameOver: false,
    gameWon: false
  }
}

// 向左移动和合并
const moveLeft = (row: number[]): { row: number[], scoreAdded: number } => {
  let newRow = row.filter(val => val !== 0)
  let scoreAdded = 0
  
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2
      scoreAdded += newRow[i]
      newRow[i + 1] = 0
      i++
    }
  }
  
  newRow = newRow.filter(val => val !== 0)
  while (newRow.length < BOARD_SIZE) {
    newRow.push(0)
  }
  
  return { row: newRow, scoreAdded }
}

// 旋转棋盘
const rotateBoard = (board: number[][]): number[][] => {
  const size = board.length
  const rotated = Array(size).fill(null).map(() => Array(size).fill(0))
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      rotated[j][size - 1 - i] = board[i][j]
    }
  }
  
  return rotated
}

// 检查是否有可移动的位置
const canMove = (board: number[][]): boolean => {
  // 检查是否有空位
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === 0) return true
    }
  }
  
  // 检查是否可以合并
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const current = board[i][j]
      if (
        (j < BOARD_SIZE - 1 && current === board[i][j + 1]) ||
        (i < BOARD_SIZE - 1 && current === board[i + 1][j])
      ) {
        return true
      }
    }
  }
  
  return false
}

// 检查是否获胜
const hasWon = (board: number[][]): boolean => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === WIN_VALUE) return true
    }
  }
  return false
}

// 移动游戏状态
const move = (gameState: GameState, direction: 'up' | 'down' | 'left' | 'right'): GameState => {
  let { board, score, gameOver, gameWon } = gameState
  
  if (gameOver) return gameState
  
  let newBoard = board.map(row => [...row])
  let newScore = score
  let moved = false
  
  // 根据方向旋转棋盘
  let rotations = 0
  switch (direction) {
    case 'right':
      rotations = 2
      break
    case 'up':
      rotations = 3
      break
    case 'down':
      rotations = 1
      break
  }
  
  for (let i = 0; i < rotations; i++) {
    newBoard = rotateBoard(newBoard)
  }
  
  // 向左移动每一行
  for (let i = 0; i < BOARD_SIZE; i++) {
    const { row: newRow, scoreAdded } = moveLeft(newBoard[i])
    if (JSON.stringify(newRow) !== JSON.stringify(newBoard[i])) {
      moved = true
    }
    newBoard[i] = newRow
    newScore += scoreAdded
  }
  
  // 反向旋转回原来的方向
  for (let i = 0; i < (4 - rotations) % 4; i++) {
    newBoard = rotateBoard(newBoard)
  }
  
  // 如果有移动，添加新的数字
  if (moved) {
    newBoard = addRandomTile(newBoard)
    
    // 检查游戏状态
    const won = hasWon(newBoard)
    const over = !canMove(newBoard)
    
    return {
      board: newBoard,
      score: newScore,
      gameOver: over,
      gameWon: won || gameWon
    }
  }
  
  return gameState
}

export default function Game2048() {
  const [gameState, setGameState] = createSignal<GameState>(initGame())
  
  let touchStartX = 0
  let touchStartY = 0
  
  const restartGame = () => {
    setGameState(initGame())
  }
  
  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    
    const currentState = gameState()
    let direction: 'up' | 'down' | 'left' | 'right' | null = null
    
    switch (e.key) {
      case 'ArrowUp':
        direction = 'up'
        break
      case 'ArrowDown':
        direction = 'down'
        break
      case 'ArrowLeft':
        direction = 'left'
        break
      case 'ArrowRight':
        direction = 'right'
        break
    }
    
    if (direction) {
      setGameState(move(currentState, direction))
    }
  }
  
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartX || !touchStartY) return
    
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    
    const deltaX = touchEndX - touchStartX
    const deltaY = touchEndY - touchStartY
    
    const minSwipeDistance = 50
    
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return
    }
    
    const currentState = gameState()
    let direction: 'up' | 'down' | 'left' | 'right' | null = null
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平滑动
      direction = deltaX > 0 ? 'right' : 'left'
    } else {
      // 垂直滑动
      direction = deltaY > 0 ? 'down' : 'up'
    }
    
    if (direction) {
      setGameState(move(currentState, direction))
    }
    
    touchStartX = 0
    touchStartY = 0
  }
  
  createEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })
  
  const getTileClass = (value: number) => {
    return `tile tile-${value}`
  }
  
  return (
    <div class="game-container">
      <div class="game-header">
        <h1>2048</h1>
        <div class="score-container">
          <div class="score-box">
            <div class="score-label">分数</div>
            <div class="score-value">{gameState().score}</div>
          </div>
          <button class="restart-button" onClick={restartGame}>
            重新开始
          </button>
        </div>
      </div>
      
      <div 
        class="game-board"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <For each={gameState().board}>
          {(row, rowIndex) => (
            <For each={row}>
              {(value, colIndex) => (
                <div 
                  class={getTileClass(value)} 
                  style={{
                    'grid-row': rowIndex() + 1,
                    'grid-column': colIndex() + 1
                  }}
                >
                  {value !== 0 ? value : ''}
                </div>
              )}
            </For>
          )}
        </For>
      </div>
      
      {gameState().gameWon && (
        <div class="game-message">
          <div class="message-content">
            <h2>恭喜！你赢了！</h2>
            <button onClick={restartGame}>再玩一次</button>
          </div>
        </div>
      )}
      
      {gameState().gameOver && !gameState().gameWon && (
        <div class="game-message">
          <div class="message-content">
            <h2>游戏结束</h2>
            <p>最终分数: {gameState().score}</p>
            <button onClick={restartGame}>重新开始</button>
          </div>
        </div>
      )}
      
      <div class="game-instructions">
        <p>使用方向键移动数字方块，相同数字会合并！</p>
      </div>
    </div>
  )
}
