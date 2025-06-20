package LibraryAPI.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import LibraryAPI.backend.dto.LoginRequest;
import LibraryAPI.backend.dto.LoginResponse;
import LibraryAPI.backend.dto.ProfileResponse;
import LibraryAPI.backend.dto.RegisterRequest;
import LibraryAPI.backend.service.UserService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.login(request));
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error "+e.getMessage());
        }
    }
    @PostMapping("/register")
    public ResponseEntity<RegisterRequest> register(@RequestBody RegisterRequest request){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(request));
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error "+e.getMessage());
        }
    }
     @GetMapping("/profile")
    public ResponseEntity<ProfileResponse> getProfileAPI(@RequestHeader("Authorization") String authHeader){
        try {
            ProfileResponse profile = userService.getProfile(authHeader);
            return ResponseEntity.status(HttpStatus.CREATED).body(profile);
        } catch (RuntimeException e) {
            throw new RuntimeException("Internal Server Error "+e.getMessage());
        }
    }
}
