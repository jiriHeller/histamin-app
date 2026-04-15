// Histamine food database
// Založeno na SIGHI list (Swiss Interest Group for Histamine Intolerance)
// a aspoonofhistamine.com
// status: 'safe' | 'caution' | 'unsafe'

const foods = {
  // === BEZPEČNÉ (safe) — nízký histamin, nejsou liberátory ===

  // Obiloviny
  'ryze': { status: 'safe', note: 'Velmi dobře snášená, základ HIT diety' },
  'rýže': { status: 'safe', note: 'Velmi dobře snášená, základ HIT diety' },
  'rýže basmati': { status: 'safe', note: 'Bezpečná, lehce stravitelná' },
  'jasmínová rýže': { status: 'safe', note: 'Bezpečná volba' },
  'pohanka': { status: 'safe', note: 'Bezlepková, doporučená' },
  'pohanky': { status: 'safe', note: 'Bezlepková, doporučená' },
  'jáhly': { status: 'safe', note: 'Bezpečné, bohaté na hořčík' },
  'quinoa': { status: 'safe', note: 'Bezpečná, zdroj bílkovin' },
  'amarant': { status: 'safe', note: 'Bezpečný, bezlepkový' },
  'kukuřice': { status: 'safe', note: 'Čerstvá je v pořádku' },
  'kukuřičná mouka': { status: 'safe', note: 'Bezpečná alternativa' },
  'ovesné vločky': { status: 'safe', note: 'Bezpečné, dobrá snídaně' },
  'ovesná kaše': { status: 'safe', note: 'Bezpečná snídaně' },
  'oves': { status: 'safe', note: 'Bezpečný' },
  'špalda': { status: 'safe', note: 'Čerstvě pečené pečivo OK' },
  'rýžové nudle': { status: 'safe', note: 'Bezpečná alternativa' },
  'rýžová mouka': { status: 'safe', note: 'Bezpečná' },
  'chléb': { status: 'safe', note: 'Čerstvý bez droždí (kvásek OK u většiny lidí)' },
  'těstoviny': { status: 'safe', note: 'Čerstvě uvařené jsou bezpečné' },

  // Brambory a přílohy
  'brambory': { status: 'safe', note: 'Čerstvé brambory jsou bezpečné' },
  'batáty': { status: 'safe', note: 'Výborná alternativa k bramborám' },
  'sladké brambory': { status: 'safe', note: 'Výborná alternativa k bramborám' },

  // Maso (čerstvé!)
  'kuřecí maso': { status: 'safe', note: 'Pouze čerstvé (ne mražené dlouho)' },
  'kuřecí prsa': { status: 'safe', note: 'Čerstvé kuřecí je bezpečné' },
  'kuře': { status: 'safe', note: 'Pouze čerstvé, ne zbytky' },
  'krůta': { status: 'safe', note: 'Čerstvé krůtí maso je bezpečné' },
  'krůtí prsa': { status: 'safe', note: 'Čerstvé, jedna z nejbezpečnějších variant' },
  'hovězí maso': { status: 'safe', note: 'Pouze zcela čerstvé (do 24h po zabití)' },
  'hovězí': { status: 'safe', note: 'Pouze čerstvé, ne zrané' },
  'jehněčí': { status: 'safe', note: 'Čerstvé je bezpečné' },
  'králík': { status: 'safe', note: 'Čerstvé králičí je bezpečné' },

  // Zelenina (většina)
  'mrkev': { status: 'safe', note: 'Bezpečná zelenina, čerstvá i vařená' },
  'cuketa': { status: 'safe', note: 'Dobře snášená zelenina' },
  'brokolice': { status: 'safe', note: 'Výborná a bezpečná zelenina' },
  'květák': { status: 'safe', note: 'Bezpečná zelenina' },
  'salát': { status: 'safe', note: 'Čerstvý salát je bezpečný' },
  'ledový salát': { status: 'safe', note: 'Bezpečný' },
  'rukola': { status: 'safe', note: 'Čerstvá je v pořádku' },
  'okurka': { status: 'safe', note: 'Bezpečná, hydratační' },
  'paprika': { status: 'safe', note: 'Červená i zelená je OK' },
  'červená paprika': { status: 'safe', note: 'Bezpečná, bohatá na vitamín C' },
  'zelená paprika': { status: 'safe', note: 'Bezpečná' },
  'žlutá paprika': { status: 'safe', note: 'Bezpečná' },
  'pomerančová paprika': { status: 'safe', note: 'Bezpečná' },
  'zelí': { status: 'safe', note: 'Čerstvé zelí je bezpečné (NE kysané!)' },
  'bílé zelí': { status: 'safe', note: 'Čerstvé OK, kysané NE' },
  'červené zelí': { status: 'safe', note: 'Čerstvé je bezpečné' },
  'kapusta': { status: 'safe', note: 'Bezpečná' },
  'řepa': { status: 'safe', note: 'Bezpečná' },
  'ředkev': { status: 'safe', note: 'Bezpečná' },
  'ředkvička': { status: 'safe', note: 'Bezpečná' },
  'chřest': { status: 'safe', note: 'Bezpečný' },
  'celer': { status: 'safe', note: 'Bezpečný, přírodní antihistaminikum' },
  'cibule': { status: 'safe', note: 'Obsahuje quercetin — antihistaminický flavonoid' },
  'červená cibule': { status: 'safe', note: 'Nejvíc quercetinu' },
  'česnek': { status: 'safe', note: 'Přirozené antibiotikum, bezpečný' },
  'zázvor': { status: 'safe', note: 'Protizánětlivý, podporuje DAO' },
  'pórek': { status: 'safe', note: 'Bezpečný' },
  'pažitka': { status: 'safe', note: 'Bezpečná bylinka' },
  'tykev': { status: 'safe', note: 'Bezpečná' },
  'dýně': { status: 'safe', note: 'Bezpečná' },
  'fenykl': { status: 'safe', note: 'Uklidňuje trávení' },
  'kopřiva': { status: 'safe', note: 'Přírodní antihistaminikum' },

  // Ovoce (bez histaminu)
  'jablko': { status: 'safe', note: 'Obsahuje quercetin, doporučené' },
  'jablka': { status: 'safe', note: 'Obsahují quercetin, doporučené' },
  'hruška': { status: 'safe', note: 'Dobře snášená' },
  'hrušky': { status: 'safe', note: 'Dobře snášená' },
  'borůvky': { status: 'safe', note: 'Bezpečné ovoce' },
  'meloun': { status: 'safe', note: 'Bezpečný, hydratační' },
  'vodní meloun': { status: 'safe', note: 'Bezpečný' },
  'mango': { status: 'safe', note: 'Bezpečné tropické ovoce' },
  'broskev': { status: 'safe', note: 'Čerstvá je v pořádku' },
  'broskve': { status: 'safe', note: 'Čerstvá je v pořádku' },
  'meruňka': { status: 'safe', note: 'Čerstvá je OK' },
  'meruňky': { status: 'safe', note: 'Čerstvá je OK' },
  'nektarinka': { status: 'safe', note: 'Čerstvá je OK' },
  'brusinky': { status: 'safe', note: 'Bezpečné' },
  'rybíz': { status: 'safe', note: 'Čerstvý je bezpečný' },
  'černý rybíz': { status: 'safe', note: 'Bezpečný' },
  'granátové jablko': { status: 'safe', note: 'Bezpečné' },
  'kokos': { status: 'safe', note: 'Bezpečný, včetně kokosového mléka a oleje' },
  'kokosové mléko': { status: 'safe', note: 'Bezpečná náhrada mléka' },
  'kokosový olej': { status: 'safe', note: 'Kyselina kaprylová ničí Candidu' },

  // Mléčné (jen čerstvé!)
  'máslo': { status: 'safe', note: 'Čerstvé máslo je obvykle bezpečné' },
  'čerstvé mléko': { status: 'safe', note: 'Čerstvé pasterizované mléko' },
  'mléko': { status: 'safe', note: 'Čerstvé pasterizované, ne dlouho otevřené' },
  'smetana': { status: 'safe', note: 'Čerstvá smetana je bezpečná' },
  'šlehačka': { status: 'safe', note: 'Čerstvá bezpečná' },
  'tvaroh': { status: 'safe', note: 'Čerstvý tvaroh je OK' },
  'čerstvý sýr': { status: 'safe', note: 'Mladé čerstvé sýry (mozzarella, ricotta)' },
  'mozzarella': { status: 'safe', note: 'Mladý sýr, nízký histamin' },
  'ricotta': { status: 'safe', note: 'Čerstvý sýr, bezpečný' },
  'žervé': { status: 'safe', note: 'Čerstvý sýr, bezpečný' },
  'cottage': { status: 'safe', note: 'Čerstvý tvarohový sýr' },

  // Bílkoviny
  'vejce': { status: 'safe', note: 'Čerstvá vejce jsou bezpečná' },
  'vajíčko': { status: 'safe', note: 'Čerstvé vajíčko je OK' },
  'bílek': { status: 'safe', note: 'U někoho může působit jako liberátor, opatrně' },

  // Tuky a oleje
  'olivový olej': { status: 'safe', note: 'Bezpečný tuk, panenský je nejlepší' },
  'řepkový olej': { status: 'safe', note: 'Bezpečný' },
  'slunečnicový olej': { status: 'safe', note: 'Bezpečný' },

  // Bylinky a koření (ne sušené dlouho)
  'petržel': { status: 'safe', note: 'Bezpečná bylinka' },
  'kopr': { status: 'safe', note: 'Bezpečná bylinka' },
  'bazalka': { status: 'safe', note: 'Bezpečná bylinka' },
  'tymián': { status: 'safe', note: 'Bezpečná bylinka' },
  'rozmarýn': { status: 'safe', note: 'Bezpečná bylinka' },
  'máta': { status: 'safe', note: 'Uklidňuje trávení' },
  'meduňka': { status: 'safe', note: 'Uklidňující bylinka' },
  'heřmánek': { status: 'safe', note: 'Protizánětlivý, podporuje DAO' },
  'kurkuma': { status: 'safe', note: 'Silně protizánětlivá' },
  'hřebíček': { status: 'safe', note: 'Antimykotický, ničí kvasinky' },

  // Sladké
  'med': { status: 'safe', note: 'Bezpečné sladidlo v malém množství' },
  'javorový sirup': { status: 'safe', note: 'Bezpečná alternativa cukru' },
  'cukr': { status: 'safe', note: 'Bezpečný (ale omezit obecně)' },

  // === OPATRNĚ (caution) — liberátory histaminu nebo střední obsah ===

  // Liberátory histaminu
  'rajče': { status: 'caution', note: 'Silný liberátor histaminu, vyřadit ve striktní fázi' },
  'rajčata': { status: 'caution', note: 'Silný liberátor histaminu, vyřadit ve striktní fázi' },
  'jahody': { status: 'caution', note: 'Silný liberátor histaminu' },
  'malina': { status: 'caution', note: 'Liberátor histaminu' },
  'maliny': { status: 'caution', note: 'Liberátor histaminu' },
  'ananas': { status: 'caution', note: 'Obsahuje bromelain — může uvolňovat histamin' },
  'papája': { status: 'caution', note: 'Může uvolňovat histamin' },
  'kiwi': { status: 'caution', note: 'U některých citlivých osob liberátor' },

  // Citrusy
  'citron': { status: 'caution', note: 'Kyselé ovoce, u někoho vadí (ale slabý liberátor)' },
  'pomeranč': { status: 'caution', note: 'Citrusy mohou uvolňovat histamin' },
  'grapefruit': { status: 'caution', note: 'Citrusy mohou uvolňovat histamin' },
  'mandarinka': { status: 'caution', note: 'Citrusy, opatrně' },
  'limetka': { status: 'caution', note: 'Citrusy, opatrně' },

  // Exotické
  'banán': { status: 'caution', note: 'Zralé banány uvolňují histamin, zelenější OK' },
  'banány': { status: 'caution', note: 'Zralé banány uvolňují histamin, zelenější OK' },
  'avokádo': { status: 'caution', note: 'Obsahuje histamin, přezrálé ještě více' },
  'avokado': { status: 'caution', note: 'Obsahuje histamin, přezrálé ještě více' },

  // Ostatní
  'houby': { status: 'caution', note: 'Mohou být liberátory' },
  'šampiňóny': { status: 'caution', note: 'Mohou být problematické' },
  'hříbky': { status: 'caution', note: 'Mohou být problematické' },
  'špenát': { status: 'caution', note: 'Vysoký obsah histaminu' },
  'lilek': { status: 'caution', note: 'Lilkovitá, může vadit' },
  'baklažán': { status: 'caution', note: 'Lilkovitá, může vadit' },
  'čočka': { status: 'caution', note: 'Luštěniny mohou uvolňovat histamin' },
  'fazole': { status: 'caution', note: 'Luštěniny, opatrně' },
  'cizrna': { status: 'caution', note: 'Luštěniny, opatrně' },

  // Čokoláda
  'čokoláda': { status: 'caution', note: 'Liberátor histaminu, obsahuje kakao' },
  'kakao': { status: 'caution', note: 'Silný liberátor histaminu' },
  'hořká čokoláda': { status: 'caution', note: 'Hodně kakaa = více liberace' },

  // Ořechy
  'ořechy': { status: 'caution', note: 'Většina ořechů uvolňuje histamin' },
  'vlašské ořechy': { status: 'caution', note: 'Vyšší obsah histaminu' },
  'lískové ořechy': { status: 'caution', note: 'Mohou být problematické' },
  'kešu': { status: 'caution', note: 'Liberátor, u citlivých vadí' },
  'arašídy': { status: 'caution', note: 'Silný alergen a liberátor' },
  'mandle': { status: 'caution', note: 'U některých lidí vadí' },

  // Fermentované s nižším obsahem
  'sójová omáčka': { status: 'caution', note: 'Fermentovaná, vyšší histamin' },
  'ocet': { status: 'caution', note: 'Fermentovaný, může vadit' },
  'jablečný ocet': { status: 'caution', note: 'Nejméně problematický ocet' },
  'droždí': { status: 'caution', note: 'Uvolňuje histamin' },
  'kvasnice': { status: 'caution', note: 'Uvolňují histamin' },
  'jogurt': { status: 'caution', note: 'Fermentovaný, záleží na toleranci' },
  'kefír': { status: 'caution', note: 'Fermentovaný mléčný nápoj' },
  'podmáslí': { status: 'caution', note: 'Fermentované mléčné' },

  // === NEVHODNÉ (unsafe) — vysoký histamin, vyhnout se ===

  // Alkohol
  'alkohol': { status: 'unsafe', note: 'Blokuje DAO enzym, výrazně zvyšuje histamin' },
  'pivo': { status: 'unsafe', note: 'Fermentované + alkohol = dvojitý problém' },
  'víno': { status: 'unsafe', note: 'Velmi vysoký histamin, zvlášť červené' },
  'červené víno': { status: 'unsafe', note: 'Nejvyšší obsah histaminu z alkoholů' },
  'bílé víno': { status: 'unsafe', note: 'Vysoký histamin, méně než červené' },
  'sekt': { status: 'unsafe', note: 'Vysoký histamin' },
  'prosecco': { status: 'unsafe', note: 'Vysoký histamin' },
  'šampaňské': { status: 'unsafe', note: 'Vysoký histamin' },
  'rum': { status: 'unsafe', note: 'Blokuje DAO' },
  'whisky': { status: 'unsafe', note: 'Blokuje DAO' },

  // Uzeniny a zrané maso
  'šunka': { status: 'unsafe', note: 'Uzeniny mají velmi vysoký histamin' },
  'salám': { status: 'unsafe', note: 'Zrající uzeniny = extrémně vysoký histamin' },
  'klobása': { status: 'unsafe', note: 'Uzeniny jsou velmi problematické' },
  'slanina': { status: 'unsafe', note: 'Uzené maso, vysoký histamin' },
  'párek': { status: 'unsafe', note: 'Zpracované maso, vysoký histamin' },
  'párky': { status: 'unsafe', note: 'Zpracované maso, vysoký histamin' },
  'sušené maso': { status: 'unsafe', note: 'Sušení výrazně zvyšuje histamin' },
  'prosciutto': { status: 'unsafe', note: 'Dlouze zrající šunka' },
  'parma': { status: 'unsafe', note: 'Dlouze zrající šunka' },
  'chorizo': { status: 'unsafe', note: 'Fermentovaný salám' },

  // Ryby
  'tuňák': { status: 'unsafe', note: 'Ryby mají velmi vysoký histamin' },
  'makrela': { status: 'unsafe', note: 'Tučné ryby = vysoký histamin' },
  'sardinka': { status: 'unsafe', note: 'Konzervované ryby, velmi vysoký histamin' },
  'sardinky': { status: 'unsafe', note: 'Konzervované ryby, velmi vysoký histamin' },
  'losos': { status: 'unsafe', note: 'Pokud není čerstvý (<24h), vysoký histamin' },
  'sleď': { status: 'unsafe', note: 'Vysoký histamin' },
  'ančovičky': { status: 'unsafe', note: 'Velmi vysoký histamin' },
  'treska': { status: 'unsafe', note: 'Pokud není čerstvá' },
  'mořské plody': { status: 'unsafe', note: 'Většinou vysoký histamin' },
  'krevety': { status: 'unsafe', note: 'Vysoký histamin, liberátor' },

  // Konzervy a zpracované
  'konzervy': { status: 'unsafe', note: 'Konzervované potraviny mají vysoký histamin' },
  'kečup': { status: 'unsafe', note: 'Rajčata + ocet + zrání = vysoký histamin' },
  'hořčice': { status: 'unsafe', note: 'Fermentovaná' },
  'worcester': { status: 'unsafe', note: 'Fermentovaná omáčka' },

  // Fermentované
  'fermentované potraviny': { status: 'unsafe', note: 'Fermentace výrazně zvyšuje histamin' },
  'kimchi': { status: 'unsafe', note: 'Fermentované, vysoký histamin' },
  'kysané zelí': { status: 'unsafe', note: 'Fermentované, vysoký histamin' },
  'kvašené okurky': { status: 'unsafe', note: 'Fermentované' },
  'nakládaná zelenina': { status: 'unsafe', note: 'Vysoký histamin z fermentace' },
  'kombucha': { status: 'unsafe', note: 'Fermentovaný nápoj' },
  'tempeh': { status: 'unsafe', note: 'Fermentovaná sója' },
  'miso': { status: 'unsafe', note: 'Fermentovaná pasta' },
  'nattó': { status: 'unsafe', note: 'Fermentovaná sója, vysoký histamin' },

  // Zrané sýry
  'zralý sýr': { status: 'unsafe', note: 'Zrající sýry mají velmi vysoký histamin' },
  'parmazán': { status: 'unsafe', note: 'Dlouze zrající sýr, velmi vysoký histamin' },
  'eidam': { status: 'unsafe', note: 'Zrající sýr, vyšší histamin' },
  'gouda': { status: 'unsafe', note: 'Zrající sýr, vyšší histamin' },
  'cheddar': { status: 'unsafe', note: 'Zrající sýr' },
  'ementál': { status: 'unsafe', note: 'Zrající sýr' },
  'camembert': { status: 'unsafe', note: 'Plísňový sýr, vysoký histamin' },
  'brie': { status: 'unsafe', note: 'Plísňový sýr, vysoký histamin' },
  'niva': { status: 'unsafe', note: 'Plísňový sýr, velmi vysoký histamin' },
  'roquefort': { status: 'unsafe', note: 'Plísňový sýr, extrémně vysoký histamin' },
  'gorgonzola': { status: 'unsafe', note: 'Plísňový sýr' },
  'feta': { status: 'unsafe', note: 'Zrající sýr' },

  // Ostatní
  'sushi': { status: 'unsafe', note: 'Syrové ryby + sójová omáčka' },
  'marinované': { status: 'unsafe', note: 'Marinování zvyšuje histamin' },
  'uzené maso': { status: 'unsafe', note: 'Uzení zvyšuje histamin' },
  'uzený': { status: 'unsafe', note: 'Uzení zvyšuje histamin' },
  'zbytky jídla': { status: 'unsafe', note: 'Histamin roste s časem, jíst čerstvé' },
  'ohřívané jídlo': { status: 'unsafe', note: 'Ohřívané maso má více histaminu' },
  'energy drink': { status: 'unsafe', note: 'Může uvolňovat histamin' },
};

export default foods;
