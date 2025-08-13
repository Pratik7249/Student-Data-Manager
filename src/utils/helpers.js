// Remove accents + lowercase
export function normalizeName(s) {
  return s
    .normalize('NFD') // separate accents from characters
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase();
}

// Fuzzy match allowing 1 edit (insert/delete/replace)
export function isFuzzyMatch(a, b) {
  a = normalizeName(a);
  b = normalizeName(b);

  if (a === b) return true;

  // Quick length check
  if (Math.abs(a.length - b.length) > 1) return false;

  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else {
      edits++;
      if (edits > 1) return false;
      if (a.length > b.length) i++;
      else if (a.length < b.length) j++;
      else {
        i++;
        j++;
      }
    }
  }

  return true;
}
