-- ============================================================
--  EJERCICIOS SQL - BASES DE DATOS
--  Tablas utilizadas: customers, employees, orders,
--                     order_details, products, suppliers, shippers
-- ============================================================


-- ============================================================
--  SECCIÓN 1: CONSULTAS SOBRE UNA SOLA TABLA
-- ============================================================
-- ------------------------------------------------------------
-- 1. Revisa las tablas Customers (clientes), Employees (empleados) y Orders (pedidos)
-- ------------------------------------------------------------

-- ------------------------------------------------------------
-- 2. ¿Cuántos clientes hay registrados?
-- ------------------------------------------------------------
-- COUNT(*) cuenta todas las filas de la tabla customers,
-- sin importar si alguna columna tiene valores nulos.
-- El resultado es un único número: el total de clientes.
SELECT COUNT(*)
FROM public.customers;

-- ------------------------------------------------------------
-- 3. ¿Cuántos pedidos?
-- ------------------------------------------------------------
-- COUNT(*) cuenta todas las filas de la tabla customers,
-- sin importar si alguna columna tiene valores nulos.
-- El resultado es un único número: el total de pedidos.
SELECT COUNT(*)
FROM public.orders;

-- ------------------------------------------------------------
-- 4. ¿Qué clientes viven en London y su nombre empieza por A?
-- ------------------------------------------------------------
-- Se filtran dos condiciones simultáneas con AND:
--   · city = 'London'       → la ciudad debe ser exactamente 'London'
--   · company_name LIKE 'A%' → el nombre debe comenzar con la letra A
--                              (%: acepta cualquier texto después)
SELECT *
FROM public.customers
WHERE city = 'London'
  AND company_name LIKE 'A%';


-- ------------------------------------------------------------
-- 5. ¿Cuántos clientes hay que son de Londres?
-- ------------------------------------------------------------
-- COUNT(*) combinado con WHERE filtra solo las filas donde
-- city sea 'London' antes de contar.
SELECT COUNT(*)
FROM public.customers
WHERE city = 'London';


-- ------------------------------------------------------------
-- 6. ¿Cuántos clientes hay en cada ciudad?
-- ------------------------------------------------------------
-- GROUP BY agrupa todas las filas que comparten el mismo valor
-- de city en un solo grupo.
-- COUNT(*) cuenta cuántos clientes hay en cada grupo (ciudad).
-- El alias "total" le da nombre a esa columna en el resultado.
-- ORDER BY total DESC ordena de mayor a menor cantidad.
SELECT city, COUNT(*) AS total
FROM public.customers
GROUP BY city
ORDER BY total DESC;


-- ------------------------------------------------------------
-- 7. ¿Cuántos empleados nacieron después del 1 de junio de 1965?
-- ------------------------------------------------------------
-- El operador > compara fechas: solo devuelve empleados cuyo
-- birth_date sea posterior (mayor) a '1965-06-01'.
-- Las fechas se escriben en formato ISO: 'AAAA-MM-DD'.
SELECT *
FROM public.employees
WHERE birth_date > '1965-06-01';


-- ------------------------------------------------------------
-- 8 y 9. Informe: "El empleado N nació el N"
-- ------------------------------------------------------------
-- CONCAT une varios textos y valores en una sola cadena.
-- Se combinan: apellido, país, nombre completo y fecha de nacimiento.
-- El alias "informe" es el nombre que tendrá esa columna en el resultado.
SELECT
    CONCAT(
        'El empleado ',  last_name,
        ' de ',          country,
        ' nombre: (',    first_name, ' ', last_name,
        ') y el dia de nacimiento es: ', birth_date
    ) AS informe
FROM public.employees;


-- ------------------------------------------------------------
-- 7. Mismo informe, solo para los empleados con id 8, 7 y 3
-- ------------------------------------------------------------
-- IN permite filtrar por una lista de valores específicos.
-- Es equivalente a escribir:
--   WHERE employee_id = 8 OR employee_id = 7 OR employee_id = 3
-- Nota: el enunciado mencionaba también el id 10, pero no está
-- incluido en el IN de esta versión.
SELECT
    CONCAT(
        'El empleado ',  last_name,
        ' de ',          country,
        ' nombre: (',    first_name, ' ', last_name,
        ') y el dia de nacimiento es: ', birth_date
    ) AS informe
FROM public.employees
WHERE employee_id IN (8, 7, 3);


-- ------------------------------------------------------------
-- 10. Países con más de 5 clientes, ordenados por nombre de país
-- ------------------------------------------------------------
-- GROUP BY agrupa por país y COUNT(*) cuenta clientes por grupo.
-- HAVING filtra los grupos ya formados (no filas individuales):
--   solo se muestran los países cuyo conteo sea mayor a 5.
-- ORDER BY country ASC ordena alfabéticamente de A a Z.
SELECT country, COUNT(*)
FROM public.customers
GROUP BY country
HAVING COUNT(*) > 5
ORDER BY country ASC;



-- ============================================================
--  SECCIÓN 2: CONSULTAS CON MÁS DE UNA TABLA (JOINs)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Nombre del cliente del pedido 10360
-- ------------------------------------------------------------
-- Se unen las tablas orders (o) y customers (c) mediante JOIN.
-- La condición ON indica la columna que relaciona ambas tablas:
--   o.customer_id = c.customer_id
-- WHERE filtra para traer únicamente el pedido con order_id = 10360.
-- Solo se muestra company_name (el nombre del cliente).
SELECT c.company_name
FROM public.orders o
JOIN public.customers c
    ON o.customer_id = c.customer_id
WHERE o.order_id = 10360;


-- ------------------------------------------------------------
-- 2. Nombre de los clientes de los pedidos 10360, 10253 y 10440
-- ------------------------------------------------------------
-- Igual que la consulta anterior pero usando IN para filtrar
-- tres order_id distintos en una sola condición.
SELECT c.company_name
FROM public.orders o
JOIN public.customers c
    ON o.customer_id = c.customer_id
WHERE o.order_id IN (10360, 10253, 10440);


-- ------------------------------------------------------------
-- 3. Ciudades y número de pedidos de clientes en esa ciudad
-- ------------------------------------------------------------
-- Se unen orders y customers para acceder a la ciudad del cliente.
-- GROUP BY c.city agrupa todos los pedidos por ciudad.
-- COUNT(o.order_id) cuenta cuántos pedidos hay en cada ciudad.
-- ORDER BY total_pedidos DESC muestra primero las ciudades
-- con más pedidos.
SELECT c.city, COUNT(o.order_id) AS total_pedidos
FROM public.orders AS o
JOIN public.customers AS c
    ON o.customer_id = c.customer_id
GROUP BY c.city
ORDER BY total_pedidos DESC;


-- ------------------------------------------------------------
-- 4. Ciudades desde las que hay más de 7 pedidos
-- ------------------------------------------------------------
-- Igual que la consulta anterior, pero se agrega HAVING para
-- quedarse solo con las ciudades cuyo total de pedidos sea > 7.
-- HAVING actúa sobre el resultado del GROUP BY (no sobre filas).
SELECT c.city, COUNT(o.order_id) AS total_pedidos
FROM public.orders AS o
JOIN public.customers AS c
    ON o.customer_id = c.customer_id
GROUP BY c.city
HAVING COUNT(o.order_id) > 7
ORDER BY total_pedidos DESC;


-- ------------------------------------------------------------
-- 5. Los tres países desde los que tengo más pedidos
-- ------------------------------------------------------------
-- Misma estructura de JOIN y GROUP BY, pero:
--   · Se agrupa por city (podría ajustarse a country si se desea país)
--   · LIMIT 3 restringe el resultado a las 3 primeras filas,
--     que al estar ordenadas DESC son las 3 con más pedidos.
SELECT c.city, COUNT(o.order_id) AS total_pedidos
FROM public.orders AS o
JOIN public.customers AS c
    ON o.customer_id = c.customer_id
GROUP BY c.city
ORDER BY total_pedidos DESC
LIMIT 3;


-- ------------------------------------------------------------
-- 6. Nombre completo de empleados y número de pedidos que registraron
-- ------------------------------------------------------------
-- Se unen orders y employees por employee_id.
-- GROUP BY e.employee_id agrupa por cada empleado (usando la clave
-- única para evitar problemas si dos empleados tienen el mismo nombre).
-- COUNT(o.order_id) cuenta los pedidos de cada empleado.
-- ORDER BY num_pedidos DESC muestra primero al más activo.
SELECT e.first_name, e.last_name, COUNT(o.order_id) AS num_pedidos
FROM public.orders o
JOIN public.employees e
    ON o.employee_id = e.employee_id
GROUP BY e.employee_id
ORDER BY num_pedidos DESC;


-- ------------------------------------------------------------
-- 7. Mismo informe, solo empleados cuyo nombre empiece por M
-- ------------------------------------------------------------
-- Se añade WHERE antes del GROUP BY para filtrar individualmente
-- las filas donde first_name comience con 'M'.
-- WHERE se aplica antes de agrupar; HAVING se aplicaría después.
SELECT e.first_name, e.last_name, COUNT(o.order_id) AS num_pedidos
FROM public.orders o
JOIN public.employees e
    ON o.employee_id = e.employee_id
WHERE e.first_name LIKE 'M%'
GROUP BY e.employee_id
ORDER BY num_pedidos DESC;


-- ------------------------------------------------------------
-- 8. Número de pedido, empleado que lo registró y cliente
-- ------------------------------------------------------------
-- Se encadenan dos JOINs sobre la tabla orders:
--   · Primer JOIN con employees → para obtener el nombre del empleado
--   · Segundo JOIN con customers → para obtener el nombre del cliente
-- Se muestran tres columnas: id del pedido, nombre del empleado
-- y nombre de la empresa cliente.
-- ORDER BY o.order_id muestra los pedidos en orden numérico.
SELECT o.order_id, e.first_name, c.company_name
FROM public.orders o
JOIN public.employees e
    ON o.employee_id = e.employee_id
JOIN public.customers c
    ON o.customer_id = c.customer_id
ORDER BY o.order_id;


-- ------------------------------------------------------------
-- 9. Clientes que han hecho más de un pedido registrado
--     por el mismo empleado
-- ------------------------------------------------------------
-- Se agrupan los pedidos por cliente (customer_id y company_name).
-- HAVING COUNT(*) > 1 filtra los clientes con más de un pedido.
-- Nota: el GROUP BY actual no incluye employee_id, por lo que
-- la condición "registrado por el mismo empleado" no está
-- completamente aplicada; para eso habría que agregar
-- o.employee_id al GROUP BY.
SELECT c.company_name, o.customer_id, COUNT(*) AS num_pedidos
FROM public.orders o
JOIN public.employees e
    ON o.employee_id = e.employee_id
JOIN public.customers c
    ON o.customer_id = c.customer_id
GROUP BY o.customer_id, c.company_name
HAVING COUNT(*) > 1
ORDER BY num_pedidos;


-- ------------------------------------------------------------
-- 10. Clientes con más de un pedido registrado por "Margaret"
-- ------------------------------------------------------------
-- WHERE e.first_name = 'Margaret' filtra ANTES de agrupar,
-- dejando solo las filas donde el empleado se llame Margaret.
-- Luego GROUP BY agrupa por cliente y HAVING COUNT(*) > 1
-- filtra los que tienen más de un pedido con esa empleada.
SELECT c.company_name, o.customer_id, COUNT(*) AS num_pedidos
FROM public.orders o
JOIN public.employees e
    ON o.employee_id = e.employee_id
JOIN public.customers c
    ON o.customer_id = c.customer_id
WHERE e.first_name = 'Margaret'
GROUP BY o.customer_id, c.company_name
HAVING COUNT(*) > 1
ORDER BY num_pedidos;


-- ============================================================
--  SECCIÓN 3: SUBCONSULTAS
-- ============================================================

-- ------------------------------------------------------------
-- 1. Producto con el precio mínimo más bajo
-- ------------------------------------------------------------
-- La subconsulta interna  (SELECT MIN(unit_price) FROM products)
-- calcula el precio mínimo de toda la tabla.
-- La consulta externa devuelve el/los productos cuyo unit_price
-- sea igual a ese mínimo.
-- Ventaja frente a ORDER BY + LIMIT: devuelve todos los productos
-- si hay empate en el precio mínimo.
SELECT *
FROM public.products
WHERE unit_price = (
    SELECT MIN(unit_price)
    FROM public.products
);


-- ------------------------------------------------------------
-- 2. Producto cuyo precio sea al menos 10 veces la cantidad
--     mínima registrada en los detalles de pedido
-- ------------------------------------------------------------
-- La subconsulta obtiene el valor mínimo de quantity en order_details.
-- La consulta externa filtra productos donde unit_price >= 10
-- multiplicado por ese mínimo.
-- Combina datos de dos tablas distintas sin necesidad de JOIN.
SELECT *
FROM public.products
WHERE unit_price >= 10 * (
    SELECT MIN(quantity)
    FROM public.order_details
);


-- ------------------------------------------------------------
-- 3. Productos cuyo precio sea mayor que el máximo de los
--     productos con id 1, 6, 9 y 10
-- ------------------------------------------------------------
-- La subconsulta interna filtra solo los productos con esos IDs
-- y calcula su precio máximo con MAX().
-- La consulta externa devuelve todos los productos cuyo precio
-- supere ese máximo.
-- Nota: en el enunciado se mencionan los ids 3,6,9,10 pero en
-- el IN de la subconsulta aparece 1,6,9,10.
SELECT *
FROM public.products
WHERE unit_price > (
    SELECT MAX(unit_price)
    FROM public.products
    WHERE product_id IN (1, 6, 9, 10)
);


-- ------------------------------------------------------------
-- 4. Productos cuyo ProductID coincida con algún ShipperID
-- ------------------------------------------------------------
-- La subconsulta devuelve todos los shipper_id de la tabla shippers.
-- La consulta externa filtra productos cuyo unit_price (precio)
-- esté en esa lista.
-- Nota: el WHERE compara unit_price con shipper_id, lo cual es
-- inusual; probablemente la intención era comparar product_id
-- con shipper_id, pero se mantiene el código original.
SELECT *
FROM public.products
WHERE unit_price IN (
    SELECT shipper_id
    FROM shippers
);


-- ------------------------------------------------------------
-- 5. Clientes que están en ciudades donde también hay proveedores
-- ------------------------------------------------------------
-- La subconsulta interna extrae todas las ciudades distintas
-- de la tabla suppliers (proveedores).
-- La consulta externa devuelve los clientes cuya city esté
-- dentro de esa lista de ciudades.
-- Equivalente a un JOIN entre customers y suppliers por city,
-- pero escrito como subconsulta con IN.
SELECT *
FROM public.customers c
WHERE c.city IN (
    SELECT s.city
    FROM suppliers s
);