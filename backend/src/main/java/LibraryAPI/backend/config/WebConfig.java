package LibraryAPI.backend.config;

import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uplaodDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registery){
        
        String absolutePath = Paths.get(uplaodDir).toAbsolutePath().toUri().toString();
        registery.addResourceHandler("/book-images/**").addResourceLocations(absolutePath);
    }
    
}
