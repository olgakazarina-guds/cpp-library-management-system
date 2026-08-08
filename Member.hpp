// ============================================================================
// File: Member.hpp
// Concept: INHERITANCE, POLYMORPHISM & PURE VIRTUAL FUNCTIONS
// Description: Base class 'Member' and derived subclasses 'RegularMember' & 'PremiumMember'.
// ============================================================================

#ifndef MEMBER_HPP
#define MEMBER_HPP

#include <string>
#include <vector>    // Dynamic array container to hold list of borrowed ISBNs
#include <iostream>

// ----------------------------------------------------------------------------
// BASE CLASS: Member
// Serves as abstract superclass. Uses 'protected:' so derived child classes
// can directly access member attributes while keeping them hidden from main().
// ----------------------------------------------------------------------------
class Member {
protected:
    // 'protected' access specifier: Accessible by this class AND derived subclasses
    std::string name;
    std::string member_id;
    std::vector<std::string> list_of_borrowed_books; // List of active ISBN codes borrowed

public:
    // Base constructor
    Member(const std::string& name, const std::string& member_id);

    // VIRTUAL DESTRUCTOR: Crucial for OOP in C++!
    // Ensures that deleting a derived object (RegularMember) through a base
    // pointer (Member*) properly calls the derived destructor and prevents memory leaks.
    virtual ~Member() = default;

    // Getters
    std::string get_name() const;
    std::string get_member_id() const;
    const std::vector<std::string>& get_borrowed_books() const;
    size_t get_borrowed_count() const;

    // PURE VIRTUAL METHODS (= 0): Makes 'Member' an abstract base class.
    // Every concrete child class MUST override these methods to provide specific behavior.
    virtual size_t get_max_borrow_limit() const = 0; // Regular = 3, Premium = 5
    virtual std::string get_member_type() const = 0;  // Returns string title

    // Common logic shared by all library members
    bool can_borrow() const;
    bool borrow_book(const std::string& isbn);
    bool return_book(const std::string& isbn);

    // Virtual display method (can be overridden by subclasses if needed)
    virtual void display_info() const;
};

// ----------------------------------------------------------------------------
// SUBCLASS 1: RegularMember (Inherits from Member)
// Demonstrates Inheritance: 'public Member' means all public/protected items
// from Member are inherited here. Regular members have a max limit of 3 books.
// ----------------------------------------------------------------------------
class RegularMember : public Member {
public:
    RegularMember(const std::string& name, const std::string& member_id);

    // 'override' keyword: Tells compiler we intend to override base virtual method.
    // Prevents typos in method signatures!
    size_t get_max_borrow_limit() const override;
    std::string get_member_type() const override;
};

// ----------------------------------------------------------------------------
// SUBCLASS 2: PremiumMember (Inherits from Member)
// Premium members receive an expanded borrowing quota of up to 5 books.
// ----------------------------------------------------------------------------
class PremiumMember : public Member {
public:
    PremiumMember(const std::string& name, const std::string& member_id);

    size_t get_max_borrow_limit() const override;
    std::string get_member_type() const override;
};

#endif // MEMBER_HPP
