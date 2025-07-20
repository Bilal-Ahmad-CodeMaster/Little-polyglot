import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../../components/main/courses/hero-section/hero-section.component";
import { SuperpowerCardComponent } from "../../../components/main/method/superpower-card/superpower-card.component";
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-method',
  imports: [HeroSectionComponent, SuperpowerCardComponent, NgFor, RouterLink],
  templateUrl: './method.component.html',
  styleUrl: './method.component.css'
})
export class MethodComponent {
  cards = [
    {
      id: 'rime',
      title: 'Rym',
      icon: 'fa fa-book',
      alt: 'Różowa ikona przedstawiająca Rym z kropkami i liniami',
      subtitle: 'bo słowo po słowie zostaje w głowie',
      expandedText: `
      Tworzenie rymów to jedna z najlepszych metod intuicyjnego zapamiętywania słów, wyrażeń i zdań. Dzieci od najmłodszych lat mają kontakt z prostymi rymowankami. W ten sposób uczą się języka ojczystego, a rymy powtarzane w dzieciństwie zostają w pamięci na całe życie. Podobnie jest z nauką angielskiego. To język bez deklinacji, bogaty w jedno- i dwusylabowe słowa, z których łatwo tworzyć rymy. Dzieci chętnie je powtarzają i szybko zapamiętują.

Rymowanie rozwija słuch fonemowy, dzięki któremu dzieci uczą się poprawnej wymowy angielskiego. To najlepsza rozgrzewka przed nauką czytania i pisania. Szukanie rymów to świetna zabawa, która angażuje dzieci podczas zajęć. Niektóre połączenia wyrazowe, zwłaszcza te nieoczywiste, jak świnia w peruce czy bocian z widelcem, pobudzają wyobraźnię i wywołują uśmiech. Wszystkie rymowanki, piosenki i ćwiczenia są dostosowane do poziomu językowego i rozwoju dzieci.
    `,
    },
    {
      id: 'music',
      title: 'Muzyka',
      icon: 'fa fa-music',
      alt: 'Różowa ikona przedstawiająca Muzykę z pionowymi owalnymi kształtami',
      subtitle: 'bo mózg lubi dobre rytmy',
      expandedText: `
      Muzyka towarzyszy człowiekowi od zarania dziejów. Pierwsze dźwięki, które do nas docierają, to bicie serca, miarowe kroki, dzwonek do drzwi czy szczekanie psa. Po narodzinach doświadczamy kołysanek przed snem, śpiewamy przeboje przedszkolne, nucimy piosenki z bajek. Niektóre melodie zapisują się trwale w pamięci. Po latach potrafimy je odtworzyć bezbłędnie. Podobnie jest z piosenkami, dlatego świetnie sprawdzają się w nauce języka obcego.

Muzyka sprawia przyjemność – wyzwala emocje, poprawia nastrój i wzmacnia zaangażowanie uczniów, co jest kluczowe w zapamiętywaniu nowych słów. Piosenki tworzone na potrzeby zajęć powtarzają poprawne struktury gramatyczne, podział na sylaby i intonację. Powtarzane wielokrotnie są chwytliwe i łatwe do zapamiętania.

Ponieważ nauka języka i melodii aktywuje te same struktury w mózgu, połączenie tych elementów w formie praktycznych ćwiczeń potęguje efekt nauki angielskiego.
    `,
    },
    {
      id: 'movement',
      title: 'Ruch',
      icon: 'fa fa-feather',
      alt: 'Różowa ikona przedstawiająca Ruch z poziomymi owalnymi kształtami',
      subtitle: 'bo uwalnia energię do nauki',
      expandedText: `
      Ruch to naturalna potrzeba dziecka, towarzysząca mu od pierwszych tygodni życia. Nawet podczas snu niemowlę zmienia pozycję w łóżeczku – dlatego często nazywamy je wiercipiętą. Wszystkie dzieci to kinestetycy – muszą być w ruchu. W ten sposób rozładowują energię, okazują emocje i – co ważne – przyswajają wiedzę. W układzie nerwowym istnieje bowiem sieć łącząca percepcję i aktywność ruchową. Jej skuteczność zależy od stopnia zaangażowania wszystkich zmysłów podczas nauki.

Czy można wysiedzieć 90 minut na lekcji? Zdecydowanie nie. Dlatego stosujemy taniec, klaskanie, tupanie, skakanie i kalambury. Przeplatamy ćwiczenia statyczne z ruchowymi, by urozmaicić lekcję i zaangażować wszystkich uczniów.

Ruch nie tylko wspomaga zapamiętywanie, ale także rozwija wyobraźnię i kreatywność. Dzieci świetnie pokazują pojęcia, nawet te bardzo abstrakcyjne.
    `,
    },
    {
      id: 'relationships',
      title: 'Relacje',
      icon: 'fa fa-people-arrows',
      alt: 'Różowa ikona przedstawiająca Rym z kropkami i liniami',
      subtitle: 'bo dają poczucie bezpieczeństwa',
      expandedText: `
      Od początku życia ludzie szukają bliskości i potrzebują budować relacje. Początkowo zaspokajają je rodzice, potem sieć kontaktów rośnie – pojawiają się znajomi z przedszkola, z podwórka, nowi przyjaciele. Relacje służą nie tylko poczuciu bezpieczeństwa, ale też wspólnej zabawie i rozwojowi emocjonalnemu.

Sukces w nauce angielskiego zależy w dużej mierze od relacji w klasie. Dobra atmosfera sprzyja zaangażowaniu i koncentracji. Emocje towarzyszące lekcjom jednoczą grupę i dają sygnał, że można na siebie liczyć.

Nauczyciel jako przewodnik stawia na pierwszym miejscu potrzeby dzieci. Słucha, tłumaczy, wspiera. Zyskuje tym zaufanie i szacunek grupy. Nie ocenia, lecz towarzyszy w edukacji. Dzięki temu dzieci czują się bezpiecznie i są bardziej ciekawe świata.

Dzieci chcą być traktowane poważnie – to wzmacnia ich poczucie własnej wartości. W Polyglot Kids angażujemy również rodziców – są oni towarzyszami dzieci w nauce i wspierają je w razie trudności. Organizujemy specjalne warsztaty i dbamy o stały kontakt na linii nauczyciel–rodzic.
    `,
    },
    {
      id: 'cooperation',
      title: 'Współpraca',
      icon: 'fa fa-handshake',
      alt: 'Różowa ikona przedstawiająca Muzykę z pionowymi owalnymi kształtami',
      subtitle: 'bo razem możemy więcej',
      expandedText: `Dbamy o wszechstronny rozwój dzieci. Dlatego od początku łączymy pracę indywidualną z zadaniami w parach i grupach. Dzięki temu uczniowie mają wiele okazji do aktywnego używania angielskiego. Angażujemy wszystkie dzieci i zachęcamy je do interakcji. Tworzymy przestrzeń do wzajemnego wsparcia i świętowania małych sukcesów. Uczniowie odkrywają swoje talenty i uczą się wykorzystywać je dla dobra grupy. Wprowadzamy pozytywną rywalizację opartą na szacunku i docenieniu. W ten sposób zwiększamy motywację do nauki i pozytywnie wpływamy na samoocenę uczniów.`,
    },
    {
      id: 'communication',
      title: 'Komunikacja',
      icon: 'fa fa-comments',
      alt: 'Różowa ikona przedstawiająca Ruch z poziomymi owalnymi kształtami',
      subtitle: 'bo uwalnia energię do nauki',
      expandedText: `Ruch to naturalna potrzeba dziecka, towarzysząca mu od pierwszych tygodni życia. Nawet podczas snu niemowlę zmienia pozycję w łóżeczku – dlatego często nazywamy je wiercipiętą. Wszystkie dzieci to kinestetycy – muszą być w ruchu. W ten sposób rozładowują energię, okazują emocje i – co ważne – przyswajają wiedzę. W układzie nerwowym istnieje bowiem sieć łącząca percepcję i aktywność ruchową. Jej skuteczność zależy od stopnia zaangażowania wszystkich zmysłów podczas nauki.

Czy można wysiedzieć 90 minut na lekcji? Zdecydowanie nie. Dlatego stosujemy taniec, klaskanie, tupanie, skakanie i kalambury. Przeplatamy ćwiczenia statyczne z ruchowymi, by urozmaicić lekcję i zaangażować wszystkich uczniów.

Ruch nie tylko wspomaga zapamiętywanie, ale także rozwija wyobraźnię i kreatywność. Dzieci świetnie pokazują pojęcia, nawet te bardzo abstrakcyjne.`,
    },
    {
      id: 'humor',
      title: 'Humor',
      icon: '	fas fa-grin-beam',
      alt: 'Różowa ikona przedstawiająca Ruch z poziomymi owalnymi kształtami',
      subtitle: 'bo endorfiny i nauka to świetny duet',
      expandedText: `Uśmiech to jeden z pierwszych objawów radości u dziecka. To reakcja na sytuacje, w których czuje się szczęśliwe. To zasługa endorfin – hormonów szczęścia wydzielanych podczas śmiechu. Dlatego dziecko stymulowane śmiechem łatwiej przyswaja nowe umiejętności.

Wprowadzając humor do lekcji, przyspieszamy naukę języka i rozwijamy poczucie humoru u dzieci. W wesołej atmosferze łatwiej nawiązać relacje i utrzymać motywację.

Humor uatrakcyjnia każdą lekcję. Wprowadzamy go w różny sposób – poprzez absurdalne rymowanki, śmieszne historie, dźwięki czy grafiki. Dzięki temu dzieci są bardziej aktywne i odważniejsze w mówieniu.`,
    },
    {
      id: 'creativity',
      title: 'Kreatywność',
      icon: 'fa fa-lightbulb',
      alt: 'Różowa ikona przedstawiająca Rym z kropkami i liniami',
      subtitle: 'bo droga do celu powinna być ciekawa',
      expandedText: `Tworzymy atmosferę otwartości i bezpieczeństwa, dzięki której uczniowie chętnie dzielą się pomysłami. Uczestniczą w działaniach pobudzających kreatywność – tworzą projekty artystyczne, językowe i multimedialne, odgrywają scenki, wcielają się w role. Uczą się patrzeć z wielu perspektyw. Pobudzamy wyobraźnię za pomocą wizualizacji – zdjęć, obrazków, grafik wywołujących nieoczywiste skojarzenia. Często korzystamy z burzy mózgów. Dzięki temu uczniowie rozwijają kompetencje językowe z otwartością i odwagą.`,
    },
    {
      id: 'critical-thinking',
      title: 'Myślenie krytyczne',
      icon: 'fa fa-brain',
      alt: 'Różowa ikona przedstawiająca Muzykę z pionowymi owalnymi kształtami',
      subtitle: 'bo pomaga zrozumieć świat',
      expandedText: `Przygotowujemy uczniów do samodzielnego, krytycznego myślenia. Różnorodne zadania inspirują do formułowania hipotez, szukania odpowiedzi, porównywania informacji i wyciągania wniosków. Zadając proste pytania, uruchamiamy refleksję nad światem i rozwojem osobistym. Stawiamy na analizę, dedukcję i podsumowania, by uczniowie potrafili formułować własne opinie. Uczymy struktur i strategii, dzięki którym mogą wyrażać swoje zdanie w sposób przemyślany i zrozumiały. Wszystko to wspiera rozwój językowy i komunikację.`,
    },
    {
      id: 'autonomy',
      title: 'Autonomia',
      icon: 'fa fa-user-check',
      alt: 'Różowa ikona przedstawiająca Ruch z poziomymi owalnymi kształtami',
      subtitle: 'bo daje poczucie sprawczości',
      expandedText: `Budowanie samodzielności to jeden z celów naszej metody nauki angielskiego. Dlatego powierzamy uczniom odpowiedzialność dostosowaną do ich wieku i możliwości. To zwiększa zaangażowanie i poczucie satysfakcji. Dzięki regularnym zadaniom dzieci uczą się systematyczności i oceny postępów. Poprzez pracę w parach i grupach rozwijamy umiejętność samodzielnej korekty błędów i udzielania informacji zwrotnej. Nauczyciel zachęca do podejmowania ryzyka i wspiera w osiąganiu celów. Staje się towarzyszem w procesie edukacyjnym.`,
    },
    {
      id: 'spirality',
      title: 'Spiralność',
      icon: 'fa fa-circle-notch',
      alt: 'Różowa ikona przedstawiająca Ruch z poziomymi owalnymi kształtami',
      subtitle: 'bo pobudza rozwój i zapamiętywanie',
      expandedText: `Nauka to proces złożony i spiralny. Zapominanie to jego naturalna część, dlatego umożliwiamy uczniom powroty do wcześniej poznanych treści – w trakcie lekcji, po rozdziałach, na podsumowaniach. Nasza metoda współgra z naturalnym sposobem przyswajania wiedzy. Słownictwo i gramatyka pojawiają się stopniowo, w dostosowanej formie. W kolejnych latach uczniowie wracają do tematów, utrwalają je i rozbudowują. Z każdym etapem rosną ich kompetencje komunikacyjne.`,
    },
    {
      id: "Author-materials",
      title: "Materiały autorskie",
      icon: 'fa fa-book-open',
      alt: 'Różowa ikona przedstawiająca Ruch z poziomymi owalnymi kształtami',
      subtitle: 'bo przyciągają uwagę jak magnes',
      expandedText: `Dzieci kochają książki. Zaczynają od etapu „do buzi”, a potem z zainteresowaniem je oglądają. Uczą się kolorów, kształtów, liczb. Starsze dzieci potrzebują silniejszych bodźców – dlatego nasze podręczniki są atrakcyjne wizualnie i bogate merytorycznie. To filar unikalnego programu Polyglot Kids.

Każda lekcja to 45–90 minut intensywnego kontaktu z angielskim i 20–40 nowych słów tygodniowo. Nasze materiały wspierają nauczycieli, poszerzają podstawę programową i przygotowują do egzaminów Cambridge.

Rozwijają się wraz z uczniami – dostosowujemy je do ich poziomu i potrzeb. Tworzyliśmy je przez lata i stale aktualizujemy. Zespół metodyków i praktyków pod kierunkiem Joanny Zarańskiej zapewnia najwyższy poziom.

Dzięki nim dzieci z roku na rok coraz lepiej posługują się angielskim. Mamy książki dla wzrokowców, słuchowców, dzieci werbalnych i kinestetyków – od grafik po piosenki i ćwiczenia ruchowe. Wspólne projekty rozwijają umiejętności społeczne.

Materiały zawierają też elementy kulturowe – otwierają dzieci na świat. Poruszamy tematy zwyczajów i realizujemy projekty międzykulturowe każdego roku.`,
    },
  ];


  expandedCardId: string | null = '';
  toggleCard(cardId: any): void {
    if (this.expandedCardId === cardId) {
      this.expandedCardId = null; // Collapse the card if it's already expanded
    } else {
      this.expandedCardId = cardId; // Expand the selected card
    }
  }
}
