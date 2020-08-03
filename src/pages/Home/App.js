import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import categoriasRepository from '../../repositories/categorias'

// import dadosIniciais from '../../data/dados_iniciais.json';

function Home() {

  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos)
      })
      .catch((err) => {
        console.log(err.message)
      });
  }, []);

  // http://localhost:8080/categorias?_embed=videos

  return (
    <PageDefault paddingAll={0}>

      {dadosIniciais.length === 0 && (<div>Loading...</div>)}

      {dadosIniciais.map((categoria, indice) =>{
        if (indice === 0) {
          return (
            <div key={categoria.id}>
              <BannerMain 
                videoTitle={dadosIniciais[0].videos[0].titulo} 
                url={dadosIniciais[0].videos[0].url} 
                videoDescription={"As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial..."} 
              /> 
              <Carousel 
                ignoreFirstVideo 
                category={dadosIniciais[0]} 
              /> 
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      
      })}

      {/*
      <Carousel 
        category={dadosIniciais.categorias[1]} /> 
      <Carousel 
        category={dadosIniciais.categorias[2]} /> 
      <Carousel 
        category={dadosIniciais.categorias[3]} /> 
      <Carousel 
        category={dadosIniciais.categorias[4]} /> 
      <Carousel 
      category={dadosIniciais.categorias[5]} /> */}

    </PageDefault>
  );
};

export default Home;
