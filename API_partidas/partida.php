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
		if (!isset($data['token']) || !isset($data['nombre_oponente'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$token = $data['token'];
			$nombre_oponente = $data['nombre_oponente'];
			try {
				// Verifica el token
				$id_usuario = $this->verificarToken($token);
				if (!$id_usuario) {
					http_response_code(401);
					return json_encode(["error" => "Token inválido"]);
				}
				// Inserta la nueva partida
				$query = "INSERT INTO partida (id_usuario, nombre_oponente) VALUES ('$id_usuario', '$nombre_oponente')";
				$result = mysqli_query($this->conn, $query);
				if ($result) {
					$id_partida = mysqli_insert_id($this->conn); // <-- Aquí obtienes la ID
					http_response_code(201);
					return json_encode([
						"success" => "Partida creada",
						"id_partida" => $id_partida
					]);
				} else {
					http_response_code(400);
					return json_encode(["error" => "No se pudo crear la partida"]);
				}
			} catch (mysqli_sql_exception $e) {
				http_response_code(500);
				return json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
			}
		}
	}

	public function getPartidas($data){
		if (!isset($data['token'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		}
		$token = $data['token'];
		// Verifica el token
		$id_usuario = $this->verificarToken($token);
		if (!$id_usuario) {
			http_response_code(401);
			return json_encode(["error" => "Token inválido"]);
		}
		$query = "SELECT * FROM partida WHERE id_usuario = '$id_usuario'";
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
		if (!isset($data['token']) || !isset($data['id_partida'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			// Verifica el token
			$token = $data['token'];
			$id_usuario = $this->verificarToken($token);
			if (!$id_usuario) {
				http_response_code(401);
				return json_encode(["error" => "Token inválido"]);
			}
			$id_partida = $data['id_partida'];
			$query = "SELECT p.*, u.usr_name
                FROM partida p
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

	public function enviarMovimiento($data){
		if (!isset($data['token']) || !isset($data['id_partida']) || !isset($data['movimiento'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		}else{
			// Verifica el token
			$token = $data['token'];
			$id_usuario = $this->verificarToken($token);
			if (!$id_usuario) {
				http_response_code(401);
				return json_encode(["error" => "Token inválido"]);
			}
			$id_partida = $data['id_partida'];
			$movimiento = $data['movimiento'];
			// Aquí puedes agregar la lógica para procesar el movimiento
			try {
				$query = "UPDATE partida SET movimientos = '$movimiento' WHERE id = '$id_partida'";
				$result = mysqli_query($this->conn, $query);
				if ($result) {
					http_response_code(200);
					return json_encode(["success" => "Movimiento enviado"]);
				} else {
					http_response_code(400);
					return json_encode(["error" => "No se pudo enviar el movimiento"]);
				}
			} catch (mysqli_sql_exception $e) {
				http_response_code(500);
				return json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
			}
		}
	}

	public function finalizarPartida($data){
		if (!isset($data['token']) || !isset($data['id_partida']) || !isset($data['resultado'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			// Verifica el token
			$token = $data['token'];
			$id_usuario = $this->verificarToken($token);
			if (!$id_usuario) {
				http_response_code(401);
				return json_encode(["error" => "Token inválido"]);
			}
			$id_partida = $data['id_partida'];
			switch($data['resultado']){
				case 'O':
					$resultado = 1;
					break;
				case 'X':
					$resultado = 2;
					break;
				case 'E':
					$resultado = 3;
					break;
				default:
					http_response_code(400);
					return json_encode(["error" => "Resultado inválido"]);
			}
			try {
				$query = "UPDATE partida SET resultado = '$resultado' WHERE id = '$id_partida'";
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

	public function verificarToken($token){
		if (!isset($token)) {
			http_response_code(400);
			return json_encode(["error" => "Token no proporcionado"]);
		}
		$query = "SELECT id_usuario FROM access_token WHERE token = '$token'";
		$resultUser = mysqli_query($this->conn, $query);
		if (!$resultUser || mysqli_num_rows($resultUser) == 0) {
			http_response_code(401);
			return json_encode(["error" => "Token inválido"]);
		}
		$row = mysqli_fetch_assoc($resultUser);
		return $row['id_usuario'];
	}
}