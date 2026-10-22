FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY Main.java .
RUN javac Main.java

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/Main.class .
ENV PORT=8080
EXPOSE 8080
CMD ["java", "-cp", "/app", "Main"]
