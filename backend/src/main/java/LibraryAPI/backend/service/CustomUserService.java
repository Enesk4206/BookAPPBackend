package LibraryAPI.backend.service;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import LibraryAPI.backend.model.User;
import LibraryAPI.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomUserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username){
        User existsUser = userRepository.findByUsername(username).orElseThrow(
            () -> new RuntimeException("User not found!")
        );

        return new org.springframework.security.core.userdetails.User(
            existsUser.getUsername(),
            existsUser.getPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_"+existsUser.getRole().name()))
        );
    }
}
