# acamica_delilah
Proyecto 3- Curso FSWD ACAMICA


ARCHIVO -QUERYDB.SQL

Este archivo tiene la recopilacion de todas las sentencias SQL que he utilizado para crear y modificar, a fin de darle la forma definitiva a la Base de Datos que he utilizado en el gestor MySQL- 
Las mismas se han utilizado en el IDE de consola de PHPMyadmin en un servidor Apache para el localhost. El puerto utilizado fue el 3306.

ARCHIVO. INDEX.JS

Este archivo contiene la totalidad del proyecto. A saber:

1) Modulos utilizados
2) Middlewares para gestion de usuarios y permisos
3) Rutas GET,POST,PUT,DELETE


INDICACIONES PARA PROBAR LA APP.

1) Ingrese a la ruta /nuevoUsuario y genere su propio usuario en un Archivo JSON con algun software de prueba REST ( por ejemplo POSTMAN) que contenga la siguiente estrucutra:

{"nombreyapelido":"",
"email":"",
"direccion":"",
"usename":"",
"contraseña":""
}

NOTA: El "rol" por defecto sera REGULAR ( es decir, NO ADMIN). En caso de requerirlo detallarlo en el JSON.

El response de la ruta le devolvera su numero de TOKEN. Almacenelo como header->Authorization

3) Ingrese a la ruta /productos con metodo GET para verificar el listado de produtos. No es necesario el uso de TOKEN.

4) Ingrese a la ruta /pedidos con metodo POST para crear un pedido. 
El JSON debera contener los siguientes datos:

{"usuario_id":"",
"usuario_dire":"",
"usuario_nya":"",
"formadepago":"",
"producto_id":""  ( Hasta 4 productos- producto_id2,producto_id3,producto_id4)
}

5)Para CRUD, teniendo usuario ADMIN el MIddleware Authentication permitira:
.POST/productos
.DELETE/productos/:id
.PUT/productos/:id

