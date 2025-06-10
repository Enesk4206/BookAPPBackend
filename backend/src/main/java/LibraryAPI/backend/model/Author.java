package LibraryAPI.backend.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="authors")
public class Author {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String nation;
    private int birthOfYear;
    @OneToMany(mappedBy="author", cascade=CascadeType.ALL, orphanRemoval=true)
    private Set<Book> books = new HashSet<>();

    public void addBook(Book book){
        books.add(book);
        book.setAuthor(this);
    }
    public void deleteBook(Book book){
        books.remove(book);
        book.setAuthor(null);
    }
}
