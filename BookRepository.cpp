// ============================================================================
// File: BookRepository.cpp
// Concept: HASH MAP CONTAINER DELEGATION
// ============================================================================

#include "BookRepository.hpp"

bool BookRepository::add_book(const Book& book) {
    if (has_book(book.get_isbn())) return false;
    books[book.get_isbn()] = book;
    return true;
}

bool BookRepository::has_book(const std::string& isbn) const {
    return books.find(isbn) != books.end();
}

Book* BookRepository::get_book_ptr(const std::string& isbn) {
    auto it = books.find(isbn);
    return (it != books.end()) ? &(it->second) : nullptr;
}

const Book* BookRepository::get_book_ptr(const std::string& isbn) const {
    auto it = books.find(isbn);
    return (it != books.end()) ? &(it->second) : nullptr;
}

bool BookRepository::remove_book(const std::string& isbn) {
    return books.erase(isbn) > 0;
}

std::vector<Book> BookRepository::get_all_books() const {
    std::vector<Book> result;
    result.reserve(books.size());
    for (const auto& pair : books) {
        result.push_back(pair.second);
    }
    return result;
}

size_t BookRepository::size() const {
    return books.size();
}