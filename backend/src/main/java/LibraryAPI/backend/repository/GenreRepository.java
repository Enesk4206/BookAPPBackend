package LibraryAPI.backend.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import LibraryAPI.backend.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
        boolean existsByName(String name);
        Optional<Genre> findByName(String name);
}
