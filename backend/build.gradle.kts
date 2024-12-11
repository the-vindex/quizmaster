import java.io.BufferedReader

import org.siouan.frontendgradleplugin.infrastructure.gradle.RunPnpm
import org.springframework.boot.gradle.tasks.bundling.BootJar

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
    nodeVersion.set("22.12.0")
    nodeInstallDirectory.set(project.layout.projectDirectory.dir("../frontend/node"))
    packageJsonDirectory.set(project.layout.projectDirectory.dir("../frontend"))
    assembleScript.set("run build")
    checkScript.set("check")
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
    implementation("org.apache.commons:commons-lang3")
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

fun featureFlag(): Boolean {
    return System.getenv("FEATURE_FLAG")?.toBoolean() ?: false
}

sourceSets {
    main {
        resources {
            if (!featureFlag()) exclude("feature-flag.properties")
        }
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
    jvmArgs("-XX:+EnableDynamicAgentLoading")
}

tasks.named("installFrontend") {
    finalizedBy("installPlaywright")
}

tasks.register<RunPnpm>("installPlaywright") {
    script.set("playwright:install")
}

fun jarFile(): String {
    return tasks.named<BootJar>("bootJar").get().archiveFile.get().asFile.relativeTo(projectDir).path
}

var backendProcess: Process? = null
var backendThread: Thread? = null

fun redirectIO(reader: BufferedReader?) {
    reader?.lines()?.forEach { line -> println(line) }
}

tasks.register("runBackend") {
    dependsOn("build")
    doLast {
        backendProcess = ProcessBuilder("java", "-jar", jarFile()).start()

        backendThread = Thread {
            redirectIO(backendProcess?.inputReader())
            redirectIO(backendProcess?.errorReader())
        }
        backendThread?.start()
    }
}

tasks.register<RunPnpm>("runE2ETests") {
    script.set("run test:e2e")
    finalizedBy("killBackend")
}

tasks.register("killBackend") {
    doLast {
        backendProcess?.destroy()
        backendThread?.join()
    }
}

tasks.register("testE2E") {
    dependsOn("runBackend", "runE2ETests")
}

tasks.register<Exec>("buildDockerImage") {
    dependsOn("bootJar")
    val jarFile = jarFile().replace("\\", "/")
    commandLine("docker", "build", "--build-arg", "JAR_FILE=$jarFile", "-t", "quizmaster:latest", ".")
}
