package LibraryAPI.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;

import LibraryAPI.backend.dto.BookRequest;
import LibraryAPI.backend.model.Author;
import LibraryAPI.backend.model.Book;
import LibraryAPI.backend.model.Genre;
import LibraryAPI.backend.repository.AuthorRepository;
import LibraryAPI.backend.repository.BookRepository;
import LibraryAPI.backend.repository.GenreRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public BookRequest create(BookRequest request){
        try{
            if(bookRepository.existsByName(request.getName())){
                throw new RuntimeException("This Book has already exists "+request.getName());
            }

        // Genre eşleme ve ekleme (kısa hali)
            Set<Genre> allGenres = new HashSet<>(genreRepository.findAll());
            Set<Genre> genres = allGenres.stream()
                .filter(g -> request.getGenres().contains(g.getName()))
                .collect(Collectors.toSet());

            if (genres.size() != request.getGenres().size()) {
                throw new RuntimeException("Bazı genre'lar bulunamadı!");
            }

    

            Book book= new Book();
            book.setName(request.getName());
            book.setNumberOfPages(request.getNumberOfPages());
            book.setPrice(request.getPrice());
            book.setYear(request.getYear());
            //add author in the book
            Author existsAuthor = authorRepository.findByName(request.getAuthor()).orElseThrow(
                () ->  new RuntimeException("The Author doesn't exist to add book! "+request.getName())
            );
            //eklenen yazar
            book.setAuthor(existsAuthor);
            //eklenen genreler
            genres.forEach(book::addGenre);


            Book saved = bookRepository.save(book);
            return new BookRequest(
                saved.getId(),
                saved.getName(),
                saved.getAuthor().getName(),
                saved.getYear(),
                saved.getNumberOfPages(),
                saved.getPrice(),
                saved.getGenres().stream().map(Genre::getName).collect(Collectors.toSet())
            );
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Book create methode");
        }
    }

    public List<BookRequest> getAllBooks(){
        try{
        
            List<Book> books = bookRepository.findAll();

            return books.stream().map(
                a -> new BookRequest(
                    a.getId(),
                    a.getName(),
                    a.getAuthor().getName(),
                    a.getYear(),
                    a.getNumberOfPages(),
                    a.getPrice(),
                    a.getGenres().stream().map(Genre::getName).collect(Collectors.toSet())
                )
            ).collect(Collectors.toList());
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Book list methode");
        }
    }

   public BookRequest update(Long id,BookRequest request){

       try {

            Book existsBook = bookRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Book not found id: "+ id)
            );

            if(bookRepository.existsByName(request.getName())){
                throw new RuntimeException("This Book has already exists "+request.getName());
            }

            // Genre eşleme ve ekleme (kısa hali)
            Set<Genre> allGenres = new HashSet<>(genreRepository.findAll());
            Set<Genre> genres = allGenres.stream()
                .filter(g -> request.getGenres().contains(g.getName()))
                .collect(Collectors.toSet());

            if (genres.size() != request.getGenres().size()) {
                throw new RuntimeException("Some Genre(s) were not found!");
            }
            
            existsBook.setName(request.getName());
            existsBook.setNumberOfPages(request.getNumberOfPages());
            existsBook.setPrice(request.getPrice());
            existsBook.setYear(request.getYear());
            //add author in the book
            Author existsAuthor = authorRepository.findByName(request.getAuthor()).orElseThrow(
                () ->  new RuntimeException("The Author doesn't exist to add book! "+request.getName())
            );
            existsBook.setAuthor(existsAuthor);
            genres.forEach(existsBook::addGenre);

            Book updated = bookRepository.save(existsBook);
            return new BookRequest(
                updated.getId(),
                updated.getName(),
                updated.getAuthor().getName(),
                updated.getYear(),
                updated.getNumberOfPages(),
                updated.getPrice(),
                updated.getGenres().stream().map(Genre::getName).collect(Collectors.toSet())
            );

       } catch(RuntimeException e){
            throw new RuntimeException("Error in Book update methode");
        }
    }

    public String delete(Long id) {
        try {
            Book existsBook = bookRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Book not found id: " + id)
            );

            // Burada direkt modeldeki fonksiyonu kullanıyoruz
            for (Genre genre : new HashSet<>(existsBook.getGenres())) { 
                existsBook.deleteGenre(genre);
            }

            bookRepository.delete(existsBook);
            return "Book deleted successfully id: " + id;
        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book delete method");
        }
}
}
