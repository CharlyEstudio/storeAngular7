import { Component, OnInit } from '@angular/core';

// Servicios
import { DatosService, UsuarioServicesService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-edo-cta',
  templateUrl: './edo-cta.component.html',
  styles: []
})
export class EdoCtaComponent implements OnInit {

  logo: string;
  fecha: string;
  numero: string;
  nombre: string;
  idFerrum: number = 0;

  // Estado de Cuenta
  saldo: any[] = [];
  edocta: any[] = [];
  saldoTotal: number = 0;
  saldoVencido: number = 0;
  saldos: number = 0;
  proximoVenc: number;
  diasProximoVenc: number;

  preSaldo: number = 0;
  cargos: number = 0;
  abonos: number = 0;

  // Datos Modal
  factura: number = 0;
  fechaCreada: any = '';
  importeInicial: number = 0;
  saldoFactura: number = 0;
  pedido: any[] = [];
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  piezas: number = 0;
  error: boolean = false;
  sindato: boolean = false;
  sindatoFacVig: boolean = false;

  // Primera Fecha de Movimiento Obtenido de la Primera Factura Vigente
  firstDate: string;

  constructor(
    private _datoService: DatosService,
    private _usuarioService: UsuarioServicesService
  ) {
    this.logo = 'http://192.168.1.250/assets/img/logo-min.png';
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    const anio = h.getFullYear();

    this.fecha = anio + '-' + mes + '-' + dia;
    this.nombre = this._usuarioService.usuario.nombre;
    this.numero = this._usuarioService.usuario.numero;
    this.idFerrum = Number(this._usuarioService.usuario.idFerrum);
  }

  ngOnInit() {
    this.obtenerSaldo();
  }

  obtenerSaldo() {
    this._datoService.obtenerSaldo(this.fecha, this._usuarioService.usuario.numero).subscribe((saldo: any) => {
      if (saldo.status) {
        this.saldo = saldo.respuesta;
        this.firstDate = saldo.respuesta[0].feccap.substring(0, 10);
        this.proximoVenc = saldo.respuesta[0].folio;
        this.diasProximoVenc = saldo.respuesta[0].dias;

        for (let m = 0; m < saldo.respuesta.length; m++) {
          if (saldo.respuesta[m].vence < this.fecha) {
            this.saldoVencido += saldo.respuesta[m].saldo;
          }
          this.saldoTotal += saldo.respuesta[m].saldo;
        }

        this._datoService.obtenerFacturas(this._usuarioService.usuario.idFerrum, this.firstDate).subscribe( ( facturas: any ) => {

          if (facturas.status) {
            const edocta = facturas.respuesta;
            for (let i = 0; i < edocta.length; i++) {
              this.abonos += edocta[i].ABONO;

              if (edocta[i].SALDOFINAL !== 0) {
                this.saldos += edocta[i].SALDOFINAL;
              }

              const esFolio = (factura) => {
                return factura.FOLIO === edocta[i].FOLIO;
              };

              if (this.edocta.find(esFolio)) {
                let newSaldo;
                let cargo;
                if (edocta[i].TOTALGADO === edocta[i].TOTAL) {
                  newSaldo = (edocta[i].TOTAL - edocta[i].ABONO) - edocta[i].SALDO;
                } else {
                  if (edocta[i].ABONO < 0) {
                    newSaldo = edocta[i].SALDOFINAL + (-1 * edocta[i].ABONO);
                  } else {
                    newSaldo = edocta[i].SALDOFINAL;
                  }
                }

                if (this.edocta.find(esFolio).SALDO !== 0) {
                  cargo = this.edocta.find(esFolio).SALDO;
                } else {
                  if (edocta[i].ABONO < 0) {
                    cargo = 0;
                  } else {
                    cargo = edocta[i].CARGO;
                  }
                }

                const nuevo = [
                  {
                    'DOCID': edocta[i].DOCID,
                    'FECHA': '',
                    'FECHAPAG': edocta[i].FECHAPAG,
                    'FOLIO': '',
                    'SALDO': newSaldo,
                    'CARGO': cargo,
                    'ABONO': edocta[i].ABONO,
                    'RECIBO': edocta[i].RECIBO,
                    'TIPO': edocta[i].TIPO,
                    'FP': edocta[i].FP,
                    'NOTA': edocta[i].NOTA,
                    'TOTAL': edocta[i].TOTAL,
                    'TOTALPAGADO': edocta[i].TOTALPAGADO,
                    'SALDOFINAL': edocta[i].SALDOFINAL
                  }
                ];
                this.edocta.push(nuevo[0]);
              } else {
                this.edocta.push(edocta[i]);
              }
            }

            this.cargos = this.saldos + this.abonos;
            this.sindato = false;
            this.sindatoFacVig = false;
          } else {
            this.saldo = [];
            this.firstDate = this.fecha;
            this.sindato = true;
            this.sindatoFacVig = true;
          }
        });

      } else {
        this.sindatoFacVig = true;
        const h = new Date();
        let mes;

        if (h.getMonth() < 10) {
          mes = '0' + (h.getMonth() + 1);
        } else {
          mes = (h.getMonth() + 1);
        }

        const anio = h.getFullYear();

        this.firstDate = anio + '-' + mes + '-01';
        this.sindato = true;
        this._datoService.obtenerFacturas(this._usuarioService.usuario.idFerrum, this.firstDate).subscribe( ( facturas: any ) => {

          if (facturas.status) {
            const edocta = facturas.respuesta;
            for (let i = 0; i < edocta.length; i++) {
              this.abonos += edocta[i].ABONO;

              if (edocta[i].SALDOFINAL !== 0) {
                this.saldos += edocta[i].SALDOFINAL;
              }

              const esFolio = (factura) => {
                return factura.FOLIO === edocta[i].FOLIO;
              };

              if (this.edocta.find(esFolio)) {
                let newSaldo;
                let cargo;
                if (edocta[i].TOTALGADO === edocta[i].TOTAL) {
                  newSaldo = (edocta[i].TOTAL - edocta[i].ABONO) - edocta[i].SALDO;
                } else {
                  if (edocta[i].ABONO < 0) {
                    newSaldo = edocta[i].SALDOFINAL + (-1 * edocta[i].ABONO);
                  } else {
                    newSaldo = edocta[i].SALDOFINAL;
                  }
                }

                if (this.edocta.find(esFolio).SALDO !== 0) {
                  cargo = this.edocta.find(esFolio).SALDO;
                } else {
                  if (edocta[i].ABONO < 0) {
                    cargo = 0;
                  } else {
                    cargo = edocta[i].CARGO;
                  }
                }

                const nuevo = [
                  {
                    'DOCID': edocta[i].DOCID,
                    'FECHA': '',
                    'FECHAPAG': edocta[i].FECHAPAG,
                    'FOLIO': '',
                    'SALDO': newSaldo,
                    'CARGO': cargo,
                    'ABONO': edocta[i].ABONO,
                    'RECIBO': edocta[i].RECIBO,
                    'TIPO': edocta[i].TIPO,
                    'FP': edocta[i].FP,
                    'NOTA': edocta[i].NOTA,
                    'TOTAL': edocta[i].TOTAL,
                    'TOTALPAGADO': edocta[i].TOTALPAGADO,
                    'SALDOFINAL': edocta[i].SALDOFINAL
                  }
                ];
                this.edocta.push(nuevo[0]);
              } else {
                this.edocta.push(edocta[i]);
              }
            }

            this.cargos = this.saldos + this.abonos;
            this.sindato = false;
          } else {
            this.saldo = [];
            this.firstDate = this.fecha;
            this.sindato = true;
          }
        });
      }
    });
  }

  modalFolio(factura: any, numero: any) {
    this.factura = 0;
    this.fechaCreada = '';
    this.importeInicial = 0;
    this.saldoFactura = 0;
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.piezas = 0;
    this.pedido = [];

    if (numero === 0) {
      this.factura = factura.folio;
      this.fechaCreada = factura.feccap;
      this.importeInicial = factura.importe;
      this.saldoFactura = factura.saldo;

      this._datoService.obtenerProductos(this.factura).subscribe((pedido: any) => {
        if (pedido.status) {
          this.pedido = pedido.respuesta;
          for (let i = 0; i < this.pedido.length; i++) {
              this.subtotal += this.pedido[i].SUBTOTAL;
              this.iva += this.pedido[i].IVA;
              this.total += this.pedido[i].TOTAL;
              this.piezas += this.pedido[i].UNIDAD;
          }
          this.error = false;
        } else {
          this.error = true;
        }
      });
    } else if (numero === 1) {
      this.error = true;
      console.log(factura, numero);
    } else if (numero === 2) {
      this.factura = factura.FOLIO;
      this.fechaCreada = factura.FECHA;
      this.importeInicial = factura.TOTAL;
      this.saldoFactura = factura.SALDO;

      this._datoService.obtenerProductos(this.factura).subscribe((pedido: any) => {
        if (pedido.status) {
          this.pedido = pedido.respuesta;
          for (let i = 0; i < this.pedido.length; i++) {
              this.subtotal += this.pedido[i].SUBTOTAL;
              this.iva += this.pedido[i].IVA;
              this.total += this.pedido[i].TOTAL;
              this.piezas += this.pedido[i].UNIDAD;
          }
          this.error = false;
        } else {
          this.error = true;
        }
      });
    }
  }

}
