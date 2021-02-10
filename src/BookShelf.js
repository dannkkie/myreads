import React from 'react';
import Book from './Book';


function BookShelf(props) {
    return (
        <div className='bookshelf'>
            <h2 className='bookshelf-title'>{props.shelfName}</h2>
            <div className='bookshelf-books'>
                {!props.appLoaded ? (<div className='loader'></div>) 
                : props.fBooks.length <= 0 ? (<h3 className='bookshelf-status'>Shelf is Empty</h3>)
                : (
                    <ol className='books-grid'>
                        {props.fBooks.map(book => (
                            <Book key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
                        ))}
                    </ol>
                )}
            </div>
        </div>
    ) 
}



export default BookShelf;