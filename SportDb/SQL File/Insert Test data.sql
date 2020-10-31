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

INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Pi�ka no�na',1,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Siatk�wka',2,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Tennis',3,1,GETDATE())
INSERT INTO Categories(Name,SortField,UserModified,LastModified) VALUES ('Koszyk�ka',4,1,GETDATE())
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
 VALUES (3,'Jak to si� zacz�o? � historia pierwszego wy�cigu F1',NULL,NULL,NULL,
'70 lat min�o, jak jeden dzie� � parafrazuj�c tytu�owy utw�r serialu �Czterdziestolatek�. Min�o dok�adnie 13 maja, bo w�a�nie tego dnia 1950 roku, kierowcy po raz pierwszy �cigali si� w ramach Mistrzostw �wiata Formu�y 1. W ubieg�� niedziel� odby�o si� inauguracyjne Grand Prix 70-lecia, a jak w�a�ciwie dosz�o do tego pierwszego GP w dziejach F1?',

'Historia wy�cig�w Grand Prix si�ga roku 1906, kiedy to Automobilklub Francuski zorganizowa� wy�cig w pobli�u Le Mans i okolicznych miejscowo�ci. Warunki rozgrywania tych zawod�w odbiega�y jednak znacznie od obecnych. Jedno okr��enie toru, kt�ry wykorzystywa� g��wnie pobliskie drogi, liczy�o ponad 103 kilometry! Mierz�c dzisiejsz� miar�, przypomina�o to bardziej rajd terenowy, ni� rywalizacj� wy�cigow�.

We wczesnych latach wy�cig�w Grand Prix na palcach jednej r�ki liczono tory wy�cigowe z prawdziwego zdarzenia. Takimi mogli pochwali� si� Brytyjczycy (tor Brooklands, zamkni�ty w 1939 roku i oddany w r�ce brytyjskiego lotnictwa, obecnie miejsce muzeum i wydarze� historycznych), Amerykanie (tor Indianapolis) i W�osi (tor Monza, otwarty w 1922 roku). W latach 20. i 30. du�� popularno�ci� cieszy�y si� wy�cigi uliczne � oczywi�cie Grand Prix Monako, ale i Grand Prix Lwowa, kt�re jako jedyne na �wczesnych ziemiach polskich posiada�o renom� mi�dzynarodow�.

Europejskie mistrzostwa lat 30.
Rozkwit motorsportu przerwa�a II wojna �wiatowa, ale lata 30. stanowi� fundamenty pod powstanie Formu�y 1 w 1950 roku. W 1931 Association Internationale des Automobile Clubs Reconnus (AIACR, fr. Mi�dzynarodowa Federacja Rozpoznania Automobilklub�w) utworzy�a Europejskie Mistrzostwa Kierowc�w, kt�re z przerw� na rok 1933 i 1934, by�y najwa�niejszymi mi�dzynarodowymi zawodami przed 1939 rokiem.

Sama federacja (obecnie FIA) ju� od lat 20. pr�bowa�a podda� regulacji samochody, kt�re ze sob� rywalizowa�y � chocia�by pod wzgl�dem masy auta, co mia�o na celu ograniczenie pojemno�ci silnik�w. AIACR zajmowa�a si� r�wnie� regulacjami samej rywalizacji � Grand Prix Monako 1933 roku by�o pierwszym, w kt�rym o kolejno�ci na starcie zdecydowa�y wcze�niejsze kwalifikacje, coraz cz�ciej zakazywano wymiany kierowc�w podczas rywalizacji.

Przed wojn� zwyci�stwami w cyklu Grand Prix wymienia�y si� kompanie niemieckie i w�oskie � Mercedes i Auto Union, wspierane przez entuzjastycznie nastawionego do wy�cig�w Adolfa Hitlera oraz pochodz�ce z Italii Alfa Romeo i Maserati. Do tej walki do��cza�o si� r�wnie� francuskie Bugatti.

Formu�a A, Formu�a I, Formu�a 1
Powojenne zmiany w motorsporcie rozpocz�y si� ju� w roku 1946, kiedy to mi�dzynarodowa federacja przybra�a dzisiejsz� nazw� F�d�ration Internationale de lAutomobile. Podleg�a jej instytucja, Commission Sportive Internationale (CSI, fr. Komisja Sportu Mi�dzynarodowego), uregulowa�a techniczne aspekty samochod�w, jakie mog� �ciga� si� w zawodach Grand Prix od 1948 do 1953 roku, co nazwa�a Formu�� A, Formu�� I lub Formu�� 1 i jednoznacznie stawia�o wy�cigi pod nowymi regulacjami jako najwa�niejsze. W zawodach mog�y bra� udzia� bolidy, je�li tak je mo�na ju� wtedy nazwa�, z 4,5-litrowymi silnikami lub 1,5-litrowymi, kt�re posiada�y spr�ark� mechaniczn�. Do rywalizacji nie dopuszczono bardzo popularnych przed wojn� silnik�w 3-litrowych ze spr�ark�.

Prawdopodobnie pierwszym wy�cigiem zorganizowanym wed�ug nowych zasad, by�o Grand Prix Turynu w 1946 roku. Kierowcy �cigali si� w Parku Valentina, po�o�onym nad rzek� Pad, popularnym miejscem rekreacji tury�czyk�w. Drugimi zawodami pod nowymi regulacjami by�o natomiast Zimowe Grand Prix Szwecji w 1947 roku, kt�re przy temperaturze -29 stopni Celsjusza przyci�gn�o uwag� a� 50 tysi�cy widz�w. Za trzecie GP Formu�y 1 uwa�a si� Grand Prix Pau 1947. Zwyci�stwa w nich odnosili kolejno � W�och Achille Varzi (Alfa Romeo), Brytyjczyk Reg Parnell (ERA � brytyjski koncern wy�cigowy) i W�och Nello Pagani (Maserati).

Mistrzostwa �wiata Formu�y 1
Regulacje otworzy�y drog� do powstania �wiatowej serii wy�cigowej, szczeg�lnie �e takow� zainaugurowano w 1949 roku w rywalizacji motocyklist�w. W lutym 1950 roku, w�oski delegat FIA Antonio Brivio (znany przedwojenny kierowca, co ciekawe - uczestnik Igrzysk Olimpijskich 1936 w bobslejach), zaproponowa� kierowcom utworzenie Mistrzostw �wiata Formu�y 1. Wybranie arabskiej �jedynki� jako oficjalnego oznaczenia serii, zdefiniowa�a Formu�a 3, kt�ra od roku 1950 zacz�a u�ywa� w�a�nie �tr�jki�.

Federacja podj�a decyzj� o organizacji pierwszych wy�cig�w na torach w Wielkiej Brytanii (Silverstone), Monako (uliczny w Monte Carlo), Szwajcarii (Bremgarten pod Bernem), Belgii (Spa), Francji (Reims-Gueux) i W�oszech (Monza) oraz dodatkowej rundzie na Indianapolis 500, kt�ra nadawa�a mistrzostwom charakter �wiatowy, ale za Oceanem rywalizowali g��wnie kierowcy ameryka�scy. Chocia�by dzi�ki wygranej w Indianapolis, Johnnie Parsons uplasowa� si� na sz�stej pozycji w klasyfikacji kierowc�w sezonu 1950, a wystartowa� tylko w jednym wy�cigu.

Runda w Stanach by�a jedyn� pozaeuropejsk� do sezonu 1954, kiedy to inauguracja kampanii odby�a si� w Argentynie, na co wp�yw mia� oczywi�cie genialny, 5-krotny mistrz �wiata Juan Manuel Fangio. Ulubieniec po�udniowoameryka�skich kibic�w startowa� w pierwszym wy�cigu Mistrzostw �wiata F1, a wraz z innymi kierowcami m�g� zdoby� maksymalnie dziewi�� punkt�w (osiem za pierwsze miejsce i jedno �oczko� za najszybsze okr��enie w wy�cigu). Punktowanych by�o pi�� pierwszych pozycji � poza premiowanej o�mioma punktami wygranej, odpowiednio sze�cioma, czterema, trzema i dwoma za kolejne pozycje.

Pierwszy i ostatni wy�cig na oczach kr�la
Jak pewnie wiecie, tor Silverstone zosta� stworzony na bazie by�ego lotniska RAF-u (Kr�lewskich Si� Powietrznych), a pierwszymi �cigaj�cymi si� na nim zawodnikami by�a grupa pasjonat�w, kt�ra w 1947 wykorzysta�a opuszczony teren. W wyniku zderzenia ucierpia�a jedna z owiec, kt�ra nieszcz�liwie zamiast pastwiska, wybra�a na wypoczynek miejsce samochodowej rywalizacji. Pierwsze wy�cigi na Silverstone w og�le do humanitarnych nie nale�a�y, poniewa� podczas pami�tnego Grand Prix w roku 1950, kierowca Alfy Romeo Reg Parnell uderzy� w zaj�ca, powoduj�c wgniecenie na swoim ustrojonym w koniczyn�, bordowym aucie.

Trudno powiedzie�, co by�o natomiast podawane na przyj�ciu kr�lewskim, kt�re zosta�o zorganizowane specjalnie dla kierowc�w, ale pewnym jest, �e mieli oni okazj� pozna� samego kr�la Jerzego VI i kr�low�-matk� El�biet�. Pierwszych zawodnik�w w historii Mistrzostw Formu�y 1 przedstawia� parze kr�lewskiej Francis Curzon, pi�ty hrabia Howe, kt�ry w 1931 roku wygra� wy�cig 24h Le Mans i jest za�o�ycielem British Racing Drivers� Club (BRDC, ang. Klub Brytyjskich Kierowc�w Wy�cigowych) � obecnie w�a�cicieli toru Silverstone.

Urz�duj�cy przyw�dca Zjednoczonego Kr�lestwa ju� nigdy p�niej nie pojawi� si� na Grand Prix Wielkiej Brytanii. Natomiast na samym torze towarzystwo by�o r�wnie� arystokratyczne, bo pr�cz pierwszego i d�ugo jedynego Tajskiego kierowcy w historii F1 (do debiutu Alexa Albona w 2019 roku) Ksi�cia Biry, w zawodach wystartowa� szwajcarski baron Emmanuel de Graffenried. Obaj do mety nie dojechali, ale uczyni� to artysta jazzowy Johnny Claes, kt�ry wi�ksz� popularno�� zyska� dzi�ki estradowym wyst�pom.

Pomimo ekskluzywno�ci wydarzenia, nie nale�a�o ono do najdro�szych � kosztowa�o od sze�ciu szyling�w do dw�ch funt�w. Prawdopodobnie za tym stoi r�wnie� znakomita frekwencja, poniewa� pierwszy wy�cig nowej serii przyci�gn�� od stu do dwustu tysi�cy widz�w (�r�d�a podaj� r�ne szacunki). Liczyli oni zapewne na dobre wyniki brytyjskiego zespo�u English Racing Automobiles, ale jego kierowcy byli w cieniu zawodnik�w Alfy Romeo. Model 158, stworzony jeszcze przed II wojn� �wiatow�, to najlepsza maszyna sezonu 1950. Kierowcy prowadz�cy bolid, kt�ry rozkr�ca� silnik do 8,5 tysi�ca obrot�w, wygrali wszystkie Grand Prix inauguracyjnej kampanii Formu�y 1 (pr�cz GP na Indianapolis, gdzie Alfy nie startowa�y).

Inauguracyjny wy�cig
W kwalifikacjach do wy�cigu na Silverstone pierwsze cztery miejsca zaj�y w�a�nie bolidy spod znaku trzylistnej koniczyny i ustawi�y si� w jednej linii na starcie. Formacja startowa przypomina�a t� z boisk pi�karskich � cztery-trzy-cztery.

Pierwszym zakr�tem pokonanym przez kierowc�w Formu�y 1 by� Woodcote. Ju� dwa lata p�niej, obecnie d�ugi prawy zakr�t przypominaj�cy �limaka, sta� si� ostatnim na torze Silverstone. Prosta startowa mi�dzy Woodcote i Copse pe�ni�a swoj� funkcj� a� do 2010 roku, kiedy to przesuni�to j� obok nowego budynku boks�w � mi�dzy zakr�tem Club i Abbey. Nitk� toru wyznacza�y puste beczki po paliwie lotniczym oraz bele s�omy.

Na dystansie ca�ego wy�cigu kierowcy Alfy dwukrotnie dublowali rywali. Walka o zwyci�stwo rozegra�a si� mi�dzy Nino Farin� (pierwszym mistrzem �wiata F1), Juanem Manuelem Fangio i Luigim Fagiolim. Od tria �Fa� zdecydowanie odstawa� czwarty kierowca w�oskiego zespo�u Reg Parnell, jednocze�nie utrzymuj�c przewag� nad zawodnikami bardzo awaryjnego Maserati (chocia�by Ksi��� Bira napotka� k�opoty z silnikiem na prostej przy hangarach, co zako�czy�o jego walk� w wy�cigu) i francuskiego Talbot-Lago. Na dziesi�� k�ek przed ko�cem, Fangio zaatakowa� Farin� w Stowe, ale nie zmie�ci� si� w d�ugim prawym zakr�cie, a zahaczaj�c o bel� s�owy, przeci�� przew�d olejowy, przez co zosta� zmuszony do przedwczesnego zako�czenia rywalizacji. Dzi�ki temu Nino Farina dowi�z� wygran� do ko�ca, cho� na plecach odczuwa� silnik 158-mki Fagiolego. Dzi�ki awarii Fangio, Reg Parnell ucieszy� brytyjsk� publiczno��, melduj�c si� na trzeciej pozycji. Kolejne lokaty zaj�li zawodnicy Talbot-Lago i ERA.

Pierwszy wy�cig w historii Formu�y 1 liczy� 70. okr��e�, a zwyci�zca Farina przejecha� go w czasie ponad 2 godzin i 13 minut. Do mety dojecha�o jedenastu zawodnik�w, kt�rzy na ka�dym okr��eniu pokonywali siedem zakr�t�w, ulokowanych wok� pas�w startowych dawnego lotniska.

Niedzielne Grand Prix 70-lecia by�o 1023. wy�cigiem w historii Formu�y 1 oraz 55. zorganizowanym na torze Silverstone, gdzie siedemdziesi�t lat temu wszystko si� zacz�o.',

'lorem ipsum test 5',GETDATE(),null,3,GETDATE())

INSERT INTO Articles(AuthorId,Title,Picture,DescritpionPicture,SourcePicture,ShortArticle,FullArticle,Keywords,PublicationTime,CategoryId,UserModified,LastModified)
 VALUES (2,'Lorem Ipsum Small',NULL,NULL,NULL,
'"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... \n"',
'"Tristique nulla vel molestie. Donec purus ex, hendrerit id dui vitae, consectetur accumsan sapien.',
'lorem ipsum test 5',GETDATE(),null,3,GETDATE())
