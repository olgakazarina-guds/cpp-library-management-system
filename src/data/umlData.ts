import { UMLClassNode, UMLLink } from '../types';

export const UML_NODES: UMLClassNode[] = [
  {
    id: 'Book',
    name: 'Book',
    conceptRole: 'Encapsulation',
    color: 'emerald',
    description: 'Stores details such as title, author, and ISBN with private fields and getter/setter accessors.',
    attributes: [
      '- title: std::string',
      '- author: std::string',
      '- isbn: std::string',
      '- is_borrowed: bool'
    ],
    methods: [
      '+ Book(title, author, isbn)',
      '+ get_title(): std::string',
      '+ get_author(): std::string',
      '+ get_isbn(): std::string',
      '+ get_is_borrowed(): bool',
      '+ set_borrowed(status: bool): void',
      '+ display_info(): void'
    ]
  },
  {
    id: 'Member',
    name: 'Member',
    isAbstract: true,
    stereotype: 'abstract',
    conceptRole: 'Inheritance',
    color: 'sky',
    description: 'Base abstract member class holding common member attributes and pure virtual borrow limits.',
    attributes: [
      '# name: std::string',
      '# member_id: std::string',
      '# list_of_borrowed_books: vector<string>'
    ],
    methods: [
      '+ Member(name, member_id)',
      '+ virtual ~Member() = default',
      '+ get_name(): std::string',
      '+ get_member_id(): std::string',
      '+ can_borrow(): bool',
      '+ borrow_book(isbn): bool',
      '+ return_book(isbn): bool',
      '+ virtual get_max_borrow_limit(): size_t = 0',
      '+ virtual get_member_type(): std::string = 0'
    ]
  },
  {
    id: 'RegularMember',
    name: 'RegularMember',
    conceptRole: 'Inheritance',
    color: 'indigo',
    description: 'Subclass of Member for standard library users with a strict borrowing limit of 3 books.',
    attributes: [],
    methods: [
      '+ RegularMember(name, id)',
      '+ get_max_borrow_limit(): size_t [3]',
      '+ get_member_type(): std::string'
    ]
  },
  {
    id: 'PremiumMember',
    name: 'PremiumMember',
    conceptRole: 'Inheritance',
    color: 'purple',
    description: 'Subclass of Member for VIP library users with an expanded borrowing limit of 5 books.',
    attributes: [],
    methods: [
      '+ PremiumMember(name, id)',
      '+ get_max_borrow_limit(): size_t [5]',
      '+ get_member_type(): std::string'
    ]
  },
  {
    id: 'AbstractLibrary',
    name: 'AbstractLibrary',
    isAbstract: true,
    stereotype: 'interface',
    conceptRole: 'Abstraction',
    color: 'amber',
    description: 'Abstract interface defining standard library operational contract.',
    attributes: [],
    methods: [
      '+ virtual ~AbstractLibrary() = default',
      '+ virtual add_book(book): bool = 0',
      '+ virtual borrow_book(member_id, isbn): bool = 0',
      '+ virtual return_book(member_id, isbn): bool = 0'
    ]
  },
  {
    id: 'BookRepository',
    name: 'BookRepository',
    conceptRole: 'Composition',
    color: 'rose',
    description: 'Encapsulates a standard std::unordered_map container to manage Book collection lifecycle.',
    attributes: [
      '- books: unordered_map<string, Book>'
    ],
    methods: [
      '+ add_book(book): bool',
      '+ has_book(isbn): bool',
      '+ get_book_ptr(isbn): Book*',
      '+ remove_book(isbn): bool',
      '+ get_all_books(): vector<Book>'
    ]
  },
  {
    id: 'MyLibrary',
    name: 'MyLibrary',
    conceptRole: 'Association',
    color: 'violet',
    description: 'Concrete library class executing library operations, owning BookRepository, and managing Members.',
    attributes: [
      '- repository: BookRepository',
      '- members: unordered_map<string, shared_ptr<Member>>'
    ],
    methods: [
      '+ register_member(member): bool',
      '+ add_book(book): bool override',
      '+ borrow_book(member_id, isbn): bool override',
      '+ return_book(member_id, isbn): bool override',
      '+ display_catalog(): void',
      '+ display_members(): void'
    ]
  }
];

export const UML_LINKS: UMLLink[] = [
  {
    id: 'l1',
    from: 'RegularMember',
    to: 'Member',
    type: 'inheritance',
    label: 'inherits (Limit: 3)',
    description: 'RegularMember inherits Member attributes and overrides get_max_borrow_limit() to return 3.'
  },
  {
    id: 'l2',
    from: 'PremiumMember',
    to: 'Member',
    type: 'inheritance',
    label: 'inherits (Limit: 5)',
    description: 'PremiumMember inherits Member attributes and overrides get_max_borrow_limit() to return 5.'
  },
  {
    id: 'l3',
    from: 'MyLibrary',
    to: 'AbstractLibrary',
    type: 'realization',
    label: 'implements',
    description: 'MyLibrary inherits and implements pure virtual methods defined in AbstractLibrary.'
  },
  {
    id: 'l4',
    from: 'MyLibrary',
    to: 'BookRepository',
    type: 'composition',
    label: 'has-a (Composition)',
    description: 'MyLibrary owns BookRepository as a value member. Lifetime of repository is tied to MyLibrary.'
  },
  {
    id: 'l5',
    from: 'MyLibrary',
    to: 'Member',
    type: 'aggregation',
    label: 'manages (Aggregation)',
    description: 'MyLibrary manages registered Member objects via shared pointers. Members can exist independently.'
  },
  {
    id: 'l6',
    from: 'Member',
    to: 'Book',
    type: 'association',
    label: 'borrows (Association)',
    description: 'Member references Book by ISBN in list_of_borrowed_books, forming a loose dynamic association.'
  }
];
