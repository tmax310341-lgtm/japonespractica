// KotoDojo · Kanjis de números y tiempo
        // ==========================================================
        // DICCIONARIO Y MOTOR CALIGRÁFICO DE NÚMEROS Y TIEMPO EN KANJI (KanjiVG)
        // ==========================================================
        const NUMBER_KANJI_DATA = [
            { kanji: '零', val: 0, romaji: 'rei / zero', kana: 'れい / ゼロ', strokes: 13, note: 'Cero. Compuesto por lluvia (雨) arriba y orden (令) abajo.' },
            { kanji: '一', val: 1, romaji: 'ichi', kana: 'いち', strokes: 1, note: 'Uno. Un solo trazo horizontal de izquierda a derecha con suave terminación.' },
            { kanji: '二', val: 2, romaji: 'ni', kana: 'に', strokes: 2, note: 'Dos. Dos horizontales: superior corto, inferior largo.' },
            { kanji: '三', val: 3, romaji: 'san', kana: 'さん', strokes: 3, note: 'Tres. Tres horizontales: superior medio, centro corto, base larga.' },
            { kanji: '四', val: 4, romaji: 'yon / shi', kana: 'よん / し', strokes: 5, note: 'Cuatro. Caja exterior, trazos curvos interiores y cierre de base al final.' },
            { kanji: '五', val: 5, romaji: 'go', kana: 'ご', strokes: 4, note: 'Cinco. Horizontal, diagonal interior, quiebre y base horizontal.' },
            { kanji: '六', val: 6, romaji: 'roku', kana: 'ろく', strokes: 4, note: 'Seis. Punto superior, sombrero horizontal y dos patas abiertas.' },
            { kanji: '七', val: 7, romaji: 'nana / shichi', kana: 'なな / しち', strokes: 2, note: 'Siete. Horizontal ascendente y vertical con curva y gancho.' },
            { kanji: '八', val: 8, romaji: 'hachi', kana: 'はち', strokes: 2, note: 'Ocho. Dos trazos abiertos en cascada que no se tocan arriba.' },
            { kanji: '九', val: 9, romaji: 'kyuu / ku', kana: 'きゅう / く', strokes: 2, note: 'Nueve. Primero diagonal izquierda, luego ángulo superior con gancho.' },
            { kanji: '十', val: 10, romaji: 'juu', kana: 'じゅう', strokes: 2, note: 'Diez. Cruz simple: horizontal primero, luego vertical que corta.' },
            { kanji: '百', val: 100, romaji: 'hyaku', kana: 'ひゃく', strokes: 6, note: 'Cien. Horizontal, diagonal, vertical, caja y cierre.' },
            { kanji: '千', val: 1000, romaji: 'sen', kana: 'せん', strokes: 3, note: 'Mil. Diagonal superior inclinada, horizontal y corte vertical recto.' },
            { kanji: '万', val: 10000, romaji: 'man', kana: 'まん', strokes: 3, note: 'Diez mil. Horizontal superior, trazo con gancho y curva izquierda.' },
            { kanji: '円', val: 'Yen', romaji: 'en', kana: 'えん', strokes: 4, note: 'Yen / Moneda. Vertical izquierdo, caja con gancho, vertical y horizontal.' },
            { kanji: '時', val: 'Hora', romaji: 'ji', kana: 'じ', strokes: 10, note: 'Hora / Tiempo. Sol (日) a la izquierda + templo (寺) a la derecha.' },
            { kanji: '分', val: 'Minuto', romaji: 'fun / pun', kana: 'ふん / ぷん', strokes: 4, note: 'Minuto / Parte. Ocho (八) arriba + espada (刀) abajo.' },
            { kanji: '半', val: 'Media', romaji: 'han', kana: 'はん', strokes: 5, note: 'Mitad / Y media. Dos puntos arriba, dos horizontales y corte vertical.' },
            { kanji: '月', val: 'Lunes / Luna / Mes', romaji: 'getsu / gatsu / tsuki', kana: 'げつ / がつ / つき', strokes: 4, day: 'Lunes', element: 'Luna', note: 'Lunes (月曜日). Significado: Luna / Mes. Pictograma de la luna creciente en el cielo nocturno.' },
            { kanji: '火', val: 'Martes / Fuego', romaji: 'ka / hi', kana: 'か / ひ', strokes: 4, day: 'Martes', element: 'Fuego', note: 'Martes (火曜日). Significado: Fuego / Llama. Pictograma de llamas ardientes que se elevan; asociado al planeta Marte (火星).' },
            { kanji: '水', val: 'Miércoles / Agua', romaji: 'sui / mizu', kana: 'すい / みず', strokes: 4, day: 'Miércoles', element: 'Agua', note: 'Miércoles (水曜日). Significado: Agua / Corriente. Pictograma de una corriente de agua o río entre remolinos; asociado a Mercurio (水星).' },
            { kanji: '木', val: 'Jueves / Árbol', romaji: 'moku / ki', kana: 'もく / き', strokes: 4, day: 'Jueves', element: 'Árbol / Madera', note: 'Jueves (木曜日). Significado: Árbol / Madera. Pictograma de un árbol con ramas superiores y raíces firmes; asociado a Júpiter (木星).' },
            { kanji: '金', val: 'Viernes / Oro / Metal', romaji: 'kin / kane', kana: 'きん / かね', strokes: 8, day: 'Viernes', element: 'Oro / Metal', note: 'Viernes (金曜日). Significado: Oro / Metal / Dinero. Pepitas brillantes de oro enterradas bajo la montaña; asociado a Venus (金星).' },
            { kanji: '土', val: 'Sábado / Tierra', romaji: 'do / tsuchi', kana: 'ど / つち', strokes: 3, day: 'Sábado', element: 'Tierra / Suelo', note: 'Sábado (土曜日). Significado: Tierra / Suelo. Arcilla o montículo de tierra elevándose sobre el suelo; asociado a Saturno (土星).' },
            { kanji: '日', val: 'Domingo / Sol / Día', romaji: 'nichi / hi / bi', kana: 'にち / ひ / び', strokes: 4, day: 'Domingo', element: 'Sol', note: 'Domingo (日曜日). Significado: Sol / Día. El disco solar radiante con núcleo central.' },
            { kanji: '曜', val: 'Día de la semana', romaji: 'you', kana: 'よう', strokes: 18, day: 'Sufijo', element: 'Astro luminoso', note: 'Sufijo 曜日 (ようび). Significado: Día de la semana / Astro luminoso celeste. Compuesto por Sol (日) + plumas (羽) + pájaro (隹).' },
            { kanji: '年', val: 'Año', romaji: 'nen', kana: 'ねん', strokes: 6, note: 'Año. Trazos horizontales, cruces y vertical largo central.' }
        ];
