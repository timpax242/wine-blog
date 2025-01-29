import BlogPost from '../../../components/blog-post';

const articles = [
  {
    id: 1,
    title: 'Viinin ja ruoan yhdistämisen taito',
    content:
      '<p>Viinin ja ruoan yhdistäminen on taito, joka voi merkittävästi parantaa ruokailukokemusta. Tässä artikkelissa käymme läpi perusperiaatteet ja annamme vinkkejä onnistuneisiin yhdistelmiin.</p><h2>Perusperiaatteet</h2><p>Viinin ja ruoan yhdistämisessä on muutamia perusperiaatteita:</p><ul><li>Kevyet ruoat sopivat kevyiden viinien kanssa</li><li>Täyteläiset ruoat kaipaavat täyteläisiä viinejä</li><li>Happamat ruoat sopivat hapokkaiden viinien kanssa</li><li>Makeat ruoat tarvitsevat makeita viinejä</li></ul><h2>Esimerkkejä hyvistä yhdistelmistä</h2><p>Tässä muutamia klassisia yhdistelmiä:</p><ul><li>Chardonnay ja grillattu kana</li><li>Cabernet Sauvignon ja pihvi</li><li>Sauvignon Blanc ja vuohenjuusto</li><li>Port ja sinihomejuusto</li></ul><p>Muista kuitenkin, että makuasiat ovat yksilöllisiä. Kokeile rohkeasti erilaisia yhdistelmiä ja löydä omat suosikkisi!</p>',
    image: 'https://images.pexels.com/photos/5379876/pexels-photo-5379876.jpeg',
    date: '2023-05-15',
  },
  {
    id: 2,
    title: 'Italian viinialueiden tutkiminen',
    content:
      '<p>Italia on yksi maailman suurimmista viinintuottajamaista, ja sen viinialueet ovat monimuotoisia ja kiehtovia. Tässä artikkelissa teemme matkan Italian tärkeimpiin viinialueisiin.</p><h2>Toscana</h2><p>Toscana on ehkä Italian tunnetuin viinialue. Sen kuuluisimpia viinejä ovat:</p><ul><li>Chianti</li><li>Brunello di Montalcino</li><li>Vino Nobile di Montepulciano</li></ul><p>Toscanassa viljellään pääasiassa Sangiovese-rypälettä, joka antaa viineille niiden tyypillisen kirsikkaisen maun ja korkean hapokkuuden.</p><h2>Piemonte</h2><p>Piemonte on toinen Italian kuuluisista viinialueista. Sen tunnetuimpia viinejä ovat:</p><ul><li>Barolo</li><li>Barbaresco</li><li>Barbera</li></ul><p>Piemonten päärypäle on Nebbiolo, joka tuottaa täyteläisiä, tanniinisia punaviinejä.</p><h2>Veneto</h2><p>Veneton alue on tunnettu erityisesti:</p><ul><li>Proseccosta</li><li>Soavesta</li><li>Valpolicellasta</li></ul><p>Veneton viinit ovat monimuotoisia, aina kevyistä valkoviineistä täyteläisiin punaviineihin.</p><p>Italian viinialueet tarjoavat loputtomasti tutkittavaa ja maisteltavaa. Kokeile rohkeasti erilaisia italialaisia viinejä ja löydä omat suosikkisi!</p>',
    image: 'https://images.pexels.com/photos/8810040/pexels-photo-8810040.jpeg',
    date: '2023-05-10',
  },
  {
    id: 3,
    title: 'Luonnonviinien nousu',
    content:
      '<p>Luonnonviinit ovat nousseet viime vuosina suureen suosioon. Mutta mitä luonnonviinit oikeastaan ovat ja miksi ne kiinnostavat niin monia?</p><h2>Mitä ovat luonnonviinit?</h2><p>Luonnonviinit ovat viinejä, jotka on valmistettu mahdollisimman vähäisellä puuttumisella luonnolliseen käymisprosessiin. Tyypillisiä piirteitä luonnonviineille ovat:</p><ul><li>Ei lisättyjä hiivoja</li><li>Ei lisättyjä sulfaatteja tai hyvin vähän</li><li>Ei suodatusta tai kirkastusta</li><li>Usein luomuviljellyt rypäleet</li></ul><h2>Miksi luonnonviinit kiinnostavat?</h2><p>Luonnonviinit kiinnostavat monia syistä:</p><ul><li>Ainutlaatuinen maku ja aromi</li><li>Ympäristöystävällisyys</li><li>Terveellisyys (vähemmän lisäaineita)</li><li>Autenttisuus ja käsityöläisyys</li></ul><h2>Luonnonviinien haasteet</h2><p>Luonnonviineihin liittyy myös haasteita:</p><ul><li>Epävakaa laatu</li><li>Lyhyempi säilyvyys</li><li>Korkeampi hinta</li></ul><p>Luonnonviinit ovat kiehtova osa viinimaailmaa. Ne tarjoavat uudenlaisia makuelämyksiä ja haastavat perinteisen viininvalmistuksen käytäntöjä. Kokeile rohkeasti erilaisia luonnonviinejä ja muodosta oma mielipiteesi!</p>',
    image: 'https://images.pexels.com/photos/2912108/pexels-photo-2912108.jpeg',
    date: '2023-05-05',
  },
  {
    id: 4,
    title: 'Samppanja: Kuplien takana',
    content:
      "<p>Samppanja on yksi maailman arvostetuimmista ja juhlavimmista juomista. Mutta mitä samppanjan valmistukseen oikeastaan kuuluu ja mikä tekee siitä niin erityistä?</p><h2>Samppanjan historia</h2><p>Samppanjan juuret ulottuvat 1600-luvun Ranskaan. Legendan mukaan benediktiinimunkki Dom Pérignon 'keksi' samppanjan, vaikka todellisuudessa hän vain kehitti menetelmiä, joilla hallita kuohuviinin valmistusta.</p><h2>Valmistusmenetelmä</h2><p>Samppanjan valmistus on monimutkainen prosessi:</p><ol><li>Perusviinin valmistus</li><li>Sekoittaminen (assemblage)</li><li>Toinen käyminen pullossa</li><li>Kypsytys hiivasakan päällä</li><li>Riddling (remuage)</li><li>Hiivasakan poisto (dégorgement)</li><li>Dosage ja korkitus</li></ol><h2>Samppanjan tyylit</h2><p>Samppanjaa on eri tyylejä makeusasteen mukaan:</p><ul><li>Brut Nature (0-3 g/l sokeria)</li><li>Extra Brut (0-6 g/l)</li><li>Brut (0-12 g/l)</li><li>Extra Dry (12-17 g/l)</li><li>Sec (17-32 g/l)</li><li>Demi-sec (32-50 g/l)</li></ul><h2>Miksi samppanja on erityistä?</h2><p>Samppanjan erityisyys perustuu moniin tekijöihin:</p><ul><li>Ainutlaatuinen terroir</li><li>Tarkasti säädellyt valmistusmenetelmät</li><li>Pitkä historia ja perinteet</li><li>Ylelliset mielikuvat ja markkinointi</li></ul><p>Samppanja on paljon muutakin kuin vain juhlajuoma. Se on monimutkaisen prosessin ja pitkän historian tulos, joka tarjoaa nautintoja kaikille aisteille. Nauti samppanjasta hyvässä seurassa ja arvosta sen ainutlaatuisuutta!</p>",
    image: 'https://images.pexels.com/photos/5980651/pexels-photo-5980651.jpeg',
    date: '2023-04-30',
  },
];

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const article = articles.find((a) => a.id === Number.parseInt(params.id));

  if (!article) {
    return <div>Artikkelia ei löytynyt</div>;
  }

  return <BlogPost {...article} />;
}
