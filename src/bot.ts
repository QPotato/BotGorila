import * as Twitter from 'twitter';
import config from './config';
import { toGorila, includesKirchnerism, randomGorilaPhrase } from './gorila';
import { getNewHeadlines, Nota } from './clarin';
// @Carlos3568

const T = new Twitter(config);
const tweetarGorila = async () => {
    const notas = await getNewHeadlines();

    const notasConKirchnerismo = notas.filter((item: Nota) =>
        item.title !== undefined && includesKirchnerism(item.title));

    const nota = notasConKirchnerismo[Math.floor(Math.random() * notasConKirchnerismo.length)];
    if(nota === undefined){
        console.log(notas);
        console.log(notasConKirchnerismo);
        throw new Error('No hay notas usables')
    }
    if (nota.title === undefined)
        throw new Error('para que tipe, pero en realidad esto no puede pasar');

    const tweet_content = `"${toGorila(nota.title)}"\n\n${randomGorilaPhrase()}\n\n\n${nota.link}`;
    console.log(tweet_content)
    console.log(tweet_content.length)
    // T.post('https://api.twitter.com/1.1/statuses/update.json', { status: "testing" }, (error, data) => {
    //     console.log(data);
    // });
}

tweetarGorila()
// setInterval(tweetarGorila, 24 * 60 * 60 * 1000)




