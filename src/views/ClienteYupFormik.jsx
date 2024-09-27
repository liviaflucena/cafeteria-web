import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ClienteYupFormik = () => {
  // Validação dos campos do formulário
  const schema = Yup.object().shape({
    nome: Yup.string().trim().min(3, 'Nome muito curto').max(50, 'Nome muito longo').required('Nome é obrigatório'),
    email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    nascimento: Yup.date().required('Data de nascimento é obrigatória'),
    cep: Yup.string().matches(/^\d{5}-\d{3}$/, 'CEP inválido').required('CEP é obrigatório'),
  });

  let [clientes, setClientes] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  let formData = {
    nome: '',
    email: '',
    nascimento: '',
    cep: '',
  };

  // Carrega a lista de clientes ao montar o componente
  useEffect(() => {
    console.log('Carregando clientes!');
    fetch('http://localhost:3000/clientes', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setClientes([...data]);
      })
      .catch((error) => {
        console.log('Erro ao carregar clientes', error);
      });
  }, []);

  // Função para manipular o envio dos dados
  const handleSubmit = (values) => {
    let novoCliente = { ...values };

    // Envia os dados para o backend
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      body: JSON.stringify(novoCliente),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('Cliente cadastrado com sucesso!');
        setClientes([...clientes, novoCliente]);
        setShow(false); // Fecha o modal
      })
      .catch((error) => {
        console.log('Erro ao cadastrar cliente!', error);
      });
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Button className="m-2" variant="primary" onClick={handleShow}>
        Adicionar Cliente
      </Button>

      <ClienteTable clientes={clientes}></ClienteTable>

      {/* Modal para adicionar cliente */}
      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Cliente</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {/* Nome */}
            <Form.Group className="mb-3" controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                name="nome"
                onChange={formik.handleChange}
                value={formik.values.nome}
                isInvalid={formik.touched.nome && formik.errors.nome}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.nome}</Form.Control.Feedback>
            </Form.Group>

            {/* E-mail */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite o e-mail"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
            </Form.Group>

            {/* Data de nascimento */}
            <Form.Group className="mb-3" controlId="formNascimento">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="nascimento"
                onChange={formik.handleChange}
                value={formik.values.nascimento}
                isInvalid={formik.touched.nascimento && formik.errors.nascimento}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.nascimento}</Form.Control.Feedback>
            </Form.Group>

            {/* CEP */}
            <Form.Group className="mb-3" controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o CEP"
                name="cep"
                onChange={formik.handleChange}
                value={formik.values.cep}
                isInvalid={formik.touched.cep && formik.errors.cep}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.cep}</Form.Control.Feedback>
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
};

export default ClienteYupFormik;
