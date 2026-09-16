import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressionState {
  xp: number;
  level: number;
  totalXp: number;
  badges: string[];
  unlockedRegions: string[];
}

interface ProgressionContextType extends ProgressionState {
  addXp: (amount: number) => void;
  resetProgression: () => void;
}

const ProgressionContext = createContext<ProgressionContextType | undefined>(undefined);

const STORAGE_KEY = '@pokelingo_progression';

export const XP_PER_LEVEL = 500;

export const ProgressionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProgressionState>({
    xp: 0,
    level: 1,
    totalXp: 0,
    badges: [],
    unlockedRegions: ['Kanto'],
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setState(JSON.parse(savedData));
        }
      } catch (e) {
        console.error('Failed to load progression data', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(e => {
        console.error('Failed to save progression data', e);
      });
    }
  }, [state, isLoaded]);

  const addXp = useCallback((amount: number) => {
    setState(prev => {
      const newTotalXp = prev.totalXp + amount;
      const newLevel = Math.floor(newTotalXp / XP_PER_LEVEL) + 1;
      const newXp = newTotalXp % XP_PER_LEVEL;

      // Logic for unlocking regions could go here
      const newRegions = [...prev.unlockedRegions];
      if (newLevel >= 5 && !newRegions.includes('Johto')) {
        newRegions.push('Johto');
      }

      return {
        ...prev,
        totalXp: newTotalXp,
        xp: newXp,
        level: newLevel,
        unlockedRegions: newRegions,
      };
    });
  }, []);

  const resetProgression = useCallback(() => {
    setState({
      xp: 0,
      level: 1,
      totalXp: 0,
      badges: [],
      unlockedRegions: ['Kanto'],
    });
  }, []);

  return (
    <ProgressionContext.Provider value={{ ...state, addXp, resetProgression }}>
      {children}
    </ProgressionContext.Provider>
  );
};

export const useProgression = () => {
  const context = useContext(ProgressionContext);
  if (context === undefined) {
    throw new Error('useProgression must be used within a ProgressionProvider');
  }
  return context;
};
