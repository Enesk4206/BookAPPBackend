package LibraryAPI.backend.security;

import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenUtil {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;

    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
        .setSubject(userDetails.getUsername())
        .claim("authorities",
            userDetails.getAuthorities()
                .stream().map(
                    GrantedAuthority::getAuthority
                ).collect(Collectors.toList())
        )
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + expiration))
        .signWith(getKey(),SignatureAlgorithm.HS256 )
        .compact();
    }

    public String extractUsername(String token){
        return Jwts.parserBuilder()
        .setSigningKey(getKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();

    }

        public boolean validateToken(String token){
            try {
                Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
}
