// ============================================================================
// File: BookRepository.hpp
// Concept: CONTAINER WRAPPER & COMPOSITION COMPONENT
// Description: Manages catalog of Book objects using std::unordered_map.
// ============================================================================

#ifndef BOOK_REPOSITORY_HPP
#define BOOK_REPOSITORY_HPP

#include "Book.hpp"
#include <unordered_map> // Hash map container for O(1) average lookup speed
#include <vector>
#include <optional>

// ----------------------------------------------------------------------------
// CLASS DECLARATION: BookRepository
// Encapsulates standard template library container (unordered_map).
// Maps ISBN string key -> Book object value.
// ----------------------------------------------------------------------------
class BookRepository {
private:
    // Hash map storing books by their unique ISBN string key
    std::unordered_map<std::string, Book> books;

public:
    // Repository CRUD operations
    bool add_book(const Book& book);
    bool has_book(const std::string& isbn) const;
    Book* get_book_ptr(const std::string& isbn);
    const Book* get_book_ptr(const std::string& isbn) const;
    bool remove_book(const std::string& isbn);
    std::vector<Book> get_all_books() const;
    size_t size() const;
};

#endif // BOOK_REPOSITORY_HPP
