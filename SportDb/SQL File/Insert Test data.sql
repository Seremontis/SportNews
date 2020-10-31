use SportNews
go

SET IDENTITY_INSERT Roles ON
GO
INSERT INTO Roles(RoleId,NameRole,CanModify) VALUES (1,'Admin',0)
INSERT INTO Roles(RoleId,NameRole,CanModify) VALUES (2,'SuperAdmin',0)
INSERT INTO Roles(RoleId,NameRole,CanModify) VALUES (3,'Dziennikarz',0)
INSERT INTO Roles(RoleId,NameRole,CanModify) VALUES (4,'Dziennikarz ograniczone uprawnienia',1)
SET IDENTITY_INSERT Roles OFF
GO

INSERT INTO Users(FirstName,LastName,Login,Password,RoleId,UserModified,LastModified) VALUES ('Test','Testowy','Test',HASHBYTES('SHA-512/256','test'),1,null, GETDATE())
INSERT INTO Users(FirstName,LastName,Login,Password,RoleId,UserModified,LastModified) VALUES ('Test2','Testowy2','Test2',HASHBYTES('SHA-512/256','test'),2,null, GETDATE())
INSERT INTO Users(FirstName,LastName,Login,Password,RoleId,UserModified,LastModified) VALUES ('Test3','Testowy3','Test3',HASHBYTES('SHA-512/256','test'),3,null, GETDATE())

INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Pi³ka no¿na',1,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Siatkówka',2,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Tennis',3,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Koszykóka',4,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Motorsport',5,1,GETDATE())

INSERT INTO Articles(AuthorId,Title,Picture,DescritpionPicture,SourcePicture,ShortArticle,FullArticle,Keywords,PublicationTime,CategoryId,UserModified,LastModified)
 VALUES (2,'Lorem Ipsum',NULL,NULL,NULL,
'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... \n"
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac nibh felis. Sed at vestibulum diam. Ut eleifend tellus eu enim consequat, eu mattis neque feugiat. Donec augue lacus, ultrices vitae interdum id, sagittis vel sapien. Cras sit amet elementum lectus. Phasellus purus elit, consequat eget nunc non, cursus vulputate mi. Integer lacinia nisi pulvinar libero facilisis dictum. Donec id viverra tortor. Quisque iaculis orci a metus mollis, nec sodales leo pellentesque. Ut malesuada pharetra purus eget laoreet. Duis id neque sed urna suscipit ultricies ac ut massa. Maecenas pellentesque ullamcorper bibendum.
Proin rhoncus arcu in diam rhoncus sodales. Sed sollicitudin laoreet odio vitae blandit. Donec interdum condimentum egestas. Nulla id sodales risus, at fermentum orci. Donec pharetra gravida porta. Nunc eu turpis non erat accumsan porta. Mauris imperdiet malesuada dignissim. Sed eget faucibus est. Donec ut imperdiet odio. In hac habitasse platea dictumst. Nam eu erat elit. Phasellus dignissim porttitor placerat. Nam in massa eleifend, fermentum lorem sed, malesuada sapien.
Donec bibendum placerat leo, non lacinia erat dictum id. Sed ultricies ligula in felis ullamcorper, et interdum risus imperdiet. Quisque luctus dolor in molestie rutrum. Nam malesuada sollicitudin volutpat. Ut imperdiet suscipit dui, id placerat ante hendrerit sed. Suspendisse consequat porttitor feugiat. Nam aliquam, ligula a interdum consequat, lacus sapien interdum diam, semper vulputate nulla ex quis nunc. Duis finibus vitae arcu eu malesuada. Donec quis tempor tellus. Vivamus arcu mauris, tempor eu quam sit amet, finibus tempus enim. Donec placerat massa eget dui feugiat pellentesque.
Pellentesque sagittis eleifend purus, rhoncus varius nibh faucibus id. Donec vitae consequat massa. Donec viverra consequat risus eget congue. Donec sodales risus arcu, sit amet egestas ante aliquam nec. Donec eget lorem luctus, feugiat eros sit amet, laoreet urna. Sed pharetra ipsum ut purus gravida pretium vel sed leo. Duis vitae lectus in tellus pretium fermentum. Vivamus tincidunt convallis quam ut pellentesque. Maecenas tortor diam, sollicitudin vitae justo eu, scelerisque suscipit erat. Curabitur orci magna, rhoncus eget varius id, finibus at lorem. Vivamus lacus nisi, lacinia sed aliquet id, venenatis id nisi.
Fusce vestibulum sem quam, ut mattis leo imperdiet sed. Donec tortor lectus, tristique ac pellentesque ac, hendrerit vitae ligula. Suspendisse nisl arcu, pretium ut vulputate eget, dignissim quis metus. Cras vestibulum maximus dolor ut sollicitudin. Cras rutrum condimentum gravida. Ut vehicula pulvinar nulla vel molestie. Donec purus ex, hendrerit id dui vitae, consectetur accumsan sapien.',
'lorem ipsum test 5',GETDATE(),null,1,GETDATE())

INSERT INTO Articles(AuthorId,Title,Picture,DescritpionPicture,SourcePicture,ShortArticle,FullArticle,Keywords,PublicationTime,CategoryId,UserModified,LastModified) 
VALUES (2,'Lorem Ipsum',NULL,NULL,NULL,
'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... \n"
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',

'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac nibh felis. Sed at vestibulum diam. Ut eleifend tellus eu enim consequat, eu mattis neque feugiat. Donec augue lacus, ultrices vitae interdum id, sagittis vel sapien. Cras sit amet elementum lectus. Phasellus purus elit, consequat eget nunc non, cursus vulputate mi. Integer lacinia nisi pulvinar libero facilisis dictum. Donec id viverra tortor. Quisque iaculis orci a metus mollis, nec sodales leo pellentesque. Ut malesuada pharetra purus eget laoreet. Duis id neque sed urna suscipit ultricies ac ut massa. Maecenas pellentesque ullamcorper bibendum.
Proin rhoncus arcu in diam rhoncus sodales. Sed sollicitudin laoreet odio vitae blandit. Donec interdum condimentum egestas. Nulla id sodales risus, at fermentum orci. Donec pharetra gravida porta. Nunc eu turpis non erat accumsan porta. Mauris imperdiet malesuada dignissim. Sed eget faucibus est. Donec ut imperdiet odio. In hac habitasse platea dictumst. Nam eu erat elit. Phasellus dignissim porttitor placerat. Nam in massa eleifend, fermentum lorem sed, malesuada sapien.
Donec bibendum placerat leo, non lacinia erat dictum id. Sed ultricies ligula in felis ullamcorper, et interdum risus imperdiet. Quisque luctus dolor in molestie rutrum. Nam malesuada sollicitudin volutpat. Ut imperdiet suscipit dui, id placerat ante hendrerit sed. Suspendisse consequat porttitor feugiat. Nam aliquam, ligula a interdum consequat, lacus sapien interdum diam, semper vulputate nulla ex quis nunc. Duis finibus vitae arcu eu malesuada. Donec quis tempor tellus. Vivamus arcu mauris, tempor eu quam sit amet, finibus tempus enim. Donec placerat massa eget dui feugiat pellentesque.
Pellentesque sagittis eleifend purus, rhoncus varius nibh faucibus id. Donec vitae consequat massa. Donec viverra consequat risus eget congue. Donec sodales risus arcu, sit amet egestas ante aliquam nec. Donec eget lorem luctus, feugiat eros sit amet, laoreet urna. Sed pharetra ipsum ut purus gravida pretium vel sed leo. Duis vitae lectus in tellus pretium fermentum. Vivamus tincidunt convallis quam ut pellentesque. Maecenas tortor diam, sollicitudin vitae justo eu, scelerisque suscipit erat. Curabitur orci magna, rhoncus eget varius id, finibus at lorem. Vivamus lacus nisi, lacinia sed aliquet id, venenatis id nisi.
Fusce vestibulum sem quam, ut mattis leo imperdiet sed. Donec tortor lectus, tristique ac pellentesque ac, hendrerit vitae ligula. Suspendisse nisl arcu, pretium ut vulputate eget, dignissim quis metus. Cras vestibulum maximus dolor ut sollicitudin. Cras rutrum condimentum gravida. Ut vehicula pulvinar nulla vel molestie. Donec purus ex, hendrerit id dui vitae, consectetur accumsan sapien.',

'lorem ipsum test 5',GETDATE(),null,3,GETDATE())

INSERT INTO Articles(AuthorId,Title,Picture,DescritpionPicture,SourcePicture,ShortArticle,FullArticle,Keywords,PublicationTime,CategoryId,UserModified,LastModified)
 VALUES (3,'Lorem Ipsum2',NULL,NULL,NULL,
'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... \n"
"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."',

'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac nibh felis. Sed at vestibulum diam. Ut eleifend tellus eu enim consequat, eu mattis neque feugiat. Donec augue lacus, ultrices vitae interdum id, sagittis vel sapien. Cras sit amet elementum lectus. Phasellus purus elit, consequat eget nunc non, cursus vulputate mi. Integer lacinia nisi pulvinar libero facilisis dictum. Donec id viverra tortor. Quisque iaculis orci a metus mollis, nec sodales leo pellentesque. Ut malesuada pharetra purus eget laoreet. Duis id neque sed urna suscipit ultricies ac ut massa. Maecenas pellentesque ullamcorper bibendum.
Proin rhoncus arcu in diam rhoncus sodales. Sed sollicitudin laoreet odio vitae blandit. Donec interdum condimentum egestas. Nulla id sodales risus, at fermentum orci. Donec pharetra gravida porta. Nunc eu turpis non erat accumsan porta. Mauris imperdiet malesuada dignissim. Sed eget faucibus est. Donec ut imperdiet odio. In hac habitasse platea dictumst. Nam eu erat elit. Phasellus dignissim porttitor placerat. Nam in massa eleifend, fermentum lorem sed, malesuada sapien.
Donec bibendum placerat leo, non lacinia erat dictum id. Sed ultricies ligula in felis ullamcorper, et interdum risus imperdiet. Quisque luctus dolor in molestie rutrum. Nam malesuada sollicitudin volutpat. Ut imperdiet suscipit dui, id placerat ante hendrerit sed. Suspendisse consequat porttitor feugiat. Nam aliquam, ligula a interdum consequat, lacus sapien interdum diam, semper vulputate nulla ex quis nunc. Duis finibus vitae arcu eu malesuada. Donec quis tempor tellus. Vivamus arcu mauris, tempor eu quam sit amet, finibus tempus enim. Donec placerat massa eget dui feugiat pellentesque.
Pellentesque sagittis eleifend purus, rhoncus varius nibh faucibus id. Donec vitae consequat massa. Donec viverra consequat risus eget congue. Donec sodales risus arcu, sit amet egestas ante aliquam nec. Donec eget lorem luctus, feugiat eros sit amet, laoreet urna. Sed pharetra ipsum ut purus gravida pretium vel sed leo. Duis vitae lectus in tellus pretium fermentum. Vivamus tincidunt convallis quam ut pellentesque. Maecenas tortor diam, sollicitudin vitae justo eu, scelerisque suscipit erat. Curabitur orci magna, rhoncus eget varius id, finibus at lorem. Vivamus lacus nisi, lacinia sed aliquet id, venenatis id nisi.
Fusce vestibulum sem quam, ut mattis leo imperdiet sed. Donec tortor lectus, tristique ac pellentesque ac, hendrerit vitae ligula. Suspendisse nisl arcu, pretium ut vulputate eget, dignissim quis metus. Cras vestibulum maximus dolor ut sollicitudin. Cras rutrum condimentum gravida. Ut vehicula pulvinar nulla vel molestie. Donec purus ex, hendrerit id dui vitae, consectetur accumsan sapien.',

'lorem ipsum test 5',GETDATE(),null,3,GETDATE())

INSERT INTO Articles(AuthorId,Title,Picture,DescritpionPicture,SourcePicture,ShortArticle,FullArticle,Keywords,PublicationTime,CategoryId,UserModified,LastModified)
 VALUES (3,'Jak to siê zaczê³o? – historia pierwszego wyœcigu F1',NULL,NULL,NULL,
'70 lat minê³o, jak jeden dzieñ – parafrazuj¹c tytu³owy utwór serialu „Czterdziestolatek”. Minê³o dok³adnie 13 maja, bo w³aœnie tego dnia 1950 roku, kierowcy po raz pierwszy œcigali siê w ramach Mistrzostw Œwiata Formu³y 1. W ubieg³¹ niedzielê odby³o siê inauguracyjne Grand Prix 70-lecia, a jak w³aœciwie dosz³o do tego pierwszego GP w dziejach F1?',

'Historia wyœcigów Grand Prix siêga roku 1906, kiedy to Automobilklub Francuski zorganizowa³ wyœcig w pobli¿u Le Mans i okolicznych miejscowoœci. Warunki rozgrywania tych zawodów odbiega³y jednak znacznie od obecnych. Jedno okr¹¿enie toru, który wykorzystywa³ g³ównie pobliskie drogi, liczy³o ponad 103 kilometry! Mierz¹c dzisiejsz¹ miar¹, przypomina³o to bardziej rajd terenowy, ni¿ rywalizacjê wyœcigow¹.

We wczesnych latach wyœcigów Grand Prix na palcach jednej rêki liczono tory wyœcigowe z prawdziwego zdarzenia. Takimi mogli pochwaliæ siê Brytyjczycy (tor Brooklands, zamkniêty w 1939 roku i oddany w rêce brytyjskiego lotnictwa, obecnie miejsce muzeum i wydarzeñ historycznych), Amerykanie (tor Indianapolis) i W³osi (tor Monza, otwarty w 1922 roku). W latach 20. i 30. du¿¹ popularnoœci¹ cieszy³y siê wyœcigi uliczne – oczywiœcie Grand Prix Monako, ale i Grand Prix Lwowa, które jako jedyne na ówczesnych ziemiach polskich posiada³o renomê miêdzynarodow¹.

Europejskie mistrzostwa lat 30.
Rozkwit motorsportu przerwa³a II wojna œwiatowa, ale lata 30. stanowi¹ fundamenty pod powstanie Formu³y 1 w 1950 roku. W 1931 Association Internationale des Automobile Clubs Reconnus (AIACR, fr. Miêdzynarodowa Federacja Rozpoznania Automobilklubów) utworzy³a Europejskie Mistrzostwa Kierowców, które z przerw¹ na rok 1933 i 1934, by³y najwa¿niejszymi miêdzynarodowymi zawodami przed 1939 rokiem.

Sama federacja (obecnie FIA) ju¿ od lat 20. próbowa³a poddaæ regulacji samochody, które ze sob¹ rywalizowa³y – chocia¿by pod wzglêdem masy auta, co mia³o na celu ograniczenie pojemnoœci silników. AIACR zajmowa³a siê równie¿ regulacjami samej rywalizacji – Grand Prix Monako 1933 roku by³o pierwszym, w którym o kolejnoœci na starcie zdecydowa³y wczeœniejsze kwalifikacje, coraz czêœciej zakazywano wymiany kierowców podczas rywalizacji.

Przed wojn¹ zwyciêstwami w cyklu Grand Prix wymienia³y siê kompanie niemieckie i w³oskie – Mercedes i Auto Union, wspierane przez entuzjastycznie nastawionego do wyœcigów Adolfa Hitlera oraz pochodz¹ce z Italii Alfa Romeo i Maserati. Do tej walki do³¹cza³o siê równie¿ francuskie Bugatti.

Formu³a A, Formu³a I, Formu³a 1
Powojenne zmiany w motorsporcie rozpoczê³y siê ju¿ w roku 1946, kiedy to miêdzynarodowa federacja przybra³a dzisiejsz¹ nazwê Fédération Internationale de lAutomobile. Podleg³a jej instytucja, Commission Sportive Internationale (CSI, fr. Komisja Sportu Miêdzynarodowego), uregulowa³a techniczne aspekty samochodów, jakie mog¹ œcigaæ siê w zawodach Grand Prix od 1948 do 1953 roku, co nazwa³a Formu³¹ A, Formu³¹ I lub Formu³¹ 1 i jednoznacznie stawia³o wyœcigi pod nowymi regulacjami jako najwa¿niejsze. W zawodach mog³y braæ udzia³ bolidy, jeœli tak je mo¿na ju¿ wtedy nazwaæ, z 4,5-litrowymi silnikami lub 1,5-litrowymi, które posiada³y sprê¿arkê mechaniczn¹. Do rywalizacji nie dopuszczono bardzo popularnych przed wojn¹ silników 3-litrowych ze sprê¿ark¹.

Prawdopodobnie pierwszym wyœcigiem zorganizowanym wed³ug nowych zasad, by³o Grand Prix Turynu w 1946 roku. Kierowcy œcigali siê w Parku Valentina, po³o¿onym nad rzek¹ Pad, popularnym miejscem rekreacji turyñczyków. Drugimi zawodami pod nowymi regulacjami by³o natomiast Zimowe Grand Prix Szwecji w 1947 roku, które przy temperaturze -29 stopni Celsjusza przyci¹gnê³o uwagê a¿ 50 tysiêcy widzów. Za trzecie GP Formu³y 1 uwa¿a siê Grand Prix Pau 1947. Zwyciêstwa w nich odnosili kolejno – W³och Achille Varzi (Alfa Romeo), Brytyjczyk Reg Parnell (ERA – brytyjski koncern wyœcigowy) i W³och Nello Pagani (Maserati).

Mistrzostwa Œwiata Formu³y 1
Regulacje otworzy³y drogê do powstania œwiatowej serii wyœcigowej, szczególnie ¿e takow¹ zainaugurowano w 1949 roku w rywalizacji motocyklistów. W lutym 1950 roku, w³oski delegat FIA Antonio Brivio (znany przedwojenny kierowca, co ciekawe - uczestnik Igrzysk Olimpijskich 1936 w bobslejach), zaproponowa³ kierowcom utworzenie Mistrzostw Œwiata Formu³y 1. Wybranie arabskiej „jedynki” jako oficjalnego oznaczenia serii, zdefiniowa³a Formu³a 3, która od roku 1950 zaczê³a u¿ywaæ w³aœnie „trójki”.

Federacja podjê³a decyzjê o organizacji pierwszych wyœcigów na torach w Wielkiej Brytanii (Silverstone), Monako (uliczny w Monte Carlo), Szwajcarii (Bremgarten pod Bernem), Belgii (Spa), Francji (Reims-Gueux) i W³oszech (Monza) oraz dodatkowej rundzie na Indianapolis 500, która nadawa³a mistrzostwom charakter œwiatowy, ale za Oceanem rywalizowali g³ównie kierowcy amerykañscy. Chocia¿by dziêki wygranej w Indianapolis, Johnnie Parsons uplasowa³ siê na szóstej pozycji w klasyfikacji kierowców sezonu 1950, a wystartowa³ tylko w jednym wyœcigu.

Runda w Stanach by³a jedyn¹ pozaeuropejsk¹ do sezonu 1954, kiedy to inauguracja kampanii odby³a siê w Argentynie, na co wp³yw mia³ oczywiœcie genialny, 5-krotny mistrz œwiata Juan Manuel Fangio. Ulubieniec po³udniowoamerykañskich kibiców startowa³ w pierwszym wyœcigu Mistrzostw Œwiata F1, a wraz z innymi kierowcami móg³ zdobyæ maksymalnie dziewiêæ punktów (osiem za pierwsze miejsce i jedno „oczko” za najszybsze okr¹¿enie w wyœcigu). Punktowanych by³o piêæ pierwszych pozycji – poza premiowanej oœmioma punktami wygranej, odpowiednio szeœcioma, czterema, trzema i dwoma za kolejne pozycje.

Pierwszy i ostatni wyœcig na oczach króla
Jak pewnie wiecie, tor Silverstone zosta³ stworzony na bazie by³ego lotniska RAF-u (Królewskich Si³ Powietrznych), a pierwszymi œcigaj¹cymi siê na nim zawodnikami by³a grupa pasjonatów, która w 1947 wykorzysta³a opuszczony teren. W wyniku zderzenia ucierpia³a jedna z owiec, która nieszczêœliwie zamiast pastwiska, wybra³a na wypoczynek miejsce samochodowej rywalizacji. Pierwsze wyœcigi na Silverstone w ogóle do humanitarnych nie nale¿a³y, poniewa¿ podczas pamiêtnego Grand Prix w roku 1950, kierowca Alfy Romeo Reg Parnell uderzy³ w zaj¹ca, powoduj¹c wgniecenie na swoim ustrojonym w koniczynê, bordowym aucie.

Trudno powiedzieæ, co by³o natomiast podawane na przyjêciu królewskim, które zosta³o zorganizowane specjalnie dla kierowców, ale pewnym jest, ¿e mieli oni okazjê poznaæ samego króla Jerzego VI i królow¹-matkê El¿bietê. Pierwszych zawodników w historii Mistrzostw Formu³y 1 przedstawia³ parze królewskiej Francis Curzon, pi¹ty hrabia Howe, który w 1931 roku wygra³ wyœcig 24h Le Mans i jest za³o¿ycielem British Racing Drivers’ Club (BRDC, ang. Klub Brytyjskich Kierowców Wyœcigowych) – obecnie w³aœcicieli toru Silverstone.

Urzêduj¹cy przywódca Zjednoczonego Królestwa ju¿ nigdy póŸniej nie pojawi³ siê na Grand Prix Wielkiej Brytanii. Natomiast na samym torze towarzystwo by³o równie¿ arystokratyczne, bo prócz pierwszego i d³ugo jedynego Tajskiego kierowcy w historii F1 (do debiutu Alexa Albona w 2019 roku) Ksiêcia Biry, w zawodach wystartowa³ szwajcarski baron Emmanuel de Graffenried. Obaj do mety nie dojechali, ale uczyni³ to artysta jazzowy Johnny Claes, który wiêksz¹ popularnoœæ zyska³ dziêki estradowym wystêpom.

Pomimo ekskluzywnoœci wydarzenia, nie nale¿a³o ono do najdro¿szych – kosztowa³o od szeœciu szylingów do dwóch funtów. Prawdopodobnie za tym stoi równie¿ znakomita frekwencja, poniewa¿ pierwszy wyœcig nowej serii przyci¹gn¹³ od stu do dwustu tysiêcy widzów (Ÿród³a podaj¹ ró¿ne szacunki). Liczyli oni zapewne na dobre wyniki brytyjskiego zespo³u English Racing Automobiles, ale jego kierowcy byli w cieniu zawodników Alfy Romeo. Model 158, stworzony jeszcze przed II wojn¹ œwiatow¹, to najlepsza maszyna sezonu 1950. Kierowcy prowadz¹cy bolid, który rozkrêca³ silnik do 8,5 tysi¹ca obrotów, wygrali wszystkie Grand Prix inauguracyjnej kampanii Formu³y 1 (prócz GP na Indianapolis, gdzie Alfy nie startowa³y).

Inauguracyjny wyœcig
W kwalifikacjach do wyœcigu na Silverstone pierwsze cztery miejsca zajê³y w³aœnie bolidy spod znaku trzylistnej koniczyny i ustawi³y siê w jednej linii na starcie. Formacja startowa przypomina³a t¹ z boisk pi³karskich – cztery-trzy-cztery.

Pierwszym zakrêtem pokonanym przez kierowców Formu³y 1 by³ Woodcote. Ju¿ dwa lata póŸniej, obecnie d³ugi prawy zakrêt przypominaj¹cy œlimaka, sta³ siê ostatnim na torze Silverstone. Prosta startowa miêdzy Woodcote i Copse pe³ni³a swoj¹ funkcjê a¿ do 2010 roku, kiedy to przesuniêto j¹ obok nowego budynku boksów – miêdzy zakrêtem Club i Abbey. Nitkê toru wyznacza³y puste beczki po paliwie lotniczym oraz bele s³omy.

Na dystansie ca³ego wyœcigu kierowcy Alfy dwukrotnie dublowali rywali. Walka o zwyciêstwo rozegra³a siê miêdzy Nino Farin¹ (pierwszym mistrzem œwiata F1), Juanem Manuelem Fangio i Luigim Fagiolim. Od tria „Fa” zdecydowanie odstawa³ czwarty kierowca w³oskiego zespo³u Reg Parnell, jednoczeœnie utrzymuj¹c przewagê nad zawodnikami bardzo awaryjnego Maserati (chocia¿by Ksi¹¿ê Bira napotka³ k³opoty z silnikiem na prostej przy hangarach, co zakoñczy³o jego walkê w wyœcigu) i francuskiego Talbot-Lago. Na dziesiêæ kó³ek przed koñcem, Fangio zaatakowa³ Farinê w Stowe, ale nie zmieœci³ siê w d³ugim prawym zakrêcie, a zahaczaj¹c o belê s³owy, przeci¹³ przewód olejowy, przez co zosta³ zmuszony do przedwczesnego zakoñczenia rywalizacji. Dziêki temu Nino Farina dowióz³ wygran¹ do koñca, choæ na plecach odczuwa³ silnik 158-mki Fagiolego. Dziêki awarii Fangio, Reg Parnell ucieszy³ brytyjsk¹ publicznoœæ, melduj¹c siê na trzeciej pozycji. Kolejne lokaty zajêli zawodnicy Talbot-Lago i ERA.

Pierwszy wyœcig w historii Formu³y 1 liczy³ 70. okr¹¿eñ, a zwyciêzca Farina przejecha³ go w czasie ponad 2 godzin i 13 minut. Do mety dojecha³o jedenastu zawodników, którzy na ka¿dym okr¹¿eniu pokonywali siedem zakrêtów, ulokowanych wokó³ pasów startowych dawnego lotniska.

Niedzielne Grand Prix 70-lecia by³o 1023. wyœcigiem w historii Formu³y 1 oraz 55. zorganizowanym na torze Silverstone, gdzie siedemdziesi¹t lat temu wszystko siê zaczê³o.',

'lorem ipsum test 5',GETDATE(),null,3,GETDATE())

INSERT INTO Articles(AuthorId,Title,Picture,DescritpionPicture,SourcePicture,ShortArticle,FullArticle,Keywords,PublicationTime,CategoryId,UserModified,LastModified)
 VALUES (2,'Lorem Ipsum Small',NULL,NULL,NULL,
'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... \n"',
'"Tristique nulla vel molestie. Donec purus ex, hendrerit id dui vitae, consectetur accumsan sapien.',
'lorem ipsum test 5',GETDATE(),null,3,GETDATE())
