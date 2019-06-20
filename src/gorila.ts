export const includesKirchnerism = (title: string): boolean => kirchneristWords.some((word) => title.toLowerCase().includes(word));

export const toGorila = (title: string): string => {
    const title_words = title.split(" ");
    const goriled_words = title_words.map((title_word) =>
        (nonKirkchneristWords.some((nk_word) => title_word.includes(nk_word)) ?
            title_word :
            title_word.replace(/c(?=[^eih])/g, "k").replace(/C(?=[^eihEIF])/g, "K")));
    return goriled_words.join(' ')
}

// export const toGorilaTweet =
const nonKirkchneristWords: string[] = [
    'Macri',
    'Marcos',
    'contra',
    'busca',
    'con'
]
const kirchneristWords: string[] = [
    "cristina",
    "kirchner",
    "cfk",
    "kicillof",
    "fernández",
    "cámpora",
    "ramos padilla",
    "lula",
    "cgt",
    "sindicato",
    "protesta",
    "piquete",
    "pj",
    "justicialismo",
    "c5n",
    "baratta",
    "lázaro báez",
    "cristóbal lópez"
];

const gorilaPhrases: string[] = [
    'NO VUELVEN MAS!!!',
    'AGARREN LA PALA KUKAS.',
    'NI UN K MAS!!',
    'VAN A IR TODOS PRESOS COMO DE VIDO',
    'TODOS SOCIOS DE LA K-CHORRA',
    '¡NUNCA MAS PERONISMO!',
    'DEVUELVAN EL PBI QUE SE ROBARON!!!!',
    'KAKAS TENIAN QUE SER',
    'KAKA KAKA KAKA KAKAKA',
    'KAKAS INMUNDAS',
    'SE LES TERMINO EL CHORIPLAN',
    'SON NEGROS DE ALMA ESTOS KAKAS',
];

export const randomGorilaPhrase: () => string = () => gorilaPhrases[Math.floor(Math.random() * gorilaPhrases.length)];