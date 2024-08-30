plugins {
    java
    id("org.springframework.boot") version "3.3.3"
    id("io.spring.dependency-management") version "1.1.6"
    id("org.siouan.frontend-jdk21") version "8.1.0"
}

group = "cz.scrumdojo"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

frontend {
    cacheDirectory.set(project.layout.projectDirectory.dir(".gradle/org.siouan.frontend-jdk21"))
    nodeVersion.set("22.7.0")
    nodeInstallDirectory.set(project.layout.projectDirectory.dir("../frontend/node"))
    packageJsonDirectory.set(project.layout.projectDirectory.dir("../frontend"))
    assembleScript.set("run build")
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.postgresql:postgresql")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
    jvmArgs("-XX:+EnableDynamicAgentLoading")
}

tasks.register("testE2E") {
    dependsOn("build")
    doLast {
        val backendProcess = ProcessBuilder("java", "-jar", "*.jar").start()

        val process = ProcessBuilder("pnpm", "run", "test:e2e")
            .directory(file("../frontend"))
            .start()

        process.inputStream.bufferedReader().lines().forEach { line -> println(line) }
        process.errorStream.bufferedReader().lines().forEach { line -> println(line) }

        process.waitFor()
        backendProcess.destroy()
    }
}
