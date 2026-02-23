# API de Hábitos 

Backend desarrollado con:

- Node.js
- Express
- MongoDB
- Mongoose

## Endpoints

GET /api/habitos  
POST /api/habitos  
PUT /api/habitos/:id  
DELETE /api/habitos/:id

## Instalación de dependencias

npm install  
npm start

## Crear archivo .env
Crear un archivo .env en la raíz:
MONGO_URI=tu_cadena_de_conexion

## Ejecutar el servidor
npm start
Servidor en: http://localhost:3000

## Crear habito 
Crear habito en Postman, seleccionar post, body,  pegar este codigo: {
  "nombre": "Leer 10 minutos",
  "descripcion": "Hábito de lectura diaria"
}

## Obtener habito 
GET → /api/habitos

## Actualizar habito
PUT → /api/habitos/:id
## Eliminar habito
DELETE → /api/habitos/:id

## Autor
Emerio Lucero 


SUBIR EL README A GITHUB

En la terminal:

```bash
git add README.md
git commit -m "Agrega README semana 1"
git push
