import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
//Mis constantes
import { BASE_PATH } from '../../utils/constants';

import './Product.scss';

export default function Product(props){

    const { product, addProductCart } = props;

    return(
        <Col xs={3} className="product">
            <Card>
                <Card.Img variant="top" src={`${BASE_PATH}/${product.image}`} /> {/*BasePath es por si cambiamos el url de nuestra página, sin él se siguen renderizando bien las imágenes */}
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                </Card.Body>
                <Card.Text>{product.extraInfo}</Card.Text>
                <Card.Text>{product.price.toFixed(2)} S/ por Unidad</Card.Text>
                <Button onClick={() => addProductCart(product.id, product.name)}>
                    Añadir al carrito
                </Button>
            </Card>
        </Col>
    );
}