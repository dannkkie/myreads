import React, { Component } from 'react';

class BookShelfController extends Component {
    state = {
        isUpdating: false
    };

    componentWillReceiveProps() {
        this.setState({isUpdating: false})
    }

    changeShelf = event => {
        this.props.onChangeShelf(this.props.book, event);
        this.setState({isUpdating: true})
    }

    render() {
        return (
            <div className={this.state.isUpdating ? 'book-shelf-changer loading' : 'book-shelf-changer'}>
                <select value={this.props.book.shelf} onChange={event => this.changeShelf(event)}>
                    <option value='move' disabled>Move to...</option>
                    <option value='currentlyReading' disabled>Currently Reading</option>
                    <option value='wantToRead' disabled>Want to Read</option>
                    <option value='read' disabled>Read</option>
                    <option value='none' disabled>None</option>
                </select>
                {this.state.isUpdating && <div className='loader-two'></div>}
            </div>
        )
    }
}


export default BookShelfController;