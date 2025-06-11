package LibraryAPI.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import LibraryAPI.backend.security.JwtFilter;
import LibraryAPI.backend.service.CustomUserService;
import lombok.RequiredArgsConstructor;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomUserService customUserService;
    private final JwtFilter jwtFilter;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
        .cors()
        .and()
        .csrf(csrf ->csrf.disable())
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/book-images/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/book/**").hasAnyRole("ADMIN","USER")
            .requestMatchers(HttpMethod.POST, "/api/book/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/book/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/book/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.GET, "/api/genre/**").hasAnyRole("ADMIN","USER")
            .requestMatchers(HttpMethod.POST, "/api/genre/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/genre/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/genre/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.GET, "/api/author/**").hasAnyRole("ADMIN","USER")
            .requestMatchers(HttpMethod.POST, "/api/author/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.PUT, "/api/author/**").hasAnyRole("ADMIN")
            .requestMatchers(HttpMethod.DELETE, "/api/author/**").hasAnyRole("ADMIN")
            .anyRequest().authenticated()
        )
        .userDetailsService(customUserService)
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    } 


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception{
        return http
        .getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(customUserService)
        .passwordEncoder(passwordEncoder())
        .and()
        .build();
    }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/book-images/**");
    }
    
}
