import { Button, Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ComprasCard = ({ produtos = [] }) => {
  return (
    <Row className="p-2">
      {produtos.map((produto, i) => {
        return (
          <Col key={i}>
            <Card>
              <Card.Img variant="top" src={produto.imagemUrl} />
              <Card.Body>
                <Card.Title>{produto.titulo}</Card.Title>
                <Card.Text>{produto.descricao}</Card.Text>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

ComprasCard.propTypes = {
  produtos: PropTypes.array,
};

export default ComprasCard;