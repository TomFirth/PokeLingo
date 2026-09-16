import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressionState {
  xp: number;
  level: number;
  totalXp: number;
  badges: string[];
  unlockedRegions: string[];
  lingoCorrectCount: number;
  wtpCorrectCount: number;
  selectedRegion: string;
  hapticsEnabled: boolean;
  themePreference: 'light' | 'dark' | 'system';
}

interface ProgressionContextType extends ProgressionState {
  addXp: (amount: number, type?: 'lingo' | 'wtp') => void;
  resetProgression: () => void;
  setSelectedRegion: (region: string) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setThemePreference: (pref: 'light' | 'dark' | 'system') => void;
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
    lingoCorrectCount: 0,
    wtpCorrectCount: 0,
    selectedRegion: 'Kanto',
    hapticsEnabled: true,
    themePreference: 'system',
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

  const addXp = useCallback((amount: number, type?: 'lingo' | 'wtp') => {
    setState(prev => {
      const newTotalXp = prev.totalXp + amount;
      const newLevel = Math.floor(newTotalXp / XP_PER_LEVEL) + 1;
      const newXp = newTotalXp % XP_PER_LEVEL;

      // Update counts
      let newLingoCount = prev.lingoCorrectCount;
      let newWtpCount = prev.wtpCorrectCount;
      if (type === 'lingo') newLingoCount += 1;
      if (type === 'wtp') newWtpCount += 1;

      // Check for badges
      const newBadges = [...prev.badges];
      const checkBadge = (id: string, condition: boolean) => {
        if (condition && !newBadges.includes(id)) {
          newBadges.push(id);
        }
      };

      checkBadge('lingo_kanto_silver', newLingoCount >= 50);
      checkBadge('lingo_kanto_gold', newLingoCount >= 100);
      checkBadge('wtp_kanto_silver', newWtpCount >= 10);
      checkBadge('wtp_kanto_gold', newWtpCount >= 50);

      // Logic for unlocking regions
      const newRegions = [...prev.unlockedRegions];
      const unlock = (lvl: number, reg: string) => {
        if (newLevel >= lvl && !newRegions.includes(reg)) newRegions.push(reg);
      };

      unlock(5, 'Johto');
      unlock(7, 'Hoenn');
      unlock(9, 'Sinnoh');
      unlock(11, 'Unova');
      unlock(13, 'Kalos');
      unlock(15, 'Alola');
      unlock(17, 'Galar');
      unlock(19, 'Paldea');
      unlock(20, 'Championship');

      return {
        ...prev,
        totalXp: newTotalXp,
        xp: newXp,
        level: newLevel,
        unlockedRegions: newRegions,
        lingoCorrectCount: newLingoCount,
        wtpCorrectCount: newWtpCount,
        badges: newBadges,
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
      lingoCorrectCount: 0,
      wtpCorrectCount: 0,
      selectedRegion: 'Kanto',
    });
  }, []);

  const setSelectedRegion = useCallback((region: string) => {
    setState(prev => ({ ...prev, selectedRegion: region }));
  }, []);

  const setHapticsEnabled = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, hapticsEnabled: enabled }));
  }, []);

  const setThemePreference = useCallback((pref: 'light' | 'dark' | 'system') => {
    setState(prev => ({ ...prev, themePreference: pref }));
  }, []);

  return (
    <ProgressionContext.Provider value={{
      ...state,
      addXp,
      resetProgression,
      setSelectedRegion,
      setHapticsEnabled,
      setThemePreference
    }}>
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
