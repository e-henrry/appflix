import React, { useState, useEffect } from 'react'
import PageDefault from '../../../components/PageDefault'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'

function CadastroCategoria(){
    const valoresIniciais = {
        nome: 'Categoria Inicial',
        descricao: 'Descrição Inicial',
        cor: '#bbb',
    }
    const [categorias, setCategorias] = useState([])
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor){
        setValues({
            ...values,
            [chave]: valor, // nome: 'valor
        })
    }

    function handleChange(infosDoEvento){
        setValue(
            infosDoEvento.target.getAttribute('name'), 
            infosDoEvento.target.value
        );
    }



    useEffect(() => {
        const URL = 'http://localhost:8080/categorias';
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

                setValues(valoresIniciais)
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
                        <li key={`${categoria.nome}`}>
                            {categoria.nome}
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
