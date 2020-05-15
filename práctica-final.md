# Práctica Final

## EL TALLER

### Objetivo

> Se necesita una aplicación web para la administración de los mantenimientos de un pequeño taller de motos.

### Funcionalidades

1. El taller tiene muchos mécanicos y administradores, por lo cual se necesita la gestión de usuarios donde un administrador pueda crear, modificar y eliminar a otros administradores y/o mécanicos.

2. Se dede de tener un control de las motos que ingresan al taller y un control de las motos que ya se encuentran en el taller, por lo cual se necesita un módulo donde se pueden registrar y actualizar las motos del taller. Tanto administradores como mécanico registran y actualizan las motos.

3. Los administradores del taller le asignan todos los días una moto a un mécanico para realizar su respectivo mantenimiento, por lo tanto se debe tener el módulo para asignarle una moto a cada mécanico. Tener en cuenta que solo los administradores tiene permiso para asignar y eliminar los mantenimientos.

4. Los mécanicos deben de ver los mantenimientos de las motos que el administrador les asigno y por cada mantenimiento deben de actualizar el mantenimiento ingresando los trabajos realizado y cuantas horas invirtio en ese mantenimiento.

5. [OPCIONAL] Los administradores del taller confian en sus mécanicos y les pagan por horas, por lo tanto necesitan que la aplicación web les muestre un consolidado de cuantas horas ha trabajado cada mécanico en un rango de fechas ingresado por el administrador. Tener en cuenta que esté consolidado solo lo pueden ver los admnistradores.

### Script de conexión a la base de datos

```js
this.pool = new Pool({
  user: "dllo_web_udem",
  host: "saurmo.com",
  database: "el-taller",
  password: "bf5e722cc518fce3c4a57fdb1b6647b0434138370eb1c30f9293ec8e03062b78",
  port: 5432,
});
```

## Tablas de la base de datos

```sql

-- ROLES
CREATE TABLE public.roles (
	id serial NOT NULL,
	nombre varchar(100) NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (id)
);

INSERT INTO public.roles (nombre) VALUES  ('Mécanico'),('Administrador');

-- TIPOS DE DOCUMENTOS
CREATE TABLE public.tipos_documentos (
	id serial NOT NULL,
	nombre varchar(100) NOT NULL,
	CONSTRAINT tipos_documentos_pk PRIMARY KEY (id)
);

INSERT INTO public.tipos_documentos (nombre) VALUES ('CC'),('CE'),('NIT'),('Pasaporte');

-- USUARIOS
CREATE TABLE public.usuarios (
	tipo_documento varchar(10) NOT NULL,
	documento varchar(20) NOT NULL,
	nombre varchar(100) NOT NULL,
	apellidos varchar(100) NOT NULL,
	celular varchar(11) NOT NULL,
	correo varchar(100) NOT NULL,
	rol integer NOT NULL,
	clave varchar(100) NOT NULL,
	CONSTRAINT usuarios_pk PRIMARY KEY (documento)
);

-- MOTOS
CREATE TABLE public.motos (
	placa varchar(6) NOT NULL,
	estado varchar(100) NOT NULL,
	clase varchar(100) NOT NULL,
	marca varchar(100) NOT NULL,
	modelo varchar(4) NOT NULL,
	color varchar(100) NOT NULL,
	cilindraje varchar(4) NOT NULL,
	id_propietario varchar(20) NOT NULL,
	nro_soat varchar(100) NOT NULL,
	vencimiento_soat date NOT NULL,
	nro_tecnomecanica varchar(100) NOT NULL,
	vencimiento_tecnomecanica date NOT NULL,
	CONSTRAINT motos_pk PRIMARY KEY (placa)
);

--MANTENIMIENTOS
CREATE TABLE public.mantenimientos (
	id_mecanico varchar(20) NOT NULL,
	placa varchar(6) NOT NULL,
	fecha date NOT NULL,
	trabajos_realizados text NULL,
	horas_invertidas integer NULL,
	CONSTRAINT mantenimientos_pk PRIMARY KEY (id_mecanico,placa,fecha)
);

```
