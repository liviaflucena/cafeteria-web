import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

const ClientesTable = ({ clientes = [] }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Nascimento</th>
          <th>CEP</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente, i) => {
          return (
            <tr key={i}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.nascimento}</td>
              <td>{cliente.cep}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ClientesTable.propTypes = {
  clientes: PropTypes.array,
};

export default ClientesTable;
