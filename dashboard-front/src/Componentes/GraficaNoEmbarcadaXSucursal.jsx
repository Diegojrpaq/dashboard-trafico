import catalogoColores from '../Data/CatalogoColores.json'
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
import { dataLogisticContext } from '../App';

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



export default function GraficaRutas(props) {
   
      /*  const colorSinEmbarcar= 'rgb(230,1,15, .5)'
        const colorSinEmbarcarBorder= 'rgb(230,1,15)'
      const colorEspacioLibre='rgb(175,203,246,.2)'
        const colorEspacioLibreBorder='rgb(175,203,246)' */

        const colores = catalogoColores.colores;
        const coloresBorder = catalogoColores.coloresBorder;

    

    /* Variables de Estilo  */
   
    const Destino = props.destino;
    const labels= ['colli','Cruz del sur','Perisur']
    let myoptions = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                stacked: true ,
                beginAtZero: false, // Asegura que el eje X no empiece en 0
                min: 0, // Establece el mínimo del eje X en 100
                max: 50,
               
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
        labels: labels,
        datasets: [
            {
                label: "No Embarcado" ,
                data: [10, 20, 10],
                backgroundColor: colores[0].color,
                borderColor: coloresBorder[0].color,
                borderWidth: 2
            },
           
       ]
    }
    return (
        <>
            <Bar
                data={data}
                options={myoptions}
            />

        </>
    )
}
