##Práctica Módulo Nodejs 

###Nodepop

  Para esta práctica se nos ha pedido la realización de una api a la que realizaremos una serie de peticiones.
  
  Se ha creado un script `install_db.js`que llevará a cabo la inicialización de la base de datos.
  
  Los llamadas que podemos realizar son las siguientes:
  
| LLamada     | Resultado | Opciones Llamada|
| -------     | --------- | -------- |
| GET /apiV1/ads    | Obtenemos lista anuncios |
| GET /apiV1/ads/filtros | Filtramos la lista de anuncios | Query: limit, sort, start, price, name, photo, tags, sale. |
| GET /apiV1/photo.png | Sirve fichero estático foto. | |
| POST /apiV1/users/register | Registramos usuario en base de datos | Body: email, password, name |
| POST /apiV1/users | Recibimos token | Body: email, password |

  Para ver los anuncios se usa un método de autenticación por jsonWebTokens el cual se puede pasar por medio de una query o mediante la cabecera.  
  
  Se ha llevado a cabo la internacionalización de los mensajes de error con `i18n`, la estructura que se ha seguido para la visualización de los mensajes es un json con la estructura { success, menssage, status }.
  
  
  La conexión usa el protocolo HTTPS para que sea segura y usamos un cluster para la API.
  
  Durante el desarrollo de la práctica se ha usado con un conjunto de herramientas sencillas `eslint`.