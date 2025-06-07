package LibraryAPI.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import LibraryAPI.backend.dto.AuthorRequest;
import LibraryAPI.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @PostMapping("/create")
    public ResponseEntity<AuthorRequest> createAPI(@RequestBody AuthorRequest request){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(authorService.create(request));
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<AuthorRequest> updateAPI(@PathVariable Long id, @RequestBody AuthorRequest request){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(authorService.update(id,request));
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @GetMapping("/all-authors")
    public ResponseEntity<List<AuthorRequest>> listAPI(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(authorService.getAllAuthors());
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<AuthorRequest> createAPI(Long id){
        try {
            authorService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
}
