import catalogoColores from '../../Data/CatalogoColores.json'
import { Bar } from 'react-chartjs-2';
import React from 'react';
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,

} from 'chart.js';

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function formatearFecha(fechaSinFormato) {
    const año = fechaSinFormato.slice(0, 4);
    const mes = fechaSinFormato.slice(4, 6);
    const día = fechaSinFormato.slice(6, 8);
    
    return `${día}/${mes}/${año}`;
  }


export default function GraficaRutasActivas(props) {
    /* Variables de Estilo  */
    const  viajeList= props.viajesList
    const colorEspacioLibre = catalogoColores.colores[100].color;
    const colorEspacioLibreBorder = catalogoColores.coloresBorder[100].color;
    const colorChillout = catalogoColores.colores[101].color;
    const colorChilloutBorder = catalogoColores.coloresBorder[101].color;
    const colores = catalogoColores.colores
    const coloresBorder = catalogoColores.coloresBorder;
    /* Variables de Estilo fin */
   

    /* seccion de return  */
    if ( viajeList !== null) {
        const labelRutas = [];
        const capacidadesCarga = [];
        const metrosLibres = [];
        let cantiMaydeViajesActivos = 0;
        let label = [];

        viajeList.map((viaje, index) => {
            const mt3_embarcados= viaje.catalogoGuias.reduce((total, guia)=> total + guia.volumen,0 )
            /* labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3"; */
           /*  labelRutas[index] = viaje.nombre+ " " + viaje.capacidad_mt3+" Mt3 "+ viaje.fecha_registro; */
           label.push(viaje.nombre)
           label.push(formatearFecha(viaje.fecha_registro))
           label.push(viaje.Clave_vehiculo)
           labelRutas.push(label) 
           label = [];
            capacidadesCarga.push(viaje.Volumen_carga_maxima)
            metrosLibres.push(viaje.Volumen_carga_maxima - mt3_embarcados)
        })

        const ConstruirEjeY = () => {
            const dataSetConstruido = [];
            const labelsDestinos=[];
            let dataEjeY = [];
            dataSetConstruido.push({
                label: "Espacio libre del Contenedor",
                data: metrosLibres,
                backgroundColor: colorEspacioLibre,
                borderColor: colorEspacioLibreBorder,
                borderWidth: 2
            })
          
        
            return dataSetConstruido;

        }
        const maximoEjeX = 10 + Math.max(...capacidadesCarga)

        let myoptions = {
            responsive: true,
            maintainAspectRatio: false,
            animation: true,
            autoSkip: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    stacked: true,
                    beginAtZero: false, // Asegura que el eje X no empiece en 0
                    min: 0, // Establece el mínimo del eje X en 100
                    max: maximoEjeX,

                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                },
            },
            indexAxis: 'y',
        };

        let data = {
            labels: labelRutas,
            datasets: ConstruirEjeY()
        }


        return (
            <>
                <div className="container-graph">
                <Bar
                    data={data}
                    options={myoptions}
                />
                </div>

            </>
        )
    } else {
        return <h4>No existen viajes el dia de hoy y activos para este Origen, porfavor activa un viaje</h4>
    }
    /* seccion de return fim */
}
/* [
                {
                    label: "Espacio libre del Contenedor",
                    data: metrosLibres,
                    backgroundColor: colorEspacioLibre,
                    borderColor: colorEspacioLibreBorder,
                    borderWidth: 2
                },
                {
                    label: 'Embarcado',
                    data: null,
                    backgroundColor: colorChillout,
                    borderColor: colorChilloutBorder,
                    borderWidth: 2
                },
    
            ] */