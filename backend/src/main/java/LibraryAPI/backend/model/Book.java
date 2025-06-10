package LibraryAPI.backend.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="books")
public class Book {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int year;
    private int numberOfPages;
    private double price;

    private String imagePath;

    @ManyToMany
    @JoinTable(
        name="book_genres",
        joinColumns= @JoinColumn(name="book_id"),
        inverseJoinColumns=@JoinColumn(name="genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    @ManyToOne
    private Author author;

    public void addGenre(Genre genre){
        this.genres.add(genre);
        genre.getBooks().add(this);
    }
    public void deleteGenre(Genre genre){
        this.genres.remove(genre);
        genre.getBooks().remove(this);
    }


}
