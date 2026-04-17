#Imagen base de Java 25
FROM eclipse-temurin:21-jdk-jammy

#Creamos la carpeta de trabajo
WORKDIR /timely

# Copiamos el JAR desde tu carpeta target local a la carpeta /app del contenedor
# Usamos el asterisco para que no importe si cambias la versión del JAR
COPY target/ProyectoTimely-0.0.1-SNAPSHOT.jar timely.jar

#Exponemos el puerto de la Api
EXPOSE 8081

#Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]