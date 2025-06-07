package LibraryAPI.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import LibraryAPI.backend.dto.GenreRequest;
import LibraryAPI.backend.model.Book;
import LibraryAPI.backend.model.Genre;
import LibraryAPI.backend.repository.GenreRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreRequest create(GenreRequest request){
        try{
            if(genreRepository.existsByName(request.getName())){
                throw new RuntimeException("This genre has already exists "+request.getName());
            }
            Genre genre= new Genre();
            genre.setName(request.getName());
            genre.setBooks(new HashSet<>());

            Genre saved = genreRepository.save(genre);
            return new GenreRequest(
                saved.getId(),
                saved.getName(),
                saved.getBooks().stream().map(Book::getName).collect(Collectors.toSet())
            );
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Genre create methode");
        }
    }

    public List<GenreRequest> getAllGenres(){
        try{
        
            List<Genre> genres = genreRepository.findAll();

            return genres.stream().map(
                a -> new GenreRequest(
                    a.getId(),
                    a.getName(),
                    a.getBooks().stream().map(Book::getName).collect(Collectors.toSet())
                )
            ).collect(Collectors.toList());
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Genre list methode");
        }
    }

   public GenreRequest update(Long id,GenreRequest request){

       try {
            Genre existsGenre = genreRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Genre not found id: "+ id)
            );

            if(genreRepository.existsByName(request.getName())){
                throw new RuntimeException("This genre has already exists "+request.getName());
            }
            
            existsGenre.setName(request.getName());
            existsGenre.setBooks(existsGenre.getBooks());

            Genre updated = genreRepository.save(existsGenre);
            return new GenreRequest(
                updated.getId(),
                updated.getName(),
                updated.getBooks().stream().map(Book::getName).collect(Collectors.toSet())
            );

       } catch(RuntimeException e){
            throw new RuntimeException("Error in Genre update methode");
        }
    }

    public String delete(Long id){
        try{
            Genre existsGenre = genreRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Genre not found id: "+ id)
            );

            genreRepository.delete(existsGenre);
            return "Genre deleted successfully id: "+ id;
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Genre delete methode");
        }
    }
}
