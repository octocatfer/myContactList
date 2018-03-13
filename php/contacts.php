<?php
try {
  $request = $_SERVER['REQUEST_METHOD'];
  require '../source/dbc.php';

  $sql = "SELECT nombre, telefono, correo, DATE_FORMAT(agregado, '%d/%m/%Y') AS agregado FROM contactos";

  if ($request == 'POST') {
    $sql .= ' WHERE correo = ?';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(1, $_POST['correo'], PDO::PARAM_STR);
    $stmt->execute();
  } else {
    $stmt = $db->query($sql);
  }

  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
  /*
  if ($request == 'GET') {
    for ($i = 0; $i < count($data); $i++) {
      unset($data[$i]['id_contacto']);
    }
  }
  */
  echo json_encode($data);
} catch (Exception $e) {
  echo json_encode(
    [
      'number' => 0,
      'desc' => $e->getMessage()
    ]
  );
}
