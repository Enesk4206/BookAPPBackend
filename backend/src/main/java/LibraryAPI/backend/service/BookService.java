package LibraryAPI.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
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

    private Path getUploadPath() {
        Path path = Paths.get(uploadDir);
        try {
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            throw new RuntimeException("Couldn't create upload directory");
        }
        return path;
    }

    private String storeImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        String originalFilename = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileExtension = "";
        int extIndex = originalFilename.lastIndexOf('.');
        if (extIndex >= 0) {
            fileExtension = originalFilename.substring(extIndex);
        }
        String filename = UUID.randomUUID().toString() + fileExtension;
        Path targetPath = getUploadPath().resolve(filename);

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file " + filename, e);
        }
        return filename;
    }

    public BookRequest create(BookRequest request, MultipartFile imageFile) {
        try {
            if (bookRepository.existsByName(request.getName())) {
                throw new RuntimeException("This Book already exists: " + request.getName());
            }

            // Author by ID
            Author author = authorRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found with id: " + request.getAuthorId()));

            Set<Long> genreIds = request.getGenresId() == null ? Collections.<Long>emptySet() : request.getGenresId();
            Set<Genre> genres = genreIds.stream()
                .map(id -> genreRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Genre not found with id: " + id)))
                .collect(Collectors.toSet());



            Book book = new Book();
            book.setName(request.getName());
            book.setNumberOfPages(request.getNumberOfPages());
            book.setPrice(request.getPrice());
            book.setYear(request.getYear());

            // associate author and book
            author.addBook(book);

            // add genres
            genres.forEach(book::addGenre);

            // save image
            String savedFilename = storeImage(imageFile);
            if (savedFilename != null) {
                book.setImagePath(savedFilename);
            }

            Book saved = bookRepository.save(book);

            String imageUrl = saved.getImagePath() != null ? "/book-images/" + saved.getImagePath() : null;

            return new BookRequest(
                saved.getId(),
                saved.getName(),
                saved.getAuthor().getId(),
                saved.getYear(),
                saved.getNumberOfPages(),
                saved.getPrice(),
                saved.getGenres().stream().map(Genre::getId).collect(Collectors.toSet()),
                imageUrl
            );

        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book create method: " + e.getMessage(), e);
        }
    }

    public List<BookRequest> getAllBooks() {
        try {
            List<Book> books = bookRepository.findAll();

            return books.stream().map(book -> new BookRequest(
                book.getId(),
                book.getName(),
                book.getAuthor().getId(),
                book.getYear(),
                book.getNumberOfPages(),
                book.getPrice(),
                book.getGenres().stream().map(Genre::getId).collect(Collectors.toSet()),
                book.getImagePath() != null ? "/book-images/" + book.getImagePath() : null
            )).collect(Collectors.toList());
        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book list method", e);
        }
    }

    public BookRequest update(Long id, BookRequest request, MultipartFile imageFile) {
        try {
            Book existsBook = bookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Book not found with id: " + id)
            );

            // Fetch genres by IDs
            Set<Genre> allGenres = new HashSet<>(genreRepository.findAll());
            Set<Genre> requestedGenres = allGenres.stream()
                .filter(g -> request.getGenresId().contains(g.getId()))
                .collect(Collectors.toSet());

            if (requestedGenres.size() != request.getGenresId().size()) {
                throw new RuntimeException("Some Genre(s) were not found!");
            }

            // Remove genres not requested
            Set<Genre> currentGenres = new HashSet<>(existsBook.getGenres());
            for (Genre genre : currentGenres) {
                if (!request.getGenresId().contains(genre.getId())) {
                    existsBook.deleteGenre(genre);
                }
            }

            // Add new genres
            for (Genre genre : requestedGenres) {
                if (!existsBook.getGenres().contains(genre)) {
                    existsBook.addGenre(genre);
                }
            }

            // Update other fields
            existsBook.setName(request.getName());
            existsBook.setNumberOfPages(request.getNumberOfPages());
            existsBook.setPrice(request.getPrice());
            existsBook.setYear(request.getYear());

            // Update author by ID
            Author existsAuthor = authorRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found with id: " + request.getAuthorId()));

            existsBook.setAuthor(existsAuthor);

            // Handle image update
            if (imageFile != null && !imageFile.isEmpty()) {
                if (existsBook.getImagePath() != null) {
                    Path oldPath = getUploadPath().resolve(existsBook.getImagePath());
                    try {
                        Files.deleteIfExists(oldPath);
                    } catch (IOException ignored) {}
                }
                String newFilename = storeImage(imageFile);
                existsBook.setImagePath(newFilename);
            }

            Book updated = bookRepository.save(existsBook);

            String imageUrl = updated.getImagePath() != null ? "/book-images/" + updated.getImagePath() : null;

            return new BookRequest(
                updated.getId(),
                updated.getName(),
                updated.getAuthor().getId(),
                updated.getYear(),
                updated.getNumberOfPages(),
                updated.getPrice(),
                updated.getGenres().stream().map(Genre::getId).collect(Collectors.toSet()),
                imageUrl
            );
        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book update method: " + e.getMessage(), e);
        }
    }

    public String delete(Long id) {
        try {
            Book existsBook = bookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Book not found with id: " + id)
            );

            for (Genre genre : new HashSet<>(existsBook.getGenres())) {
                existsBook.deleteGenre(genre);
            }

            Author author = existsBook.getAuthor();
            if (author != null) {
                author.getBooks().remove(existsBook);
                existsBook.setAuthor(null);
            }

            if (existsBook.getImagePath() != null && !existsBook.getImagePath().isEmpty()) {
                Path oldPath = getUploadPath().resolve(existsBook.getImagePath());
                try {
                    Files.deleteIfExists(oldPath);
                } catch (IOException ignored) {}
            }

            bookRepository.delete(existsBook);
            return "Book deleted successfully id: " + id;
        } catch (RuntimeException e) {
            throw new RuntimeException("Error in Book delete method", e);
        }
    }
}
