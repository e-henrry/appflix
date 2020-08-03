import React, { useState, useEffect } from 'react'
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'

function CadastroCategoria(){
    const valoresIniciais = {
        nome: 'Categoria Inicial',
        descricao: 'Descrição Inicial',
        cor: '#bbb',
    }

    const { handleChange, values, clearForm }= useForm(valoresIniciais);

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        const URL = window.location.hostname.includes('localhost') 
            ? 'http://localhost:8080/categorias'
            : 'https://appflixproject.herokuapp.com/categorias';
        fetch(URL)
            .then(async (respostaDoServidor) => {
                const resposta = await respostaDoServidor.json();
                setCategorias([
                    ...resposta,
                ]);
            })
        /*setTimeout(() => {
            setCategorias([
                ...categorias,
                {
                  "id": "1",
                  "nome": "Filmes",
                  "descrição": "Primeira categoria",
                  "cor": "#CBD1FF"
                },
                {
                  "id": "2",
                  "nome": "Jogos",
                  "descrição": "Segunda categoria",
                  "cor": "#CBD1FF"
                }
            ]);
        }, 4 * 1000);*/
    }, []);

    return(
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>
            <form onSubmit={function handleSubmit(infosDoEvento){
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                clearForm();
            }}>
                <FormField 
                    label = "Nome da Categoria"
                    type = "text"
                    name = "nome"
                    value = {values.nome}
                    onChange = {handleChange}
                />

                <FormField 
                    label = "Descrição"
                    type = "textarea"
                    name = "descricao"
                    value = {values.descricao}
                    onChange = {handleChange}
                />

                <FormField 
                    label = "Cor"
                    type = "color"
                    name = "cor"
                    value = {values.cor}
                    onChange = {handleChange}
                />
                
                <Button>
                    Cadastrar
                </Button>

            </form>

            {categorias.lenght === 0 &&  
                <div>
                    Loading...
                </div>
            }

            <ul>
                {categorias.map((categoria) =>{
                    return (
                        <li key={`${categoria.titulo}`}>
                            {categoria.titulo}
                        </li>
                    )
                })}
            </ul>
            <Link to="/">
                Ir para Home
            </Link>
        </PageDefault>
    )
  }

export default CadastroCategoria;
