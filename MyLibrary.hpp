// ============================================================================
// File: MyLibrary.hpp
// Concept: INTEGRATION (COMPOSITION, AGGREGATION & ASSOCIATION)
// ============================================================================

#ifndef MY_LIBRARY_HPP
#define MY_LIBRARY_HPP

#include "AbstractLibrary.hpp"
#include "BookRepository.hpp"
#include "Member.hpp"
#include <unordered_map>
#include <memory>

class MyLibrary : public AbstractLibrary {
private:
    // COMPOSITION: 'repository' lifetime is tied to MyLibrary
    BookRepository repository; 

    // AGGREGATION: Stores shared pointers to Members (Members can exist independently)
    std::unordered_map<std::string, std::shared_ptr<Member>> members;

public:
    MyLibrary();
    ~MyLibrary() override = default;

    bool register_member(std::shared_ptr<Member> member);
    std::shared_ptr<Member> get_member(const std::string& member_id) const;

    // Overriding AbstractLibrary interface
    bool add_book(const Book& book) override;
    bool borrow_book(const std::string& member_id, const std::string& isbn) override;
    bool return_book(const std::string& member_id, const std::string& isbn) override;

    void display_catalog() const;
    void display_members() const;
    const BookRepository& get_repository() const;
};

#endif // MY_LIBRARY_HPP