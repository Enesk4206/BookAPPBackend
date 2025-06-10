package LibraryAPI.backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import LibraryAPI.backend.dto.LoginRequest;
import LibraryAPI.backend.dto.LoginResponse;
import LibraryAPI.backend.dto.ProfileResponse;
import LibraryAPI.backend.dto.RegisterRequest;
import LibraryAPI.backend.model.Role;
import LibraryAPI.backend.model.User;
import LibraryAPI.backend.repository.UserRepository;
import LibraryAPI.backend.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public RegisterRequest register(RegisterRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username already exists!");
        }
        if(request.getPassword().length() < 6){
            throw new RuntimeException("Password length must at least 6 Charachter!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole(Role.USER);

        User saved = userRepository.save(user);

        UserDetails userDetails = org.springframework.security.core.userdetails.User
        .withUsername(saved.getUsername())
        .password(saved.getPassword())
        .roles(saved.getRole().name())
        .build();

        String token = jwtTokenUtil.generateToken(userDetails);
        return new RegisterRequest(
            saved.getId(),
            saved.getUsername(),
            saved.getPassword(),
            saved.getEmail(),
            saved.getRole().name(),
            token
        );
    }

    public LoginResponse login(LoginRequest request){
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
            UserDetails userDetails = (UserDetails) auth.getPrincipal();

             User user = userRepository.findByUsername(userDetails.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtTokenUtil.generateToken(userDetails);
             return new LoginResponse(
                user.getId(),
                user.getUsername(),
                user.getRole().name(),
                token
        );
        
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage() +" Error in Userservice Login");
        }
    }

    public ProfileResponse getProfile(String token){

        if (token != null && token.startsWith("Bearer ")) {
        token = token.substring(7).trim();
        }


        String username = jwtTokenUtil.extractUsername(token);
        User user = userRepository.findByUsername(username).orElseThrow(
            ()->  new RuntimeException("User not found!")
        );
        return new ProfileResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getRole().name(),
            token
        );

    }
}
