<?php
/* API RESTful para gestionar usuarios
 * Permite operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 * Requiere conexión a una base de datos MySQL
 */

// Importa las dependencias necesarias
require_once 'config.php';
require_once 'partida.php';

// Crea la instance de la clase Partida
$partidaObj = new Partida($conn);
// Obtiene el método de la solicitud HTTP
$method = $_SERVER['REQUEST_METHOD'];
// Obtiene el endpoint de la solicitud
$endpoint = $_SERVER['PATH_INFO'];
// Establece el tipo de contenido de la respuesta (json)
header('Content-Type: application/json');

// Procesa la solicitud según el método HTTP
switch ($method) {
	case 'POST':
		if ($endpoint === '/getpartidas') {
			// Obtiene la lista de partidas
			$data = json_decode(file_get_contents('php://input'), true);
			$result = $partidaObj->getPartidas($data);
			echo $result;
		}elseif($endpoint === '/addpartida') {
			// Crea una nueva partida
			$data = json_decode(file_get_contents('php://input'), true);
			$result = $partidaObj->addPartida($data);
			echo $result;
		}
		break;
	default:
		// Maneja métodos no permitidos
		header('Allow: GET, POST, PUT, DELETE');
		http_response_code(405);
		echo json_encode(['error' => 'Método no permitido']);
		break;
}
?>