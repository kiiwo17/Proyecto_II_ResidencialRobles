// Datos iniciales de cuotas y transacciones para Residencial Los Robles (HU-01)
export const initialFinanzasData = {
  resumen: {
    saldoPendiente: 1500.00,
    ultimoPago: {
      monto: 1500.00,
      fecha: '01/09/2026',
      concepto: 'Mantenimiento Septiembre 2026',
      folio: 'PAG-1024'
    },
    cuotaOrdinaria: {
      monto: 1500.00,
      periodo: 'Mensual',
      diaLimite: 'Día 10 de cada mes'
    }
  },
  movimientos: [
    {
      id: 'mov-1',
      folio: 'CUO-2026-10',
      concepto: 'Mantenimiento Ordinario Octubre 2026',
      categoria: 'Mantenimiento',
      fechaLimite: '10/10/2026',
      fechaEmision: '01/10/2026',
      monto: 1500.00,
      estado: 'Pendiente', // 'Pagado' | 'Pendiente' | 'En Revisión'
      comprobante: null,
      comentarios: 'Incluye vigilancia 24/7, alumbrado y recolección de basura.'
    },
    {
      id: 'mov-2',
      folio: 'PAG-1025',
      concepto: 'Cuota Extraordinaria: Reparación Portón Principal',
      categoria: 'Seguridad',
      fechaLimite: '15/09/2026',
      fechaEmision: '01/09/2026',
      monto: 450.00,
      estado: 'En Revisión',
      comprobante: {
        nombre: 'transferencia_spei_450.pdf',
        fechaSubida: '04/09/2026 14:32',
        referencia: 'BBVA-908123',
        nota: 'Pago transferido desde cuenta Banorte del Lote 42.'
      },
      comentarios: 'Revisión por comité de administración en menos de 24h hábiles.'
    },
    {
      id: 'mov-3',
      folio: 'PAG-1024',
      concepto: 'Mantenimiento Ordinario Septiembre 2026',
      categoria: 'Mantenimiento',
      fechaLimite: '10/09/2026',
      fechaEmision: '01/09/2026',
      monto: 1500.00,
      estado: 'Pagado',
      comprobante: {
        nombre: 'recibo_oficial_pag1024.pdf',
        fechaSubida: '01/09/2026 10:15',
        referencia: 'SPEI-771239',
        nota: 'Validado por tesorería.'
      },
      comentarios: 'Pago cubierto en tiempo y forma con recibo fiscal emitido.'
    },
    {
      id: 'mov-4',
      folio: 'PAG-0982',
      concepto: 'Tag de Acceso Vehicular Adicional (2 unidades)',
      categoria: 'Acceso',
      fechaLimite: '20/08/2026',
      fechaEmision: '15/08/2026',
      monto: 600.00,
      estado: 'Pagado',
      comprobante: {
        nombre: 'comprobante_tags.jpg',
        fechaSubida: '16/08/2026 18:40',
        referencia: 'OX-331290',
        nota: 'Entregados y programados en caseta de vigilancia.'
      },
      comentarios: 'Dispositivos activados para portón oriente y poniente.'
    },
    {
      id: 'mov-5',
      folio: 'PAG-0899',
      concepto: 'Mantenimiento Ordinario Agosto 2026',
      categoria: 'Mantenimiento',
      fechaLimite: '10/08/2026',
      fechaEmision: '01/08/2026',
      monto: 1500.00,
      estado: 'Pagado',
      comprobante: {
        nombre: 'recibo_agosto_pag0899.pdf',
        fechaSubida: '02/08/2026 09:20',
        referencia: 'SPEI-556102',
        nota: 'Aprobado oportunamente.'
      },
      comentarios: 'Mantenimiento mensual sin adeudos pendientes.'
    }
  ]
};
