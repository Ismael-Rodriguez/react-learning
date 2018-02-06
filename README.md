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

const CreateClassHeading = createReactClass({
  render: function() {
    return <h1>Hello</h1>;
  }
});

const HelloWorld = React.createClass({
  render() {
    return <p>Hello, world!</p>;
  }
});

const HelloWorld = () => <p>Hello, world!</p>;

const ProductCard = props => {
  return (
    <div>
      <span>Producto: </span>
      <span>{this.props.product}</span>
      <span> Cantidad: </span>
      <span>{this.props.amount}</span>
    </div>
  );
};
```

Hay que indicar donde se renderizará el componente:
`ReactDOM.render([what], [where]);`

```javascript
ReactDOM.render(<ProductList />, document.getElementById("content"));
```

# Props

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

## PropTypes

```javascript
class MapComponent extends React.Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    zoom: PropTypes.number,
    place: PropTypes.object,
    markers: PropTypes.array
  };
}
```

```javascript
const MapComponent = createReactClass({
  propTypes: {
    lat: PropTypes.number,
    lng: PropTypes.number
    // ...
  },
})
```

## defaultProps

```javascript
class Counter extends React.Component {
  static defaultProps = {
    initialValue: 1
  };
  // ...
};
```

## Context

In order to tell React we want to pass context from a parent component to the rest of its children we
need to define two attributes in the parent class:

• childContextTypes and
• getChildContext

```javascript
class Messages extends React.Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    initialActiveChatIdx: PropTypes.number,
    messages: PropTypes.array.isRequired,
  };
  // necesario para usar context, se define el tipo del context
  static childContextTypes = {
    users: PropTypes.array,
    userMap: PropTypes.object,
  };
  // necesario para usar context, se declara el valor del context
  getChildContext() {
    return {
      users: this.getUsers(),
      userMap: this.getUserMap(),
    };
  }
  // ...
}
```

Para que los hijos reciban el context, debemos especificar con `contextTypes` el nombre y tipo del contexto (o parte de él que vaya a recibir)
```javascript
class ThreadList extends React.Component {
  // ...
  static contextTypes = {
    users: PropTypes.array,
  };
  // ...
}
```
Podremos acceder al contexto con `this.context`

---

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

Todo componente se renderiza como una función de sus props y state, lo que convierte el renderizado de componentes react en algo determinístico. Eso hace que ante los mismos props y state siempre se renderice igual.

`this.state` es inmutable, o por lo menos debería ser tratado como tal, la razón de esto es que cuando llamamos a `this.setState` esta función es asincrona, por lo que si modificamos el estado podemos caer en condiciones de carrera al modificarlo nosotros y que luego se ejecute `this.setState`

```javascript
console.log(this.state.nums);
// [ 1, 2, 3 ]
this.state.nums.push(4);
console.log(this.state.nums);
// [ 1, 2, 3, 4] <-- Uh-oh!
```

> Cuando un cambio en el stte depende del state actual, es mejor usar una función para establecer el estado ya que ayuda a evitar errores de condiciones de carrera por la actualización asincrona del state.


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

## Donde vive el estado

For each piece of state:
1. • Identify every component that renders something based on that state.
2. • Find a common owner component (a single component above all the components
that need the state in the hierarchy).
3. • Either the common owner or another component higher up in the hierarchy
should own the state.
4. • If you can’t find a component where it makes sense to own the state, create a new
component simply for holding the state and add it somewhere in the hierarchy
above the common owner component.

# Children

```javascript
const Newspaper = props => {
  return (
    <Container>
      <Article headline="An interesting Article">
        Content Here
      </Article>
    </Container>
  )
}
```

```javascript
class Container extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}
```

## React.Children helper

## React.Children.map() & React.Children.forEach()

```javascript
class MultiChildContainer extends React.Component {
  static propTypes = {
    component: PropTypes.element.isRequired,
    children: PropTypes.element.isRequired
  };
  // ...
  renderChild = (childData, index) => {
    return React.createElement(
      this.props.component,
      {}, // <~ child props
      childData // <~ child's children
    );
  };
  // ...
  render() {
    return (
      <div className="container">
        {React.Children.map(this.props.children, this.renderChild)}
      </div>
    );
  }
}
```

## React.Children.toArray()

`const arr = React.Children.toArray(this.props.children);`


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




# Crear una funcionalidad React desde 0

1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live
5. Hard-code initial states
6. Add inverse data flow
7. Add server communication




# React.createElement

`var boldElement = React.createElement('b');`
`var mountElement = document.querySelector('#root');`
`ReactDOM.render(boldElement, mountElement);`


React.createElement() function accepts three arguments:
1. The DOM element type
2. The element props
3. The children of the element

`var boldElement = React.createElement('b', null, "Text (as a string)");`

The children of the DOM element must be a ReactNode object, which is any of the following:
1. ReactElement
2. A string or a number (a ReactText object)
3. An array of ReactNodes

# React.render

React render() acepta tres argumentos:
1. El elemento que queremos renderizar
2. El elemento donde queremos renderizarlo
3. Un callback que se ejecutará después de que el componente se renderice/actalice

```javascript
ReactDOM.render(boldElement, mountElement, function() {
// The React app has been rendered/updated
});
```

# JSX

```
var boldElement = <b>Text (as a string)</b>;
const element = <div>Hello world</div>;
```

## Operador ternario

```
const warningLevel = 'debug';
const component = (<Alert
                    color={warningLevel === 'debug' ? 'gray' : 'red'}
                    log={true} />)
```

## Operador condicional

```javascript
// ...
const renderAdminMenu = function() {
  return (<MenuLink to="/users">User accounts</MenuLink>)
}
// ...
const userLevel = this.props.userLevel;
  return (

    <ul>
      <li>Menu</li>
      {userLevel === 'admin' && renderAdminMenu()}
    </ul>
  )
```

`const Menu = (<ul>{loggedInUser ? <UserMenu /> : <LoginLink />}</ul>)`

## Valores boolean

```JavaScript
<input name='Name' disabled />
// In React we need to set these as booleans. That is, we need to pass a true or false explicitly as an attribute:
// Set the boolean in brackets directly
<input name='Name' disabled={true} />
// ... or use JavaScript variables
let formDisabled = true;
<input name='Name' disabled={formDisabled} />
```

## Pasar multiples props

```JavaScript
const props = {msg: "Hello", recipient: "World"}
// We could pass each prop individually like this:
<Component msg={"Hello"} recipient={"World"} />
// But by using the JSX spread syntax we can do it like this instead:
<Component {...props} />
```

## classname en vez de class

```javascript
<!-- Same as <div class='box'></div> -->
<div className='box'></div>

```

## htmlFor en vez de for

```javascript
<!-- ... -->
<label htmlFor='email'>Email</label>
<input name='email' type='email' />
<!-- ... -->
```

## Entities

```javascript
// html entitities
return (
  <ul>
    <li>phone: {'\u0260e'}</li>
    <li>star: {'\u2606'}</li>
  </ul>
)
```

## Emoji

```javascript
// Emoji are just unicode character sequences, so we can add emoji the same way:
return(
  <ul>
    <li>dolphin: {'\uD83D\uDC2C'}</li>
    <li>dolphin: {'\uD83D\uDC2C'}</li>
    <li>dolphin: {'\uD83D\uDC2C'}</li>
  </ul>
)
```

# Ciclo de vida

# Ciclo de vida de los componentes

## componenteDidMount()

Se invoca despues de que el componente sea montado en la pagina

* Es un buen sitio para inicializar su estado.


En caso de que tenga el componente tenga "context", el ciclo de vida incluye el
contexto como argumento en cada función

```javascript
class ThreadList extends React.Component {
// ...
static contextTypes = {
  users: PropTypes.array,
};
// ...
componentWillReceiveProps(nextProps, nextContext) {
  // ...
}
// ...
shouldComponentUpdate(nextProps, nextState, nextContext) {
  // ...
}
// ...
componentWillUpdate(nextProps, nextState, nextContext) {
  // ...
}
// ...
componentDidUpdate(prevProps, prevState, prevContext) {
  // ...
}
```
