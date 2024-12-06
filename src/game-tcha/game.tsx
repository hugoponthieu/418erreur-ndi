import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  gameOverCoral,
  generate,
  getCoralState,
  running,
} from "@/features/flaky-fish/flakyCoralSlice";
import {
  fall,
  fly,
  gameOverFish,
  getFishState,
} from "@/features/flaky-fish/flakyFishSlice";
import {
  gameOverTcha,
  getTchaState,
  start,
} from "@/features/flaky-fish/gameTchaSlice";
import { cn } from "@/lib/utils";
import { Coral } from "./coral";
import { Fish } from "./fish";
import BgImage from "./images/bg.png";

let gameLoop: NodeJS.Timeout;
let pipeGenerator: NodeJS.Timeout;
let scoreCounter: NodeJS.Timeout;

interface GameProps {
  maxScore: number;
  setWin: () => void;
}

export function Game({ maxScore, setWin }: GameProps) {
  const [score, setScore] = useState(0);
  const dispatch = useAppDispatch();
  const fishState = useAppSelector(getFishState);
  const coralState = useAppSelector(getCoralState);
  const gameTchaState = useAppSelector(getTchaState);

  useEffect(() => {
    if (score >= maxScore) {
      setWin();
    }
  }, [score]);

  const flyLocal = () => {
    dispatch(fly());
  };

  const startLocal = () => {
    const { status } = gameTchaState;

    if (status !== "playing") {
      gameLoop = setInterval(() => {
        dispatch(fall());
        dispatch(running());
      }, 200);

      pipeGenerator = setInterval(() => {
        dispatch(generate());
      }, 3000);
      setTimeout(() => {
        setScore((prev) => prev + 1);
        scoreTime()
      }, 6000);
      dispatch(start());
    }
  };
  const scoreTime = () => {
    scoreCounter = setInterval(() => {
      console.log("score");    
      setScore((prev) => prev + 1);
    }, 4500);
  };

  useEffect(() => {
    const birdY = fishState.y;
    const corals = coralState.corals;
    const x = coralState.x;
    const challenge = corals
      .map(({ topHeight }: { topHeight: number }, i: number) => {
        return {
          x1: x + i * 200,
          y1: topHeight,
          x2: x + i * 200,
          y2: topHeight + 100,
        };
      })
      .filter(({ x1 }: { x1: number }) => {
        if (x1 > 0 && x1 < 288) {
          return true;
        }
      });

    if (birdY > 512) {
      dispatch(gameOverCoral());
      dispatch(gameOverTcha());
      dispatch(gameOverFish());
      clearInterval(gameLoop);
      clearInterval(pipeGenerator);
      clearInterval(scoreCounter);
      setScore(0);
    }

    if (challenge.length) {
      const { x1, y1, x2, y2 } = challenge[0];

      if (
        (x1 < 120 && 120 < x1 + 52 && birdY < y1) ||
        (x2 < 120 && 120 < x2 + 52 && birdY > y2)
      ) {
        dispatch(gameOverCoral());
        dispatch(gameOverTcha());
        dispatch(gameOverFish());
        clearInterval(gameLoop);
        clearInterval(pipeGenerator);
        clearInterval(scoreCounter);
        setScore(0);
      } else if (120 < x1 + 52) {
      }
    }
  }, [coralState.corals, coralState.x, dispatch, fishState.y]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        flyLocal();
      }

      const { status } = gameTchaState;
      if (status !== "playing") {
        startLocal();
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  });

  return (
    <>
      <div className="font-pressstart">
        <p>
          Score: {score} / {maxScore}
        </p>
      </div>

      <div
        className="flex"
        style={{
          position: "relative",
          width: 288,
          height: 512,
          background: `url(${BgImage})`,
          overflow: "hidden",
        }}
      >
        <div
          className={cn(
            "flex h-full items-center font-pressstart justify-center w-full p-12 z-10  absolute text-white text-center",
            {
              hidden: gameTchaState.status === "playing",
            }
          )}
        >
          Press space to start
        </div>
        <Fish y={fishState.y} r={fishState.r} />
        <Coral x={coralState.x} corals={coralState.corals} />
      </div>
    </>
  );
}
