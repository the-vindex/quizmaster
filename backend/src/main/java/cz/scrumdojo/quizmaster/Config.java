package cz.scrumdojo.quizmaster;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class Config implements WebMvcConfigurer {

    /** Resolves to index.html any request that does not match a REST endpoint or a static resource. */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/**")
            .addResourceLocations("classpath:/static/**")
            .resourceChain(true)
            .addResolver(new ResourceResolver());
    }
}
