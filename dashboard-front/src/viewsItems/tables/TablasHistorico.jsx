import React from 'react'
import { Accordion } from 'react-bootstrap';
import TablaBitacora from './TablaBitacora'
import TablaHistoricoGuias from '../../viewsItems/tables/TablaHistoricoGuias';
import { guiasFilter } from '../../utileria/utils';

export default function TablasHistorico(props) {
    console.log(props.paradas, 'TablaHistorico')
    const guiasFiltradas = guiasFilter(props.info.catalogoGuias, 18, 8);
    console.log(guiasFiltradas, 'Filtro');
    
    const totalVolumen = (guiasFiltradas) => {
        const sumaVolumen = guiasFiltradas.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.volumen;
            const totalRedondeado = Number(suma.toFixed(2));
            return totalRedondeado;
        }, 0);
        return sumaVolumen;
    }

    const totalPeso = (guiasFiltradas) => {
        const sumaPeso = guiasFiltradas.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.peso;
            const totalRedondeado = Number(suma.toFixed(2));
            return totalRedondeado;
        }, 0);
        return sumaPeso;
    }

    return (
        <div>
            <Accordion className='mb-3'>
                <Accordion.Item>
                    <Accordion.Header>
                        <div className='container'>
                            <div className='row fs-5'>
                                Bitacora
                            </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <TablaBitacora info={props.info} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {
                props?.paradas.map((parada, index) => (
                    <Accordion key={index} className='mb-3'>
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <div className='container'>
                                    <div className="col fs-5 border-bottom border-dark mb-2" style={{width: "200px"}}>{parada.nombre}</div>
                                    <div className='row  p-1 mb-1 mt-1 fs-5'>
                                        <div className="col fs-5 text-success ">SUBIDO <i className="bi bi-arrow-right-square-fill mx-2"></i></div>
                                        <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Total guías: {guiasFilter(props.info.catalogoGuias, 17, parada.id).length}</div>
                                        <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Volumen: {totalVolumen(guiasFilter(props.info.catalogoGuias, 17, parada.id))}</div>
                                        <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Peso: {totalPeso(guiasFilter(props.info.catalogoGuias, 17, parada.id))}</div>
                                    </div>
                                    <div className='row p-1 mb-1 mt-1 fs-5'>
                                        <div className="col fs-5 text-danger">BAJADO <i className="bi bi-arrow-left-square-fill"></i></div>
                                        <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Total guías: {guiasFilter(props.info.catalogoGuias, 18, parada.id).length}</div>
                                        <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Volumen: {totalVolumen(guiasFilter(props.info.catalogoGuias, 18, parada.id))}</div>
                                        <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Peso: {totalPeso(guiasFilter(props.info.catalogoGuias, 18, parada.id))}</div>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <TablaHistoricoGuias guias={props.info.catalogoGuias} infoRuta={props.info}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            }
        </div>
    )
}
