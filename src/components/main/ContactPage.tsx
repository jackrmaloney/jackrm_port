import React, { useState, useEffect, useCallback } from 'react';

interface Obstacle {
  x: number;
  height: number;
}

const GAME_HEIGHT = 130;
const PLAYER_SIZE = 30;
const OBSTACLE_WIDTH = 20;
const GRAVITY = 2;
const GAME_SPEED = 5;
const JUMP_FORCE = -12;
const MAX_JUMP_HOLD = 15; // Maximum frames to hold jump

const Game: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - PLAYER_SIZE);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [jumping, setJumping] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [jumpHoldFrames, setJumpHoldFrames] = useState(0);

  const jump = useCallback(() => {
    if (!isGameOver && (playerY === GAME_HEIGHT - PLAYER_SIZE || jumpHoldFrames < MAX_JUMP_HOLD)) {
      setJumping(true);
      setVelocity(JUMP_FORCE);
      setJumpHoldFrames(prev => prev + 1);
    }
  }, [isGameOver, playerY, jumpHoldFrames]);

  const resetGame = () => {
    setGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setPlayerY(GAME_HEIGHT - PLAYER_SIZE);
    setObstacles([]);
    setJumping(false);
    setVelocity(0);
    setJumpHoldFrames(0);
  };

  useEffect(() => {
    if (!gameStarted || isGameOver) return undefined;

    const gameLoop = window.setInterval(() => {
      // Handle continuous jumping while space is held
      if (isSpacePressed) {
        jump();
      }

      setPlayerY((prev) => {
        const newY = Math.max(0, Math.min(prev + velocity, GAME_HEIGHT - PLAYER_SIZE+30));
        if (newY === GAME_HEIGHT - PLAYER_SIZE) {
          setJumping(false);
          setJumpHoldFrames(0);
        }
        return newY;
      });

      setVelocity((prev) => {
        if (prev < 10) return prev + GRAVITY;
        return prev;
      });

      setObstacles((prev) => {
        const updated = prev
          .map(obs => ({ ...obs, x: obs.x - GAME_SPEED }))
          .filter(obs => obs.x + OBSTACLE_WIDTH > 0);

        if (prev.length === 0 || prev[prev.length - 1].x < 400) {
          updated.push({
            x: 800,
            height: Math.random() * 60 + 40
          });
        }

        return updated;
      });

      // Improved collision detection with smaller hitbox
      const playerRect = {
        x: 50 + 5, // Add small offset for more forgiving hitbox
        y: playerY + 5,
        width: PLAYER_SIZE - 10,
        height: PLAYER_SIZE - 10
      };

      const collision = obstacles.some(obstacle => {
        const obstacleRect = {
          x: obstacle.x,
          y: GAME_HEIGHT - obstacle.height,
          width: OBSTACLE_WIDTH,
          height: obstacle.height
        };

        return (
          playerRect.x < obstacleRect.x + obstacleRect.width &&
          playerRect.x + playerRect.width > obstacleRect.x &&
          playerRect.y < obstacleRect.y + obstacleRect.height &&
          playerRect.y + playerRect.height > obstacleRect.y
        );
      });

      if (collision) {
        setIsGameOver(true);
        if (score > highScore) {
          setHighScore(score);
        }
      }

      setScore((prev) => prev + 1);
    }, 1000 / 60);

    return () => window.clearInterval(gameLoop);
  }, [gameStarted, isGameOver, playerY, velocity, obstacles, score, highScore, isSpacePressed, jump]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(true);
        if (!gameStarted || isGameOver) {
          resetGame();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted, isGameOver]);

  return (
    <div 
      className="w-full h-48 bg-black/40 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden cursor-pointer"
      onMouseDown={() => {
        setIsSpacePressed(true);
        if (!gameStarted || isGameOver) {
          resetGame();
        }
      }}
      onMouseUp={() => setIsSpacePressed(false)}
      onMouseLeave={() => setIsSpacePressed(false)}
    >
      <div className="absolute top-4 right-4 text-white">
        Score: {score} | High Score: {highScore}
      </div>
      
      {!gameStarted && !isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Click or Press Space to Start
        </div>
      )}
      
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Game Over! Click or Press Space to Restart
        </div>
      )}

      {/* Player character with glow effect */}
      <div className="absolute" style={{ left: 50, top: playerY }}>
        {/* Glow effect */}
        <div
          className="absolute bg-white/30 blur-md rounded-lg"
          style={{
            width: PLAYER_SIZE + 8,
            height: PLAYER_SIZE + 8,
            left: -4,
            top: -4
          }}
        />
        {/* Main player body */}
        <div
          className="absolute bg-gradient-to-br from-white to-white/80 rounded-lg"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE
          }}
        />
        {/* Shine effect */}
        <div
          className="absolute bg-white/50 rounded-full"
          style={{
            width: PLAYER_SIZE / 3,
            height: PLAYER_SIZE / 3,
            left: PLAYER_SIZE / 6,
            top: PLAYER_SIZE / 6
          }}
        />
      </div>

      {obstacles.map((obstacle, index) => (
        <div key={index} className="absolute" style={{ left: obstacle.x, bottom: 0 }}>
          {/* Main obstacle body */}
          <div
            className="absolute bottom-6 bg-gradient-to-t from-white to-white/50 rounded-t-lg"
            style={{
              width: OBSTACLE_WIDTH,
              height: obstacle.height
            }}
          />
          {/* Glow effect */}
          <div
            className="absolute bottom-6 bg-white/20 blur-sm rounded-t-lg"
            style={{
              width: OBSTACLE_WIDTH + 4,
              height: obstacle.height + 10,
              left: -2
            }}
          />
          {/* Top highlight */}
          <div
            className="absolute bg-white/90 rounded-full"
            style={{
              width: OBSTACLE_WIDTH - 6,
              height: 4,
              left: 3,
              top: -obstacle.height
            }}
          />
        </div>
      ))}

      <div 
        className="absolute bottom-6 w-full h-1 bg-white"
      />
    </div>
  );
};

export const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="text-white text-xl mb-4">PHONE</h3>
          <p className="text-gray-200">(769) 230 - 5058</p>
        </div>
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="text-white text-xl mb-4">EMAIL</h3>
          <p className="text-gray-200">jackrmaloney09@gmail.com</p>
        </div>
      </div>
      
      <Game />
    </div>
  );
};

export default ContactPage;