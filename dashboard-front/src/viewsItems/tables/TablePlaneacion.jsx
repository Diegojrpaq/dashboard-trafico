import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { Table } from 'react-bootstrap';
import { formattedNumber } from '../../utileria/utils';

export default function TablePlaneacion({ nombreRuta, guiasPlaneadas, guiasEmbarcadas }) {
  //Sumas para el apartado de totales de lo planeado
  const sumaVolumenPlaneado = guiasPlaneadas?.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.cotizacion_principal_volumen;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaPesoPlaneado = guiasPlaneadas?.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.cotizacion_principal_peso;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaFletePlaneado = guiasPlaneadas?.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.flete;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaMontoPlaneado = guiasPlaneadas?.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.monto_seguro;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);
  const sumaSubtotalPlaneado = guiasPlaneadas?.reduce((acumulador, elemento) => {
    const suma = acumulador + elemento.subtotal;
    const totalRedondeado = Number(suma.toFixed(2));
    return totalRedondeado;
  }, 0);

  //Suma para los totales de lo embarcado
  let sumaVolumenEmbarcado;
  let sumaPesoEmbarcado;
  let sumaFleteEmbarcado;
  let sumaMontoEmbarcado;
  let sumaSubtotalEmbarcado;
  if (guiasEmbarcadas != null) {
    sumaVolumenEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.volumen;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaPesoEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.peso;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaFleteEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.flete;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaMontoEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.monto_seguro;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
    sumaSubtotalEmbarcado = guiasEmbarcadas?.reduce((acumulador, elemento) => {
      const suma = acumulador + elemento.subtotal;
      const totalRedondeado = Number(suma.toFixed(2));
      return totalRedondeado;
    }, 0);
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover size='md'>
        <thead>
          <tr>
            <th></th>
            <th>Peso Planeado</th>
            <th>Volumen Planeado</th>
            <th>Flete Planeado</th>
            <th>Seguro</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Planeado</td>
            <td>{sumaPesoPlaneado} kg.</td>
            <td>{sumaVolumenPlaneado} mt3</td>
            <td>{formattedNumber(sumaFletePlaneado)}</td>
            <td>{formattedNumber(sumaMontoPlaneado)}</td>
            <td>{formattedNumber(sumaSubtotalPlaneado)}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th>Peso Embarcada</th>
            <th>Volumen Embarcada</th>
            <th>Flete Embarcada</th>
            <th>Seguro</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Embarcado</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : sumaPesoEmbarcado} kg.</td>
            <td>{guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : sumaVolumenEmbarcado} mt3</td>
            <td>$ {guiasEmbarcadas === null || guiasEmbarcadas === 0 ? 0 : formattedNumber(sumaFleteEmbarcado)}</td>
            <td>$ {guiasEmbarcadas === null ? 0 : formattedNumber(sumaMontoEmbarcado)}</td>
            <td>$ {guiasEmbarcadas === null ? 0 : formattedNumber(sumaSubtotalEmbarcado)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
