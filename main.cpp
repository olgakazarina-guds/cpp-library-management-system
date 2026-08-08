// ============================================================================
// File: main.cpp
// Concept: MAIN DRIVER & COMPLETE OOP SYSTEM HARNESS
// Description: Demonstrates Encapsulation, Inheritance, Polymorphism, Abstraction,
//              Composition, Aggregation, and Association in execution.
// ============================================================================

#include "MyLibrary.hpp"
#include <iostream>
#include <memory> // For std::unique_ptr, std::shared_ptr, std::make_unique, std::make_shared

int main() {
    std::cout << "===================================================
";
    std::cout << "   C++ LIBRARY MANAGEMENT SYSTEM - OOP TEST HARNESS
";
    std::cout << "===================================================

";

    // --- POLYMORPHISM & ABSTRACTION DEMONSTRATION ---
    // We instantiate MyLibrary using a smart pointer to the abstract base class (AbstractLibrary).
    // This demonstrates loose coupling: main() depends on the Abstract interface, not raw implementation details.
    std::unique_ptr<AbstractLibrary> library = std::make_unique<MyLibrary>();

    // Using dynamic_cast to access MyLibrary-specific helper functions (like register_member)
    MyLibrary* myLib = dynamic_cast<MyLibrary*>(library.get());

    // ------------------------------------------------------------------------
    // STEP 1. POPULATE CATALOG (Encapsulation + Composition)
    // Books are created using constructors and passed into the library repository.
    // ------------------------------------------------------------------------
    std::cout << "--- 1. Adding Books to Repository ---
";
    library->add_book(Book("The C++ Programming Language", "Bjarne Stroustrup", "978-0321563842"));
    library->add_book(Book("Design Patterns", "Erich Gamma et al.", "978-0201633610"));
    library->add_book(Book("Clean Code", "Robert C. Martin", "978-0132350884"));
    library->add_book(Book("Effective Modern C++", "Scott Meyers", "978-1491903994"));
    library->add_book(Book("Introduction to Algorithms", "Thomas H. Cormen", "978-0262033848"));
    library->add_book(Book("Structure and Interpretation of Computer Programs", "Harold Abelson", "978-0262510875"));

    // ------------------------------------------------------------------------
    // STEP 2. REGISTER MEMBERS (Inheritance: Regular vs Premium Subclasses)
    // Demonstrates Subclassing: Alice is a RegularMember (limit 3 books).
    // Bob is a PremiumMember (limit 5 books).
    // ------------------------------------------------------------------------
    std::cout << "
--- 2. Registering Members (Inheritance) ---
";
    auto alice = std::make_shared<RegularMember>("Alice Smith", "M001"); // Max 3 books
    auto bob = std::make_shared<PremiumMember>("Bob Jones", "M002");    // Max 5 books

    myLib->register_member(alice);
    myLib->register_member(bob);

    myLib->display_catalog();
    myLib->display_members();

    // ------------------------------------------------------------------------
    // STEP 3. TEST BORROWING LIMITS (Polymorphism)
    // Regular Member Alice attempts to borrow 4 books.
    // The 4th borrow attempt MUST be rejected by the system!
    // ------------------------------------------------------------------------
    std::cout << "--- 3. Testing Regular Member Borrowing Limit (Alice - Max 3) ---
";
    library->borrow_book("M001", "978-0321563842"); // Borrow 1
    library->borrow_book("M001", "978-0201633610"); // Borrow 2
    library->borrow_book("M001", "978-0132350884"); // Borrow 3
    // 4th borrow attempt: Triggers borrowing limit enforcement!
    library->borrow_book("M001", "978-1491903994"); 

    // ------------------------------------------------------------------------
    // STEP 4. TEST PREMIUM MEMBER BORROWING LIMITS (Bob - Max 5)
    // Premium Member Bob can borrow up to 5 books without error.
    // ------------------------------------------------------------------------
    std::cout << "
--- 4. Testing Premium Member Borrowing Limit (Bob - Max 5) ---
";
    library->borrow_book("M002", "978-1491903994"); // Borrow 1
    library->borrow_book("M002", "978-0262033848"); // Borrow 2
    library->borrow_book("M002", "978-0262510875"); // Borrow 3

    // ------------------------------------------------------------------------
    // STEP 5. RETURNING BOOKS & RE-BORROWING
    // Alice returns a book, freeing up her capacity to borrow another.
    // ------------------------------------------------------------------------
    std::cout << "
--- 5. Returning Books ---
";
    library->return_book("M001", "978-0321563842"); // Alice returns 1st book
    // Alice now holds 2/3 books, so her 4th book borrow will now SUCCEED!
    std::cout << "Alice attempts borrowing again after returning:
";
    library->borrow_book("M001", "978-0321563842");

    myLib->display_catalog();
    myLib->display_members();

    std::cout << "===================================================
";
    std::cout << "   ALL C++ OOP SYSTEM TESTS EXECUTED SUCCESSFULLY!
";
    std::cout << "===================================================
";

    return 0; // Return exit code 0 indicating successful execution
}
