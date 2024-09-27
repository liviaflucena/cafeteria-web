import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ProdutoForm = () => {
  let [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    valor: '',
    imagemUrl: '',
  });

  const handleChangeFormData = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Título */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Título</Form.Label>
        <Form.Control
          onChange={handleChangeFormData}
          value={formData.titulo}
          type="text"
          placeholder="Digite o título"
          name="titulo"
        />
      </Form.Group>
      {/* Decrição */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descrição</Form.Label>
        <Form.Control
          onChange={handleChangeFormData}
          value={formData.descricao}
          type="text"
          placeholder="Digite a descrição"
          name="descricao"
        />
      </Form.Group>
      {/* Valor */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Valor</Form.Label>
        <Form.Control
          onChange={handleChangeFormData}
          value={formData.valor}
          type="text"
          placeholder="Digite o valor"
          name="valor"
        />
      </Form.Group>
      {/* Imagem */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Imagem</Form.Label>
        <Form.Control
          onChange={handleChangeFormData}
          value={formData.imagemUrl}
          type="text"
          placeholder="Digite o endereço da imagem."
          name="imagemUrl"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};

export default ProdutoForm;