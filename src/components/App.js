import React, { Component } from 'react';
import Input from './Input.js'
import '../css/flexboxgrid.css';
import '../css/App.css';

class App extends Component {
  constructor(props){
    super(props);
    if(localStorage.getItem('bookmarks') === null){
    this.state = {
      bookmarks: []
    }}
    else {
      this.state = {
        bookmarks: JSON.parse(localStorage.getItem('bookmarks'))
      }
    }
  }
  submitBtnClick(){
    //getting values of input
    let bookmark = {
     name: document.getElementById('pageName').value,
     url: document.getElementById('pageURL').value
}
    if(localStorage.getItem('bookmarks') === null){
      let bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      this.setState({bookmarks: bookmarks});
      return true;
    }
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //Validate empty form
    if(!bookmark.name || !bookmark.url){
      alert('please fill in the form');
      return false;
    }
    //Regular expression to check url
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if(!regex.test(bookmark.url)){
      alert("Invalid URL");
      return false;
    }
    let repeatURL;
    bookmarks.map((item, index)=>{
      if(item.url == bookmark.url){
      alert('this url already exists');
      repeatURL = true;}
      else{
        repeatURL = false;
      }
    });
    document.getElementById('pageName').value = '';
    document.getElementById('pageURL').value = '';
    if(!repeatURL){
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    this.setState({bookmarks: bookmarks});}
    return true;
  }//submitBtnClick
deleteBookmark(index){
  let bookmarks = this.state.bookmarks;
  bookmarks.splice(index, 1);
  this.setState({bookmarks: bookmarks});
  if(bookmarks.length == 0){
    localStorage.removeItem('bookmarks');
    return false;
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}//deleteBookmark
  render() {
    const bookmarks = this.state.bookmarks;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <p className="brand">React-Bookmarker</p>
            <hr/>
            <br/>
            <p className="brand-page">Bookmark Web Pages</p>

            <label className="label">Web Page</label>
            <Input type="text" className="input-form" id="pageName" placeholder="Web Page Name" />
            <label className="label">Web URL</label>
            <Input type="text" className="input-form" id="pageURL" placeholder="Web Page URL" />
            <button type="submit" id="submitBtn" onClick={()=>this.submitBtnClick()}>Submit</button>
          </div>
          <div id="bookmarksResult" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul>
              {bookmarks.map((bookmark, index)=>{
                return(
                <div className="col-xs-12 bookmark-wrapper">
                    <li key={index}>{bookmark.name}</li>
                    <a id="goBtn" href={bookmark.url} target="_blank">GO</a>
                    <button id="deleteBtn" onClick={()=>this.deleteBookmark(index)}>Delete</button>
              </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
