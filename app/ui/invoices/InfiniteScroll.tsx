'use client'
import { useEffect, useState } from 'react';

export default function InfiniteScroll({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  console.log("loading",loading);
  console.log("currentPage",currentPage);

  useEffect(() => {
    // Add event listener to listen for scroll events
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const loadMoreItems = async () => {
    if (loading || currentPage > totalPages) return;
    setLoading(true);

    // Simulate loading delay (replace with actual data fetching)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  const handleScroll = () => {
    // If scrolled to the bottom of the page, load more items
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreItems();
    }
  };

  return (
    <div className="flex flex-wrap">
      {generatePagination(currentPage, totalPages).map((page, index) => (
        <div key={index} className="w-1/4 p-4">
          {page}
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
}

function generatePagination(currentPage: number, totalPages: number): number[] {
  // For demonstration, generate page numbers from currentPage to totalPages
  const pages = [];
  for (let i = currentPage; i <= Math.min(currentPage + 3, totalPages); i++) {
    pages.push(i);
  }
  return pages;
}
