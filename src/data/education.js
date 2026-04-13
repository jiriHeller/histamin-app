const educationCards = [
  {
    id: 1,
    title: 'Co je histaminová intolerance?',
    icon: 'dna',
    content: `Histaminová intolerance (HIT) vzniká, když tělo nedokáže dostatečně rychle odbourávat histamin. Histamin je přirozeně se vyskytující látka v těle i v potravinách. Za jeho odbourávání je zodpovědný enzym diaminooxidáza (DAO).

Když je DAO nedostatečný nebo nefunkční, histamin se hromadí a způsobuje širokou škálu symptomů. Není to alergie v pravém slova smyslu — je to enzymatická porucha.

Odhaduje se, že HIT postihuje 1–3 % populace, přičemž většina pacientů jsou ženy.`,
  },
  {
    id: 2,
    title: 'Jak histamin ovlivňuje tělo?',
    icon: 'heart',
    content: `Histamin působí na čtyři typy receptorů v těle (H1–H4) a ovlivňuje prakticky každý orgánový systém:

• Kůže: kopřivka, svědění, zarudnutí, ekzém
• Trávení: nadýmání, průjem, nevolnost, bolesti břicha
• Nervový systém: bolesti hlavy, migréna, závratě, úzkost
• Kardiovaskulární: rychlý tep, nízký tlak, bušení srdce
• Dýchání: rýma, ucpaný nos, astmatické příznaky
• Oči: svědění, slzení, zhoršené vidění

Proto jsou symptomy tak různorodé a často matoucí.`,
  },
  {
    id: 3,
    title: 'Enzym DAO a jeho role',
    icon: 'microscope',
    content: `Diaminooxidáza (DAO) je hlavní enzym zodpovědný za odbourávání histaminu z potravy ve střevě. Když DAO nefunguje správně, histamin z jídla proniká do krevního oběhu.

Příčiny nedostatku DAO:
• Genetická predispozice
• Poškození střevní sliznice (leaky gut)
• Některé léky (ibuprofen, aspirin, některá ATB)
• Alkohol — přímo blokuje DAO
• Nedostatek kofaktorů (vitamín C, B6, zinek, měď)

Suplementy jako Histazym dodávají DAO enzym zvenčí a pomáhají odbourávat histamin z potravy.`,
  },
  {
    id: 4,
    title: 'Potraviny a histamin',
    icon: 'utensils',
    content: `Histamin v potravinách vzniká zejména činností bakterií při zrání, fermentaci a skladování. Klíčová pravidla:

Nejvíce histaminu: zralé sýry, uzeniny, konzervované ryby, fermentované potraviny (kimchi, kysané zelí), alkohol (zvláště víno a pivo), ocet, kečup.

Liberátory histaminu: některé potraviny samy histamin neobsahují, ale uvolňují ho v těle — rajčata, jahody, citrusy, čokoláda, ořechy.

Bezpečné: čerstvé maso a ryby, rýže, brambory, většina zeleniny, jablka, hrušky, borůvky.

Zlaté pravidlo: čím čerstvější, tím bezpečnější. Zbytky jídla a ohřívané pokrmy mají výrazně vyšší histamin.`,
  },
  {
    id: 5,
    title: 'Proč je důležitá suplementace?',
    icon: 'pill',
    content: `Správná suplementace podporuje odbourávání histaminu na více úrovních:

• Histazym (DAO enzym): přímo odbourává histamin z potravy ve střevě
• Vitamín C: přirozený antihistaminik, kofaktor DAO enzymu
• Zinek: nezbytný pro správnou funkci DAO
• Hořčík: uklidňuje nervový systém, snižuje stresovou odpověď
• Silymarin: podporuje játra v metabolizaci histaminu
• Biopron Forte: obnovuje zdravou střevní mikroflóru
• Omega-3: protizánětlivé účinky, podporuje hojení střeva
• Cetirizin: blokuje H1 receptory, zmírňuje akutní symptomy

Doplňky fungují nejlépe v kombinaci a pravidelně.`,
  },
  {
    id: 6,
    title: 'Střevní zdraví a histamin',
    icon: 'shield',
    content: `Střevo hraje klíčovou roli v histaminové intoleranci. Většina DAO enzymu se produkuje ve střevní sliznici. Když je střevo poškozené (tzv. leaky gut), DAO produkce klesá.

Navíc některé střevní bakterie samy produkují histamin, zatímco jiné ho pomáhají odbourávat. Proto je důležité:

• Obnovit střevní sliznici (L-glutamin, Omega-3)
• Nasadit správná probiotika (ne všechna jsou vhodná!)
• Jíst prebiotickou vlákninu (jablka, ovesné vločky)
• Vyhnout se antibiotikům, pokud to není nutné
• Omezit stres — stresové hormony poškozují střevo

Obnova střeva trvá týdny až měsíce, ale je základem dlouhodobého zlepšení.`,
  },
  {
    id: 7,
    title: 'Stres a histamin',
    icon: 'lotus',
    content: `Stres a histamin jsou propojeny obousměrně. Stresové hormony (kortizol, adrenalin) zvyšují uvolňování histaminu z žírných buněk. Zároveň vysoký histamin způsobuje úzkost a neklid, což vytváří začarovaný kruh.

Jak přerušit tento cyklus:
• Pravidelný spánek (7–9 hodin)
• Dechová cvičení a meditace
• Lehký pohyb (procházky, jóga) — ne intenzivní cvičení
• Hořčík na noc (uklidňuje nervový systém)
• Omezit kofein (může uvolňovat histamin)
• Studený sprcha ráno (posiluje vagový nerv)

Zvládání stresu je stejně důležité jako dieta.`,
  },
  {
    id: 8,
    title: 'Kdy navštívit lékaře?',
    icon: 'stethoscope',
    content: `Histaminovou intoleranci by měl diagnostikovat a sledovat lékař. Vyhledejte odborníka pokud:

• Symptomy výrazně ovlivňují kvalitu života
• Máte anafylaktické reakce
• Potřebujete vyloučit jiné diagnózy (alergie, celiakie, IBD)
• Chcete laboratorní vyšetření (hladina DAO, histamin v krvi)
• Plánujete vysazení Cetirizinu
• Symptomy se nezlepšují po 4–6 týdnech diety

Specialisté: alergolog, gastroenterolog, nebo nutriční terapeut se zkušeností s HIT.

Tato aplikace je pomocný nástroj, nikoli náhrada lékařské péče. Vždy konzultujte změny léčby se svým lékařem.`,
  },
];

export default educationCards;
