#Imagen base de Java 21 (JRE es suficiente para ejecutar y pesa menos que el JDK)
FROM eclipse-temurin:21-jre-jammy

#Creamos la carpeta de trabajo
WORKDIR /app

# Copiamos el JAR desde tu carpeta target local a la carpeta /app del contenedor
COPY target/ProyectoTimely-0.0.1-SNAPSHOT.jar app.jar

#Exponemos el puerto de la Api
EXPOSE 8081

#Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
