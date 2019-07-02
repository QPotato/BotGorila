import * as Twitter from 'twitter';
import { toGorila, includesKirchnerism, randomGorilaPhrase } from './gorila';
import { getNewHeadlines, Nota } from './clarin';


if (process.env.CONSUMER_KEY === undefined || process.env.CONSUMER_SECRET === undefined || process.env.ACCESS_TOKEN_KEY === undefined || process.env.ACCESS_TOKEN_SECRET === undefined)
    throw "Mal configurado"


const T = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const tweetarGorila = async () => {
    const notas = await getNewHeadlines();

    const notasConKirchnerismo = notas.filter((item: Nota) =>
        item.title !== undefined && includesKirchnerism(item.title));

    const nota = notasConKirchnerismo[Math.floor(Math.random() * notasConKirchnerismo.length)];
    if(nota === undefined){
        console.log(notas);
        console.log(notasConKirchnerismo);
        console.log('No hay notas usables')
    }
    if (nota.title === undefined)
        throw new Error('para que tipe, pero en realidad esto no puede pasar salvo que clarin haga cualquiera en su rss');

    const tweet_content = `"${toGorila(nota.title)}"\n\n${randomGorilaPhrase()}\n\n\n${nota.link}`;
    console.log(tweet_content);
    console.log(tweet_content.length);
    T.post('https://api.twitter.com/1.1/statuses/update.json', { status: tweet_content }, (error, data) => {
        console.log(data);
    });
}

tweetarGorila();
setInterval(tweetarGorila, 4 * 60 * 60 * 1000);

