package LibraryAPI.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import LibraryAPI.backend.model.Author;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    boolean existsByName(String name);
}
