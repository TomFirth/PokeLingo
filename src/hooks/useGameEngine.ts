import { useState, useCallback, useMemo, useEffect } from 'react';
import { Pokemon, getEffectiveness } from '@/data/pokemon';
import { PokemonType } from '@/data/types';
import { useProgression } from './ProgressionContext';

export const useGameEngine = () => {
  const { addXp, selectedRegion } = useProgression();

  const pool = useMemo(() => {
    const { POKEMON_BY_REGION } = require('@/data/pokemon');
    return POKEMON_BY_REGION[selectedRegion] || POKEMON_BY_REGION['Kanto'];
  }, [selectedRegion]);

  const getNewPokemon = useCallback(() => {
    return pool[Math.floor(Math.random() * pool.length)];
  }, [pool]);

  const [player, setPlayer] = useState<Pokemon>(getNewPokemon());
  const [opponent, setOpponent] = useState<Pokemon>(getNewPokemon());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setPlayer(getNewPokemon());
    setOpponent(getNewPokemon());
  }, [selectedRegion, getNewPokemon]);

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
      addXp(10, 'lingo');
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
