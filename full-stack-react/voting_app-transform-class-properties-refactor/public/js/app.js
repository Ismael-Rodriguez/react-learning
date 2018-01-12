class ProductList extends React.Component {
  // con transform class properties no necesitamos declarar el state en el
  // controler
  state = {
    products: []
  };

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  handleProductUpVote = productId => {
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
  };

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
  // con esta propiedad transform-class-properties no hace falta bindear el
  // metodo en el controlador
  // al declararse con una arrow function comparte el ambito del resto de la
  // clase y no crea un scope propio como sería el caso de una function
  handleUpVote = () => this.props.onVote(this.props.id);

  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a onClick={this.handleUpVote}>
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
