<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  try {
    require '../source/dbc.php';
    $sql = 'INSERT INTO contactos (nombre, telefono, correo, agregado)
            VALUES (?, ?, ?, NOW())';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(1, $_POST['name'], PDO::PARAM_STR);
    $stmt->bindParam(2, $_POST['phone'], PDO::PARAM_STR);
    $stmt->bindParam(3, $_POST['email'], PDO::PARAM_STR);
    $stmt->execute();

    $error = $stmt->errorInfo();

    if ($stmt->rowCount() == 0) {
      echo json_encode(
        [
          'number' => 0,
          'desc' => $error[0]
        ]
      );
    } else {
      echo json_encode(
        [
          'number' => 1,
          'desc' => 'Nuevo contacto agregado!'
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
