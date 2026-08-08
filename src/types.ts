export type MemberType = 'regular' | 'premium';

export interface Book {
  isbn: string;
  title: string;
  author: string;
  year?: number;
  isBorrowed: boolean;
  borrowedByMemberId?: string;
  borrowedDate?: string;
}

export interface Member {
  id: string;
  name: string;
  type: MemberType;
  maxBorrowLimit: number; // 3 for Regular, 5 for Premium
  borrowedIsbns: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'cpp_cout';
  text: string;
  cppTrace?: string;
}

export interface CPPFile {
  id: string;
  name: string;
  language: string;
  category: 'header' | 'source' | 'main';
  description: string;
  content: string;
  annotations?: { line: number; label: string; concept: string; explanation: string }[];
}

export interface UMLClassNode {
  id: string;
  name: string;
  stereotype?: string;
  isAbstract?: boolean;
  conceptRole: 'Encapsulation' | 'Inheritance' | 'Abstraction' | 'Composition' | 'Association';
  attributes: string[];
  methods: string[];
  description: string;
  color: string;
}

export interface UMLLink {
  id: string;
  from: string;
  to: string;
  type: 'inheritance' | 'realization' | 'composition' | 'aggregation' | 'association';
  label: string;
  description: string;
}

export interface CriteriaFeedback {
  category: string;
  status: 'pass' | 'warning' | 'fail';
  comments: string;
}

export interface AIReviewResult {
  overallScore: number;
  summary: string;
  criteriaFeedback: CriteriaFeedback[];
  keyStrengths: string[];
  areasForImprovement: string[];
  aiUsageFramework: string;
  improvedCodeSnippet?: string;
}
