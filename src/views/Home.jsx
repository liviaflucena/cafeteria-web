import { useState } from 'react';
import itens from '../datasets/Carrosel';
import produtosDataSet from '../datasets/Produto';
import Carrosel from '../components/Carrosel';
import ComprasCard from '../components/ComprasCard';

const Home = () => {
  let [produtos, setProdutos] = useState([...produtosDataSet]);

  return (
    <>
      <Carrosel itens={itens} />
      <ComprasCard produtos={produtos}></ComprasCard>
    </>
  );
};

export default Home;