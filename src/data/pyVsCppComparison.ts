export interface ComparisonTopic {
  id: string;
  title: string;
  concept: string;
  pySnippet: string;
  cppSnippet: string;
  keyDifferences: string[];
  proTip: string;
}

export const PY_VS_CPP_TOPICS: ComparisonTopic[] = [
  {
    id: 'encapsulation',
    title: '1. Encapsulation (Private Fields & Accessors)',
    concept: 'Hiding internal object details and providing public getters/setters.',
    pySnippet: `class Book:
    def __init__(self, title, author, isbn):
        self._title = title      # Soft private convention (_)
        self.__isbn = isbn        # Name mangling (__)
        self._is_borrowed = False

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        if value: self._title = value`,
    cppSnippet: `class Book {
private:
    std::string title;    // Enforced private by compiler
    std::string author;
    std::string isbn;
    bool is_borrowed;

public:
    // Const getter prevents accidental modification
    std::string get_title() const { return title; }
    void set_title(const std::string& t) {
        if (!t.empty()) title = t;
    }
};`,
    keyDifferences: [
      'In Python, private attributes are soft conventions (`_`) or name-mangled (`__`), whereas C++ enforces access specifiers (`private`, `protected`, `public`) at compile time.',
      'C++ getters frequently use the `const` keyword (`std::string get_title() const`) to guarantee the method cannot alter the object\'s state.',
      'Parameters in C++ are passed by const reference (`const std::string&`) to eliminate expensive string copying.'
    ],
    proTip: 'Always mark C++ getters as "const"! In C++, passing a const reference into a function requires that any methods called on that object are marked const.'
  },
  {
    id: 'inheritance',
    title: '2. Inheritance & Subclass Borrowing Limits',
    concept: 'Deriving RegularMember and PremiumMember from a base Member class.',
    pySnippet: `class Member:
    def __init__(self, name, member_id):
        self.name = name
        self.member_id = member_id
        self.borrowed_books = []

    def get_max_borrow_limit(self):
        raise NotImplementedError

class RegularMember(Member):
    def get_max_borrow_limit(self):
        return 3

class PremiumMember(Member):
    def get_max_borrow_limit(self):
        return 5`,
    cppSnippet: `class Member {
protected:
    std::string name;
    std::string member_id;
    std::vector<std::string> borrowed_books;

public:
    virtual ~Member() = default; // Essential!
    virtual size_t get_max_borrow_limit() const = 0;
};

class RegularMember : public Member {
public:
    size_t get_max_borrow_limit() const override {
        return 3;
    }
};

class PremiumMember : public Member {
public:
    size_t get_max_borrow_limit() const override {
        return 5;
    }
};`,
    keyDifferences: [
      'In C++, base classes MUST declare `virtual ~Base() = default;` (virtual destructor) so deleting a derived object via a base pointer safely cleans up memory.',
      'C++ uses `public Member` inheritance syntax and explicit `override` keyword on overridden virtual functions.',
      'C++ standard library container `std::vector<std::string>` replaces Python lists for storing borrowed book ISBNs.'
    ],
    proTip: 'Always use the `override` keyword in C++ derived classes! The compiler will alert you if the signature does not match the base class virtual function.'
  },
  {
    id: 'abstraction',
    title: '3. Abstraction (Pure Virtual Interfaces)',
    concept: 'AbstractLibrary defining pure virtual contracts for MyLibrary.',
    pySnippet: `from abc import ABC, abstractmethod

class AbstractLibrary(ABC):
    @abstractmethod
    def add_book(self, book):
        pass

    @abstractmethod
    def borrow_book(self, member_id, isbn):
        pass

class MyLibrary(AbstractLibrary):
    def add_book(self, book):
        # Implementation here
        return True`,
    cppSnippet: `class AbstractLibrary {
public:
    virtual ~AbstractLibrary() = default;

    // Pure virtual functions (= 0)
    virtual bool add_book(const Book& book) = 0;
    virtual bool borrow_book(const std::string& member_id, 
                             const std::string& isbn) = 0;
    virtual bool return_book(const std::string& member_id, 
                              const std::string& isbn) = 0;
};

class MyLibrary : public AbstractLibrary {
public:
    bool add_book(const Book& book) override { ... }
};`,
    keyDifferences: [
      'Python uses `abc.ABC` and `@abstractmethod`, while C++ uses `= 0` syntax (pure virtual functions).',
      'An abstract class in C++ cannot be instantiated directly; any subclass that omits a pure virtual function remains abstract.',
      'Polymorphism in C++ works via base pointers or references (`AbstractLibrary*` or `std::unique_ptr<AbstractLibrary>`).'
    ],
    proTip: 'In C++, pure virtual functions are declared by assigning `= 0` at the end of the declaration in the header file.'
  },
  {
    id: 'composition_aggregation',
    title: '4. Composition vs Aggregation & STL Containers',
    concept: 'BookRepository ownership (Composition) vs Member management (Aggregation).',
    pySnippet: `class BookRepository:
    def __init__(self):
        self.books = {} # dict mapping ISBN -> Book

class MyLibrary:
    def __init__(self):
        self.repository = BookRepository() # Composition
        self.members = {} # Aggregation (Member references)`,
    cppSnippet: `class MyLibrary : public AbstractLibrary {
private:
    // Composition: BookRepository is a value member
    // Destruction of MyLibrary automatically destroys repository
    BookRepository repository;

    // Aggregation: Shared ownership of Members
    // Members can exist independently outside library
    std::unordered_map<std::string, std::shared_ptr<Member>> members;
};`,
    keyDifferences: [
      'In Python, all variable assignment involves dynamic reference passing on heap objects.',
      'In C++, composition is achieved cleanly by making `BookRepository` a direct value member of `MyLibrary`.',
      'In C++, aggregation is modeled using `std::shared_ptr<Member>` or raw pointers to indicate that the Member object is shared or lives independently.'
    ],
    proTip: 'Use `std::unordered_map` in C++ for O(1) key-value hash map lookups equivalent to Python dictionaries.'
  },
  {
    id: 'headers_sources',
    title: '5. Header (.hpp) vs Implementation (.cpp) Separation',
    concept: 'Structuring code into declarations and definitions.',
    pySnippet: `# Everything lives in module files (.py)
# book.py contains both class definition and logic

class Book:
    def __init__(self, title):
        self.title = title`,
    cppSnippet: `// Book.hpp (Declaration - Interface contract)
#ifndef BOOK_HPP
#define BOOK_HPP
#include <string>

class Book {
private:
    std::string title;
public:
    Book(const std::string& t);
    std::string get_title() const;
};
#endif

// Book.cpp (Implementation - Method definitions)
#include "Book.hpp"

Book::Book(const std::string& t) : title(t) {}
std::string Book::get_title() const { return title; }`,
    keyDifferences: [
      'C++ separates declarations (`.hpp`) from definitions (`.cpp`) to speed up compilation and resolve cyclic dependencies.',
      'Header guards (`#ifndef BOOK_HPP`, `#define BOOK_HPP`, `#endif`) or `#pragma once` prevent duplicate compilation errors when headers are included multiple times.',
      'Python executes code directly on import, whereas C++ compiles `.cpp` files into object code and links them into an executable.'
    ],
    proTip: 'Never put method implementation code inside `.hpp` headers unless they are templates or inline functions!'
  }
];
