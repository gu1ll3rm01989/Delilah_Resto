
--CREACION DE LA DB Y LAS TABLAS--
CREATE DATABASE IF NOT EXISTS delilah_db;
USE delilah_db;

CREATE TABLE IF NOT EXISTS productos(
    id INT(255) AUTO_INCREMENT NOT NULL PRIMARY KEY, nombre TEXT(255) NOT NULL, precio INT(255) NOT NULL)

CREATE TABLE IF NOT EXISTS usuarios(
    id INT(255) AUTO_INCREMENT NOT NULL PRIMARY KEY, nombreyapellido VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, telefono BIGINT(255) NOT NULL, direccion VARCHAR(255) NOT NULL, contraseña VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS estados(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, tipo VARCHAR(255) NOT NULL
)


CREATE TABLE IF NOT EXISTS forma_pago(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY, tipo VARCHAR(255) NOT NULL
)


CREATE TABLE IF NOT EXISTS pedidos(
    id INT(255) AUTO_INCREMENT NOT NULL PRIMARY KEY, usuario_id INT(255) NOT NULL, usuario_dire VARCHAR(255) NOT NULL, usuario_nya VARCHAR(255) NOT NULL, hora DATETIME NOT NULL, estado VARCHAR(255) NOT NULL, precio_total BIGINT NOT NULL, forma_pago VARCHAR(255) NOT NULL, producto_id INT(255) NOT NULL
);

ALTER TABLE pedidos
ADD FOREIGN KEY(usuario_id)
REFERENCES usuarios(id);

ALTER TABLE pedidos
ADD FOREIGN KEY(usuario_dire)
REFERENCES usuarios(direccion);

ALTER TABLE pedidos
ADD FOREIGN KEY(producto_id)
REFERENCES productos(id);

ALTER TABLE pedidos
ADD FOREIGN KEY(usuario_nya)
REFERENCES usuarios(nombreyapellido);

ALTER TABLE pedidos
ADD FOREIGN KEY(estado)
REFERENCES estados(tipo);

ALTER TABLE pedidos
ADD FOREIGN KEY(forma_pago)
REFERENCES forma_pago(tipo);

ALTER TABLE pedidos
ADD producto2_id INT(255)
AFTER producto_id;

ALTER TABLE pedidos
ADD producto3_id INT(255)
AFTER producto2_id;

ALTER TABLE pedidos
ADD producto4_id INT(255)
AFTER producto3_id;

ALTER TABLE pedidos
ADD FOREIGN KEY(producto2_id) REFERENCES productos(id);
ALTER TABLE pedidos
ADD FOREIGN KEY(producto3_id) REFERENCES productos(id);
ALTER TABLE pedidos
ADD FOREIGN KEY(producto4_id) REFERENCES productos(id);



--INSERT VALORES DE INICIO

INSERT INTO productos(nombre, precio) VALUES('Bagel de salmon', 425);
INSERT INTO productos(nombre, precio) VALUES('Hamburguesa clasica', 350);
INSERT INTO productos(nombre, precio) VALUES('Sandwich veggie', 310);
INSERT INTO productos(nombre, precio) VALUES('Ensalada veggie', 340);
INSERT INTO productos(nombre, precio) VALUES('Focaccia', 300);
INSERT INTO productos(nombre, precio) VALUES('Sandwich de focaccia', 440);


INSERT INTO usuarios(nombreyapellido, email, telefono, direccion, contraseña, username)
VALUES('Freddie Mercury', 'freddiemercury@gmail.com', 447712345678, '1 Logan Pikesington, Londo W8, 6DE UK', 123456, 'queen_freddie');


INSERT INTO estados(tipo) VALUES('Confirmado');
INSERT INTO estados(tipo) VALUES('En preparacion');
INSERT INTO estados(tipo) VALUES('En camino');
INSERT INTO estados(tipo) VALUES('Entregado');
INSERT INTO estados(tipo) VALUES('Nuevo');


INSERT INTO forma_pago(tipo) VALUES('Efectivo');
INSERT INTO forma_pago(tipo) VALUES('Tarjeta');

INSERT INTO pedidos(id, usuario_id, usuario_dire, usuario_nya, hora, estado, precio_total, forma_pago, producto_id, producto2_id, producto3_id, producto4_id)
VALUES(NULL, '1', '1 Logan Pikesington, Londo W8, 6DE UK', 'Freddie Mercury', '2020-05-25 19:35:27', 'Nuevo', '650', 'Efectivo', '1', '2', '3', '4');

--MODIFICACIONES

ALTER TABLE usuarios ADD rol VARCHAR(255) NOT NULL;