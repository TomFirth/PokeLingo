import { useState, useCallback, useMemo, useEffect } from 'react';
import { Pokemon } from '@/data/pokemon';
import { useProgression } from './ProgressionContext';

export const useWTPGame = () => {
  const { selectedRegion } = useProgression();

  const pool = useMemo(() => {
    const { POKEMON_BY_REGION } = require('@/data/pokemon');
    return POKEMON_BY_REGION[selectedRegion] || POKEMON_BY_REGION['Kanto'];
  }, [selectedRegion]);

  const [target, setTarget] = useState<Pokemon>(pool[Math.floor(Math.random() * pool.length)]);
  const [options, setOptions] = useState<string[]>([]);
  const [isSilhouette, setIsSilhouette] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | null>(null);

  const generateOptions = useCallback((correctPokemon: Pokemon) => {
    const decoys = pool
      .filter(p => p.id !== correctPokemon.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(p => p.name);

    const allOptions = [...decoys, correctPokemon.name].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  }, [pool]);

  const nextPokemon = useCallback(() => {
    const next = pool[Math.floor(Math.random() * pool.length)];
    setTarget(next);
    generateOptions(next);
    setIsSilhouette(true);
    setLastResult(null);
  }, [pool, generateOptions]);

  useEffect(() => {
    nextPokemon();
  }, [selectedRegion, nextPokemon]);

  const guess = useCallback((name: string) => {
    if (!isSilhouette) return false; // Prevent double guessing

    const isCorrect = name.toLowerCase() === target.name.toLowerCase();
    setLastResult(isCorrect ? 'correct' : 'incorrect');
    setTotalGuesses(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setIsSilhouette(false);
      // Wait a bit before next pokemon in the UI
    }

    return isCorrect;
  }, [target, isSilhouette]);

  return {
    target,
    options,
    isSilhouette,
    correctCount,
    totalGuesses,
    lastResult,
    guess,
    nextPokemon
  };
};
