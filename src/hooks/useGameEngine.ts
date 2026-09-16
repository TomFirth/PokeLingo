import { useState, useCallback, useMemo } from 'react';
import { KANTO_POKEMON, Pokemon, getEffectiveness } from '@/data/pokemon';
import { PokemonType } from '@/data/types';

export const useGameEngine = () => {
  const [player, setPlayer] = useState<Pokemon>(KANTO_POKEMON[Math.floor(Math.random() * KANTO_POKEMON.length)]);
  const [opponent, setOpponent] = useState<Pokemon>(KANTO_POKEMON[Math.floor(Math.random() * KANTO_POKEMON.length)]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const getNewPokemon = useCallback(() => {
    return KANTO_POKEMON[Math.floor(Math.random() * KANTO_POKEMON.length)];
  }, []);

  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up') => {
    // Logic:
    // Right: Player is strong vs Opponent
    // Left: Opponent is strong vs Player
    // Up: Neutral

    let playerIsStrong = false;
    for (const pType of player.types) {
      if (getEffectiveness(pType, opponent.types) > 1) {
        playerIsStrong = true;
        break;
      }
    }

    let opponentIsStrong = false;
    for (const oType of opponent.types) {
      if (getEffectiveness(oType, player.types) > 1) {
        opponentIsStrong = true;
        break;
      }
    }

    let correct = false;
    if (direction === 'right') correct = playerIsStrong;
    else if (direction === 'left') correct = opponentIsStrong;
    else if (direction === 'up') correct = !playerIsStrong && !opponentIsStrong;

    if (correct) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      // If player won, change opponent
      if (direction === 'right') {
        setOpponent(getNewPokemon());
      } else if (direction === 'left') {
        // If opponent won, change player
        setPlayer(getNewPokemon());
      } else {
        // Neutral: change both? Or just one? Let's change opponent for flow
        setOpponent(getNewPokemon());
      }
    } else {
      setStreak(0);
      // Optional: feedback for incorrect
    }

    return correct;
  }, [player, opponent, getNewPokemon]);

  return {
    player,
    opponent,
    score,
    streak,
    handleSwipe
  };
};
