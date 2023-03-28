# React

## Spis treści

#### 1. [Czym jest React?](#react-1)

#### 2. [Komponenty](#komponenty)

#### 3. [Stylowanie komponentów](#stylowanie-komponentów)

#### 4. [Przekazywanie danych](#przekazywanie-danych)

- [Do dziecka](#do-dziecka)
- [Do rodzica](#do-rodzica)

#### 5. [useState - Aktualizacja danych na stronie](#aktualizacja-danych-na-stronie---usestate)

#### 6. [Obsługa eventów](#obsługa-eventów)

#### 7. [Wyświetlanie list](#renderowanie-list)

#### 8. [React Fragment - czyli jak się pozbyć niepotrzebnych divów](#react-fragment---czyli-jak-się-pozbyć-niepotrzebnych-divów)

#### 9. [Portal - czyli jak wyrenderować komponent w innym miejscu niż został wywołany](#portal---czyli-jak-wyrenderować-komponent-w-innym-miejscu-niż-został-wywołany)

#### 10. [useRef - wyciąganie danych z DOM](#useref---wyciąganie-danych-z-drzewa-dom)

#### 11. [useEffect](#useeffect---funkcja-wykonuje-się-tylko-jeśli-lista-zależności-się-zmieni)

#### 12. [useReducer - zarządzanie bardziej skomplikowanych stanem](#usereducer---zarządzanie-bardziej-skomplikowanym-stanem)

#### 13. [useContext](#usecontext)

---

## **React**

jest biblioteką Javascriptową do budowania reaktywnych interfejsów użytkownika

Każdy element na stronie to **[Komponent](#komponenty)**, który można podzielić na kolejne, mniejsze **[Komponenty](#komponenty)**. **[Komponent](#komponenty)** jest funkcją, która zwraca pseudokod HTML, zwany **JSX**.

**React** jest pisany w sposób **deklaratywny**, to znaczy, że deklaruję, w jaki sposób ma wyglądać końcowy efekt, a **React**, pod maską ustala, które elementy interfejsu trzeba zaktualizować, aby osiągnąć zamierzony efekt.

---

## **Komponenty**

**Komponenty** to funkcje które zwracają kod **JSX**

**Komponent** to mały, przeznaczony do wielokrotnego użytku fragment kodu, który definiuje określoną część interfejsu użytkownika.

Każdy **komponent** posiada swój **[stan](#aktualizacja-danych-na-stronie---usestate)** (eng. **[State](#aktualizacja-danych-na-stronie---usestate)**), i może przyjmować dane od komponentu rodzica poprzez argument **[props](#do-dziecka)**, a także za pomocą funkcji zadeklarowanej w rodzicu i wywołanej u dziecka, przekazywać dane w drugą stronę, **[od dziecka do rodzica](#do-rodzica)**.

Aby zastosować CSS w komponencie należy zaimportować plik `.css`

```jsx
import React from "react";

// Importowanie stylów
import classes from "./ComponentName.module.css";

// Definiowanie komponentu
export default function ComponentName(props) {
  let birthYearsList = [1994, 1996, 2012];

  // Przekazanie zmiennej do komponentu dziecka
  return (
    <div className={classes.myHeader}>
      <h1>This is a header</h1>
      <ChildComponent dataAccessedInChild={birthYearsList} />
    </div>
  );
}
```

Aby umożliwić zawarcie jakiegoś kontentu w komponencie, należy wewnątrz jego tagów zawrzeć **props.children**

```jsx
export default function Button(props) {
  return <button type="submit">{props.children}</button>;
}
```

---

## **Stylowanie komponentów**

Komponenty mogą być stylowane na różne sposoby:

- Klasyczne pliki css importowane i nadawanie klasy
- Tworzenie tzw. **ostylowanych komponentów** wykorzystujących dziwną składnię, czyli tagged Template
- Stylowanie inline
- Stylowanie za pomocą [**modułów css**](#komponenty), czyli to co ja będę robił:

---

## **Przekazywanie danych**

### **Do dziecka**

Aby przekazać dane do dziecka, należy użyć składni poniżej, a następnie w komponencie odwołać się do parametru **props**, który zawiera wszystkie dane które przekazaliśmy.

```jsx
// Przekazanie danych do dziecka
<Component dataName={data} />
```

```jsx
// Dostęp do danych przekazanych przez rodzica
export default function Component(props) {
  props.dataName;
}
```

### **Do rodzica**

Aby przekazać dane od dziecka do rodzica, należy utworzyć w rodzicu **funkcję**, która przyjmuje oczekiwane dane jako parametr, przekazać ją do dziecka jako **props**, a następne wywołać w komponencie dziecku.

```jsx
export default function ParentComponent() {

  // Funkcja w rodzicu, która przyjmie dane od dziecka
  const dataFromChild = (data) => {
    const parentData = { ...data };
    return parentData;
  };

  return (
	// Przekazanie jej w propsach do dziecka
	<ChildComponent onDataSave={dataFromChild}>
  )
}
```

```jsx
export default function ChildComponent(props) {
	let someData = [1, 2 ,3]

	// Dane przekazane do rodzica za pomocą funkcji z propsów
	props.onDataSave(someData)

	return <ChildComponent JSX Code>
}
```

---

## Aktualizacja danych na stronie - useState()

React renderuje stronę tylko raz, więc aby zmienić dane na stronie, należy jeszcze raz ją wyrenderować. Przy korzystaniu ze zwykłych zmiennych, strona się nie odświeża, dlatego należy użyć **Hooka** zwanego **State**.

Funkcja **useState** tworzy zmienną, oraz funkcję, która służy do zmiany jej wartości. **State** jest o tyle unikalny, że przy jego zmianie, dane na stronie są renderowane ponownie. React zadba o to aby zmienić tylko te elementy strony, które faktycznie uległy zmianie.

**setState** jest funkcją służącą do zmiany wartości stanu, po jej użyciu przypisujemy nową wartość a także wywołujemy ponowne renderowanie komponentu.

Jeśli zmieniam **State** w oparciu o poprzedni **state**, na przykład inkrementuję wartość o 1, powinienem się odwołać do poprzedniej wartości State, przekazując jako parametr funkcję a jako parametr poprzedni stan, a dopiero do niej nową wartość stanu.

```jsx
// Deklaracja stanu
const [dataState, setDataState] = useState(someInitialData);

// Zmiana stanu na nowy
setDataState(someNewData);

// Zmiana stanu w oparciu o poprzednią wartość stanu
const setDataState = (previousState) => previousState + 1;
```

Aby zarządzać stanem w bardziej rozbudowany sposób, użyj [useReducer](#usereducer---zarządzanie-bardziej-skomplikowanym-stanem).

---

## Obsługa eventów

Aby obsłużyć event, który wydarzy się na stronie, należy, podobnie jak w waniliowym JSie, utworzyć funkcję, która odpowiada za to, co ma się wydarzyć oraz podpiąć pod element DOM, przekazując ją danego elementu w kodzie JSX, pod nazwą eventu z prefixiem `on`, np. `onClick`, `onMouseEnter`.

Konwencja mówi, aby funkcje nazywały się `handleEvent`, np. `handleThisButtonClick`, `handleSave`.

```jsx
export default function NumberForm() {
  // Obsługa eventu
  const handleAmountChange = (e) => {
    doSomething();
  };

  return (
    <div>
      <input type="number" onChange={handleAmountChange} />
    </div>
  );
}
```

---

## Renderowanie list

Aby wyrenderować listę danych na stronie, należy użyć fukcji `map()`, aby utworzyć listę komponentów dla każdego elementu z listy. React wyrenderuję taką mapę bez problemu.

```jsx
let birthYearsList = [1994, 1996, 2012];

return (
  <div>
    {birthYearsList.map((year) => (
      <BirthYearComponent year={year} />
    ))}
  </div>
);
```

---

## Fragment - czyli jak się pozbyć niepotrzebnych divów

Z racji tego że reactowe komponenty mogą zwracać tylko jeden element drzewa DOM, aby nie dodawać niepotrzebnego diva okalającego nasz kod JSX, w reaccie jest dostępny **Fragment**, czyli element, który nie zostanie wyrenderowany na stronie, ale można nim otoczyć nasz JSX

```jsx
import React from react;

export default function ComponentName() {

  // Tego chcemy uniknąć, ten zewnętrzny div jest zbędny
  return (
    <div>
      <someChildElement />
      <someOtherChildElement />
    </div>
  )

  // Fragment pozwala nam zwrócić dwa elementy bez renderowania otaczającego elementu
  return (
    <React.Fragment>
      <someChildElement />
      <someOtherChildElement />
    </React.Fragment>
  )

  // Skrócona składnia fragmentu
  return (
    <>
      <someChildElement />
      <someOtherChildElement />
    </>
  )
}
```

---

## Portal - czyli jak wyrenderować komponent w innym miejscu niż został wywołany

Portale pozwalają nam przetransportować komponent na inne miejsce w drzewie DOM. Dla przykładu, chcemy aby nasz **modal** znajdować się ponad wszystkimi elementami, a nie był zagnieżdżony nie wiadomo jak głęboko, dlatego wykorzystując **portale**, 'teleportujemy' go gdzie indziej, na przykład tak jak poniżej do elementów o id `backdrop-root` oraz `overlay-root`.

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Backdrop() {
  return <div className="backdrop"></div>;
}

function ErrorModal() {
  return <div className="error-modal"></div>;
}

export default function Modal() {
  // Teleportujemy komponenty Backdrop i ErrorModel do adekwatnych miejsc, które są dla nich przygotowane w pliku index.html:
  // Backdrop --> #backdrop-root
  // Modal --> #overlay-root
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={props.onCloseModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ErrorModal error={props.error} onCloseModal={props.onCloseModal} />,
        document.getElementById("overlay-root")
      )}
    </->
  );
}
```

---

## useRef - Wyciąganie danych z drzewa DOM

Hook **useRef** służy do fetchowania danych za pomocą właściwości `ref`, która jest natywna dla HTML. **useRef** zwraca nam obiekt, który ma właściwość current, przechowującą aktualny **element DOM**.

Wartość **useRef**, podobnie jak [useState](#5-usestate---aktualizacja-danych-na-stronie), zachowuje swoją wartość pomiędzy kolejnymi renderami komponentu, jednakże zasadnicza różnica polega na tym, że **useRef** nie wywołuje kolejnego renderu przy zmianie swojej wartości.

```jsx
import { React, useRef } from "react";

export default function UserForm(props) {
  const enteredAgeRef = useRef();

  const handleAgeChange = () => {
    let enteredAge = enteredAgeRef.current.value;

    doSomething();
  };

  return (
    <input
      id="age"
      type="number"
      ref={enteredAgeRef}
      onChange={handleAgeChange}
    />
  );
}
```

---

## useEffect - funkcja wykonuje się tylko jeśli lista zależności się zmieni

Hook **useEffect** służy do obsługi efektów ubocznych aplikacji, niezwiązanych bezpośrednio z UI. Na przykład logowanie użytkownika albo fetchowanie danych.

```jsx
// Składnia
// Dwa argumenty - funkcja do wykonania oraz lista zależności
import { useEffect } from "react";

useEffect(() => {
  doSomethingOnlyIfItem1orItem2Changes();
}, [item1, item2]);

// Różne wersje w zależności od dependencies:

// Brak deklaracji - funkcja wykona się przy każdym renderowaniu komponentu
useEffect(() => {
  doSomething();
});

// Pusta lista zależności - funkcja wykona się RAZ - przy pierwszym renderze komponentu

useEffect(() => {
  doSomething();
}, []);￼
￼
￼
￼
1.5x
￼


// Lista zależności zawiera wartości STANÓW - funkcja wykona się gdy wartość któregokolwiek ze stanów podanych w zależnościach się zmieni

useEffect(() => {
  doSomething();
}, [stateValue1, stateValue2]);
```

---

## useReducer - zarządzanie bardziej skomplikowanym stanem

Hook **useReducer** służy do zarządzania stanem w bardziej zaawansowany sposób. Do modyfikacji stanu służy funkcja **dispatch**, która może się zachowywać różnie, w zależności od tego, jaką **akcję** przekażemy do niej jako argument

```jsx
export default function Component(props) {
  // Zmienna z akcjami aby łatwiej się żyło
  const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
    SET_VALUE: "set_value",
  };

  // reducer - funkcja, która aktualizuje stan w oparciu o argument ACTION i poprzednią wartość stanu

  const reducer = function (state, action) {
    if (action.type === ACTIONS.INCREMENT) {
      return { count: state.count + 1 };
    } else if (action.type === ACTIONS.DECREMENT) {
      return { count: state.count - 1 };
    } else if (action.type === ACTIONS.SET_VALUE) {
      return { count: action.value };
    } else {
      return state;
    }
  };

  // initialState - stan początkowy - { count: 0 }

  const [state, dispatchState] = useReducer(reducer, { count: 0 });

  // state - wartość stanu, tak jak przy useState
  // dispatchState - funkcja do zmiany stanu, ale bardziej zaawansowana, można do niej przekazać argument, na podstawie którego w różny sposób zaktualizuje się stan, jako argument przekazuje się obiekt z właściwością type, zawierającą informację w jaki sposób zmienić wartość stanu

  const increment = function () {
    // Wywołuję funkcję dispatch, a jako akcję przekazuję 'INCREMENT'
    // Funkcja dispatch wykonuje działania odpowiednie dla tej akcji
    dispatchState({ type: ACTIONS.INCREMENT });
  };

  const decrement = function () {
    dispatchState({ type: ACTIONS.DECREMENT });
  };

  const handleNumberChange = (e) => {
    // Wywołuję funkcję dispatch, przekazując oprócz typu akcji również tzw. PAYLOAD (nazwa dowolna), czyli dodatkowe informacje, na przykład w tym wypadku wartość pola w formularzu
    dispatchState({
      type: ACTIONS.SET_VALUE,
      value: e.target.value,
    });
  };

  return (
    <>
      <button onClick={decrement}>-</button>
      <h1>{state.count}</h1>
      <button onClick={increment}>+</button>
      <input type="number" onChange={handleNumberChange} />
    </>
  );
}
```

---

## useContext

Zamiast przekazywać dane poprzez wiele komponentów, możemy skorzystać z **Context** API wbudowanego w Reacta, które pozwala nam na dostęp do danych bez żmudnego przekazywania ich w propsach.

Kontekst jest dobry, kiedy mamy mocno rozbudowane drzewo [Komponentów](#komponenty), i musimy przekazać dalej niż bezpośrednio do dziecka.

Używając tego hooka kod jest czystszy i niezaśmiecony niepotrzebnym przekazywaniem danych w każdym kolejnym dziecku, aż do komponentu, w którym chcemy z niego skorzystać.

1. Utworzenie kontekstu
2. Przekazanie kontekstu do dzieci poprzez `<ContextName.Provider value={someValue} />`
3. Konsumowanie kontekstu wewnątrz dzieci za pomocą `useContext(contextName)`

```jsx
// Plik definiujący kontekst
import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // Zaznaczam, że ta właściwość ma być jakąś funkcją, żeby IDE mi lepiej podpowiadał gdy będę używał kontekstu
});

export default AuthContext;
```

```jsx
// Plik dostarczający kontekst do komponentu
import React from "react";

// Importowanie kontekstu
import AuthContext from "./context/auth-context";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Przekazanie kontekstu WSZYSTKIM dzieciom i dzieciom dzieci itd. wewnątrz Providera
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}
```

```jsx
// Plik konsumujący (korzystający z) kontekst
import React, { useContext } from "react";

// Importowanie kontekstu
import AuthContext from "./context/auth-context";

// Dziecko dziecka dziecka komponentu MainHeader, do któego przekazaliśmy kontekst
export default function Navigation() {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
```
