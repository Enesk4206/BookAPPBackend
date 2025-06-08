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

import LibraryAPI.backend.dto.BookRequest;
import LibraryAPI.backend.service.BookService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookContreoller {
    private final BookService bookService;

    @PostMapping("/create")
    public ResponseEntity<BookRequest> createAPI(@RequestBody BookRequest request){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(bookService.create(request));
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<BookRequest> updateAPI(@PathVariable Long id, @RequestBody BookRequest request){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookService.update(id,request));
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @GetMapping("/all-books")
    public ResponseEntity<List<BookRequest>> listAPI(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookService.getAllBooks());
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BookRequest> createAPI(@PathVariable Long id){
        try {
            bookService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            throw new RuntimeException("INTERNAL SERVER ERROR"+e.getMessage());
        }
    }
}
