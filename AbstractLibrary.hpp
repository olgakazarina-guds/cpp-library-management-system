// ============================================================================
// File: AbstractLibrary.hpp
// Concept: INTERFACE ABSTRACTION
// ============================================================================

#ifndef ABSTRACT_LIBRARY_HPP
#define ABSTRACT_LIBRARY_HPP

#include "Book.hpp"
#include <string>

// Abstract Class/Interface: Defines standard contract for all library operations
class AbstractLibrary {
public:
    virtual ~AbstractLibrary() = default;

    // Pure Virtual Interface Methods (= 0)
    virtual bool add_book(const Book& book) = 0;
    virtual bool borrow_book(const std::string& member_id, const std::string& isbn) = 0;
    virtual bool return_book(const std::string& member_id, const std::string& isbn) = 0;
};

#endif // ABSTRACT_LIBRARY_HPP