CREATE DATABASE IF NOT EXISTS base_usuarios;
CREATE TABLE IF NOT EXISTS base_usuarios.usuario (
    id INT(11) NOT NULL AUTO_INCREMENT,
    usr_name VARCHAR(100) NOT NULL,
    usr_email VARCHAR(100) UNIQUE NOT NULL,
    usr_pass VARCHAR(100) NOT NULL,
    imagen VARCHAR(100) DEFAULT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS base_usuarios.access_token (
    token CHAR(32) NOT NULL,
    id_usuario INT(11) NOT NULL,
    fecha_creado DATETIME NOT NULL DEFAULT NOW(),
    fecha_vencimiento DATETIME NOT NULL DEFAULT (NOW() + INTERVAL 12 HOUR),
    PRIMARY KEY (token),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS base_usuarios.partida (
    id INT(11) NOT NULL AUTO_INCREMENT,
    id_usuario INT(11) NOT NULL,
    nombre_oponente VARCHAR(100) NOT NULL,
    fecha DATETIME NOT NULL DEFAULT NOW(),
    comienza VARCHAR(1) NOT NULL DEFAULT 'X', /* 'X' o 'O' */
    movimientos VARCHAR(50) NOT NULL DEFAULT ",,,,,,,,",
    resultado INT(1) DEFAULT 0, /* 0: en curso, 1: ganado, 2: perdido, 3: empate */
    PRIMARY KEY (id),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
);