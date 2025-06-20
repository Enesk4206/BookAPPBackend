package LibraryAPI.backend.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest {
    private Long id;
    private String name;
    private Long authorId;
    private int year;
    private int numberOfPages;
    private double price;
    private Set<Long> genresId;
    private String imagePath;
}
