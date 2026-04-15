// Daily tips for histamine intolerance - rotating by day of year
const dailyTips = [
  {
    id: 'hrebicek',
    name: 'Hřebíček',
    icon: 'clove',
    benefit: 'Antimykotický, ničí kvasinky a plísně',
    description: 'Hřebíček obsahuje eugenol, který má silné protiplísňové a antibakteriální účinky. Pomáhá potlačit přemnožení Candidy, která bývá častým problémem u lidí s histaminovou intolerancí. Podporuje trávení a zmírňuje nadýmání.',
    preparation: {
      title: 'Hřebíčkový čaj',
      ingredients: [
        '3-5 celých hřebíčků',
        '250 ml horké vody (ne vroucí)',
        'volitelně: plátek zázvoru, trocha medu',
      ],
      steps: [
        'Hřebíčky lehce rozdrťte v hmoždíři pro uvolnění éterických olejů',
        'Zalijte horkou vodou o teplotě cca 90 °C',
        'Nechte louhovat 10-15 minut přikryté',
        'Přeceďte a popíjejte teplé',
      ],
      tip: 'Pijte 1-2x denně mezi jídly. Nepřekračujte 5 hřebíčků denně.',
    },
    tincture: {
      title: 'Hřebíčková tinktura',
      ingredients: [
        '50 g celých hřebíčků',
        '250 ml 40% alkoholu (vodka)',
      ],
      steps: [
        'Hřebíčky dejte do skleněné lahvičky',
        'Zalijte alkoholem tak aby byly zcela ponořené',
        'Nechte macerovat 3-4 týdny na tmavém místě',
        'Občas protřepte',
        'Přeceďte a uchovávejte v tmavé lahvičce',
      ],
      tip: 'Dávkování: 10-15 kapek 2x denně do trochy vody.',
    },
  },
  {
    id: 'zazvor',
    name: 'Zázvor',
    icon: 'ginger',
    benefit: 'Protizánětlivý, prokrvuje sliznice',
    description: 'Čerstvý zázvor obsahuje gingeroly s výraznými protizánětlivými účinky. Stabilizuje mastocyty (buňky uvolňující histamin), podporuje trávení a zlepšuje prokrvení sliznic. Přirozený DAO podporovatel.',
    preparation: {
      title: 'Zázvorový odvar',
      ingredients: [
        '2-3 cm čerstvého kořene zázvoru',
        '500 ml vody',
        'volitelně: šťáva z poloviny citronu (pokud snášíte), lžička medu',
      ],
      steps: [
        'Zázvor oloupejte a nakrájejte na tenké plátky',
        'Vhoďte do hrnce se studenou vodou',
        'Přiveďte k varu a nechte vařit na mírném ohni 10-15 minut',
        'Odstavte, nechte 5 minut ustát a přeceďte',
      ],
      tip: 'Ideální ráno nalačno. Zvyšuje DAO enzym, který odbourává histamin.',
    },
  },
  {
    id: 'quercetin',
    name: 'Quercetin (cibule, jablka)',
    icon: 'onion',
    benefit: 'Přírodní antihistaminikum',
    description: 'Quercetin je flavonoid, který stabilizuje mastocyty a brání uvolnění histaminu. Nejbohatší zdroje: červená cibule, jablka (zvláště slupka), kapary, brokolice. Účinnější je v teplé formě.',
    preparation: {
      title: 'Extrakce quercetinu vařením',
      ingredients: [
        '2 červené cibule',
        '2 jablka se slupkou',
        '1 lžička kurkumy',
        '1 l vody',
      ],
      steps: [
        'Cibule oloupejte a nakrájejte na čtvrtiny',
        'Jablka nakrájejte i se slupkou na kousky (slupka obsahuje nejvíc quercetinu)',
        'Vše vhoďte do hrnce s vodou a kurkumou',
        'Vařte 20-30 minut na mírném ohni',
        'Přeceďte a pijte teplý odvar 1-2x denně',
      ],
      tip: 'Pravidelné užívání snižuje histaminové reakce. Tepelná úprava zvyšuje biologickou dostupnost quercetinu.',
    },
  },
  {
    id: 'kurkuma',
    name: 'Kurkuma',
    icon: 'turmeric',
    benefit: 'Silná protizánětlivá bylina',
    description: 'Aktivní látka kurkumin snižuje zánět v celém těle, včetně střevní sliznice. Stabilizuje mastocyty. Nejlépe se vstřebává s tukem a černým pepřem (piperin zvyšuje vstřebatelnost až 2000×).',
    preparation: {
      title: 'Zlaté mléko',
      ingredients: [
        '250 ml kokosového nebo rýžového mléka',
        '1 lžička mleté kurkumy',
        'špetka černého pepře',
        '1/2 lžičky kokosového oleje',
        'volitelně: špetka skořice, lžička medu',
      ],
      steps: [
        'Mléko zahřejte v hrnci (nevařte)',
        'Vmíchejte kurkumu, pepř a kokosový olej',
        'Míchejte 5 minut aby se suroviny spojily',
        'Stáhněte z plotny, přeceďte a nechte mírně vychladnout',
        'Podávejte teplé, volitelně oslaďte medem',
      ],
      tip: 'Pijte večer před spaním - má uklidňující účinky a podpoří regeneraci.',
    },
  },
  {
    id: 'kopriva',
    name: 'Kopřiva',
    icon: 'nettle',
    benefit: 'Přírodní antihistaminikum',
    description: 'Kopřiva obsahuje látky, které blokují histaminové receptory a stabilizují mastocyty. Pomáhá při alergiích, senné rýmě a ekzémech. Bohatý zdroj železa, hořčíku a vitamínu C.',
    preparation: {
      title: 'Kopřivový čaj',
      ingredients: [
        '1-2 lžíce sušených kopřivových listů (nebo hrst čerstvých)',
        '250 ml horké vody (85-90 °C)',
      ],
      steps: [
        'Kopřivu vložte do sítka nebo čajového filtru',
        'Zalijte horkou vodou - NE vroucí, zničila by vitamíny',
        'Přikryjte a nechte 10 minut louhovat',
        'Přeceďte a popíjejte',
      ],
      tip: 'Pijte 2-3 šálky denně po dobu 4-6 týdnů. Ideální jarní a letní kúra proti alergiím.',
    },
  },
  {
    id: 'fenykl',
    name: 'Fenykl',
    icon: 'fennel',
    benefit: 'Uklidňuje trávení, snižuje nadýmání',
    description: 'Fenykl obsahuje anetol s karminativními účinky - uvolňuje křeče hladkého svalstva střev. Zmírňuje nadýmání, které často provází histaminové reakce. Jemný a bezpečný i pro citlivá střeva.',
    preparation: {
      title: 'Fenyklový čaj',
      ingredients: [
        '1 lžička celých fenyklových semínek',
        '250 ml vroucí vody',
      ],
      steps: [
        'Semínka lehce rozdrťte v hmoždíři pro uvolnění olejů',
        'Vložte do šálku a zalijte vroucí vodou',
        'Přikryjte a nechte 10-15 minut louhovat',
        'Přeceďte',
      ],
      tip: 'Pijte po jídle. Pomáhá s trávením tučnějších pokrmů a zmírňuje plynatost.',
    },
  },
  {
    id: 'hermanek',
    name: 'Heřmánek',
    icon: 'chamomile',
    benefit: 'Zklidňuje sliznice, protizánětlivý',
    description: 'Heřmánek obsahuje apigenin a bisabolol - látky s protizánětlivými a zklidňujícími účinky. Ideální při podráždění trávicího traktu a nervové tenzi. Podporuje DAO aktivitu.',
    preparation: {
      title: 'Správná příprava heřmánkového čaje',
      ingredients: [
        '1 lžíce sušeného heřmánku (nebo 1 sáček kvalitního bio čaje)',
        '250 ml horké vody (90-95 °C)',
      ],
      steps: [
        'Heřmánek vložte do hrníčku nebo konvičky',
        'Zalijte horkou vodou (nikdy vroucí - zničí éterické oleje)',
        'DŮLEŽITÉ: přikryjte šálek pokličkou po celou dobu louhování',
        'Louhujte minimálně 10 minut',
        'Přeceďte a pijte teplé',
      ],
      tip: 'Přikrytí brání úniku éterických olejů. Pijte 2-3× denně, ideálně před spaním.',
    },
  },
  {
    id: 'kokos-olej',
    name: 'Kokosový olej',
    icon: 'coconut',
    benefit: 'Kyselina kaprylová ničí Candidu',
    description: 'Kokosový olej obsahuje střední mastné kyseliny (MCT), zejména kyselinu kaprylovou, která má silné protiplísňové účinky. Ničí buněčné stěny Candidy a dalších patogenních kvasinek ve střevech.',
    preparation: {
      title: 'Jak používat při vaření',
      ingredients: [
        'Kvalitní za studena lisovaný panenský kokosový olej (bio)',
      ],
      steps: [
        'Na smažení: 1-2 lžíce místo jiných olejů - snese vysokou teplotu',
        'Do kávy nebo čaje: 1 čajová lžička pro energetický boost',
        'Do smoothie nebo ovesné kaše: 1 lžička ráno',
        'Na pečení: nahraďte máslo v receptech v poměru 1:1',
        'Přímo: 1 lžičku na lačno každé ráno',
      ],
      tip: 'Začněte s 1 čajovou lžičkou denně a postupně zvyšujte. Ideální 2-3 lžíce denně.',
    },
  },
  {
    id: 'cesnek',
    name: 'Česnek',
    icon: 'garlic',
    benefit: 'Allicin - přírodní antibiotikum',
    description: 'Čerstvý česnek obsahuje allicin s antibakteriálními, antivirovými a protiplísňovými účinky. Podporuje imunitu, pomáhá v boji proti Helicobacter pylori a přemnožení patogenních bakterií ve střevě.',
    preparation: {
      title: 'Česneková voda',
      ingredients: [
        '1 stroužek čerstvého česneku',
        '200 ml vlažné vody',
        'volitelně: trocha medu',
      ],
      steps: [
        'Česnek oloupejte a nadrťte nožem',
        'DŮLEŽITÉ: nechte 10 minut stát na vzduchu - aktivuje se allicin',
        'Poté zalijte vlažnou vodou',
        'Vypijte najednou na lačno ráno',
      ],
      tip: 'Allicin se ničí teplem - proto česnek nevařte, přidávejte jej do jídla až na konci. Účinná kúra: 1 stroužek denně po dobu 14 dní.',
    },
  },
  {
    id: 'oregano-olej',
    name: 'Oregano olej',
    icon: 'oregano',
    benefit: 'Silné antimykotikum proti Candidě',
    description: 'Éterický olej z oregana obsahuje karvakrol a tymol - jedny z nejsilnějších přírodních antimykotik. Účinný proti Candidě, SIBO a dalším patogenům. Je to silný prostředek, používejte opatrně.',
    preparation: {
      title: 'Jak připravit a dávkovat',
      ingredients: [
        'Kvalitní bio oregano olej (nosiče: olivový nebo kokosový)',
        'Sklenice vody nebo jiný olej pro ředění',
      ],
      steps: [
        'VŽDY ŘEĎTE - nikdy neužívejte čistý!',
        '2-3 kapky naředěné v polévkové lžíci kokosového oleje',
        'Nebo 2 kapky do sklenice vody (bude pálit)',
        'Užívejte 1-2× denně mezi jídly',
        'Kúra max 10-14 dní, pak pauza 1-2 týdny',
      ],
      tip: 'Nepoužívejte déle než 2 týdny v kuse - ničí i prospěšné bakterie. Po kúře nutně doplnit probiotiky.',
      warning: 'Kontraindikace: těhotenství, kojení, děti do 5 let. Při alergii na hluchavkovité rostliny neužívejte.',
    },
  },
];

function getTodaysTip() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return dailyTips[dayOfYear % dailyTips.length];
}

export { dailyTips, getTodaysTip };
