// ============================================================================
// File: BookRepository.cpp
// Concept: CONTAINER DELEGATION & HASH MAP MANAGEMENT
// Description: Implementation of book storage and retrieval methods.
// ============================================================================

#include "BookRepository.hpp"

// Add Book to Repository
bool BookRepository::add_book(const Book& book) {
    if (has_book(book.get_isbn())) {
        return false; // Reject duplicate ISBNs
    }
    books[book.get_isbn()] = book; // Insert into unordered_map
    return true;
}

// Check if book exists in catalog
bool BookRepository::has_book(const std::string& isbn) const {
    return books.find(isbn) != books.end();
}

// Return mutable pointer to Book object inside hash map
Book* BookRepository::get_book_ptr(const std::string& isbn) {
    auto it = books.find(isbn);
    if (it != books.end()) {
        return &(it->second); // Return address of Book object stored in map value
    }
    return nullptr; // Return nullptr if ISBN does not exist
}

// Return const pointer to Book object (read-only inspect)
const Book* BookRepository::get_book_ptr(const std::string& isbn) const {
    auto it = books.find(isbn);
    if (it != books.end()) {
        return &(it->second);
    }
    return nullptr;
}

// Erase book from repository
bool BookRepository::remove_book(const std::string& isbn) {
    return books.erase(isbn) > 0;
}

// Gather vector list of all books in catalog
std::vector<Book> BookRepository::get_all_books() const {
    std::vector<Book> result;
    result.reserve(books.size()); // Pre-allocate memory capacity for performance
    for (const auto& pair : books) {
        result.push_back(pair.second); // Copy Book value from map pair
    }
    return result;
}

// Total number of books in catalog
size_t BookRepository::size() const {
    return books.size();
}
