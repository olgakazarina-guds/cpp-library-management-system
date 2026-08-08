// ============================================================================
// File: Member.hpp
// Concept: INHERITANCE, POLYMORPHISM & ABSTRACT SUBCLASSES
// ============================================================================

#ifndef MEMBER_HPP
#define MEMBER_HPP

#include <string>
#include <vector>
#include <iostream>

// ----------------------------------------------------------------------------
// BASE CLASS: Member
// Abstract superclass with 'protected:' members so child classes inherit them.
// ----------------------------------------------------------------------------
class Member {
protected:
    std::string name;
    std::string member_id;
    std::vector<std::string> list_of_borrowed_books; // List of active ISBNs

public:
    Member(const std::string& name, const std::string& member_id);
    virtual ~Member() = default; // VIRTUAL DESTRUCTOR: Prevents memory leaks in OOP

    std::string get_name() const;
    std::string get_member_id() const;
    const std::vector<std::string>& get_borrowed_books() const;
    size_t get_borrowed_count() const;

    // PURE VIRTUAL METHODS (= 0): Forces derived classes to define specific limits
    virtual size_t get_max_borrow_limit() const = 0; // Regular = 3, Premium = 5
    virtual std::string get_member_type() const = 0;

    bool can_borrow() const;
    bool borrow_book(const std::string& isbn);
    bool return_book(const std::string& isbn);
    virtual void display_info() const;
};

// ----------------------------------------------------------------------------
// SUBCLASS 1: RegularMember (Inherits from Member) - Limit: 3 Books
// ----------------------------------------------------------------------------
class RegularMember : public Member {
public:
    RegularMember(const std::string& name, const std::string& member_id);
    size_t get_max_borrow_limit() const override;
    std::string get_member_type() const override;
};

// ----------------------------------------------------------------------------
// SUBCLASS 2: PremiumMember (Inherits from Member) - Limit: 5 Books
// ----------------------------------------------------------------------------
class PremiumMember : public Member {
public:
    PremiumMember(const std::string& name, const std::string& member_id);
    size_t get_max_borrow_limit() const override;
    std::string get_member_type() const override;
};

#endif // MEMBER_HPP