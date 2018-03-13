<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  try {
    require '../source/dbc.php';
    $sql = 'UPDATE contactos SET nombre = ?, telefono = ?, correo = ?
            WHERE correo = ?';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(1, $_POST['name'], PDO::PARAM_STR);
    $stmt->bindParam(2, $_POST['phone'], PDO::PARAM_STR);
    $stmt->bindParam(3, $_POST['email'], PDO::PARAM_STR);
    $stmt->bindParam(4, $_POST['btnEdit'], PDO::PARAM_STR);
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
          'desc' => 'Contacto actualizado!'
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
