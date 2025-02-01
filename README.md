# ASA APP

## Sobre la App

Aplicación de gestión de datos para una empresa. Esta empresa necesita gestionar de manera más automatizada y certera los datos de sus ventas, distribución de pedidos y horarios de los empleados; para ésto se desarrollo una aplicación para celular llamada "asa-app", la cual cuenta con la capacidad de manejar autenticación de cada empelado, por su DNI y contraseña.
Actualmente en su versión 1.4.9 permite el registro de ventas, información de distribuidores y el horario de los empleados, éstos dos últimos solamente son accesibles si el rol del empleado(usuario) es igual o superior a "supervisor".

## PROGRESO DEL DESARROLLO

### features

- [x] Registro de Ventas
  - [x] Diferenciar entre "Revendedor" y "Consumidor".
  - [x] Generar el precio a cobrar automáticamente.
  - [x] Registrar en una tabla todas las ventas del dia actual.
  - [x] Posibilidad de modificar el precio para consumidor y revendedor (solo para roles de "admin", "supervisor" y "owner").
- [x] Registro de Distribuidores
  - [x] Registrar cantidad de bidones por cada salida del repartidor.
  - [x] Registrar cantidad de aguas vacías, llenas y vendidas por el repartidor en cada viaje realizado.
  - [x] Mostrar error cuando la sumatoria de aguas "vacías", "llenas" y vendidas no coincide con la cantidad de salida.
- [x] Registro de Asistencia.
  - [x] Registro de Hora automático (Solo se necesita ingresar el DNI y especificar si es "entrada" o "salida").
  - [x] Diferenciar entre turno mañana y turno tarde (AM, PM).
- [ ] Generar Informes.
  - [ ] Generar archivos PDF en donde se mostrará un resumen de:
    - [ ] Asistencias:
      - [ ] Horarios de entrada y salida de cada día (diferenciando los de la mañana y tarde).
      - [ ] Total de horas trabajadas en la semana.
    - [ ] Distribuidores:
      - [ ] Total de bidones vendidos por día.
      - [ ] Total de bidones vendidos por semana.
      - [ ] Un breve contraste con la semana anterior para hacer una comparativa de las ventas de la última semana.
    - [ ] Ventas:
      - [ ] Total de ventas realizadas por día.
      - [ ] Diferenciar las ventas por Revendedor o Consumidor.
      - [ ] Total de ventas realizadas en la semana.
      - [ ] Una breve comparación con la semana anterior para realizar con contraste con las ventas de la última semana.
    - [ ] Resumen General:
      - [ ] Total de ingresos obtenidos por ventas.
      - [ ] Total de ingresos obtenidos por Distribuidores.
      - [ ] Total pagado a los empleados.
      - [ ] Total de ingresos general.
      - [ ] Total de ingresos obtenidos por reventas.
- [ ] Manejo de autenticación y roles
