import React from 'react';
import useStore from '../store/mainStore.js';

const Pagination = () => {
    const { currentPage, setCurrentPage, posts, postsPerPage, filteredPosts } = useStore();
    const totalPages = Math.ceil(filteredPosts().length / postsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        if (totalPages <= 3) {
            return pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handleClick(number)}
                    className={number === currentPage ? 'active' : ''}
                >
                    {number}
                </button>
            ));
        } else {
            const firstPage = (
                <button
                    key={1}
                    onClick={() => handleClick(1)}
                    className={1 === currentPage ? 'active' : ''}
                >
                    1
                </button>
            );

            const lastPage = (
                <button
                    key={totalPages}
                    onClick={() => handleClick(totalPages)}
                    className={totalPages === currentPage ? 'active' : ''}
                >
                    {totalPages}
                </button>
            );

            const dots = <span key="dots">...</span>;

            let middlePages;
            if (currentPage <= 2) {
                middlePages = [2, 3].map((number) => (
                    <button
                        key={number}
                        onClick={() => handleClick(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ));
            } else if (currentPage >= totalPages - 1) {
                middlePages = [totalPages - 2, totalPages - 1].map((number) => (
                    <button
                        key={number}
                        onClick={() => handleClick(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ));
            } else {
                middlePages = [currentPage - 1, currentPage, currentPage + 1].map((number) => (
                    <button
                        key={number}
                        onClick={() => handleClick(number)}
                        className={number === currentPage ? 'active' : ''}
                    >
                        {number}
                    </button>
                ));
            }

            return [firstPage, ...middlePages, dots, lastPage];
        }
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                {'<'}
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;
