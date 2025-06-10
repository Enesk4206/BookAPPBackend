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
public class AuthorRequest {
    private Long id;
    private String name;
    private String nation;
    private int birthOfYear;
    private Set<String> books;
}
