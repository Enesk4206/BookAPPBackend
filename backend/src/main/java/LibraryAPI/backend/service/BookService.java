package LibraryAPI.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

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

    @Value("${file.upload-dir}")
    private String uploadDir;

    //yardımcı klösörü oluştur 
    private Path getUploadPath(){
        Path path = Paths.get(uploadDir);
        try {
            if(!Files.exists(path)){
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            throw new RuntimeException("Couldn't create upload directory");
        }
        return path;
    }   

   private String storeImage(MultipartFile file){
    if(file == null || file.isEmpty()){
        return null;
    }
    String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
    String fileExtension = "";
    int extIndex = originalFilename.lastIndexOf('.');
    if(extIndex >=0){
        fileExtension = originalFilename.substring(extIndex);
    }
    String filename = UUID.randomUUID().toString() + fileExtension;
    Path targetPath = getUploadPath().resolve(filename);

    System.out.println("Original filename: " + originalFilename);
    System.out.println("Target path: " + targetPath);
    System.out.println("Parent directory exists: " + Files.exists(targetPath.getParent()));
    System.out.println("Parent directory writable: " + Files.isWritable(targetPath.getParent()));

    try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
        throw new RuntimeException("Failed to store file " + filename , e);
    }
    return filename;
}



    public BookRequest create(BookRequest request,MultipartFile imageFile){
        try{
            // Kitap kontrol etme
            if(bookRepository.existsByName(request.getName())){
                throw new RuntimeException("This Book has already exists "+request.getName());
            }

            // Kitap türü kontrol etme
            Set<Genre> genres = request.getGenres().stream()
                .map(name -> genreRepository.findByName(name)
                    .orElseThrow(() -> new RuntimeException("Genre bulunamadı: " + name)))
                .collect(Collectors.toSet());

            //Yazar kontrol etme
            Author author = authorRepository.findByName(request.getAuthor()).orElseThrow(
                ()-> new RuntimeException("Yazar bulunamadı!")
            );
            

            Book book= new Book();
            book.setName(request.getName());
            book.setNumberOfPages(request.getNumberOfPages());
            book.setPrice(request.getPrice());
            book.setYear(request.getYear());
            
            // author ve kitap kısmına eklemeleri yap
            author.addBook(book);
            //eklenen genreler
            genres.forEach(book::addGenre);

            //resim kaydetme
            String savedFilename = storeImage(imageFile);
            if(savedFilename != null){
                book.setImagePath(savedFilename);
            }

            Book saved = bookRepository.save(book);
            String imageUrl = saved.getImagePath() != null ? "/book-images/" + saved.getImagePath() : null;
            return new BookRequest(
                saved.getId(),
                saved.getName(),
                saved.getAuthor().getName(),
                saved.getYear(),
                saved.getNumberOfPages(),
                saved.getPrice(),
                saved.getGenres().stream().map(Genre::getName).collect(Collectors.toSet()),
                imageUrl
            );
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Book create methode" + e.getMessage());
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
                    a.getGenres().stream().map(Genre::getName).collect(Collectors.toSet()),
                    a.getImagePath() != null ? "/book-images/" + a.getImagePath() : null
                )
            ).collect(Collectors.toList());
        }catch(RuntimeException e){
            throw new RuntimeException("Error in Book list methode");
        }
    }

   public BookRequest update(Long id, BookRequest request, MultipartFile imageFile) {
        try {
            Book existsBook = bookRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Book not found id: " + id)
            );

            // Tüm genre'ları getir ve isim eşleştir
            Set<Genre> allGenres = new HashSet<>(genreRepository.findAll());
            Set<Genre> requestedGenres = allGenres.stream()
                .filter(g -> request.getGenres().contains(g.getName()))
                .collect(Collectors.toSet());

            if (requestedGenres.size() != request.getGenres().size()) {
                throw new RuntimeException("Some Genre(s) were not found!");
            }

            // 1. Eksik genre'ları sil
            Set<Genre> currentGenres = new HashSet<>(existsBook.getGenres());
            for (Genre genre : currentGenres) {
                if (!request.getGenres().contains(genre.getName())) {
                    existsBook.deleteGenre(genre);
                }
            }

            // 2. Yeni genre'ları ekle
            for (Genre genre : requestedGenres) {
                if (!existsBook.getGenres().contains(genre)) {
                    existsBook.addGenre(genre);
                }
            }

            // Diğer alanlar
            existsBook.setName(request.getName());
            existsBook.setNumberOfPages(request.getNumberOfPages());
            existsBook.setPrice(request.getPrice());
            existsBook.setYear(request.getYear());

            // Author güncelle
            Author existsAuthor = authorRepository.findByName(request.getAuthor()).orElseThrow(
                () -> new RuntimeException("The Author doesn't exist to add book! " + request.getName())
            );
            existsBook.setAuthor(existsAuthor);


            if(imageFile != null ||!imageFile.isEmpty()){
                if(existsBook.getImagePath() != null){
                    Path oldPath = getUploadPath().resolve(existsBook.getImagePath());
                    try{
                        Files.deleteIfExists(oldPath);
                    }catch(IOException ignored){

                    }
                    String newFilename = storeImage(imageFile);
                    existsBook.setImagePath(newFilename);
                }
            }

            // Kaydet
            Book updated = bookRepository.save(existsBook);
            String imageUrl = updated.getImagePath() != null ? "/book-images/" + updated.getImagePath() : null;
            return new BookRequest(
                updated.getId(),
                updated.getName(),
                updated.getAuthor().getName(),
                updated.getYear(),
                updated.getNumberOfPages(),
                updated.getPrice(),
                updated.getGenres().stream().map(Genre::getName).collect(Collectors.toSet()),
                imageUrl
            );

        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book update methode: " + e.getMessage(), e);
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

            Author author = existsBook.getAuthor();
            if(author != null){
                author.getBooks().remove(existsBook);
                existsBook.setAuthor(null);
            }

            if(existsBook.getImagePath() !=null || !existsBook.getImagePath().isEmpty()){
                Path oldPath = getUploadPath().resolve(existsBook.getImagePath());
                try {
                    Files.deleteIfExists(oldPath);  
                } catch (IOException ignored) {
                }
            }

            bookRepository.delete(existsBook);
            return "Book deleted successfully id: " + id;
        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book delete method");
        }
    }
}
