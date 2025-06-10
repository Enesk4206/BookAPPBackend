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

import LibraryAPI.backend.dto.GenreRequest;
import LibraryAPI.backend.service.GenreService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/genre")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @PostMapping("/create")
    public ResponseEntity<GenreRequest> createAPI(@RequestBody GenreRequest request){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(genreService.create(request));
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<GenreRequest> updateAPI(@PathVariable Long id, @RequestBody GenreRequest request){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(genreService.update(id,request));
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @GetMapping("/all-genres")
    public ResponseEntity<List<GenreRequest>> listAPI(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(genreService.getAllGenres());
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> createAPI(@PathVariable Long id){
        try {
            genreService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
}
