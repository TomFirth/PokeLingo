import { PokemonType } from './types';

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  generation: number;
}

export const KANTO_POKEMON: Pokemon[] = [
  { id: 1, name: 'Bulbasaur', types: ['Grass', 'Poison'], generation: 1 },
  { id: 2, name: 'Ivysaur', types: ['Grass', 'Poison'], generation: 1 },
  { id: 3, name: 'Venusaur', types: ['Grass', 'Poison'], generation: 1 },
  { id: 4, name: 'Charmander', types: ['Fire'], generation: 1 },
  { id: 5, name: 'Charmeleon', types: ['Fire'], generation: 1 },
  { id: 6, name: 'Charizard', types: ['Fire', 'Flying'], generation: 1 },
  { id: 7, name: 'Squirtle', types: ['Water'], generation: 1 },
  { id: 8, name: 'Wartortle', types: ['Water'], generation: 1 },
  { id: 9, name: 'Blastoise', types: ['Water'], generation: 1 },
  { id: 25, name: 'Pikachu', types: ['Electric'], generation: 1 },
  { id: 39, name: 'Jigglypuff', types: ['Normal', 'Fairy'], generation: 1 },
  { id: 63, name: 'Abra', types: ['Psychic'], generation: 1 },
  { id: 66, name: 'Machop', types: ['Fighting'], generation: 1 },
  { id: 74, name: 'Geodude', types: ['Rock', 'Ground'], generation: 1 },
  { id: 92, name: 'Gastly', types: ['Ghost', 'Poison'], generation: 1 },
  { id: 95, name: 'Onix', types: ['Rock', 'Ground'], generation: 1 },
  { id: 123, name: 'Scyther', types: ['Bug', 'Flying'], generation: 1 },
  { id: 130, name: 'Gyarados', types: ['Water', 'Flying'], generation: 1 },
  { id: 133, name: 'Eevee', types: ['Normal'], generation: 1 },
  { id: 143, name: 'Snorlax', types: ['Normal'], generation: 1 },
  { id: 147, name: 'Dratini', types: ['Dragon'], generation: 1 },
  { id: 149, name: 'Dragonite', types: ['Dragon', 'Flying'], generation: 1 },
  { id: 150, name: 'Mewtwo', types: ['Psychic'], generation: 1 },
];

export const getEffectiveness = (attackerType: PokemonType, defenderTypes: PokemonType[]): number => {
  const { TYPE_CHART } = require('./types');
  let multiplier = 1.0;

  for (const defType of defenderTypes) {
    const mod = TYPE_CHART[attackerType]?.[defType];
    if (mod !== undefined) {
      multiplier *= mod;
    }
  }

  return multiplier;
};
