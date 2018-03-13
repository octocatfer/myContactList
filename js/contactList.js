window.onload = function() {
  allContacts();

  var btnNew = document.getElementById('btn-new');
  btnNew.addEventListener('click', function() {
    // Creando el titulo del formulario
    var titleForm = document.createElement('h2');
    titleForm.append(document.createTextNode('Nuevo contacto'));

    // Creando un mensaje para el formulario
    var msgForm = document.createElement('p');
    msgForm.append(document.createTextNode('Llenar los campos correspondentes'));
    msgForm.id = "msg";

    // Creando etiqueta nombre
    var nameLabel = document.createElement('label');
    nameLabel.append(document.createTextNode('Nombre'));
    nameLabel.setAttribute('for', 'name');

    // Creando el campo nombre
    var nameField = document.createElement('input');
    nameField.id = 'name';
    nameField.type = 'text';

    // Agregando el campo nombre a un nuevo elemento
    var divNameField = document.createElement('div');
    divNameField.setAttribute('class', 'field');
    divNameField.append(nameLabel);
    divNameField.append(nameField);

    // Creando etiqueta telefono
    var phoneLabel = document.createElement('label');
    phoneLabel.append(document.createTextNode('Telefono'));
    phoneLabel.setAttribute('for', 'phone');

    // Creando el campo telefono
    var phoneField = document.createElement('input');
    phoneField.id = 'phone';
    phoneField.type = 'text';

    // Agregando el campo telefono a un nuevo elemento
    var divPhoneField = document.createElement('div');
    divPhoneField.setAttribute('class', 'field');
    divPhoneField.append(phoneLabel);
    divPhoneField.append(phoneField);

    // Creando etiqueta correo
    var emailLabel = document.createElement('label');
    emailLabel.append(document.createTextNode('Correo electronico'));
    emailLabel.setAttribute('for', 'email');

    // Creando el campo correo
    var emailField = document.createElement('input');
    emailField.id = 'email';
    emailField.type = 'text';

    // Agregando el campo correo a un nuevo elemento
    var divEmailField = document.createElement('div');
    divEmailField.setAttribute('class', 'field');
    divEmailField.append(emailLabel);
    divEmailField.append(emailField);

    // Creando el boton de guardar
    var btnSaveContact = document.createElement('button');
    btnSaveContact.append(document.createTextNode('Guardar'));
    btnSaveContact.id = "btn-save";

    // Creando el boton de cancelar
    var btnCancelContact = document.createElement('button');
    btnCancelContact.append(document.createTextNode('Cancelar'));
    btnCancelContact.id = "btn-cancel";

    // Agregando el boton guardar a un nuevo elemento
    var divBtnField = document.createElement('div');
    divBtnField.setAttribute('class', 'btn-fields');
    divBtnField.append(btnSaveContact);
    divBtnField.append(btnCancelContact);

    // Agregando todos los elementos al formulario
    var formNewContact = document.createElement('form');
    formNewContact.setAttribute('class', 'boxForm');
    formNewContact.append(titleForm);
    formNewContact.append(msgForm);
    formNewContact.append(divNameField);
    formNewContact.append(divPhoneField);
    formNewContact.append(divEmailField);
    formNewContact.append(divBtnField);

    // Agregando el formulario al overlay
    var divOverlay = document.createElement('div');
    divOverlay.id = "overlay";
    divOverlay.setAttribute('class', 'overlayBox');
    divOverlay.append(formNewContact);

    // Agregando el overlay a la pagina
    var content = document.getElementById('content');
    content.parentElement.append(divOverlay);

    // Agregando funcionalidad al boton de Guardar
    var btnSave = document.getElementById('btn-save');
    btnSave.addEventListener('click', function(e) {
      e.preventDefault();

      var nameValue = document.getElementById('name').value;
      var phoneValue = document.getElementById('phone').value;
      var emailValue = document.getElementById('email').value;
      var data = 'name=' + nameValue + '&phone=' + phoneValue + '&email=' + emailValue;

      var ajax = new XMLHttpRequest();
      ajax.open('post', 'php/add.php');
      ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      ajax.onreadystatechange = function() {
        if (ajax.status == 200 && ajax.readyState == 4) {
          var dataResponse = JSON.parse(ajax.response);

          if (dataResponse.number == 0) {
            var msg = document.getElementById('msg');
            if (dataResponse.desc == 23000) {
              msg.innerText = 'El contacto ya existe!';
            } else {
              msg.innerText = 'No se pudo agregar, intentelo mas tarde';
            }
            console.log("Error: " + dataResponse.number);
            console.log("Desc: " + dataResponse.desc);
          } else {
            var msg = document.getElementById('description');
            msg.innerText = dataResponse.desc;
            content.parentElement.removeChild(content.parentElement.lastChild);
            allContacts();
          }
        }
      }
      ajax.send(data);
    });

    // Agregando funcionalidad al boton de Cancelar
    var btnCancel = document.getElementById('btn-cancel');
    btnCancel.addEventListener('click', function(e) {
      e.preventDefault();
      content.parentElement.removeChild(content.parentElement.lastChild);
    });
  });
}

function allContacts() {
  var tblData = new XMLHttpRequest();
  tblData.open('get', 'php/contacts.php');
  tblData.onreadystatechange = function() {
    if (tblData.status == 200 && tblData.readyState == 4) {
      var dataResponse = JSON.parse(tblData.response);
      //console.log(dataResponse);
      var numberOfContacts = dataResponse.length;
      var nc = document.getElementById('contacts');
      nc.innerHTML = 'Existen <b>' + numberOfContacts + '</b> contactos';

      var tblList = document.getElementById('tbl-list');
      var tblListRows = '<table id="contactList">';
      tblListRows += '<th>Nombre</th>';
      tblListRows += '<th>Telefono</th>';
      tblListRows += '<th>Correo</th>';
      tblListRows += '<th>Agregado</th>';
      tblListRows += '<th colspan="2">Opciones</th>';
      for (var i = 0; i < numberOfContacts; i++) {
        tblListRows += '<tr>';
        tblListRows += '<td>' + dataResponse[i].nombre + '</td>';
        tblListRows += '<td>' + dataResponse[i].telefono + '</td>';
        tblListRows += '<td>' + dataResponse[i].correo + '</td>';
        tblListRows += '<td>' + dataResponse[i].agregado + '</td>';
        tblListRows += '<td><button value="' + dataResponse[i].correo + '">Editar</button></td>';
        tblListRows += '<td><button value="' + dataResponse[i].correo + '">Eliminar</button></td>';
        tblListRows += '</tr>';
      }
      tblListRows += '</table>';
      tblList.innerHTML = tblListRows;

      var contactList = document.getElementById('contactList');
      contactList.addEventListener('click', function(e) {
        var typeAction = e.target.innerHTML.toLowerCase();
        var dataValue = e.target.value;

        if (typeAction == "editar") {
          getSingleContact(dataValue);
        } else if (typeAction == "eliminar") {
          getModal(dataValue);
        }
      });
    }
  }
  tblData.send();
}

function getSingleContact(value) {
  var editForm = new XMLHttpRequest();
  editForm.open('post', 'php/contacts.php');
  editForm.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  editForm.onreadystatechange = function() {
    if (editForm.status == 200 && editForm.readyState == 4) {
      var dataResponse = JSON.parse(editForm.response);
      getEditForm(dataResponse[0]);
    }
  }
  editForm.send("correo=" + value);
}

function getModal(data) {
  // Creando el titulo del mensaje
  var titleForm = document.createElement('h2');
  titleForm.append(document.createTextNode('Eliminar contacto'));

  // Creando la descripcion del mensaje
  var descForm = document.createElement('p');
  descForm.append(document.createTextNode('¿Desea eliminar este contacto?'));
  descForm.id = "msg";

  // Creando el boton de aceptar
  var btnOKContact = document.createElement('button');
  btnOKContact.append(document.createTextNode('Aceptar'));
  btnOKContact.id = "btn-ok";
  btnOKContact.value = data;

  // Creando el boton de cancelar
  var btnCancelContact = document.createElement('button');
  btnCancelContact.append(document.createTextNode('Cancelar'));
  btnCancelContact.id = "btn-cancel";

  // Agregando el boton guardar a un nuevo elemento
  var divBtnField = document.createElement('div');
  divBtnField.setAttribute('class', 'btn-fields');
  divBtnField.append(btnOKContact);
  divBtnField.append(btnCancelContact);

  // Agregando todos los elementos a un div
  var boxDelete = document.createElement('div');
  boxDelete.setAttribute('class', 'boxForm');
  boxDelete.append(titleForm);
  boxDelete.append(descForm);
  boxDelete.append(divBtnField);

  // Agregando el formulario al overlay
  var divOverlay = document.createElement('div');
  divOverlay.id = "overlay";
  divOverlay.setAttribute('class', 'overlayBox');
  divOverlay.append(boxDelete);

  // Agregando el overlay a la pagina
  var content = document.getElementById('content');
  content.parentElement.append(divOverlay);

  // Agregando funcionalidad a boton de aceptar
  var btnOK = document.getElementById('btn-ok');
  btnOK.addEventListener('click', function() {
    var data = 'btnDelete=' + btnOK.value;
    var ajax = new XMLHttpRequest();
    ajax.open('post', 'php/remove.php');
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function() {
      if (ajax.status == 200 && ajax.readyState == 4) {
        var dataResponse = JSON.parse(ajax.response);

        if (dataResponse.number == 0) {
          var msg = document.getElementById('msg');
          msg.innerText = 'No se pudo eliminar, intentelo mas tarde';
          console.log("Error: " + dataResponse.number);
          console.log("Desc: " + dataResponse.desc);
        } else {
          var msg = document.getElementById('description');
          msg.innerText = dataResponse.desc;
          content.parentElement.removeChild(content.parentElement.lastChild);
          allContacts();
        }
      }
    }
    ajax.send(data);
  });

  // Agregando funcionalidad al boton de Cancelar
  var btnCancel = document.getElementById('btn-cancel');
  btnCancel.addEventListener('click', function() {
    content.parentElement.removeChild(content.parentElement.lastChild);
  });
}

function getEditForm(editData) {
  // Creando el titulo del formulario
  var titleForm = document.createElement('h2');
  titleForm.append(document.createTextNode('Editar contacto'));

  // Creando un mensaje para el formulario
  var msgForm = document.createElement('p');
  msgForm.append(document.createTextNode(''));
  msgForm.id = "msg";

  // Creando etiqueta nombre
  var nameLabel = document.createElement('label');
  nameLabel.append(document.createTextNode('Nombre'));
  nameLabel.setAttribute('for', 'name');

  // Creando el campo nombre
  var nameField = document.createElement('input');
  nameField.id = 'name';
  nameField.type = 'text';
  nameField.value = editData.nombre;

  // Agregando el campo nombre a un nuevo elemento
  var divNameField = document.createElement('div');
  divNameField.setAttribute('class', 'field');
  divNameField.append(nameLabel);
  divNameField.append(nameField);

  // Creando etiqueta telefono
  var phoneLabel = document.createElement('label');
  phoneLabel.append(document.createTextNode('Telefono'));
  phoneLabel.setAttribute('for', 'phone');

  // Creando el campo telefono
  var phoneField = document.createElement('input');
  phoneField.id = 'phone';
  phoneField.type = 'text';
  phoneField.value = editData.telefono;

  // Agregando el campo telefono a un nuevo elemento
  var divPhoneField = document.createElement('div');
  divPhoneField.setAttribute('class', 'field');
  divPhoneField.append(phoneLabel);
  divPhoneField.append(phoneField);

  // Creando etiqueta correo
  var emailLabel = document.createElement('label');
  emailLabel.append(document.createTextNode('Correo electronico'));
  emailLabel.setAttribute('for', 'email');

  // Creando el campo correo
  var emailField = document.createElement('input');
  emailField.id = 'email';
  emailField.type = 'text';
  emailField.value = editData.correo;

  // Agregando el campo correo a un nuevo elemento
  var divEmailField = document.createElement('div');
  divEmailField.setAttribute('class', 'field');
  divEmailField.append(emailLabel);
  divEmailField.append(emailField);

  // Creando el boton de editar
  var btnEditContact = document.createElement('button');
  btnEditContact.append(document.createTextNode('Editar'));
  btnEditContact.id = "btn-edit";
  btnEditContact.value = editData.correo;

  // Creando el boton de cancelar
  var btnCancelContact = document.createElement('button');
  btnCancelContact.append(document.createTextNode('Cancelar'));
  btnCancelContact.id = "btn-cancel";

  // Agregando el boton guardar a un nuevo elemento
  var divBtnField = document.createElement('div');
  divBtnField.setAttribute('class', 'btn-fields');
  divBtnField.append(btnEditContact);
  divBtnField.append(btnCancelContact);

  // Agregando todos los elementos al formulario
  var formNewContact = document.createElement('form');
  formNewContact.setAttribute('class', 'boxForm');
  formNewContact.append(titleForm);
  formNewContact.append(msgForm);
  formNewContact.append(divNameField);
  formNewContact.append(divPhoneField);
  formNewContact.append(divEmailField);
  formNewContact.append(divBtnField);

  // Agregando el formulario al overlay
  var divOverlay = document.createElement('div');
  divOverlay.id = "overlay";
  divOverlay.setAttribute('class', 'overlayBox');
  divOverlay.append(formNewContact);

  // Agregando el overlay a la pagina
  var content = document.getElementById('content');
  content.parentElement.append(divOverlay);

  // Agregando funcionalidad al boton de Editar
  var btnEdit = document.getElementById('btn-edit');
  btnEdit.addEventListener('click', function(e) {
    e.preventDefault();

    var nameValue = document.getElementById('name').value;
    var phoneValue = document.getElementById('phone').value;
    var emailValue = document.getElementById('email').value;
    var data = 'name=' + nameValue + '&phone=' + phoneValue + '&email=' + emailValue;
    data += '&btnEdit=' + btnEdit.value;

    var ajax = new XMLHttpRequest();
    ajax.open('post', 'php/modify.php');
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ajax.onreadystatechange = function() {
      if (ajax.status == 200 && ajax.readyState == 4) {
        var dataResponse = JSON.parse(ajax.response);

        if (dataResponse.number == 0) {
          var msg = document.getElementById('msg');
          if (dataResponse.desc == 23000) {
            msg.innerText = 'El contacto ya existe!';
          } else {
            msg.innerText = 'No se pudo agregar, intentelo mas tarde';
          }
          console.log("Error: " + dataResponse.number);
          console.log("Desc: " + dataResponse.desc);
        } else {
          var msg = document.getElementById('description');
          msg.innerText = dataResponse.desc;
          content.parentElement.removeChild(content.parentElement.lastChild);
          allContacts();
        }
      }
    }
    ajax.send(data);
  });

  // Agregando funcionalidad al boton de Cancelar
  var btnCancel = document.getElementById('btn-cancel');
  btnCancel.addEventListener('click', function(e) {
    e.preventDefault();
    content.parentElement.removeChild(content.parentElement.lastChild);
  });
}
