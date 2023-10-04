import React from 'react'
import { useState, useEffect } from 'react'
import GraficaRutasActivas from '../../viewsItems/graphs/GraficaRutasActivas'
import { useParams } from 'react-router'
import TableViajesActivos from '../../viewsItems/tables/TableViajesActivos'
import SpinnerMain from '../../viewsItems/SpinnerMain'
import { Accordion } from 'react-bootstrap';

export default function RutasActivas() {

  const { idDestino } = useParams()

  const [viajesActivos, setViajesActivos] = useState(null)

  useEffect(() => {



    const peticiones = async (id) => {
      const urlApiNextpack = '/trafico/get_viajeActivo/' + id;
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          /* setDestinosList(data) */
          if (data) {
            setViajesActivos(data.viajes_activos)

            //     Swal.fire(
            //   'Good job!',
            // 'Se recibio la informacion correctamente Nextpack',
            //'success'
            //) 

          }
        }).catch(
          () => console.log('Error al cargar los destinos')
        )
    }
    peticiones(idDestino)
    return()=>{
      setViajesActivos(null)
    };
  }, [idDestino]);

  if (viajesActivos != null) {
    return (
      <>
        <div className="col-12 col-md-12  p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <GraficaRutasActivas viajesList={viajesActivos}/>
            {
              viajesActivos && viajesActivos.map((ruta, index) => {
                let guias;
            
                if (ruta.catalogoGuias != null) {
                  
                  guias = ruta.catalogoGuias;
                  
                  return (
                    <Accordion key={index}>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          {ruta.nombre}
                        </Accordion.Header>
                        <Accordion.Body>
                          <TableViajesActivos
                            guias={guias}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                } else {
                  console.log("No hay viajes")
                  return (
                    <Accordion key={index}>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          {ruta.nombre}
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
  } else {
    return (
      <SpinnerMain />
    )
  }
}
