import * as Parser from 'rss-parser'

const parser = new Parser()
const clarin_url = 'https://www.clarin.com/rss/politica/'

export interface Nota {
    title?: string,
    link?: string
};

export const getNewHeadlines: (() => Promise<Nota[]>) = async () => {
    const feed = await parser.parseURL(clarin_url);
    if (feed.items === undefined || feed.items.length === 0) {
        throw new Error('Error de comunicacion con clarin');
    }

    return feed.items
        .filter(item => item.title !== undefined && item.link !== undefined)
        .map(item => ({
            title: item.title,
            link: item.link
        }));
};