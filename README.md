# zip-hider

🖼️ **Zip Hider** - Aplicación web para ocultar archivos ZIP dentro de imágenes de forma segura y privada.

## 📋 Descripción

Este proyecto es una aplicación web desarrollada con React que permite combinar archivos ZIP con imágenes, ocultando el ZIP dentro de la imagen (similar al comando `copy/b` de Windows).

## 🌐 Live Demo

<https://zip-hider.ismola.dev/>

**Características principales:**

- ✅ Procesamiento 100% del lado del cliente (sin backend)
- ✅ No se almacenan archivos en ningún servidor
- ✅ Privacidad total - todo se procesa en tu navegador
- ✅ Fácil de desplegar con Docker Compose
- ✅ Interfaz intuitiva y moderna

## 🚀 Cómo funciona

1. Seleccionas una imagen (JPG, PNG, etc.)
2. Seleccionas un archivo ZIP
3. La aplicación combina ambos archivos concatenando sus datos binarios
4. Descargas la imagen resultante que contiene el ZIP oculto

La imagen resultante:

- Se puede abrir y visualizar normalmente como cualquier imagen
- Contiene el archivo ZIP oculto al final
- Para extraer el ZIP, simplemente cambia la extensión del archivo a `.zip`

## 🛠️ Instalación y Uso

### Opción 1: Con Docker Compose (Recomendado)

1. Clona el repositorio:

```bash
git clone https://github.com/Ismola/zip-hider.git
cd zip-hider
```

1. Inicia la aplicación:

```bash
docker-compose up -d
```

1. Accede a la aplicación en tu navegador:

```
http://localhost
```

Para detener la aplicación:

```bash
docker-compose down
```

### Opción 2: Desarrollo Local

1. Clona el repositorio:

```bash
git clone https://github.com/Ismola/zip-hider.git
cd zip-hider/client
```

1. Instala las dependencias:

```bash
npm install
```

1. Inicia el servidor de desarrollo:

```bash
npm start
```

1. Accede a la aplicación en:

```
http://localhost:3000
```

## 📦 Construcción para Producción

```bash
cd client
npm run build
```

Los archivos optimizados se generarán en la carpeta `client/build/`.

## 🔒 Seguridad y Privacidad

- **Sin backend**: No hay servidor que procese o almacene tus archivos
- **Sin base de datos**: No se guarda ninguna información
- **Procesamiento local**: Todo se ejecuta en tu navegador
- **Sin telemetría**: No se envían datos a servicios externos

## 🌐 Tecnologías

- **Frontend**: React 18
- **Estilos**: CSS3
- **Contenedores**: Docker & Docker Compose
- **Servidor web**: Nginx (para producción)

## 📖 Uso de la Imagen Resultante

### Para ver la imagen

- Abre el archivo normalmente con cualquier visor de imágenes

### Para extraer el ZIP

1. Cambia la extensión del archivo de `.jpg` (o la que sea) a `.zip`
2. Extrae el archivo ZIP con tu programa favorito (WinRAR, 7-Zip, etc.)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Ismola**

## ⚠️ Aviso Legal

Esta herramienta está diseñada para uso legítimo de ocultación de datos. El autor no se hace responsable del uso indebido de esta aplicación.
