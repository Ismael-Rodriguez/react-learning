class ProductList extends React.Component {
  constructor(props) {
    // en principio, como ProductList no tiene props, no hace falta que los
    // pongamos como argumento del constructor ni que se lo pasemos a super
    // llamar a super si hace falta para tener el this
    // pero no es mala idea hacerlo siempre por si en el futuro este componente
    // recibe props que no se nos olvide

    super(props);

    // el constructor es el unico sitio donde se puede modificar el estado
    // directamente sin usar this.setState()
    this.state = {
      products: [] // <-- es una buena practica inicializarlo a vacío el estado
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote(productId) {
    console.log(productId + ' was upvoted.');

    // map devuelve un nuevo array
    // como cada producto es un objeto, podemos usar object assign para crear
    // un nuevo producto
    const nextProducts = this.state.products.map(product => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1
        });
      } else {
        return product;
      }
    });

    this.setState({
      products: nextProducts
    });
  }

  render() {
    const products = this.state.products.sort((a, b) => b.votes - a.votes);

    const productComponents = this.state.products.map(product => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));

    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  constructor(props) {
    // react invoca primero a constructor pasandole los props que reciba el
    // componente, por eso podemos usarlos aqui
    // ademas el react tb bindea this a este constructor de forma que tengamos
    // acceso al this aqui también

    super(props);

    // creamos una función bindeada al this del componente
    // llamamos igual a la funcion pero la podriamos haber llamado de otra forma
    // por ejemplo this.handleUpVoteBinded
    // this.handleUpVote = this.handleUpVote.bind(this);  <-- normalmente se
    // sobreescribe la funcion con su version bindeada, pero para el ejemplo
    // vamos a cambiarle el nombre para que quede mas claro
    this.handleUpVoteBinded = this.handleUpVote.bind(this);
  }

  handleUpVote() {
    // aqui 'this' es null
    this.props.onVote(this.props.id);
  }

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVoteBinded}>
              <i className="large caret up icon" />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              className="ui avatar image"
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

// class Product extends React.Component {
//   render() {
//     return (<div className='item'>
//       <div className='image'>
//         <img src='images/products/image-aqua.png'/>
//       </div>
//       <div className='middle aligned content'>
//         <div className='description'>
//           <a>Fort Knight</a>
//           <p>Authentic renaissance actors, delivered in just two weeks.</p>
//         </div>
//         <div className='extra'>
//           <span>Submitted by:</span>
//           <img className='ui avatar image' src='images/avatars/daniel.jpg'/>
//         </div>
//       </div>
//     </div>)
//   }
// }

ReactDOM.render(<ProductList />, document.getElementById('content'));
