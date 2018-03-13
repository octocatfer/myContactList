<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  try {
    require '../source/dbc.php';
    $sql = 'DELETE FROM contactos WHERE correo = ?';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(1, $_POST['btnDelete'], PDO::PARAM_STR);
    $stmt->execute();

    $error = $stmt->errorInfo();

    if ($stmt->rowCount() == 0) {
      echo json_encode(
        [
          'number' => 0,
          'desc' => $error[2]
        ]
      );
    } else {
      echo json_encode(
        [
          'number' => 1,
          'desc' => 'Contacto eliminado!'
        ]
      );
    }
  } catch (Exception $e) {
    echo json_encode(
      [
        'number' => 0,
        'desc' => $e->getMessage()
      ]
    );
  }
}
