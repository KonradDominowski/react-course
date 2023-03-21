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

#### 7. [Wyświetlanie list](#7-wyświetlanie-list)

#### 8. [React Fragment - czyli jak się pozbyć niepotrzebnych divów](#react-fragment---czyli-jak-się-pozbyć-niepotrzebnych-divów)

#### 9. [Portal - czyli jak wyrenderować komponent w innym miejscu niż został wywołany](#portal---czy-jak-wyrenderować-komponent-w-innym-miejscu-niż-został-wywołany)

#### 10. [useRef - wyciąganie danych z DOM](#useref---wyciąganie-danych-z-drzewa-dom)

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

Jeśli zmieniam **State** w oparciu o poprzedni **state**, na przykład inkrementuję wartość o 1, powinienem się odwołać do poprzedniej wartości State, przekazując jako parametr funkcję a jako parametr poprzedni stan, a dopiero do niej nową wartość stanu.

```jsx
// Deklaracja stanu
const [dataState, setDataState] = useState(someInitialData);

// Zmiana stanu na nowy
setDataState(someNewData);

// Zmiana stanu w oparciu o poprzednią wartość stanu
const setDataState = (previousState) => previousState + 1;
```

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
