# 🏡 Sistema Único de Información - Residencial Los Robles

<div align="center">

![Universidad de Guadalajara](https://img.shields.io/badge/UDG_Virtual-Licenciatura_en_Desarrollo_Web-003B5C?style=for-the-badge&logo=academia&logoColor=white)
![Materia](https://img.shields.io/badge/Materia-Proyecto_II-16a34a?style=for-the-badge)
![Metodología](https://img.shields.io/badge/Metodología-Scrum_/_Agile-blue?style=for-the-badge&logo=scrumalliance&logoColor=white)
![Estado](https://img.shields.io/badge/Sprint_1_Review-Completado_%E2%9C%85-success?style=for-the-badge)

<p align="center">
  <strong>Plataforma web integral para la administración condominal, transparencia financiera y participación ciudadana vecinal.</strong>
</p>

<p align="center">
  <em>Proyecto Integrador de la Licenciatura en Desarrollo Web • Universidad de Guadalajara (UDG+)</em>
</p>

<p align="center">
  <a href="#-presentación-institucional">Presentación</a> •
  <a href="#-descripción-del-proyecto">Descripción</a> •
  <a href="#-product-backlog-e-historias-de-usuario">Historias de Usuario</a> •
  <a href="#-ajustes-técnicos-sprint-1-review">Ajustes Técnicos</a> •
  <a href="#-stack-tecnológico">Tecnologías</a> •
  <a href="#-credenciales-de-prueba-demo">Credenciales</a> •
  <a href="#-estructura-del-proyecto">Estructura</a> •
  <a href="#-instalación-y-despliegue">Instalación</a>
</p>

</div>

---

## 🎓 Presentación Institucional

| Información Académica | Detalle |
| :--- | :--- |
| **Institución:** | Universidad de Guadalajara (UDG Virtual / UDG+) |
| **Programa Académico:** | Licenciatura en Desarrollo Web |
| **Unidad de Aprendizaje:** | Proyecto II |
| **Proyecto:** | Sistema Único de Información (SUI) - Residencial Los Robles |
| **Metodología de Gestión:** | Scrum Framework & Kanban (Gestión en Jira Software y GitHub) |
| **Etapa / Ciclo:** | Incremento Entregable del Sprint 1 (Sprint 1 Review) |

---

## 📋 Descripción del Proyecto

El **Sistema Único de Información (SUI) - Residencial Los Robles** es una solución digital concebida para optimizar los canales de comunicación, el control financiero y la gobernanza vecinal del fraccionamiento residencial.

La plataforma centraliza las operaciones clave entre los **colonos**, la **Mesa Directiva / Administración Central** y el **personal de mantenimiento**, eliminando barreras operativas mediante una interfaz moderna, accesible y orientada a la filosofía *Mobile-First*.

### Objetivos Clave
1. **Transparencia Financiera:** Visualización clara de cuotas ordinarias, saldos vigentes, estados de cuenta y comprobantes bancarios digitales.
2. **Participación Democrática:** Sistema de consultas y votaciones ponderadas bajo la regla condominal de un voto por inmueble/lote.
3. **Gestión Comunitaria de Incidencias:** Levantamiento ágil de reportes de mantenimiento, seguridad y alumbrado con registro de evidencia fotográfica.
4. **Seguridad y Control de Acceso:** Autenticación por roles con vistas contextualizadas según el perfil de usuario.

---

## 🎯 Product Backlog e Historias de Usuario

Alineado al marco de trabajo **Scrum**, el alcance funcional del proyecto se estructura en el siguiente *Product Backlog*:

| Código | Historia de Usuario | Alcance y Criterios de Aceptación | Estado del Incremento |
| :---: | :--- | :--- | :---: |
| **HU-01** | **Estados de Cuenta y Validación de Pagos** | Consulta reactiva de cuotas ordinarias y extraordinarias, resumen de saldos pendientes y flujo de subida de comprobantes bancarios para validación en menos de 24 horas. | `Completado (Sprint 1)` |
| **HU-04** | **Autenticación y Seguridad por Roles** | Formulario de acceso con control de credenciales, roles diferenciados (**Colono** y **Admin**) y protección automática de rutas para usuarios no autenticados. | `Completado (Sprint 1)` |
| **HU-05** | **Interfaz Gráfica Adaptativa (Layout)** | Arquitectura visual *Mobile-First* con cabecera institucional (`Navbar`), menú desplegable para dispositivos móviles y barra lateral de módulos para escritorio. | `Completado (Sprint 1)` |
| **HU-02** | **Votaciones Digitales y Democracia Vecinal** | Módulo de votaciones comunitarias respetando la regla condominal de 1 voto por propiedad y panel administrativo para convocatoria de nuevas encuestas. | `Prototipado (Planificado Sprint 2)` |
| **HU-03** | **Reporte de Incidencias con Evidencia** | Formulario para reporte de anomalías (luminarias, seguridad, fontanería) con evidencia fotográfica y seguimiento de estatus en tiempo real. | `Prototipado (Planificado Sprint 2)` |

---

## 🛠️ Ajustes Técnicos (Sprint 1 Review)

Tras la sesión de *Sprint Review*, se incorporaron tres mejoras técnicas prioritarias validadas por el equipo de desarrollo:

1. **Persistencia de Sesión Local (Ajuste Técnico 1):**
   - Implementación de un proveedor global `AuthContext` sincronizado con `localStorage`. La sesión de colono o administrador permanece activa ante recargas de página o navegación accidental.

2. **Visualización Adaptativa de Movimientos (Ajuste Técnico 2):**
   - **Escritorio ($\ge 640\text{px}$):** Visualización en **tabla formal estructurada** con columnas de folio, concepto, vencimiento, monto, estado y acciones.
   - **Móvil ($< 640\text{px}$):** Transformación automática a **tarjetas apiladas (*Card View*)**, evitando barras de desplazamiento horizontal forzado y mejorando la ergonomía táctil.

3. **Ciclo de Vida de Comprobantes de Pago (Ajuste Técnico 3):**
   - Integración de modal interactivo (`SubirComprobanteModal`) con selector de cuota, área de archivo arrastrable (*drag & drop*), folio de rastreo bancario y nota aclaratoria.
   - Al enviar el comprobante, el estado de la cuota transiciona de forma inmediata a **"En Revisión"**.
   - Los usuarios con rol **Admin** cuentan con la facultad de validar y **aprobar el pago**, actualizando el saldo pendiente de manera reactiva.

---

## 💻 Stack Tecnológico

El proyecto combina estándares modernos de desarrollo web asegurando rendimiento, escalabilidad y facilidad de mantenimiento:

<div align="center">

| Capa | Tecnologías | Propósito |
| :--- | :--- | :--- |
| **Frontend Core** | ![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Arquitectura modular basada en componentes y hooks (`useState`, `useEffect`, `useContext`). |
| **Diseño y Estilos** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3_Responsive-1572B6?style=flat-square&logo=css3&logoColor=white) | Sistema de diseño coherente, paleta institucional armónica y diseño responsivo *Mobile-First*. |
| **Entorno y Build** | ![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) | Entorno de compilación ultra rápido y servidor local de desarrollo optimizado. |
| **Tipografía** | Google Fonts (*Outfit* & *Plus Jakarta Sans*) | Jerarquía tipográfica de alta legibilidad para interfaces corporativas y administrativas. |
| **Gestión Ágil** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white) ![Jira](https://img.shields.io/badge/Jira_Software-0052CC?style=flat-square&logo=jira&logoColor=white) | Control de versiones, ramas de características, integración continua y seguimiento de historias de usuario. |

</div>

---

## 🔑 Credenciales de Prueba (Demo)

Para facilitar la evaluación de los roles de usuario y las rutas protegidas, la pantalla de inicio de sesión incorpora accesos directos configurados:

```text
┌─────────────────────────┬───────────────────┬──────────────────────────────────────────────┐
│ Rol de Usuario          │ Correo / Usuario  │ Contraseña │ Perfil Asignado                 │
├─────────────────────────┼───────────────────┼────────────┼─────────────────────────────────┤
│ Colono (Residente)      │ colono@robles.com │ colono123  │ Jorge Espinosa (Lote 42)        │
│ Administrador (Directiva)│ admin@robles.com  │ admin123   │ Administración Central           │
└─────────────────────────┴───────────────────┴────────────┴─────────────────────────────────┘
```

> 💡 **Nota de usabilidad:** La barra de navegación superior incluye el control interactivo `🔄 Probar Rol`, permitiendo alternar instantáneamente entre el perfil de colono y el de administrador durante la demostración.

---

## 📁 Estructura del Proyecto

Organización modular del código fuente bajo el estándar de proyectos React:

```text
sistema-los-robles/
├── public/                     # Recursos estáticos institucionales
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   └── LoginForm.jsx             # Componente de acceso y selección de roles
│   │   ├── Finanzas/
│   │   │   ├── EstadoCuenta.jsx          # Panel financiero con tabla/tarjetas adaptativas (HU-01)
│   │   │   └── SubirComprobanteModal.jsx # Modal para adjuntar y validar comprobantes de pago
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx                # Cabecera con menú responsivo y perfil de usuario
│   │   │   └── DashboardLayout.jsx       # Contenedor principal con barra lateral de módulos
│   │   ├── Incidencias.jsx               # Prototipo del módulo de reportes (HU-03)
│   │   └── Votaciones.jsx                # Prototipo del módulo de votaciones condominales (HU-02)
│   ├── context/
│   │   └── AuthContext.jsx               # Manejo global de autenticación y persistencia (HU-04)
│   ├── data/
│   │   └── mockFinanzas.js               # Colección de datos simulados de cuotas y transacciones
│   ├── App.jsx                           # Enrutamiento condicional y protección de vistas
│   ├── App.css                           # Reglas complementarias de estilos
│   └── main.jsx                          # Punto de entrada de React 18
├── index.html                  # Plantilla HTML base con soporte universal
├── package.json                # Dependencias y scripts de ejecución
├── vite.config.js              # Configuración del empaquetador Vite
└── README.md                   # Documentación institucional y técnica del repositorio
```

---

## 🚀 Instalación y Despliegue

### Requisitos Previos
- **Node.js:** Versión 18.0.0 o superior recomendada.
- **Gestor de Paquetes:** npm (incluido con Node.js) o yarn.

### Pasos para Ejecución en Entorno Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/kiiwo17/Proyecto_II_ResidencialRobles.git
   cd Proyecto_II_ResidencialRobles
   ```

2. **Instalar dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *La aplicación estará accesible en el navegador en la dirección:* `http://localhost:5173`

4. **Compilar para producción (Opcional):**
   ```bash
   npm run build
   ```
   *Genera los archivos optimizados listos para despliegue en la carpeta `/dist`.*

---

## 📋 Registro de Sprints y Metodología Scrum

- [x] **Sprint 0:** Definición de arquitectura, configuración del entorno, diseño del Product Backlog en Jira y diagramación de flujos de usuario.
- [x] **Sprint 1 (Entregado):** 
  - [x] Implementación de **HU-04** (Autenticación y roles simulados).
  - [x] Maquetación de **HU-05** (Layout adaptativo y diseño responsivo).
  - [x] Desarrollo de **HU-01** (Módulo financiero, saldos y comprobantes de pago).
  - [x] Validación de ajustes técnicos surgidos en la *Sprint Review*.
- [ ] **Sprint 2 (En Planificación):**
  - [ ] Consolidación de **HU-02** (Sistema formal de votaciones con quórum condominal).
  - [ ] Consolidación de **HU-03** (Georreferenciación y gestión de evidencias fotográficas para incidencias).
  - [ ] Integración con backend RESTful y persistencia en base de datos.

---

<div align="center">
  <p><strong>Universidad de Guadalajara • UDG Virtual / UDG+</strong></p>
  <p><em>Licenciatura en Desarrollo Web • Materia: Proyecto II</em></p>
  <p>© 2026 Residencial Los Robles • Todos los derechos reservados.</p>
</div>
