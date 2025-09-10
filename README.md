# Sistema de Calificaciones - Frontend

Aplicación web para la gestión de calificaciones estudiantiles desarrollada con React y Vite.

## Descripción

Frontend del Sistema de Calificaciones que permite administrar registros académicos de estudiantes, incluyendo calificaciones, información personal y datos de contacto de acudientes.

## Tecnologías

- **React** 18.2.0 - Biblioteca de interfaz de usuario
- **Vite** 5.2.0 - Herramienta de construcción y desarrollo
- **JavaScript/JSX** - Lenguaje de programación


## Funcionalidades

- **Gestión de Calificaciones**: Crear, leer, actualizar y eliminar registros
- **Información Estudiantil**: Nombre, edad, asignatura, profesor
- **Datos de Contacto**: Acudiente, teléfono, email
- **Cálculos**: Promedio general automático
- **Interfaz Responsiva**: Layout adaptable con logo institucional
- **Validaciones**: Control de límites de solicitudes

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

El servidor se ejecuta en el puerto 5173 por defecto.

## Construcción

```bash
npm run build
```

## Vista Previa

```bash
npm run preview
```

## Configuración

### Variables de Entorno

- `VITE_DEV_PORT`: Puerto de desarrollo (default: 5173)
- `VITE_LOGO_URL`: URL del logo institucional

### Campos de Calificación

- Número de Registro
- Nombre del Estudiante
- Edad
- Calificación
- Estado
- Asignatura
- Fecha de Calificación
- Profesor
- Nombre del Acudiente
- Número de Contacto
- Email
- Promedio General
- Comentarios

## Arquitectura

- **Controladores**: Manejan el estado y operaciones CRUD
- **Servicios**: Comunicación con la API backend
- **Componentes**: Elementos reutilizables de UI
- **Layouts**: Estructura base de páginas
- **Hooks**: Lógica personalizada reutilizable

## Características Técnicas

- Componentes funcionales con hooks
- Gestión de estado local con useState
- Efectos secundarios con useEffect
- Confirmaciones para operaciones críticas
- Manejo de errores y mensajes de usuario
- Límite de velocidad en solicitudes API
        