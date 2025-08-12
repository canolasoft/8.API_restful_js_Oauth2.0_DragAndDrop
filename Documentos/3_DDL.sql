CREATE DATABASE base_usuarios;
USE base_usuarios;

#usuario(PK(id), usr_name, usr_email, usr_pass, imagen)
CREATE TABLE usuario(
	id INT NOT NULL AUTO_INCREMENT,
    usr_name VARCHAR(30) NOT NULL,
    usr_email VARCHAR(50) NOT NULL UNIQUE,
    usr_pass VARCHAR(100) NOT NULL,
    imagen VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id)
);

#jugador(PK(id), nombre, puntaje)
CREATE TABLE jugador(
	id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    puntaje INT NOT NULL DEFAuLT 0,
    PRIMARY KEY (id)
);

#partida(PK(id), fecha)
CREATE TABLE partida(
    id INT NOT NULL AUTO_INCREMENT,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    PRIMARY KEY (id)
);

#juega(PK(id_jugador, id_partida), id_usuario)
CREATE TABLE juega(
    id_jugador INT NOT NULL,
    id_partida INT NOT NULL,
    id_usuario INT NOT NULL,
    PRIMARY KEY (id_jugador, id_partida),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id),
    FOREIGN KEY (id_partida) REFERENCES partida(id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

#zona(PK(id), nombre, puntaje, id_jugador, id_partida)
CREATE TABLE zona(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    puntaje INT NOT NULL DEFAULT 0,
    id_jugador INT NOT NULL,
    id_partida INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id),
    FOREIGN KEY (id_partida) REFERENCES partida(id)
);

#turno(PK(id), num_turno, num_dado, id_jugador, id_partida)
CREATE TABLE turno(
    id INT NOT NULL AUTO_INCREMENT,
    num_turno INT NOT NULL DEFAULT 1,
    num_dado INT NOT NULL,
    id_jugador INT NOT NULL,
    id_partida INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_jugador) REFERENCES jugador(id),
    FOREIGN KEY (id_partida) REFERENCES partida(id)
);

#ficha(PK(id), tipo)
CREATE TABLE ficha(
    id INT NOT NULL AUTO_INCREMENT,
    tipo INT NOT NULL,
    PRIMARY KEY (id)
);

#contiene(PK(id_ficha), id_zona)
CREATE TABLE contiene(
    id_ficha INT NOT NULL,
    id_zona INT NOT NULL,
    PRIMARY KEY (id_ficha),
    FOREIGN KEY (id_ficha) REFERENCES ficha(id),
    FOREIGN KEY (id_zona) REFERENCES zona(id)
);

#coloca(PK(id_turno), id_ficha)
CREATE TABLE coloca(
	id_turno INT NOT NULL,
    id_ficha INT NOT NULL,
    PRIMARY KEY (id_turno),
    FOREIGN KEY (id_turno) REFERENCES turno(id),
    FOREIGN KEY (id_ficha) REFERENCES ficha(id)
);

#Token de sesiones de API
CREATE TABLE IF NOT EXISTS access_token (
    token CHAR(32) NOT NULL,
    id_usuario INT(11) NOT NULL,
    fecha_creado DATETIME NOT NULL DEFAULT NOW(),
    fecha_vencimiento DATETIME NOT NULL DEFAULT (NOW() + INTERVAL 12 HOUR),
    PRIMARY KEY (token),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);