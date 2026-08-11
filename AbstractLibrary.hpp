// ============================================================================
// File: AbstractLibrary.hpp
// Concept: INTERFACE ABSTRACTION
// Description: Abstract interface class defining required library operations.
// ============================================================================

#ifndef ABSTRACT_LIBRARY_HPP
#define ABSTRACT_LIBRARY_HPP

#include "Book.hpp"
#include <string>

// ----------------------------------------------------------------------------
// ABSTRACT CLASS / INTERFACE: AbstractLibrary
// An abstract class contains at least one pure virtual function (= 0).
// It cannot be instantiated directly. Instead, it acts as a contract/interface
// that concrete library classes (like MyLibrary) MUST implement.
// ----------------------------------------------------------------------------
class AbstractLibrary {
public:
    // Virtual destructor guarantees clean polymorphic object cleanup
    virtual ~AbstractLibrary() = default;

    // --- PURE VIRTUAL INTERFACE METHODS ---
    // Pure virtual functions (= 0) specify WHAT operations a library must offer,
    // leaving the HOW (implementation) up to derived classes.
    virtual bool add_book(const Book& book) = 0;
    virtual bool borrow_book(const std::string& member_id, const std::string& isbn) = 0;
    virtual bool return_book(const std::string& member_id, const std::string& isbn) = 0;
};

#endif // ABSTRACT_LIBRARY_HPP
