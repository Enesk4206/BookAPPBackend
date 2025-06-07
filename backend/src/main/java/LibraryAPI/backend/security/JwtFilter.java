package LibraryAPI.backend.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import LibraryAPI.backend.service.CustomUserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter  {
    private final JwtTokenUtil jwtTokenUtil;
    private final CustomUserService customUserService;
    @Override
    protected void doFilterInternal(
        HttpServletRequest req,
        HttpServletResponse res,
        FilterChain chain
    ) throws ServletException, java.io.IOException{
        final String authHeader = req.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            chain.doFilter(req, res);
            return;
        }
        String token = authHeader.substring(7);
        if(!jwtTokenUtil.validateToken(token)){
            chain.doFilter(req, res);
            return;
        }
        
        String username = jwtTokenUtil.extractUsername(token);
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
            userDetails,
            null,
            userDetails.getAuthorities()

        );
        auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
        SecurityContextHolder.getContext().setAuthentication(auth);
        chain.doFilter(req, res);

    }

}
