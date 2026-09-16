import { useState, useCallback } from 'react';
import { KANTO_POKEMON, Pokemon } from '@/data/pokemon';

export const useWTPGame = () => {
  const [target, setTarget] = useState<Pokemon>(KANTO_POKEMON[Math.floor(Math.random() * KANTO_POKEMON.length)]);
  const [isSilhouette, setIsSilhouette] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | null>(null);

  const nextPokemon = useCallback(() => {
    setTarget(KANTO_POKEMON[Math.floor(Math.random() * KANTO_POKEMON.length)]);
    setIsSilhouette(true);
    setLastResult(null);
  }, []);

  const guess = useCallback((name: string) => {
    const isCorrect = name.toLowerCase() === target.name.toLowerCase();
    setLastResult(isCorrect ? 'correct' : 'incorrect');
    setTotalGuesses(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setIsSilhouette(false);
      // Wait a bit before next pokemon in the UI
    }

    return isCorrect;
  }, [target]);

  return {
    target,
    isSilhouette,
    correctCount,
    totalGuesses,
    lastResult,
    guess,
    nextPokemon
  };
};
