const drinks = [
  // === VODA ===
  { id: 'voda', name: 'Voda', category: 'voda', icon: 'droplet', sizes: [250, 330, 500], status: 'safe', note: 'Základ pitného režimu' },
  { id: 'mineralka', name: 'Minerálka', category: 'voda', icon: 'droplet', sizes: [250, 330, 500], status: 'safe', note: 'Perlivá i neperlivá, bez omezení' },
  { id: 'kokosova-voda', name: 'Kokosová voda', category: 'voda', icon: 'droplet', sizes: [250, 330], status: 'safe', note: 'Hydratační, bohatá na minerály' },

  // === ČAJE ===
  { id: 'bylinkovy-caj', name: 'Bylinný čaj', category: 'caj', icon: 'cup', sizes: [200, 300], status: 'safe', note: 'Heřmánek, máta, meduňka — bezpečné' },
  { id: 'zazvorovy-caj', name: 'Zázvorový čaj', category: 'caj', icon: 'cup', sizes: [200, 300], status: 'safe', note: 'Protizánětlivý, doporučený' },
  { id: 'rooibos', name: 'Rooibos', category: 'caj', icon: 'cup', sizes: [200, 300], status: 'safe', note: 'Bez kofeinu, bezpečný' },
  { id: 'zeleny-caj', name: 'Zelený čaj', category: 'caj', icon: 'cup', sizes: [200, 300], status: 'caution', note: 'Obsahuje kofein, v malém množství OK' },
  { id: 'cerny-caj', name: 'Černý čaj', category: 'caj', icon: 'cup', sizes: [200, 300], status: 'caution', note: 'Vyšší kofein, může vadit' },

  // === KÁVA ===
  { id: 'espresso', name: 'Espresso', category: 'kava', icon: 'coffee', sizes: [30, 60], status: 'caution', note: 'Kofein blokuje DAO enzym, opatrně' },
  { id: 'lungo', name: 'Lungo', category: 'kava', icon: 'coffee', sizes: [120, 150], status: 'caution', note: 'Kofein blokuje DAO enzym' },
  { id: 'cappuccino', name: 'Cappuccino', category: 'kava', icon: 'coffee', sizes: [150, 200], status: 'caution', note: 'Kofein + mléko, záleží na toleranci' },
  { id: 'filtrovana', name: 'Filtrovaná káva', category: 'kava', icon: 'coffee', sizes: [200, 250], status: 'caution', note: 'Kofein blokuje DAO enzym' },
  { id: 'decaf', name: 'Káva bez kofeinu', category: 'kava', icon: 'coffee', sizes: [200, 250], status: 'safe', note: 'Bez kofeinu, lepší volba' },

  // === DŽUSY ===
  { id: 'jablecny-dzus', name: 'Jablečný fresh', category: 'dzus', icon: 'glass', sizes: [200, 300], status: 'safe', note: 'Čerstvý jablečný džus je bezpečný' },
  { id: 'hruskovy-dzus', name: 'Hruškový fresh', category: 'dzus', icon: 'glass', sizes: [200, 300], status: 'safe', note: 'Čerstvý hruškový džus je bezpečný' },
  { id: 'mrkvovy-dzus', name: 'Mrkvový fresh', category: 'dzus', icon: 'glass', sizes: [200, 300], status: 'safe', note: 'Čerstvý, bohatý na vitamíny' },
  { id: 'pomerancovy-dzus', name: 'Pomerančový džus', category: 'dzus', icon: 'glass', sizes: [200, 300], status: 'caution', note: 'Citrusy mohou uvolňovat histamin' },
  { id: 'grapefruitovy-dzus', name: 'Grapefruitový džus', category: 'dzus', icon: 'glass', sizes: [200, 300], status: 'caution', note: 'Citrusy, opatrně' },
  { id: 'rajcatovy-dzus', name: 'Rajčatový džus', category: 'dzus', icon: 'glass', sizes: [200, 300], status: 'unsafe', note: 'Rajčata jsou silný liberátor histaminu' },

  // === OSTATNÍ ===
  { id: 'smoothie', name: 'Smoothie', category: 'ostatni', icon: 'glass', sizes: [250, 350], status: 'caution', note: 'Záleží na ingrediencích — vyhněte se jahodám, banánům' },
  { id: 'kombucha', name: 'Kombucha', category: 'ostatni', icon: 'glass', sizes: [250, 330], status: 'unsafe', note: 'Fermentovaný nápoj, vysoký histamin' },
  { id: 'energy-drink', name: 'Energy drink', category: 'ostatni', icon: 'glass', sizes: [250, 500], status: 'unsafe', note: 'Může uvolňovat histamin, vysoký kofein' },
  { id: 'pivo', name: 'Pivo', category: 'ostatni', icon: 'glass', sizes: [330, 500], status: 'unsafe', note: 'Fermentované + alkohol = dvojitý problém' },
  { id: 'vino', name: 'Víno', category: 'ostatni', icon: 'glass', sizes: [150, 200], status: 'unsafe', note: 'Velmi vysoký histamin, zvlášť červené' },
];

const drinkCategories = [
  { id: 'voda', name: 'Voda', icon: 'droplet' },
  { id: 'caj', name: 'Čaje', icon: 'cup' },
  { id: 'kava', name: 'Káva', icon: 'coffee' },
  { id: 'dzus', name: 'Džusy', icon: 'glass' },
  { id: 'ostatni', name: 'Ostatní', icon: 'glass' },
];

export { drinks, drinkCategories };
