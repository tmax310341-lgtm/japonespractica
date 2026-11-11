// KotoDojo · Hiragana, katakana y grupos de sonidos
        // ==========================================
        // HIRAGANA SOUNDS DATASET (104 SONIDOS)
        // ==========================================
        const HIRAGANA_DATA = [
            // Gojūon (46)
            { hiragana: 'あ', romaji: 'a', category: 'gojuon', group: 'a' },
            { hiragana: 'い', romaji: 'i', category: 'gojuon', group: 'a' },
            { hiragana: 'う', romaji: 'u', category: 'gojuon', group: 'a' },
            { hiragana: 'え', romaji: 'e', category: 'gojuon', group: 'a' },
            { hiragana: 'お', romaji: 'o', category: 'gojuon', group: 'a' },

            { hiragana: 'か', romaji: 'ka', category: 'gojuon', group: 'ka' },
            { hiragana: 'き', romaji: 'ki', category: 'gojuon', group: 'ka' },
            { hiragana: 'く', romaji: 'ku', category: 'gojuon', group: 'ka' },
            { hiragana: 'け', romaji: 'ke', category: 'gojuon', group: 'ka' },
            { hiragana: 'こ', romaji: 'ko', category: 'gojuon', group: 'ka' },

            { hiragana: 'さ', romaji: 'sa', category: 'gojuon', group: 'sa' },
            { hiragana: 'し', romaji: 'shi', category: 'gojuon', group: 'sa' },
            { hiragana: 'す', romaji: 'su', category: 'gojuon', group: 'sa' },
            { hiragana: 'せ', romaji: 'se', category: 'gojuon', group: 'sa' },
            { hiragana: 'そ', romaji: 'so', category: 'gojuon', group: 'sa' },

            { hiragana: 'た', romaji: 'ta', category: 'gojuon', group: 'ta' },
            { hiragana: 'ち', romaji: 'chi', category: 'gojuon', group: 'ta' },
            { hiragana: 'つ', romaji: 'tsu', category: 'gojuon', group: 'ta' },
            { hiragana: 'て', romaji: 'te', category: 'gojuon', group: 'ta' },
            { hiragana: 'と', romaji: 'to', category: 'gojuon', group: 'ta' },

            { hiragana: 'な', romaji: 'na', category: 'gojuon', group: 'na' },
            { hiragana: 'に', romaji: 'ni', category: 'gojuon', group: 'na' },
            { hiragana: 'ぬ', romaji: 'nu', category: 'gojuon', group: 'na' },
            { hiragana: 'ね', romaji: 'ne', category: 'gojuon', group: 'na' },
            { hiragana: 'の', romaji: 'no', category: 'gojuon', group: 'na' },

            { hiragana: 'は', romaji: 'ha', category: 'gojuon', group: 'ha' },
            { hiragana: 'ひ', romaji: 'hi', category: 'gojuon', group: 'ha' },
            { hiragana: 'ふ', romaji: 'fu', category: 'gojuon', group: 'ha' },
            { hiragana: 'へ', romaji: 'he', category: 'gojuon', group: 'ha' },
            { hiragana: 'ほ', romaji: 'ho', category: 'gojuon', group: 'ha' },

            { hiragana: 'ま', romaji: 'ma', category: 'gojuon', group: 'ma' },
            { hiragana: 'み', romaji: 'mi', category: 'gojuon', group: 'ma' },
            { hiragana: 'む', romaji: 'mu', category: 'gojuon', group: 'ma' },
            { hiragana: 'め', romaji: 'me', category: 'gojuon', group: 'ma' },
            { hiragana: 'も', romaji: 'mo', category: 'gojuon', group: 'ma' },

            { hiragana: 'や', romaji: 'ya', category: 'gojuon', group: 'ya' },
            { hiragana: 'ゆ', romaji: 'yu', category: 'gojuon', group: 'ya' },
            { hiragana: 'よ', romaji: 'yo', category: 'gojuon', group: 'ya' },

            { hiragana: 'ら', romaji: 'ra', category: 'gojuon', group: 'ra' },
            { hiragana: 'り', romaji: 'ri', category: 'gojuon', group: 'ra' },
            { hiragana: 'る', romaji: 'ru', category: 'gojuon', group: 'ra' },
            { hiragana: 'れ', romaji: 're', category: 'gojuon', group: 'ra' },
            { hiragana: 'ろ', romaji: 'ro', category: 'gojuon', group: 'ra' },

            { hiragana: 'わ', romaji: 'wa', category: 'gojuon', group: 'wa' },
            { hiragana: 'を', romaji: 'wo', category: 'gojuon', group: 'wa' },
            { hiragana: 'ん', romaji: 'n', category: 'gojuon', group: 'wa' },

            // Dakuten & Handakuten (25)
            { hiragana: 'が', romaji: 'ga', category: 'dakuten', group: 'ga' },
            { hiragana: 'ぎ', romaji: 'gi', category: 'dakuten', group: 'ga' },
            { hiragana: 'ぐ', romaji: 'gu', category: 'dakuten', group: 'ga' },
            { hiragana: 'げ', romaji: 'ge', category: 'dakuten', group: 'ga' },
            { hiragana: 'ご', romaji: 'go', category: 'dakuten', group: 'ga' },

            { hiragana: 'ざ', romaji: 'za', category: 'dakuten', group: 'za' },
            { hiragana: 'じ', romaji: 'ji', category: 'dakuten', group: 'za' },
            { hiragana: 'ず', romaji: 'zu', category: 'dakuten', group: 'za' },
            { hiragana: 'ぜ', romaji: 'ze', category: 'dakuten', group: 'za' },
            { hiragana: 'ぞ', romaji: 'zo', category: 'dakuten', group: 'za' },

            { hiragana: 'だ', romaji: 'da', category: 'dakuten', group: 'da' },
            { hiragana: 'ぢ', romaji: 'dji', category: 'dakuten', group: 'da' },
            { hiragana: 'づ', romaji: 'dzu', category: 'dakuten', group: 'da' },
            { hiragana: 'で', romaji: 'de', category: 'dakuten', group: 'da' },
            { hiragana: 'ど', romaji: 'do', category: 'dakuten', group: 'da' },

            { hiragana: 'ば', romaji: 'ba', category: 'dakuten', group: 'ba' },
            { hiragana: 'び', romaji: 'bi', category: 'dakuten', group: 'ba' },
            { hiragana: 'ぶ', romaji: 'bu', category: 'dakuten', group: 'ba' },
            { hiragana: 'べ', romaji: 'be', category: 'dakuten', group: 'ba' },
            { hiragana: 'ぼ', romaji: 'bo', category: 'dakuten', group: 'ba' },

            { hiragana: 'ぱ', romaji: 'pa', category: 'dakuten', group: 'pa' },
            { hiragana: 'ぴ', romaji: 'pi', category: 'dakuten', group: 'pa' },
            { hiragana: 'ぷ', romaji: 'pu', category: 'dakuten', group: 'pa' },
            { hiragana: 'ぺ', romaji: 'pe', category: 'dakuten', group: 'pa' },
            { hiragana: 'ぽ', romaji: 'po', category: 'dakuten', group: 'pa' },

            // Yōon (Combinados - 33)
            { hiragana: 'きゃ', romaji: 'kya', category: 'youon', group: 'kya' },
            { hiragana: 'きゅ', romaji: 'kyu', category: 'youon', group: 'kya' },
            { hiragana: 'きょ', romaji: 'kyo', category: 'youon', group: 'kya' },

            { hiragana: 'しゃ', romaji: 'sha', category: 'youon', group: 'sha' },
            { hiragana: 'しゅ', romaji: 'shu', category: 'youon', group: 'sha' },
            { hiragana: 'しょ', romaji: 'sho', category: 'youon', group: 'sha' },

            { hiragana: 'ちゃ', romaji: 'cha', category: 'youon', group: 'cha' },
            { hiragana: 'ちゅ', romaji: 'chu', category: 'youon', group: 'cha' },
            { hiragana: 'ちょ', romaji: 'cho', category: 'youon', group: 'cha' },

            { hiragana: 'にゃ', romaji: 'nya', category: 'youon', group: 'nya' },
            { hiragana: 'にゅ', romaji: 'nyu', category: 'youon', group: 'nya' },
            { hiragana: 'にょ', romaji: 'nyo', category: 'youon', group: 'nya' },

            { hiragana: 'ひゃ', romaji: 'hya', category: 'youon', group: 'hya' },
            { hiragana: 'ひゅ', romaji: 'hyu', category: 'youon', group: 'hya' },
            { hiragana: 'ひょ', romaji: 'hyo', category: 'youon', group: 'hya' },

            { hiragana: 'みゃ', romaji: 'mya', category: 'youon', group: 'mya' },
            { hiragana: 'みゅ', romaji: 'myu', category: 'youon', group: 'mya' },
            { hiragana: 'みょ', romaji: 'myo', category: 'youon', group: 'mya' },

            { hiragana: 'りゃ', romaji: 'rya', category: 'youon', group: 'rya' },
            { hiragana: 'りゅ', romaji: 'ryu', category: 'youon', group: 'rya' },
            { hiragana: 'りょ', romaji: 'ryo', category: 'youon', group: 'rya' },

            { hiragana: 'ぎゃ', romaji: 'gya', category: 'youon', group: 'gya' },
            { hiragana: 'ぎゅ', romaji: 'gyu', category: 'youon', group: 'gya' },
            { hiragana: 'ぎょ', romaji: 'gyo', category: 'youon', group: 'gya' },

            { hiragana: 'じゃ', romaji: 'ja', category: 'youon', group: 'ja' },
            { hiragana: 'じゅ', romaji: 'ju', category: 'youon', group: 'ja' },
            { hiragana: 'じょ', romaji: 'jo', category: 'youon', group: 'ja' },

            { hiragana: 'ぢゃ', romaji: 'dya', category: 'youon', group: 'dya' },
            { hiragana: 'ぢゅ', romaji: 'dyu', category: 'youon', group: 'dya' },
            { hiragana: 'ぢょ', romaji: 'dyo', category: 'youon', group: 'dya' },

            { hiragana: 'びゃ', romaji: 'bya', category: 'youon', group: 'bya' },
            { hiragana: 'びゅ', romaji: 'byu', category: 'youon', group: 'bya' },
            { hiragana: 'びょ', romaji: 'byo', category: 'youon', group: 'bya' },

            { hiragana: 'ぴゃ', romaji: 'pya', category: 'youon', group: 'pya' },
            { hiragana: 'ぴゅ', romaji: 'pyu', category: 'youon', group: 'pya' },
            { hiragana: 'ぴょ', romaji: 'pyo', category: 'youon', group: 'pya' }
        ];

        // ==========================================
        // KATAKANA SOUNDS DATASET (107 SONIDOS CON PARIDAD 1:1)
        // ==========================================
        const KATAKANA_DATA = [
    {
        "katakana": "ア",
        "hiragana": "ア",
        "char": "ア",
        "romaji": "a",
        "category": "gojuon",
        "group": "a"
    },
    {
        "katakana": "イ",
        "hiragana": "イ",
        "char": "イ",
        "romaji": "i",
        "category": "gojuon",
        "group": "a"
    },
    {
        "katakana": "ウ",
        "hiragana": "ウ",
        "char": "ウ",
        "romaji": "u",
        "category": "gojuon",
        "group": "a"
    },
    {
        "katakana": "エ",
        "hiragana": "エ",
        "char": "エ",
        "romaji": "e",
        "category": "gojuon",
        "group": "a"
    },
    {
        "katakana": "オ",
        "hiragana": "オ",
        "char": "オ",
        "romaji": "o",
        "category": "gojuon",
        "group": "a"
    },
    {
        "katakana": "カ",
        "hiragana": "カ",
        "char": "カ",
        "romaji": "ka",
        "category": "gojuon",
        "group": "ka"
    },
    {
        "katakana": "キ",
        "hiragana": "キ",
        "char": "キ",
        "romaji": "ki",
        "category": "gojuon",
        "group": "ka"
    },
    {
        "katakana": "ク",
        "hiragana": "ク",
        "char": "ク",
        "romaji": "ku",
        "category": "gojuon",
        "group": "ka"
    },
    {
        "katakana": "ケ",
        "hiragana": "ケ",
        "char": "ケ",
        "romaji": "ke",
        "category": "gojuon",
        "group": "ka"
    },
    {
        "katakana": "コ",
        "hiragana": "コ",
        "char": "コ",
        "romaji": "ko",
        "category": "gojuon",
        "group": "ka"
    },
    {
        "katakana": "サ",
        "hiragana": "サ",
        "char": "サ",
        "romaji": "sa",
        "category": "gojuon",
        "group": "sa"
    },
    {
        "katakana": "シ",
        "hiragana": "シ",
        "char": "シ",
        "romaji": "shi",
        "category": "gojuon",
        "group": "sa"
    },
    {
        "katakana": "ス",
        "hiragana": "ス",
        "char": "ス",
        "romaji": "su",
        "category": "gojuon",
        "group": "sa"
    },
    {
        "katakana": "セ",
        "hiragana": "セ",
        "char": "セ",
        "romaji": "se",
        "category": "gojuon",
        "group": "sa"
    },
    {
        "katakana": "ソ",
        "hiragana": "ソ",
        "char": "ソ",
        "romaji": "so",
        "category": "gojuon",
        "group": "sa"
    },
    {
        "katakana": "タ",
        "hiragana": "タ",
        "char": "タ",
        "romaji": "ta",
        "category": "gojuon",
        "group": "ta"
    },
    {
        "katakana": "チ",
        "hiragana": "チ",
        "char": "チ",
        "romaji": "chi",
        "category": "gojuon",
        "group": "ta"
    },
    {
        "katakana": "ツ",
        "hiragana": "ツ",
        "char": "ツ",
        "romaji": "tsu",
        "category": "gojuon",
        "group": "ta"
    },
    {
        "katakana": "テ",
        "hiragana": "テ",
        "char": "テ",
        "romaji": "te",
        "category": "gojuon",
        "group": "ta"
    },
    {
        "katakana": "ト",
        "hiragana": "ト",
        "char": "ト",
        "romaji": "to",
        "category": "gojuon",
        "group": "ta"
    },
    {
        "katakana": "ナ",
        "hiragana": "ナ",
        "char": "ナ",
        "romaji": "na",
        "category": "gojuon",
        "group": "na"
    },
    {
        "katakana": "ニ",
        "hiragana": "ニ",
        "char": "ニ",
        "romaji": "ni",
        "category": "gojuon",
        "group": "na"
    },
    {
        "katakana": "ヌ",
        "hiragana": "ヌ",
        "char": "ヌ",
        "romaji": "nu",
        "category": "gojuon",
        "group": "na"
    },
    {
        "katakana": "ネ",
        "hiragana": "ネ",
        "char": "ネ",
        "romaji": "ne",
        "category": "gojuon",
        "group": "na"
    },
    {
        "katakana": "ノ",
        "hiragana": "ノ",
        "char": "ノ",
        "romaji": "no",
        "category": "gojuon",
        "group": "na"
    },
    {
        "katakana": "ハ",
        "hiragana": "ハ",
        "char": "ハ",
        "romaji": "ha",
        "category": "gojuon",
        "group": "ha"
    },
    {
        "katakana": "ヒ",
        "hiragana": "ヒ",
        "char": "ヒ",
        "romaji": "hi",
        "category": "gojuon",
        "group": "ha"
    },
    {
        "katakana": "フ",
        "hiragana": "フ",
        "char": "フ",
        "romaji": "fu",
        "category": "gojuon",
        "group": "ha"
    },
    {
        "katakana": "ヘ",
        "hiragana": "ヘ",
        "char": "ヘ",
        "romaji": "he",
        "category": "gojuon",
        "group": "ha"
    },
    {
        "katakana": "ホ",
        "hiragana": "ホ",
        "char": "ホ",
        "romaji": "ho",
        "category": "gojuon",
        "group": "ha"
    },
    {
        "katakana": "マ",
        "hiragana": "マ",
        "char": "マ",
        "romaji": "ma",
        "category": "gojuon",
        "group": "ma"
    },
    {
        "katakana": "ミ",
        "hiragana": "ミ",
        "char": "ミ",
        "romaji": "mi",
        "category": "gojuon",
        "group": "ma"
    },
    {
        "katakana": "ム",
        "hiragana": "ム",
        "char": "ム",
        "romaji": "mu",
        "category": "gojuon",
        "group": "ma"
    },
    {
        "katakana": "メ",
        "hiragana": "メ",
        "char": "メ",
        "romaji": "me",
        "category": "gojuon",
        "group": "ma"
    },
    {
        "katakana": "モ",
        "hiragana": "モ",
        "char": "モ",
        "romaji": "mo",
        "category": "gojuon",
        "group": "ma"
    },
    {
        "katakana": "ヤ",
        "hiragana": "ヤ",
        "char": "ヤ",
        "romaji": "ya",
        "category": "gojuon",
        "group": "ya"
    },
    {
        "katakana": "ユ",
        "hiragana": "ユ",
        "char": "ユ",
        "romaji": "yu",
        "category": "gojuon",
        "group": "ya"
    },
    {
        "katakana": "ヨ",
        "hiragana": "ヨ",
        "char": "ヨ",
        "romaji": "yo",
        "category": "gojuon",
        "group": "ya"
    },
    {
        "katakana": "ラ",
        "hiragana": "ラ",
        "char": "ラ",
        "romaji": "ra",
        "category": "gojuon",
        "group": "ra"
    },
    {
        "katakana": "リ",
        "hiragana": "リ",
        "char": "リ",
        "romaji": "ri",
        "category": "gojuon",
        "group": "ra"
    },
    {
        "katakana": "ル",
        "hiragana": "ル",
        "char": "ル",
        "romaji": "ru",
        "category": "gojuon",
        "group": "ra"
    },
    {
        "katakana": "レ",
        "hiragana": "レ",
        "char": "レ",
        "romaji": "re",
        "category": "gojuon",
        "group": "ra"
    },
    {
        "katakana": "ロ",
        "hiragana": "ロ",
        "char": "ロ",
        "romaji": "ro",
        "category": "gojuon",
        "group": "ra"
    },
    {
        "katakana": "ワ",
        "hiragana": "ワ",
        "char": "ワ",
        "romaji": "wa",
        "category": "gojuon",
        "group": "wa"
    },
    {
        "katakana": "ヲ",
        "hiragana": "ヲ",
        "char": "ヲ",
        "romaji": "wo",
        "category": "gojuon",
        "group": "wa"
    },
    {
        "katakana": "ン",
        "hiragana": "ン",
        "char": "ン",
        "romaji": "n",
        "category": "gojuon",
        "group": "wa"
    },
    {
        "katakana": "ガ",
        "hiragana": "ガ",
        "char": "ガ",
        "romaji": "ga",
        "category": "dakuten",
        "group": "ga"
    },
    {
        "katakana": "ギ",
        "hiragana": "ギ",
        "char": "ギ",
        "romaji": "gi",
        "category": "dakuten",
        "group": "ga"
    },
    {
        "katakana": "グ",
        "hiragana": "グ",
        "char": "グ",
        "romaji": "gu",
        "category": "dakuten",
        "group": "ga"
    },
    {
        "katakana": "ゲ",
        "hiragana": "ゲ",
        "char": "ゲ",
        "romaji": "ge",
        "category": "dakuten",
        "group": "ga"
    },
    {
        "katakana": "ゴ",
        "hiragana": "ゴ",
        "char": "ゴ",
        "romaji": "go",
        "category": "dakuten",
        "group": "ga"
    },
    {
        "katakana": "ザ",
        "hiragana": "ザ",
        "char": "ザ",
        "romaji": "za",
        "category": "dakuten",
        "group": "za"
    },
    {
        "katakana": "ジ",
        "hiragana": "ジ",
        "char": "ジ",
        "romaji": "ji",
        "category": "dakuten",
        "group": "za"
    },
    {
        "katakana": "ズ",
        "hiragana": "ズ",
        "char": "ズ",
        "romaji": "zu",
        "category": "dakuten",
        "group": "za"
    },
    {
        "katakana": "ゼ",
        "hiragana": "ゼ",
        "char": "ゼ",
        "romaji": "ze",
        "category": "dakuten",
        "group": "za"
    },
    {
        "katakana": "ゾ",
        "hiragana": "ゾ",
        "char": "ゾ",
        "romaji": "zo",
        "category": "dakuten",
        "group": "za"
    },
    {
        "katakana": "ダ",
        "hiragana": "ダ",
        "char": "ダ",
        "romaji": "da",
        "category": "dakuten",
        "group": "da"
    },
    {
        "katakana": "ヂ",
        "hiragana": "ヂ",
        "char": "ヂ",
        "romaji": "dji",
        "category": "dakuten",
        "group": "da"
    },
    {
        "katakana": "ヅ",
        "hiragana": "ヅ",
        "char": "ヅ",
        "romaji": "dzu",
        "category": "dakuten",
        "group": "da"
    },
    {
        "katakana": "デ",
        "hiragana": "デ",
        "char": "デ",
        "romaji": "de",
        "category": "dakuten",
        "group": "da"
    },
    {
        "katakana": "ド",
        "hiragana": "ド",
        "char": "ド",
        "romaji": "do",
        "category": "dakuten",
        "group": "da"
    },
    {
        "katakana": "バ",
        "hiragana": "バ",
        "char": "バ",
        "romaji": "ba",
        "category": "dakuten",
        "group": "ba"
    },
    {
        "katakana": "ビ",
        "hiragana": "ビ",
        "char": "ビ",
        "romaji": "bi",
        "category": "dakuten",
        "group": "ba"
    },
    {
        "katakana": "ブ",
        "hiragana": "ブ",
        "char": "ブ",
        "romaji": "bu",
        "category": "dakuten",
        "group": "ba"
    },
    {
        "katakana": "ベ",
        "hiragana": "ベ",
        "char": "ベ",
        "romaji": "be",
        "category": "dakuten",
        "group": "ba"
    },
    {
        "katakana": "ボ",
        "hiragana": "ボ",
        "char": "ボ",
        "romaji": "bo",
        "category": "dakuten",
        "group": "ba"
    },
    {
        "katakana": "パ",
        "hiragana": "パ",
        "char": "パ",
        "romaji": "pa",
        "category": "dakuten",
        "group": "pa"
    },
    {
        "katakana": "ピ",
        "hiragana": "ピ",
        "char": "ピ",
        "romaji": "pi",
        "category": "dakuten",
        "group": "pa"
    },
    {
        "katakana": "プ",
        "hiragana": "プ",
        "char": "プ",
        "romaji": "pu",
        "category": "dakuten",
        "group": "pa"
    },
    {
        "katakana": "ペ",
        "hiragana": "ペ",
        "char": "ペ",
        "romaji": "pe",
        "category": "dakuten",
        "group": "pa"
    },
    {
        "katakana": "ポ",
        "hiragana": "ポ",
        "char": "ポ",
        "romaji": "po",
        "category": "dakuten",
        "group": "pa"
    },
    {
        "katakana": "キャ",
        "hiragana": "キャ",
        "char": "キャ",
        "romaji": "kya",
        "category": "youon",
        "group": "kya"
    },
    {
        "katakana": "キュ",
        "hiragana": "キュ",
        "char": "キュ",
        "romaji": "kyu",
        "category": "youon",
        "group": "kya"
    },
    {
        "katakana": "キョ",
        "hiragana": "キョ",
        "char": "キョ",
        "romaji": "kyo",
        "category": "youon",
        "group": "kya"
    },
    {
        "katakana": "シャ",
        "hiragana": "シャ",
        "char": "シャ",
        "romaji": "sha",
        "category": "youon",
        "group": "sha"
    },
    {
        "katakana": "シュ",
        "hiragana": "シュ",
        "char": "シュ",
        "romaji": "shu",
        "category": "youon",
        "group": "sha"
    },
    {
        "katakana": "ショ",
        "hiragana": "ショ",
        "char": "ショ",
        "romaji": "sho",
        "category": "youon",
        "group": "sha"
    },
    {
        "katakana": "チャ",
        "hiragana": "チャ",
        "char": "チャ",
        "romaji": "cha",
        "category": "youon",
        "group": "cha"
    },
    {
        "katakana": "チュ",
        "hiragana": "チュ",
        "char": "チュ",
        "romaji": "chu",
        "category": "youon",
        "group": "cha"
    },
    {
        "katakana": "チョ",
        "hiragana": "チョ",
        "char": "チョ",
        "romaji": "cho",
        "category": "youon",
        "group": "cha"
    },
    {
        "katakana": "ニャ",
        "hiragana": "ニャ",
        "char": "ニャ",
        "romaji": "nya",
        "category": "youon",
        "group": "nya"
    },
    {
        "katakana": "ニュ",
        "hiragana": "ニュ",
        "char": "ニュ",
        "romaji": "nyu",
        "category": "youon",
        "group": "nya"
    },
    {
        "katakana": "ニョ",
        "hiragana": "ニョ",
        "char": "ニョ",
        "romaji": "nyo",
        "category": "youon",
        "group": "nya"
    },
    {
        "katakana": "ヒャ",
        "hiragana": "ヒャ",
        "char": "ヒャ",
        "romaji": "hya",
        "category": "youon",
        "group": "hya"
    },
    {
        "katakana": "ヒュ",
        "hiragana": "ヒュ",
        "char": "ヒュ",
        "romaji": "hyu",
        "category": "youon",
        "group": "hya"
    },
    {
        "katakana": "ヒョ",
        "hiragana": "ヒョ",
        "char": "ヒョ",
        "romaji": "hyo",
        "category": "youon",
        "group": "hya"
    },
    {
        "katakana": "ミャ",
        "hiragana": "ミャ",
        "char": "ミャ",
        "romaji": "mya",
        "category": "youon",
        "group": "mya"
    },
    {
        "katakana": "ミュ",
        "hiragana": "ミュ",
        "char": "ミュ",
        "romaji": "myu",
        "category": "youon",
        "group": "mya"
    },
    {
        "katakana": "ミョ",
        "hiragana": "ミョ",
        "char": "ミョ",
        "romaji": "myo",
        "category": "youon",
        "group": "mya"
    },
    {
        "katakana": "リャ",
        "hiragana": "リャ",
        "char": "リャ",
        "romaji": "rya",
        "category": "youon",
        "group": "rya"
    },
    {
        "katakana": "リュ",
        "hiragana": "リュ",
        "char": "リュ",
        "romaji": "ryu",
        "category": "youon",
        "group": "rya"
    },
    {
        "katakana": "リョ",
        "hiragana": "リョ",
        "char": "リョ",
        "romaji": "ryo",
        "category": "youon",
        "group": "rya"
    },
    {
        "katakana": "ギャ",
        "hiragana": "ギャ",
        "char": "ギャ",
        "romaji": "gya",
        "category": "youon",
        "group": "gya"
    },
    {
        "katakana": "ギュ",
        "hiragana": "ギュ",
        "char": "ギュ",
        "romaji": "gyu",
        "category": "youon",
        "group": "gya"
    },
    {
        "katakana": "ギョ",
        "hiragana": "ギョ",
        "char": "ギョ",
        "romaji": "gyo",
        "category": "youon",
        "group": "gya"
    },
    {
        "katakana": "ジャ",
        "hiragana": "ジャ",
        "char": "ジャ",
        "romaji": "ja",
        "category": "youon",
        "group": "ja"
    },
    {
        "katakana": "ジュ",
        "hiragana": "ジュ",
        "char": "ジュ",
        "romaji": "ju",
        "category": "youon",
        "group": "ja"
    },
    {
        "katakana": "ジョ",
        "hiragana": "ジョ",
        "char": "ジョ",
        "romaji": "jo",
        "category": "youon",
        "group": "ja"
    },
    {
        "katakana": "ヂャ",
        "hiragana": "ヂャ",
        "char": "ヂャ",
        "romaji": "dya",
        "category": "youon",
        "group": "dya"
    },
    {
        "katakana": "ヂュ",
        "hiragana": "ヂュ",
        "char": "ヂュ",
        "romaji": "dyu",
        "category": "youon",
        "group": "dya"
    },
    {
        "katakana": "ヂョ",
        "hiragana": "ヂョ",
        "char": "ヂョ",
        "romaji": "dyo",
        "category": "youon",
        "group": "dya"
    },
    {
        "katakana": "ビャ",
        "hiragana": "ビャ",
        "char": "ビャ",
        "romaji": "bya",
        "category": "youon",
        "group": "bya"
    },
    {
        "katakana": "ビュ",
        "hiragana": "ビュ",
        "char": "ビュ",
        "romaji": "byu",
        "category": "youon",
        "group": "bya"
    },
    {
        "katakana": "ビョ",
        "hiragana": "ビョ",
        "char": "ビョ",
        "romaji": "byo",
        "category": "youon",
        "group": "bya"
    },
    {
        "katakana": "ピャ",
        "hiragana": "ピャ",
        "char": "ピャ",
        "romaji": "pya",
        "category": "youon",
        "group": "pya"
    },
    {
        "katakana": "ピュ",
        "hiragana": "ピュ",
        "char": "ピュ",
        "romaji": "pyu",
        "category": "youon",
        "group": "pya"
    },
    {
        "katakana": "ピョ",
        "hiragana": "ピョ",
        "char": "ピョ",
        "romaji": "pyo",
        "category": "youon",
        "group": "pya"
    }
];

        const KATAKANA_SOUND_GROUPS = [
            { id: 'a', name: 'A (ア, イ, ウ, エ, オ)', romaLabel: 'A' },
            { id: 'ka', name: 'KA (カ, キ, ク, ケ, コ)', romaLabel: 'KA' },
            { id: 'sa', name: 'SA (サ, シ, ス, セ, ソ)', romaLabel: 'SA' },
            { id: 'ta', name: 'TA (タ, チ, ツ, テ, ト)', romaLabel: 'TA' },
            { id: 'na', name: 'NA (ナ, ニ, ヌ, ネ, ノ)', romaLabel: 'NA' },
            { id: 'ha', name: 'HA (ハ, ヒ, フ, ヘ, ホ)', romaLabel: 'HA' },
            { id: 'ma', name: 'MA (マ, ミ, ム, メ, モ)', romaLabel: 'MA' },
            { id: 'ya', name: 'YA (ヤ, ユ, ヨ)', romaLabel: 'YA' },
            { id: 'ra', name: 'RA (ラ, リ, ル, レ, ロ)', romaLabel: 'RA' },
            { id: 'wa', name: 'WA / N (ワ, ヲ, ン)', romaLabel: 'WA / N' },
            { id: 'ga', name: 'GA (ガ, ギ, グ, ゲ, ゴ)', romaLabel: 'GA' },
            { id: 'za', name: 'ZA (ザ, ジ, ズ, ゼ, ゾ)', romaLabel: 'ZA' },
            { id: 'da', name: 'DA (ダ, ヂ, ヅ, デ, ド)', romaLabel: 'DA' },
            { id: 'ba', name: 'BA (バ, ビ, ブ, ベ, ボ)', romaLabel: 'BA' },
            { id: 'pa', name: 'PA (パ, ピ, プ, ペ, ポ)', romaLabel: 'PA' },
            { id: 'kya', name: 'KYA (キャ, キュ, キョ)', romaLabel: 'KYA' },
            { id: 'sha', name: 'SHA (シャ, シュ, ショ)', romaLabel: 'SHA' },
            { id: 'cha', name: 'CHA (チャ, チュ, チョ)', romaLabel: 'CHA' },
            { id: 'nya', name: 'NYA (ニャ, ニュ, ニョ)', romaLabel: 'NYA' },
            { id: 'hya', name: 'HYA (ヒャ, ヒュ, ヒョ)', romaLabel: 'HYA' },
            { id: 'mya', name: 'MYA (ミャ, ミュ, ミョ)', romaLabel: 'MYA' },
            { id: 'rya', name: 'RYA (リャ, リュ, リョ)', romaLabel: 'RYA' },
            { id: 'gya', name: 'GYA (ギャ, ギュ, ギョ)', romaLabel: 'GYA' },
            { id: 'ja', name: 'JA (ジャ, ジュ, ジョ)', romaLabel: 'JA' },
            { id: 'dya', name: 'DYA (ヂャ, ヂュ, ヂョ)', romaLabel: 'DYA' },
            { id: 'bya', name: 'BYA (ビャ, ビュ, ビョ)', romaLabel: 'BYA' },
            { id: 'pya', name: 'PYA (ピャ, ピュ, ピョ)', romaLabel: 'PYA' }
        ];


        const SOUND_GROUPS = [
            { id: 'a', name: 'A (あ, い, う, え, お)', romaLabel: 'A' },
            { id: 'ka', name: 'KA (か, き, く, け, こ)', romaLabel: 'KA' },
            { id: 'sa', name: 'SA (さ, し, す, せ, そ)', romaLabel: 'SA' },
            { id: 'ta', name: 'TA (た, ち, つ, て, と)', romaLabel: 'TA' },
            { id: 'na', name: 'NA (な, に, ぬ, ね, の)', romaLabel: 'NA' },
            { id: 'ha', name: 'HA (は, ひ, ふ, へ, ほ)', romaLabel: 'HA' },
            { id: 'ma', name: 'MA (ま, み, む, め, も)', romaLabel: 'MA' },
            { id: 'ya', name: 'YA (や, ゆ, よ)', romaLabel: 'YA' },
            { id: 'ra', name: 'RA (ら, り, る, れ, ろ)', romaLabel: 'RA' },
            { id: 'wa', name: 'WA / N (わ, を, ん)', romaLabel: 'WA / N' },
            { id: 'ga', name: 'GA (が, ぎ, ぐ, げ, ご)', romaLabel: 'GA' },
            { id: 'za', name: 'ZA (ざ, じ, ず, ぜ, ぞ)', romaLabel: 'ZA' },
            { id: 'da', name: 'DA (だ, ぢ, づ, で, ど)', romaLabel: 'DA' },
            { id: 'ba', name: 'BA (ば, び, ぶ, べ, ぼ)', romaLabel: 'BA' },
            { id: 'pa', name: 'PA (ぱ, ぴ, ぷ, ぺ, ぽ)', romaLabel: 'PA' },
            { id: 'kya', name: 'KYA (きゃ, きゅ, きょ)', romaLabel: 'KYA' },
            { id: 'sha', name: 'SHA (しゃ, しゅ, しょ)', romaLabel: 'SHA' },
            { id: 'cha', name: 'CHA (ちゃ, ちゅ, ちょ)', romaLabel: 'CHA' },
            { id: 'nya', name: 'NYA (にゃ, にゅ, にょ)', romaLabel: 'NYA' },
            { id: 'hya', name: 'HYA (ひゃ, ひゅ, ひょ)', romaLabel: 'HYA' },
            { id: 'mya', name: 'MYA (みゃ, みゅ, みょ)', romaLabel: 'MYA' },
            { id: 'rya', name: 'RYA (りゃ, りゅ, りょ)', romaLabel: 'RYA' },
            { id: 'gya', name: 'GYA (ぎゃ, ぎゅ, ぎょ)', romaLabel: 'GYA' },
            { id: 'ja', name: 'JA (じゃ, じゅ, じょ)', romaLabel: 'JA' },
            { id: 'dya', name: 'DYA (ぢゃ, ぢゅ, ぢょ)', romaLabel: 'DYA' },
            { id: 'bya', name: 'BYA (びゃ, びゅ, びょ)', romaLabel: 'BYA' },
            { id: 'pya', name: 'PYA (ぴゃ, ぴゅ, ぴょ)', romaLabel: 'PYA' }
        ];
