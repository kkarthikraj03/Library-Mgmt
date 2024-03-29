import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';

const Home = () => {
  const [bookData, SetBookData] = useState([]);
  const [sortBy, SetSortBy] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  // const [filteredBooks, SetFilteredBooks] = useState([]);
  const [searchQuery, SetSearchQuery] = useState('');
  const [currentPage, SetCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookData.length / 5);
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/fetch');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // console.log(data);
      SetBookData(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  const handlePage = (page) => {
    SetCurrentPage(page);
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const filteredBooks = bookData.filter(book => {
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    const publisher = book.publisher.toLowerCase();
    const genre = book.genre.toLowerCase();
    const query = searchQuery.toLowerCase();

    let matchesSearchQuery = title.includes(query) || author.includes(query) || publisher.includes(query) || genre.includes(query);
    let matchesSelectedValue = true;

    if (selectedValue && sortBy) {
      if (sortBy === 'author') {
        matchesSelectedValue = book.author.toLowerCase() === selectedValue.toLowerCase();
      } else if (sortBy === 'genre') {
        matchesSelectedValue = book.genre.toLowerCase() === selectedValue.toLowerCase();
      } else if (sortBy === 'publisher') {
        matchesSelectedValue = book.publisher.toLowerCase() === selectedValue.toLowerCase();
      }
    }
    return matchesSearchQuery && matchesSelectedValue;
  })

  const handleSortBy = (e) => {
    SetSortBy(e.target.value);
    setSelectedValue('');
  }
  const handleSelectedValue = (e) => {
    setSelectedValue(e.target.value);
  }
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className='flex justify-center items-center flex-col mt-10'>
      <h2 className='text-3xl font-bold my-10'>Library Management System</h2>
      <div className='my-4 flex justify-around items-center bg-blue-300 w-3/4 h-14'>
        <div className='w-1/3'>
          <input
            type='text'
            className='border border-neutral-950 w-full p-1 rounded-md'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => SetSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='sort' className='mr-2'>Sort By</label>
          <select name="sort" id="sort" className='rounded-md p-1' value={sortBy} onChange={handleSortBy}>
            <option value=''>Select</option>
            <option value='genre'>Genre</option>
            <option value='author'>Author</option>
            <option value='publisher'>Publisher</option>
          </select>
        </div>
        <div>
          <label htmlFor='selectedValue' className='mr-4'>Select {sortBy}</label>
          <select name="selectedValue" id="selectedValue" className='rounded-md p-1' value={selectedValue} onChange={handleSelectedValue}>
            <option value="">All</option>
            {[...new Set(bookData.map(book => book[sortBy]))].map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex justify-center items-center text-center w-full'>
        <table className='border border-neutral-950 w-3/4'>
          <thead>
            <tr>
              <th className='p-2'>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Genre</th>
              <th>Published Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.slice((currentPage - 1) * 5, currentPage * 5).map((book) => (
              <tr key={book.id}>
                <td className='p-2'>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.genre}</td>
                <td>{formatDate(book.published_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePage} />
    </div>
  )
}

export default Home
