import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component {
    state = {
        query: '',
        findBook: [],
        isSearching: false,
        error: false
    }

    updateQuery = event => {
        this.setState({ query: event.target.value }, () => {this.searchBooks(event)})
    }

    searchBooks = event => {
        const { query } = this.state;

        if (query) {
            this.setState({ isSearching: true});
            BooksAPI.search(query).then(results => {
                if (results.error) {
                    this.setState({ findBook: [], isSearching: false, error: true});
                } else if (results) {
                    this.setState({ error: false});
                    this.updateBooks(results);
                }
            })
        } else {
            this.setState({ findBook: []});
        }
    }

    updateBooks = books => {
        const { shelvedBooks } = this.props;

        for (const book of books) {
            book.shelf = 'none';
            
            for (const shelvedBook of shelvedBooks) {
                if (book.id === shelvedBook.id) {
                    book.shelf = shelvedBook.shelf;
                }
            }
        }

        this.setState({
            findBook: books,
            issearching: false
        })
    }

    updateBook = books => {
        const { findBook } = this.state;

        for (const book of findBook) {
            for (const shelvedBook of books) {
                if (book.id === shelvedBook.id) {
                    book.shelf = shelvedBook.shelf;
                }
            }
        }
        this.setState({ findBook });
    }

    changeShelf = (book, event) => {
        this.props.onChangeShelf(book, event).then(books => this.updateBook(books))
    }

    render() {
        const { findBook } = this.state;

        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link to='/' className='close-search'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input type='text' value={this.state.query} placeholder='Search by title or author' onChange={event => this.updateQuery(event)} />
                    </div>
                </div>

                {this.state.error && !this.state.isSearching && (
                    <div className='search-books-results center'>
                        <h4>Result Not Found</h4>
                    </div>
                )}

                {this.state.isSearching ? (
                    <div className='loader'></div>
                ) : (
                    <div className='search-books-results'>
                        <ol className='books-grid'>
                            {findBook.map(book => (
                                <Book key={book.id} book={book} onChangeShelf={this.changeShelf} />
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        )
    }
}


export default BookSearch;