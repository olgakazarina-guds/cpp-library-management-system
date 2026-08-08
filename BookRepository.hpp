// ============================================================================
// File: BookRepository.hpp
// Concept: COMPOSITION COMPONENT & CONTAINER WRAPPER
// ============================================================================

#ifndef BOOK_REPOSITORY_HPP
#define BOOK_REPOSITORY_HPP

#include "Book.hpp"
#include <unordered_map>
#include <vector>

class BookRepository {
private:
    std::unordered_map<std::string, Book> books; // Maps ISBN -> Book

public:
    bool add_book(const Book& book);
    bool has_book(const std::string& isbn) const;
    Book* get_book_ptr(const std::string& isbn);
    const Book* get_book_ptr(const std::string& isbn) const;
    bool remove_book(const std::string& isbn);
    std::vector<Book> get_all_books() const;
    size_t size() const;
};

#endif // BOOK_REPOSITORY_HPP