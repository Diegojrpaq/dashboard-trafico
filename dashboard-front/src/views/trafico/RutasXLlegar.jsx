import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router'
import GraficaRutasXLlegar from '../../viewsItems/graphs/GraficaRutasXLlegar'
import TableViajesActivos from '../../viewsItems/tables/TableViajesActivos'
import TableRutaXLlegar from '../../viewsItems/tables/TableRutaXLlegar'
import SpinnerMain from '../../viewsItems/SpinnerMain'
import { Accordion } from 'react-bootstrap';
import { ConvertirFecha } from '../../utileria/utils'
import { diferenciaFechas } from '../../utileria/utils'
import { urlapi } from '../../utileria/config'
import { limpiado_de_viajes } from '../../utileria/utils'

export default function RutasXLlegar() {

  const { idDestino } = useParams()
  const[ viajesList, setViajesList]= useState(null)

  useEffect(() => {
    const peticiones = async (id) => {
      const urlApiNextpack =urlapi + '/trafico/get_viajesxllegar/' + idDestino;
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          if (data) {
            if(data.viajes_activos!=null){
            setViajesList(limpiado_de_viajes(data.viajes_activos, idDestino)) 
           //codigo si llego la info 
            } else {
              setViajesList([])
            }
          }
         
        }).catch(
          () => console.log('Error al cargar los destinos')
        )
    }
    peticiones(idDestino)
    return () => {
      setViajesList(null)
    };
  }, [idDestino]);

if(viajesList !=null){
  if(viajesList.length>0){
    return (
      <>
       <div className="col-12 col-md-12  p-1">
            <div className="col-item shadow p-3 mb-4 mx-0 rounded">
         <GraficaRutasXLlegar viajesList={viajesList} idDestino={idDestino}/>
         {
                viajesList && viajesList.map((ruta, index) => {
                  let guias;
                  const totalGuias = ruta.catalogoGuias?.length
                  const fecha = ConvertirFecha(ruta.fecha_registro)
                  const infoRuta = {
                    nombreRuta: ruta.nombre,
                    fecha: fecha,
                  }
                  if (ruta.catalogoGuias != null) {
                    guias = ruta.catalogoGuias;
                    return (
                      <Accordion key={index}>
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            <div className='container'>
                              <div className='row'>
                                <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>{ruta.nombre}</div>
                                <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Vehículo: {ruta.Clave_vehiculo}</div>
                                <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Fecha: {fecha}</div>
                                <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Total guías: {totalGuias}</div>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <TableViajesActivos
                              guias={guias}
                              infoRuta={infoRuta}
                            />
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    )
                  } else {
                    return (
                      <Accordion key={index}>
                        <Accordion.Item eventKey={index}>
                          <Accordion.Header>
                            <div className='container'>
                              <div className='row'>
                                <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>{ruta.nombre}</div>
                                <div className='col'>Vehículo: {ruta.Clave_vehiculo}</div>
                                <div className='col'>Fecha: {fecha}</div>
                                <div className='col'>Total guías: 0</div>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body>
                            <h6>No hay guías en este viaje</h6>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    )
                  }
                })
              }
                </div>
          </div>
      </>
     )
  }
  else{
    return(
      <>
      <h1 className='text-black'>No existen viajes para mostrar</h1>
      </>
    )
    }
}else{
  return (
    <SpinnerMain/>
  )
}
}
