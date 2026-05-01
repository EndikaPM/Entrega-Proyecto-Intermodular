FROM eclipse-temurin:21-jre-jammy

WORKDIR /app

# Copiamos el JAR específico del chat
COPY target/Chat-0.0.1-SNAPSHOT.jar app.jar

# Exponemos un puerto diferente para evitar conflictos
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
