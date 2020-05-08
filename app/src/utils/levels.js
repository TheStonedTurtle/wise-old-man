import { MAX_LEVEL, MAX_VIRTUAL_LEVEL } from '../config';

export function getLevel(experience, virtual = false) {
  if (experience === -1) {
    // Unranked
    return 0;
  }
  const maxlevel = virtual ? MAX_VIRTUAL_LEVEL : MAX_LEVEL;
  let accumulated = 0;
  for (let level = 1; level < maxlevel; level++) {
    const required = getXpDifferenceTo(level + 1);
    if (experience >= accumulated && experience < accumulated + required) {
      return level;
    }
    accumulated += required;
  }
  return maxlevel;
}

export function getExperienceAt(level) {
  let accumulated = 0;
  for (let l = 1; l !== level; l++) {
    accumulated += getXpDifferenceTo(l);
  }
  return accumulated;
}

function getXpDifferenceTo(level) {
  if (level < 2) {
    return 0;
  }
  return Math.floor(level - 1 + 300 * 2 ** ((level - 1) / 7)) / 4;
}
