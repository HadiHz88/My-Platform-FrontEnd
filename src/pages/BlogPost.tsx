
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CommentSection from '@/components/CommentSection';
import { CalendarIcon, MessageCircle, UserCircle, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
// Import the type only to avoid naming conflicts
import type { BlogPost as BlogPostType } from '@/components/BlogPostCard';
import type { Comment } from '@/components/CommentSection';

// FIXME: API INTEGRATION
// TODO: Replace this mock data with your API call
// Delete this entire mock data when integrating real API
const samplePosts: BlogPostType[] = [
  {
    id: '1',
    title: 'How to Optimize React Performance with Proper State Management',
    excerpt: 'Learn the best practices for managing state in React applications to improve performance and user experience.',
    content: `
# How to Optimize React Performance with Proper State Management

React applications can become slow as they grow in complexity. This guide will show you how to use proper state management techniques to keep your React apps fast and responsive.

## Understanding React's Rendering Mechanism

React's virtual DOM is a lightweight representation of the actual DOM. When state changes, React compares the new virtual DOM with the previous one, and only updates the real DOM with the necessary changes.

However, inefficient state management can trigger unnecessary re-renders, causing performance issues.

## Common State Management Mistakes

1. **Updating state too frequently**: Batching state updates can prevent excessive re-renders.
2. **Using a single state object for everything**: This causes components to re-render when unrelated state changes.
3. **Prop drilling through many components**: This makes your component tree brittle and hard to maintain.
4. **Not memoizing expensive calculations**: Recalculating values on every render wastes CPU cycles.

## Best Practices for State Management

### 1. State Colocation

Keep state as close as possible to where it's used. If only one component uses a piece of state, keep it in that component.

\`\`\`jsx
// Bad: State in parent component when only child uses it
function Parent() {
  const [count, setCount] = useState(0);
  return <Child count={count} setCount={setCount} />;
}

// Good: State colocated in component that uses it
function Child() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

### 2. Use Context API for Deeply Shared State

For state that's needed by many components, use React's Context API instead of prop drilling.

\`\`\`jsx
const ThemeContext = React.createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MainContent />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ background: theme === 'light' ? '#fff' : '#333' }}
    >
      Toggle Theme
    </button>
  );
}
\`\`\`

### 3. Use Reducers for Complex State Logic

For complex state with many related pieces or complicated update logic, use \`useReducer\` instead of multiple \`useState\` calls.

\`\`\`jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
\`\`\`

### 4. Memoize Expensive Calculations

Use \`useMemo\` to avoid recalculating expensive values on every render.

\`\`\`jsx
function ProductList({ products, searchTerm }) {
  // This will only recalculate when products or searchTerm changes
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);
  
  return (
    <ul>
      {filteredProducts.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### 5. Prevent Unnecessary Re-renders with memo

Wrap components with \`React.memo()\` to prevent re-rendering when props haven't changed.

\`\`\`jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ value }) {
  console.log('Rendering expensive component...');
  return <div>{value}</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [value] = useState('Some value that doesn't change');
  
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
      <ExpensiveComponent value={value} />
    </>
  );
}
\`\`\`

## When to Use External State Management Libraries

While React's built-in state management is sufficient for many applications, you might consider using external libraries like Redux, Zustand, or Jotai when:

1. You have complex state that's shared across many components
2. You need to persist and rehydrate state
3. You want more predictable state management with dev tools for debugging
4. Your application state has complex relationships or dependencies

## Conclusion

Proper state management is crucial for maintaining the performance of your React applications. By following these best practices, you can ensure your app stays fast and responsive even as it grows in complexity.

Remember:
- Keep state as close as possible to where it's used
- Use Context for widely shared state
- Consider useReducer for complex state logic
- Memoize expensive calculations
- Prevent unnecessary re-renders with memo
- Use external state management libraries when needed

By implementing these strategies, you'll create React applications that are not only easier to maintain but also deliver a better user experience through improved performance.
    `,
    date: 'Jan 15, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'React',
    tags: ['React', 'Performance', 'JavaScript'],
    commentCount: 8,
  },
  {
    id: '2',
    title: 'Building a Full-Stack Portfolio with React and Node.js',
    excerpt: 'A comprehensive guide to creating a professional portfolio website using modern web technologies.',
    content: 'Full content here...',
    date: 'Feb 22, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Portfolio',
    tags: ['React', 'Node.js', 'Portfolio'],
    commentCount: 12,
  },
  {
    id: '3',
    title: 'TypeScript Best Practices for Large Applications',
    excerpt: 'Discover how to effectively use TypeScript in large-scale applications to maximize type safety and developer productivity.',
    content: 'Full content here...',
    date: 'Mar 10, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    commentCount: 5,
  },
  {
    id: '4',
    title: 'Creating Responsive Layouts with Tailwind CSS',
    excerpt: 'Learn how to build beautiful, responsive user interfaces quickly and efficiently using Tailwind CSS.',
    content: 'Full content here...',
    date: 'Apr 5, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
    category: 'CSS',
    tags: ['Tailwind CSS', 'Responsive Design', 'CSS'],
    commentCount: 9,
  },
  {
    id: '5',
    title: 'Modern State Management with Redux Toolkit',
    excerpt: 'An in-depth guide to using Redux Toolkit for simplified and more efficient state management in React applications.',
    content: 'Full content here...',
    date: 'May 18, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'React',
    tags: ['Redux', 'React', 'State Management'],
    commentCount: 7,
  },
  {
    id: '6',
    title: 'Building Accessible Web Applications',
    excerpt: 'Essential techniques and best practices for creating web applications that are accessible to all users.',
    content: 'Full content here...',
    date: 'Jun 30, 2023',
    author: 'Hadi Hijazi',
    imageUrl: 'https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Accessibility',
    tags: ['Accessibility', 'Web Development', 'HTML'],
    commentCount: 4,
  },
];

// FIXME: API INTEGRATION
// TODO: Replace with API call to fetch comments for the specific blog post
// Delete this mock data when integrating real API
const sampleComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Jane Doe',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'This was such a helpful article! I\'ve been struggling with React performance for a while.',
    date: 'Jan 16, 2023',
    likes: 8,
    replies: [
      {
        id: '1-1',
        author: {
          name: 'Hadi Hijazi',
          avatarUrl: 'https://i.pravatar.cc/150?img=8',
        },
        content: 'Thank you! I\'m glad you found it useful. Feel free to share any specific issues you\'re facing.',
        date: 'Jan 16, 2023',
        likes: 3,
      }
    ]
  },
  {
    id: '2',
    author: {
      name: 'Mark Wilson',
    },
    content: 'Great points about memoization! One thing I\'d add is that over-memoizing can sometimes lead to worse performance due to the overhead.',
    date: 'Jan 17, 2023',
    likes: 5,
  },
  {
    id: '3',
    author: {
      name: 'Sarah Tech',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    content: 'Have you considered writing a follow-up about the new React 18 concurrent rendering and how it affects these optimization strategies?',
    date: 'Jan 19, 2023',
    likes: 12,
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // FIXME: API INTEGRATION
  // TODO: Add state for comments and fetch them from API
  const [comments, setComments] = useState<Comment[]>(sampleComments);

  // FIXME: API INTEGRATION
  // TODO: Replace this mock data fetch with your API call
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      
      // TODO: Replace with actual API call
      // Example:
      // try {
      //   const response = await fetch(`/api/blog-posts/${id}`);
      //   if (!response.ok) throw new Error("Post not found");
      //   const data = await response.json();
      //   setPost(data);
      //   
      //   // Fetch comments in parallel
      //   const commentsResponse = await fetch(`/api/blog-posts/${id}/comments`);
      //   if (commentsResponse.ok) {
      //     const commentsData = await commentsResponse.json();
      //     setComments(commentsData);
      //   }
      // } catch (error) {
      //   console.error('Failed to fetch blog post:', error);
      //   setError("Failed to load blog post. Please try again later.");
      // } finally {
      //   setIsLoading(false);
      // }
      
      // Delete this mock code when integrating real API
      setTimeout(() => {
        const foundPost = samplePosts.find(post => post.id === id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError("Blog post not found");
        }
        setIsLoading(false);
      }, 800);
    };

    fetchPost();
  }, [id]);

  return (
    <Layout>
      {isLoading ? (
        <div className="container mx-auto mt-10 p-6">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : error ? (
        <div className="container mx-auto mt-10 p-6 text-red-500">
          Error: {error}
        </div>
      ) : post ? (
        <div className="container mx-auto mt-10 p-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/blogs" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-500 mb-2">
            <UserCircle className="w-4 h-4 mr-1" />
            {post.author}
            <span className="mx-2">&middot;</span>
            <CalendarIcon className="w-4 h-4 mr-1" />
            {post.date}
          </div>
          <div className="flex items-center text-gray-500 mb-4">
            <Tag className="w-4 h-4 mr-1" />
            <Badge variant="secondary">{post.category}</Badge>
          </div>
          <img src={post.imageUrl} alt={post.title} className="w-full rounded-md mb-4" />
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <CommentSection blogPostId={post.id} comments={comments} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-10 p-6">
          Blog post not found.
        </div>
      )}
    </Layout>
  );
};

export default BlogPost;
