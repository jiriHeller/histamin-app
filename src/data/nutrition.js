// HIT-safe foods with nutritional values per 100g
// cal = kcal, p = protein(g), c = carbs(g), f = fat(g)
const nutritionDb = {
  // ZELENINA
  'brokolice': { cal: 34, p: 2.8, c: 7, f: 0.4, category: 'zelenina' },
  'mrkev': { cal: 41, p: 0.9, c: 10, f: 0.2, category: 'zelenina' },
  'cuketa': { cal: 17, p: 1.2, c: 3, f: 0.3, category: 'zelenina' },
  'květák': { cal: 25, p: 1.9, c: 5, f: 0.3, category: 'zelenina' },
  'brambory': { cal: 77, p: 2, c: 17, f: 0.1, category: 'zelenina' },
  'batáty': { cal: 86, p: 1.6, c: 20, f: 0.1, category: 'zelenina' },
  'okurka': { cal: 15, p: 0.7, c: 3.6, f: 0.1, category: 'zelenina' },
  'salát': { cal: 15, p: 1.4, c: 2.9, f: 0.2, category: 'zelenina' },
  'cibule': { cal: 40, p: 1.1, c: 9, f: 0.1, category: 'zelenina' },
  'česnek': { cal: 149, p: 6.4, c: 33, f: 0.5, category: 'zelenina' },
  'petržel': { cal: 36, p: 3, c: 6.3, f: 0.8, category: 'zelenina' },

  // OVOCE
  'jablko': { cal: 52, p: 0.3, c: 14, f: 0.2, category: 'ovoce' },
  'hruška': { cal: 57, p: 0.4, c: 15, f: 0.1, category: 'ovoce' },
  'borůvky': { cal: 57, p: 0.7, c: 14, f: 0.3, category: 'ovoce' },
  'meloun': { cal: 30, p: 0.6, c: 8, f: 0.2, category: 'ovoce' },
  'mango': { cal: 60, p: 0.8, c: 15, f: 0.4, category: 'ovoce' },

  // MASO & BÍLKOVINY
  'kuřecí prsa': { cal: 165, p: 31, c: 0, f: 3.6, category: 'maso' },
  'kuřecí stehno': { cal: 177, p: 24, c: 0, f: 8, category: 'maso' },
  'krůtí prsa': { cal: 135, p: 30, c: 0, f: 1, category: 'maso' },
  'vejce': { cal: 155, p: 13, c: 1.1, f: 11, category: 'maso' },

  // MLÉČNÉ
  'mozzarella': { cal: 280, p: 28, c: 3.1, f: 17, category: 'mlecne' },
  'ricotta': { cal: 174, p: 11, c: 3, f: 13, category: 'mlecne' },
  'čerstvé mléko': { cal: 42, p: 3.4, c: 5, f: 1, category: 'mlecne' },
  'máslo': { cal: 717, p: 0.9, c: 0.1, f: 81, category: 'mlecne' },

  // OBILOVINY & PŘÍLOHY
  'rýže': { cal: 130, p: 2.7, c: 28, f: 0.3, category: 'obiloviny' },
  'ovesné vločky': { cal: 389, p: 17, c: 66, f: 7, category: 'obiloviny' },
  'pohanka': { cal: 343, p: 13, c: 72, f: 3.4, category: 'obiloviny' },
  'quinoa': { cal: 120, p: 4.4, c: 21, f: 1.9, category: 'obiloviny' },
  'jáhly': { cal: 378, p: 11, c: 73, f: 4.2, category: 'obiloviny' },
  'těstoviny': { cal: 131, p: 5, c: 25, f: 1.1, category: 'obiloviny' },
  'chléb': { cal: 265, p: 9, c: 49, f: 3.2, category: 'obiloviny' },

  // TUKY & OSTATNÍ
  'olivový olej': { cal: 884, p: 0, c: 0, f: 100, category: 'ostatni' },
  'kokos': { cal: 354, p: 3.3, c: 15, f: 33, category: 'ostatni' },
  'med': { cal: 304, p: 0.3, c: 82, f: 0, category: 'ostatni' },
};

const categoryLabels = {
  zelenina: 'Zelenina',
  ovoce: 'Ovoce',
  maso: 'Maso a bílkoviny',
  mlecne: 'Mléčné výrobky',
  obiloviny: 'Obiloviny a přílohy',
  ostatni: 'Ostatní',
};

// Calculate daily caloric needs
function calculateDailyNeeds(bodyStats) {
  const weight = parseFloat(bodyStats.weight) || 70;
  const height = parseFloat(bodyStats.height) || 170;
  const age = 30; // default
  // Mifflin-St Jeor (male estimate, reasonable default)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const tdee = bmr * 1.4; // lightly active

  let calories = tdee;
  if (bodyStats.goal === 'lose') calories = tdee - 400;
  if (bodyStats.goal === 'gain') calories = tdee + 300;

  return {
    calories: Math.round(calories),
    protein: Math.round(weight * 1.6), // g
    carbs: Math.round((calories * 0.45) / 4), // g
    fat: Math.round((calories * 0.3) / 9), // g
  };
}

// Generate weekly shopping list based on needs and what's been eaten
function generateShoppingList(bodyStats, recentFoods) {
  const needs = calculateDailyNeeds(bodyStats);
  const recentSet = new Set((recentFoods || []).map(f => f.toLowerCase()));

  const items = {};

  // Ensure balanced categories
  const categoryTargets = {
    zelenina: { portions: 14, grams: 200 },
    ovoce: { portions: 7, grams: 150 },
    maso: { portions: 7, grams: 150 },
    mlecne: { portions: 5, grams: 100 },
    obiloviny: { portions: 10, grams: 100 },
  };

  Object.entries(nutritionDb).forEach(([name, info]) => {
    const target = categoryTargets[info.category];
    if (!target) return;

    if (!items[info.category]) items[info.category] = [];

    // Prioritize foods not recently eaten for variety
    const priority = recentSet.has(name) ? 1 : 2;

    items[info.category].push({
      name,
      grams: target.grams,
      cal: Math.round((info.cal / 100) * target.grams),
      protein: Math.round((info.p / 100) * target.grams),
      priority,
    });
  });

  // Select top items per category
  const list = {};
  Object.entries(items).forEach(([cat, foods]) => {
    foods.sort((a, b) => b.priority - a.priority || Math.random() - 0.5);
    const count = categoryTargets[cat]?.portions || 5;
    const selected = foods.slice(0, Math.min(Math.ceil(count / 2), foods.length));
    list[cat] = selected.map(f => ({
      name: f.name,
      amount: `${f.grams * Math.ceil(count / selected.length)}g`,
      checked: false,
    }));
  });

  return { list, needs };
}

export { nutritionDb, categoryLabels, calculateDailyNeeds, generateShoppingList };
