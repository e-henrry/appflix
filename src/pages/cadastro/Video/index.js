import React, { useEffect, useState } from 'react'
import PageDefault from '../../../components/PageDefault'
import { Link, useHistory } from 'react-router-dom'
import FormField from '../../../components/FormField'
import Button from '../../../components/Button'
import useForm from '../../../hooks/useForm'
import videosRepository from '../../../repositories/videos'
import categoriasRepository from '../../../repositories/categorias'

function CadastroVideo(){

    const history = useHistory();
    const [ categorias, setCategorias ] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    const { handleChange, values } = useForm({
        titulo: 'Título do Video',
        url: 'https://www.youtube.com/watch?v=BuvJZGLclAU',
        categoria: 'Filmes',
    });

    useEffect(() => {
        categoriasRepository
        .getAll()
        .then((categoriasFromServer) => {
            setCategorias(categoriasFromServer);
        });
    }, []);

    return(
        <PageDefault>
            <h1>Página de Cadastro de Video</h1>

        <form onSubmit={(event) => {
            event.preventDefault();
            // alert('Video Cadastrado com sucesso!!!1!');

            const categoriaEscolhida = categorias.find((categoria) => {
                return categoria.titulo === values.categoria;
            });

            console.log('Categoria Escolhida', categoriaEscolhida)

            videosRepository.create({
                titulo: values.titulo,
                url: values.url,
                categoriaId: categoriaEscolhida.id,
            })
            .then(() => {
                console.log('Cadastrou com sucesso')
                history.push('/')
            });
        }}
        >
            <FormField 
                label="Título do Vídeo"
                name="titulo"
                value = {values.titulo}
                onChange = {handleChange}
            />
            <FormField 
                label="URL"
                name="url"
                value = {values.url}
                onChange = {handleChange}
            />
            <FormField 
                label="Categoria"
                name="categoria"
                value = {values.categoria}
                onChange = {handleChange}
                suggestions = {categoryTitles}
            />

            <Button type="submit">
                Cadastrar
            </Button>

        </form>

            <Link to="/cadastro/categoria">
                Cadastrar Categoria
            </Link>
        </PageDefault>
    )
  }

export default CadastroVideo;
