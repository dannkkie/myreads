import React from 'react';
import BookShelfController from './BookShelfController';

function Book(props) {
    const { book, onChangeShelf } = props;

    const image = book?.imageLinks?.thumbnail ?? `https://dummyimage.com/128x128/000/fff.png&text=No+Image`;

    const authors = book.authors === undefined ? 'Author is unknown' : book.authors.join(', ');

    return (
        <li>
          <div className='book'>
              <div className='book-top'>
                  <div className='book-cover' style={{ width: 128, height: 190, backgroundImage: `url(${image})` }}></div>
                  <BookShelfController book={book} onChangeShelf={onChangeShelf} />
              </div>
              <div className='book-title'>{book.title}</div>
              <div className='book-authors'>{authors}</div>
          </div>  
        </li>
    )
}



export default Book;