import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Row } from "components/Bootstrap"


const Switcher = ({
                      title = '[title]',
                      id = '[id]',
                      isOn = false,
                      isLoading = false,
                      onSwitch
                  }) => (
  <label style={{
      opacity: isLoading ? 0.3 : 1,
      display: 'block',
      marginBottom: 10
  }}>
      <input
        className="mr-1"
        type="checkbox"
        checked={isOn}
        onChange={onSwitch}/>
      {isLoading ? 'Загрузка...' : title}
  </label>
)


class ProductsList extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.setState({
            products: this.props.products
        })
    }


    handleProductPublicChange = (id, boolValue) => {
        this.setState(({ products }) => products.map(product =>
          product.public = product.id === id ? '' : product.public
        ))

        this.props.updateProductPublic(id, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ products }) => products.map(product =>
                    product.public = product.id === id ? res.result.public : product.public
                  ))
              }, 500)
          })
    }

    updatePropInProductSizeOfProduct = (product, productSizeId, propName = '', value = '') => {
        const sizes = product.sizes.map(size =>
          size[propName] = size.id === productSizeId ? value : size[propName]
        )

        return {
            ...product,
            sizes
        }
    }


    handlePruductSizePublicChange = (productId, sizeId, boolValue) => {
        this.setState(({ products }) => products.map(product =>
          product.id === productId ?
            this.updatePropInProductSizeOfProduct(product, sizeId, 'public') : product
        ))

        this.props.updateProductSizePublic(sizeId, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ products }) => products.map(product =>
                    product.id === productId ?
                      this.updatePropInProductSizeOfProduct(product, sizeId, 'public', res.result.public) : product
                  ))
              }, 500)
          })
    }

    handleProductSizeFastChange = (productId, sizeId, boolValue) => {
        this.setState(({ products }) => products.map(product =>
          product.id === productId ?
            this.updatePropInProductSizeOfProduct(product, sizeId, 'fast') : product
        ))

        this.props.updateProductSizeFast(sizeId, boolValue)
          .then(res => {
              setTimeout(() => {
                  this.setState(({ products }) => products.map(product =>
                    product.id === productId ?
                      this.updatePropInProductSizeOfProduct(product, sizeId, 'fast', res.result.fast) : product
                  ))
              }, 500)
          })
    }


    render() {
        const { products } = this.state

        const productsRender = products.map(product => (
          <div key={product.id} className="col-md-12 mb-4">
              <div className="row">
                  <div className="col-md-2">
                      <img style={{ width: '100%' }}
                           src={product.sizes[0].images[0]}
                           alt=""/>
                  </div>
                  <div className="col-md-10 pl-1">
                      <Link to={`/cmslite/products/${product.id}`}>
                          {product.title}</Link>
                      <p><b>ID: {product.id}</b></p>

                      <Switcher
                        title="Опубликовано"
                        id={`public-${product.id}`}
                        isOn={product.public}
                        isLoading={product.public === ''}
                        onSwitch={() => this.handleProductPublicChange(product.id, !product.public)}/>
                      <br/>

                      {product.sizes.map(size =>
                        <Row key={size.id}>
                            <div className="col-md-2">
                                <Switcher
                                  title={size.title}
                                  isOn={size.public}
                                  isLoading={size.public === ''}
                                  onSwitch={() => this.handlePruductSizePublicChange(product.id, size.id, !size.public)}/>
                            </div>
                            <div className="col-md-4">
                                <Switcher
                                  title="Готовый букет"
                                  isOn={size.fast}
                                  isLoading={size.fast === ''}
                                  onSwitch={() => this.handleProductSizeFastChange(product.id, size.id, !size.fast)}/>
                            </div>
                        </Row>
                      )}
                  </div>
              </div>
          </div>
        ))

        return (
          <div className="row">
              <Link to="/cmslite/add-product">Добавить букет</Link>
              <br/><br/>
              {productsRender}
          </div>
        )
    }
}

export default ProductsList