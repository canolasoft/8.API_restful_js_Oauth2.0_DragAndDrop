<?php
/* Clase usuario para gestionar con API RESTful
 * Permite operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * Requiere conexión a una base de datos MySQL
 */

// Configuracion del reporte de errores
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', 0);

class Partida
{
	private $conn;

	// Constructor que recibe la conexión a la base de datos
	public function __construct($conn)
	{
		$this->conn = $conn;
	}

	// Métodos para manejar partidas

	// Añade una nueva partida
	public function addPartida($data){
		if (!isset($data['id_usuario']) || !isset($data['nombre_oponente']) || !isset($data['resultado'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$id_usuario = $data['id_usuario'];
			$nombre_oponente = $data['nombre_oponente'];
			$resultado = $data['resultado'];
			try {
				$query = "INSERT INTO partidas (id_usuario, nombre_oponente, resultado) VALUES ('$id_usuario', '$nombre_oponente', '$resultado')";
				$result = mysqli_query($this->conn, $query);
			} catch (mysqli_sql_exception $e) {
				http_response_code(500);
				return json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
			}
			if ($result) {
				http_response_code(201);
				return json_encode(["success" => "Usuario registrado con éxito"]);
			} else {
				http_response_code(400);
				return json_encode(["error" => "No se pudo registrar el usuario"]);
			}
		}
	}

	public function getPartidas($data){
		if (!isset($data['token'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		}
		$id_usuario = $data['id_usuario'];
		$token = $data['token'];
		// Verificar el token
		$queryToken = "SELECT token FROM usuario WHERE id = '$id_usuario' AND token = '$token'";
		$resultToken = mysqli_query($this->conn, $queryToken);
		if (!$resultToken || mysqli_num_rows($resultToken) == 0) {
			http_response_code(401);
			return json_encode(["error" => "Token inválido"]);
		}
		$query = "SELECT * FROM partidas WHERE id_usuario = '$id_usuario'";
		$result = mysqli_query($this->conn, $query);
		if ($result && mysqli_num_rows($result) > 0) {
			$partidas = [];
			while ($row = mysqli_fetch_assoc($result)) {
				$partidas[] = $row;
			}
			http_response_code(200);
			return json_encode($partidas);
		} else {
			http_response_code(404);
			return json_encode(["error" => "No se encontraron partidas"]);
		}
	}

	public function getPartida($data){
		if (!isset($data['id_partida'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$id_partida = $data['id_partida'];
			$query = "SELECT p.*, u.usr_name
                FROM partidas p
                INNER JOIN usuario u ON p.id_usuario = u.id
                WHERE p.id = '$id_partida'";
			$result = mysqli_query($this->conn, $query);
			if ($result && mysqli_num_rows($result) > 0) {
				http_response_code(200);
				return json_encode(mysqli_fetch_assoc($result));
			} else {
				http_response_code(404);
				return json_encode(["error" => "Partida no encontrada"]);
			}
		}
	}

	public function finalizarPartida($data){
		if (!isset($data['id_partida']) || !isset($data['resultado'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$id_partida = $data['id_partida'];
			$resultado = $data['resultado'];
			try {
				$query = "UPDATE partidas SET resultado = '$resultado' WHERE id = '$id_partida'";
				$result = mysqli_query($this->conn, $query);
			} catch (mysqli_sql_exception $e) {
				http_response_code(500);
				return json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
			}
			if ($result) {
				http_response_code(200);
				return json_encode(["success" => "Partida actualizada con éxito"]);
			} else {
				http_response_code(400);
				return json_encode(["error" => "No se pudo actualizar la partida"]);
			}
		}
	}
}
