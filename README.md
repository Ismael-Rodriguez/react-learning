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
