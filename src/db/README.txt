El JSON de la BD tendrá un arreglo de objetos. Cada objeto es un producto

La BD va a estar subida a una url para después poder hacer un fetch (petición). 
Haremos un fetch a un servidor externo

Utilizaremos la página 

    https://myjson.dit.upm.es/

Ahí compiamos este .json y le damos a guardar. Ya ese .json no se puede modificar, no puedo añadir nuevos productos

Compio la url que me devuelve (es una URI) 

    http://myjson.dit.upm.es/api/bins/3lwz

Si pongo eso en el navegador me devuelve un .json 
Es como el resultado que retorna una API luego de hacer una petición

Ese URI lo guardaré en carpeta 

    utils/constants.js

Ya tenemos la BD creada, el .json NO lo vamos a usar, solo lo guardamos ahí por si acaso

Usaremos es lo que nos devuelva la páguna en myjson así simulamos las peticions http

Las imagenes de los productos van en

    public/img/img

(La carpeta _MACOSX no importa, pero no la puedo borrar por permisos de administrador)