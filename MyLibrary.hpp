// ============================================================================
// File: MyLibrary.hpp
// Concept: SYSTEM INTEGRATION (COMPOSITION, AGGREGATION & ASSOCIATION)
// Description: Main Library controller implementing AbstractLibrary interface.
// ============================================================================

#ifndef MY_LIBRARY_HPP
#define MY_LIBRARY_HPP

#include "AbstractLibrary.hpp"
#include "BookRepository.hpp"
#include "Member.hpp"
#include <unordered_map>
#include <memory>      // For std::shared_ptr and std::make_shared
#include <vector>

// ----------------------------------------------------------------------------
// CLASS DECLARATION: MyLibrary
// Realizes AbstractLibrary interface. Combines:
// 1. Composition: Holds BookRepository object directly (MyLibrary owns Repository).
// 2. Aggregation: Holds collection of std::shared_ptr<Member> (Members can exist independently).
// 3. Association: Connects Member and Book during borrow_book() / return_book().
// ----------------------------------------------------------------------------
class MyLibrary : public AbstractLibrary {
private:
    // COMPOSITION: 'repository' lifetime is strictly tied to MyLibrary.
    BookRepository repository; 

    // AGGREGATION: Shared pointers store registered Member instances.
    // Member objects can exist independently outside of MyLibrary.
    std::unordered_map<std::string, std::shared_ptr<Member>> members;

public:
    MyLibrary();
    ~MyLibrary() override = default;

    // --- MEMBER REGISTRATION ---
    bool register_member(std::shared_ptr<Member> member);
    std::shared_ptr<Member> get_member(const std::string& member_id) const;

    // --- IMPLEMENTING ABSTRACTLIBRARY INTERFACE ---
    // Must override all pure virtual methods from AbstractLibrary
    bool add_book(const Book& book) override;
    bool borrow_book(const std::string& member_id, const std::string& isbn) override;
    bool return_book(const std::string& member_id, const std::string& isbn) override;

    // --- UTILITY DISPLAY & ACCESSORS ---
    void display_catalog() const;
    void display_members() const;
    size_t get_available_book_count() const;
    const BookRepository& get_repository() const;
};

#endif // MY_LIBRARY_HPP
