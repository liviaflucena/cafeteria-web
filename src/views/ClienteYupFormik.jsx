import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ClientesTable from '../components/ClientesTable';

const ClienteYupFormik = () => {
  
  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(3, 'Nome muito curto').max(50, 'Nome muito longo').required('Nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    nascimento: Yup.date().required('Data de nascimento é obrigatória'),
    cep: Yup.string().matches(/^\d{5}-\d{3}$/, 'CEP inválido').required('CEP é obrigatório'),
  });

  const [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const formDataClientes = {
    nome: '',
    email: '',
    nascimento: '',
    cep: '',
  };

  useEffect(() => {
    console.log('Carregando clientes!');
    fetch('http://localhost:3000/clientes', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setClientes(data); // use o array diretamente
      })
      .catch((error) => {
        console.log('Erro ao carregar clientes', error);
      });
  }, []);

  const handleSubmit = (values) => {
    let novoCliente = { ...values };

    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      body: JSON.stringify(novoCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Certifique-se de que a resposta é convertida para JSON
      .then((data) => {
        console.log('Cliente cadastrado com sucesso!', data);
        setClientes([...clientes, data]); // Adiciona o cliente cadastrado à lista
        setShow(false); 
      })
      .catch((error) => {
        console.log('Erro ao cadastrar cliente!', error);
      });
  };

  const formik = useFormik({
    initialValues: formDataClientes,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

      <ClientesTable clientes={clientes}></ClientesTable>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite o nome"
                name="nome"
                value={formik.values.nome} // Adiciona o valor atual do campo
              />
              <span>{formik.errors.nome}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite o email"
                name="email"
                value={formik.values.email} // Adiciona o valor atual do campo
              />
              <span>{formik.errors.email}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="date"
                placeholder="Digite a data de nascimento"
                name="nascimento" // Corrigido para "nascimento"
                value={formik.values.nascimento} // Adiciona o valor atual do campo
              />
              <span>{formik.errors.nascimento}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                placeholder="Digite o CEP."
                name="cep" // Corrigido para "cep"
                value={formik.values.cep} // Adiciona o valor atual do campo
              />
              <span>{formik.errors.cep}</span>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShow} type="button">
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ClienteYupFormik;
