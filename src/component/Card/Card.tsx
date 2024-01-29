import React from "react";
import styles from "./Card.module.scss";

interface GameCardProps {
  gameText: string;
  provider: string;
  image: {
    alt: string;
    small: {
      id: string;
      src: string;
      alt: string;
      metadata: Record<string, unknown>;
    };
  };
  slug: string;
  betSize: {
    min: number;
  };
}

const GameCard: React.FC<GameCardProps> = ({
  gameText,
  provider,
  image,
  slug,
  betSize,
}) => {
  return (
    <div className={styles["game-card"]}>
      <div className={styles["game-image"]}>
        <img src={image.small.src} alt={image.alt} />
      </div>
      <div className={styles["game-details"]}>
        <h2 className={styles["game-title"]}>{gameText}</h2>
        <p className={styles["game-provider"]}>{provider}</p>
        <p className={styles["bet-size"]}>Min Bet: {betSize.min}</p>
        <a href={`/games/${slug}`} className={styles["play-button"]}>
          Play Now
        </a>
      </div>
    </div>
  );
};

export default GameCard;
