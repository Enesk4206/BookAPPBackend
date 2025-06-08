package LibraryAPI.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import LibraryAPI.backend.dto.AuthorRequest;
import LibraryAPI.backend.model.Author;
import LibraryAPI.backend.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;


    public AuthorRequest create(AuthorRequest request){
        try{
            if(authorRepository.existsByName(request.getName())){
                throw new RuntimeException("This author has already exists "+request.getName());
            }
            Author author = new Author();
            author.setName(request.getName());

            Author saved = authorRepository.save(author);
            return new AuthorRequest(
                saved.getId(),
                saved.getName()
            );
        }catch(RuntimeException e){
            throw new RuntimeException(e.getMessage(),e);
        }
    }

    public List<AuthorRequest> getAllAuthors(){
        try{
        
            List<Author> authors = authorRepository.findAll();

            return authors.stream().map(
                a -> new AuthorRequest(
                    a.getId(),
                    a.getName()
                )
            ).collect(Collectors.toList());
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Author list methode");
        }
    }

   public AuthorRequest update(Long id,AuthorRequest request){

       try {
            Author existsAuthor = authorRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Author not found id: "+ id)
            );

            if(authorRepository.existsByName(request.getName())){
                throw new RuntimeException("This author has already exists "+request.getName());
            }
            
            existsAuthor.setName(request.getName());

            Author updated = authorRepository.save(existsAuthor);
            return new AuthorRequest(
                updated.getId(),
                updated.getName()
            );

       } catch(RuntimeException e){
            throw new RuntimeException("Error in Author update methode");
        }
    }

    public String delete(Long id){
        try{
            Author existsAuthor = authorRepository.findById(id).orElseThrow(
            () -> new RuntimeException("Author not found id: "+ id)
            );

            authorRepository.delete(existsAuthor);
            return "Author deleted successfully id: "+ id;
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Author delete methode");
        }
    }
}
