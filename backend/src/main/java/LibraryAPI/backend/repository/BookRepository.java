package LibraryAPI.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import LibraryAPI.backend.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    boolean existsByName(String name);
}