// ============================================================================
// File: Main.cpp
// Concept: MAIN DRIVER & COMPLETE OOP SYSTEM HARNESS
// Description: Demonstrates Encapsulation, Inheritance, Polymorphism, Abstraction,
//              Composition, Aggregation, and Association in execution.
// ============================================================================

#include "AbstractLibrary.hpp"
#include "MyLibrary.hpp"
#include "Book.hpp"
#include "Member.hpp"
#include <iostream>
#include <memory> // For std::unique_ptr, std::shared_ptr, std::make_unique, std::make_shared

int main() {
    std::cout << "===================================================" << std::endl;
    std::cout << "   C++ LIBRARY MANAGEMENT SYSTEM - OOP TEST HARNESS" << std::endl;
    std::cout << "===================================================" << std::endl << std::endl;

    // --- POLYMORPHISM & ABSTRACTION DEMONSTRATION ---
    // Simple concept: Instantiate MyLibrary using pointer to abstract interface AbstractLibrary.
    std::unique_ptr<AbstractLibrary> library = std::make_unique<MyLibrary>();

    // Dynamic cast allows accessing MyLibrary specific methods like register_member
    MyLibrary* myLib = dynamic_cast<MyLibrary*>(library.get());

    // ------------------------------------------------------------------------
    // STEP 1. POPULATE CATALOG (Encapsulation + Composition)
    // Simple concept: Adding book objects into repository
    // ------------------------------------------------------------------------
    std::cout << "--- 1. Adding Books to Repository ---" << std::endl;
    library->add_book(Book("The C++ Programming Language", "Bjarne Stroustrup", "978-0321563842"));
    library->add_book(Book("Design Patterns", "Erich Gamma et al.", "978-0201633610"));
    library->add_book(Book("Clean Code", "Robert C. Martin", "978-0132350884"));
    library->add_book(Book("Effective Modern C++", "Scott Meyers", "978-1491903994"));
    library->add_book(Book("Introduction to Algorithms", "Thomas H. Cormen", "978-0262033848"));
    library->add_book(Book("Structure and Interpretation of Computer Programs", "Harold Abelson", "978-0262510875"));

    // ------------------------------------------------------------------------
    // STEP 2. REGISTER MEMBERS (Inheritance: Regular vs Premium Subclasses)
    // Simple concept: Alice is RegularMember (limit 3), Bob is PremiumMember (limit 5)
    // ------------------------------------------------------------------------
    std::cout << std::endl << "--- 2. Registering Members (Inheritance) ---" << std::endl;
    auto alice = std::make_shared<RegularMember>("Alice Smith", "M001"); // Max 3 books
    auto bob = std::make_shared<PremiumMember>("Bob Jones", "M002");    // Max 5 books

    myLib->register_member(alice);
    myLib->register_member(bob);

    myLib->display_catalog();
    myLib->display_members();

    // ------------------------------------------------------------------------
    // STEP 3. TEST BORROWING LIMITS (Polymorphism)
    // Simple concept: Alice attempts to borrow 4 books, 4th attempt fails because max limit is 3.
    // ------------------------------------------------------------------------
    std::cout << "--- 3. Testing Regular Member Borrowing Limit (Alice - Max 3) ---" << std::endl;
    library->borrow_book("M001", "978-0321563842"); // Borrow 1
    library->borrow_book("M001", "978-0201633610"); // Borrow 2
    library->borrow_book("M001", "978-0132350884"); // Borrow 3
    // 4th borrow attempt: Triggers borrowing limit enforcement!
    library->borrow_book("M001", "978-1491903994"); 

    // ------------------------------------------------------------------------
    // STEP 4. TEST PREMIUM MEMBER BORROWING LIMITS (Bob - Max 5)
    // Simple concept: Bob can borrow up to 5 books.
    // ------------------------------------------------------------------------
    std::cout << std::endl << "--- 4. Testing Premium Member Borrowing Limit (Bob - Max 5) ---" << std::endl;
    library->borrow_book("M002", "978-1491903994"); // Borrow 1
    library->borrow_book("M002", "978-0262033848"); // Borrow 2
    library->borrow_book("M002", "978-0262510875"); // Borrow 3

    // ------------------------------------------------------------------------
    // STEP 5. RETURNING BOOKS & RE-BORROWING
    // Simple concept: Returning a book frees up borrowing capacity
    // ------------------------------------------------------------------------
    std::cout << std::endl << "--- 5. Returning Books ---" << std::endl;
    library->return_book("M001", "978-0321563842"); // Alice returns 1st book
    std::cout << "Alice attempts borrowing again after returning:" << std::endl;
    library->borrow_book("M001", "978-0321563842");

    myLib->display_catalog();
    myLib->display_members();

    std::cout << "===================================================" << std::endl;
    std::cout << "   ALL C++ OOP SYSTEM TESTS EXECUTED SUCCESSFULLY!" << std::endl;
    std::cout << "===================================================" << std::endl;

    return 0; // Return 0 = successful execution
}
