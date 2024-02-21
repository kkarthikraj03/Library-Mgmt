import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const range = (start, end) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return (
        <nav className='flex justify-center my-4'>
            <ul className='flex space-x-2'>
                <li>
                    <button
                        className={`px-3 py-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-400'
                            }`}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >Previous</button>
                </li>
                {range(1, totalPages).map((page) => (
                    <li key={page}>
                        <button
                            className={`px-3 py-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-400'
                                }`}
                            onClick={() => onPageChange(page)}
                        >{page}</button>
                    </li>
                ))}
                <li>
                    <button
                        className={`px-3 py-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-400'
                            }`}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
