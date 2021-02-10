import React, { Component } from 'react';
import { Link,  Route } from 'react-router-dom';

import './App.css';
import './loader.css';
import BookSearch from './BookSearch';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';


class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    isLoaded: false
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
      this.setState({
        books,
        isLoaded: true
    })
  }

  changeShelf = (book, event) => {
    return new Promise(resolve => {
      BooksAPI.update(book, event.target.value).then(results => {
        BooksAPI.getAll().then(results => {
          this.setState({
            books: results
          }, resolve(results))
        })
      })
    })
  }

  render() {
    const { isLoaded, books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    key="Currently Reading"
                    shelfName="Currently Reading"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'currentlyReading')}
                    onChangeShelf={this.changeShelf}
                  />
                  <BookShelf
                    key="Want to Read"
                    shelfName="Want to Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'wantToRead')}
                    onChangeShelf={this.changeShelf}
                  />
                  <BookShelf
                    key="Read"
                    shelfName="Read"
                    appLoaded={isLoaded}
                    fBooks={books.filter(book => book.shelf === 'read')}
                    onChangeShelf={this.changeShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add Book</Link>
              </div>
            </div>
          )}/>

          <Route path="/search">
          <BookSearch shelvedBooks={books} onChangeShelf={this.changeShelf} />
          </Route>  
      </div>
    )
  }
}


export default BooksApp;
