import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from '../../components/Menu/Sidebar';
import logo from '../../assets/images/home.png';
import EventoService from "../../services/EventoService";
import { useEffect, useState } from "react";

const EventoLista = () => {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/eventoeditar');
    };

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        EventoService.findAll().then(
            (response) => {
                const eventos = response.data;
                setEventos(eventos);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const editar = (id) => {
        navigate(`/eventoeditar/` + id);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="p-3 w-100">
                <Header
                    goto={'/evento'}
                    title={'Lista de Eventos'}
                    logo={logo}
                />
                <section className="m-2 p-2 shadow-lg">
                    <div className="table-wrapper">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Vagas</th>
                                    <th scope="col">Horário</th>
                                    <th scope="col">Local</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Abrir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventos?.map((evento) => (
                                    <tr key={evento.id}>
                                        <td>{evento.id}</td>
                                        <td>{evento.nome}</td>
                                        <td>{evento.dataEvento}</td>
                                        <td>{evento.local}</td>
                                        <td>{evento.statusEvento}</td>
                                        <td>
                                            <button onClick={() => editar(evento.id)}
                                                className="btn btn-sm btn-warning rounded">
                                                <i className="bi bi-envelope-open"> Abrir</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default EventoLista;
