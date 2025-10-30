#!bin/bash

echo "USE Sistematizacion-de-datos" > backup_script.sql
echo "SELECT * FROM Usuarios;" >> backup_script.sql
mysql -u root -p < backup_script.sql

while ["$done != "true"]; do
echo "1- Insertar usuario"
echo "2- Eliminar usuario"
echo "3- Modificar usuario"
echo "4- Salir"
echo "Eliga una opcion: "
read option

switch $option in
1)
echo "Ingrese el nombre del usuario: "
read nombre
echo "Ingrese el apellido del usuario: "
read apellido
echo "Ingrese la contraseña del usuario: "
read contraseña
echo "Ingrese la cedula del usuario: "
read ci
echo "INSERT INTO Usuarios (nombre, apellido, contrasena, ci) VALUES ('$nombre', '$apellido', '$contraseña', '$ci');" > add_script.sql
mysql -u root -p < add_script.sql
;;

2)
echo "Ingrese la cedula del usuario a eliminar: "
read ci
echo "DELETE FROM Usuarios WHERE ci = '$ci';" > delete_script.sql
mysql -u root -p < delete_script.sql
;;

3)
echo "Ingrese la cedula del usuario a modificar: "
read ci
echo "a- Modificar nombre"
echo "b- Modificar apellido"
echo "c- Modificar contraseña"
echo "Eliga una opcion: "
read opcion_mod

case $opcion_mod in
a) echo "Ingrese el nuevo nombre: "
   read nuevo_nombre
   echo "UPDATE Usuarios SET nombre = '$nuevo_nombre' WHERE ci = '$ci';" > update_script.sql
b) echo "Ingrese el nuevo apellido: "
   read nuevo_apellido
   echo "UPDATE Usuarios SET apellido = '$nuevo_apellido' WHERE ci = '$ci';" > update_script.sql
c) echo "Ingrese la nueva contraseña: "
   read nueva_contraseña
   echo "UPDATE Usuarios SET contrasena = '$nueva_contraseña' WHERE ci = '$ci';" > update_script.sql
*) echo "Opcion invalida"
;;
esac
mysql -u root -p < update_script.sql
;;

4)
echo "Saliendo..."
done="true"
break
;;
*)
echo "Opcion invalida"
;;
esac
done