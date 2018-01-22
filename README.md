Varias formas de declarar un componente:

```javascript
class HelloWorld extends React.Component {
  // <-- la mas usada
  render() {
    return <p>Hello, world!</p>;
  }
}

import createReactClass from "create-react-class";
const HelloWorld = createReactClass({
  render() {
    return <p>Hello, world!</p>;
  }
});

const HelloWorld = React.createClass({
  render() {
    return <p>Hello, world!</p>;
  }
});

const HelloWorld = () => <p>Hello, world!</p>;
```

Hay que indicar donde se renderizará el componente:
`ReactDOM.render([what], [where]);`

```javascript
ReactDOM.render(<ProductList />, document.getElementById("content"));
```

Un componente puede acceder a sus props mediante `this.props`. Además `this.props` es inmutable y los componentes no pueden modificarlo directamente.
```javascript
class Product extends React.Component {
  render() {
    return (
      <div className="image">
        <img src={this.props.productImageUrl} />
      </div>
    );
  }
}
```

Un componente puede renderizar un array de elementos JSX, pero cada elemento debe tener una clave "key" única

```javascript
class ProductList extends React.Component {
  render() {
    const productComponents = Seed.products.map(product => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
      />
    ));

    return <div className="ui unstackable items">{productComponents}</div>;
  }
}
```

# Estado

Un componente puede definir un estado propio y privado con `this.state`

El componente se renderiza de nuevo al recibir nuevos props o cuando cambia su estado (mediante `this.setState()`)

Todo componente se renderiza como una función de sus props y state, lo que convierte el renderizado de componentes react en algo deterministico. Eso hace que ante los mismos props y state siempre se renderice igual.

`this.state` es inmutable, o por lo menos debería ser tratado como tal, la razón de esto es que cuando llamamos a `this.setState` esta función es asincrona, por lo que si modificamos el estado podemos caer en condiciones de carrera al modificarlo nosotros y que luego se ejecute `this.setState`

```javascript
console.log(this.state.nums);
// [ 1, 2, 3 ]
this.state.nums.push(4);
console.log(this.state.nums);
// [ 1, 2, 3, 4] <-- Uh-oh!
```

# JSX

```javascript
React.createElement('div', {className: 'ui items'},
  'Hello, friend! I am a basic React component.'
)

<div className='ui items'>
  Hello, friend! I am a basic React component.
</div>
```

```javascript
React.createElement('div', {className: 'ui items'},
  React.createElement('p', null, 'Hello, friend! I am a basic React component.')
)

<div className='ui items'>
  <p>
    Hello, friend! I am a basic React component.
  </p>
</div>
```

# Ciclo de vida de los componentes

## componenteDidMount()

Se invoca despues de que el componente sea montado en la pagina

* Es un buen sitio para inicializar su estado.


# Crear una funcionalidad React desde 0

1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live
5. Hard-code initial states
6. Add inverse data flow
7. Add server communication

# Criterios para identificar lo que es estado

1. Is it passed in from a parent via props? If so, it probably isn’t state.
  - A lot of the data used in our child components are already listed in their parents. This criterion helps
us de-duplicate.
  - For example, “timer properties” is listed multiple times. When we see the properties declared in
EditableTimerList, we can consider it state. But when we see it elsewhere, it’s not.
2. Does it change over time? If not, it probably isn’t state.
  - This is a key criterion of stateful data: it changes.
3. Can you compute it based on any other state or props in your component? If so, it’s not
state.
  - For simplicity, we want to strive to represent state with as few data points as possible.
4. Si es un formulario controlado, también tiene estado.
