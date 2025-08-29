<?php
/* Clase usuario para gestionar con API RESTful
 * Permite operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * Requiere conexión a una base de datos MySQL
 */

// Configuracion del reporte de errores
error_reporting(E_ERROR | E_PARSE);
ini_set('display_errors', 0);

class Usuario
{
	private $conn;

	// Constructor que recibe la conexión a la base de datos
	public function __construct($conn)
	{
		$this->conn = $conn;
	}

	// Métodos para manejar usuarios

	// Añade un nuevo usuario
	public function addUsuario($data)
	{
		if (!isset($data['usr_name']) || !isset($data['usr_email']) || !isset($data['usr_pass'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$usr_name = $data['usr_name'];
			$usr_email = $data['usr_email'];
			$usr_pass = password_hash($data['usr_pass'], PASSWORD_DEFAULT);
			try {
				$query = "INSERT INTO usuario (usr_name, usr_email, usr_pass) VALUES ('$usr_name', '$usr_email', '$usr_pass')";
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

	// Iniciar sesión de usuario
	public function loginUsuario($data)
	{
		if (!isset($data['usr_email']) || !isset($data['usr_pass'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$usr_email = $data['usr_email'];
			$usr_pass = $data['usr_pass'];
			$query = "SELECT * FROM usuario WHERE usr_email = '$usr_email'";
			$result = mysqli_query($this->conn, $query);
			if (mysqli_num_rows($result) > 0) {
				$usuario = mysqli_fetch_assoc($result);
				if (password_verify($usr_pass, $usuario['usr_pass'])) {
					//return $usuario; // Retorna el usuario si las credenciales son correctas
					$usr_key = md5($usuario['usr_email'] . $usuario['usr_pass'] . time()); // Genera una clave de usuario
					// registro la key en la base de datos
					// verifico si ya existe un token para este usuario
					$query = "SELECT * FROM access_token WHERE id_usuario = " . $usuario['id'];
					$result = mysqli_query($this->conn, $query);
					if (mysqli_num_rows($result) > 0) {
						// Si existe, lo actualizo
						$query = "UPDATE access_token SET token = '$usr_key', fecha_creado = NOW(), fecha_vencimiento = DATE_ADD(NOW(), INTERVAL 12 HOUR) WHERE id_usuario = " . $usuario['id'];
					} else {
						// Si no existe, lo inserto
						$query = "INSERT INTO access_token(id_usuario, token) VALUES(" . $usuario['id'] . ", '$usr_key')";
					}
					$result = mysqli_query($this->conn, $query);
					if ($result) {
						http_response_code(200);
						return json_encode(["success" => [$usuario['usr_name'], $usr_email, $usr_key]]);
					} else {
						http_response_code(500);
						return json_encode(["error" => "Error al generar el token"]);
					}
				} else {
					http_response_code(400);
					return json_encode(["error" => "Contraseña incorrecta"]);
				}
			} else {
				http_response_code(400);
				return json_encode(["error" => "Usuario no encontrado"]);
			}
		}
	}


	public function getUsuario($data){
		if (!isset($data['token'])) {
			http_response_code(400);
			return json_encode(["error" => "Datos incompletos"]);
		} else {
			$token = $data['token'];
			$query = "SELECT u.usr_name, u.usr_email
                FROM usuario u
                INNER JOIN access_token t ON u.id = t.id_usuario
                WHERE t.token = '$token'";
			$result = mysqli_query($this->conn, $query);
			if ($result && mysqli_num_rows($result) > 0) {
				http_response_code(200);
				return json_encode(mysqli_fetch_assoc($result));
			} else {
				http_response_code(404);
				return json_encode(["error" => "Usuario no encontrado"]);
			}
		}
	}

	public function logoutUsuario($key)
	{
		// Por ejemplo, eliminar el token de la base de datos
		$query = "DELETE FROM access_token WHERE token = '$key'";
		$result = mysqli_query($this->conn, $query);
		if ($result) {
			return true; // Sesión cerrada correctamente
		} else {
			return false; // Error al cerrar sesión
		}
	}
}
