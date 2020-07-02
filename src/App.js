import image1 from '../src/images/books.png'
import React, { Component } from 'react'
import './App.css'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            imgIndex: 0,
            image: "",
            value: '',
            
        };
        this.myFunction = this.myFunction.bind(this);
    }

    componentDidMount() {
        fetch('https://api.jsonbin.io/b/5ea833484c87c3359a632938', {
            method: "GET",
            mode: 'cors',
            cache: 'default' 
            })
            .then(response => response.json())
            .then(data => this.setState({data:data.books}))
            .catch(err=> console.log(err))
            }

        openModal = (n) => {
            console.log(this.state.data)
            document.getElementById("myModal").style.display = "block";
            this.setState({image: this.state.data[n].details})
            this.setState({imgIndex: n})
        }

        closeModal = () => {
            document.getElementById("myModal").style.display = "none";
            this.setState({image: []})
              }

        plusSlides = (plus) => {
            if (this.state.imgIndex + 1 + plus > this.state.data.length) {
                this.setState({image: [this.state.data[0].details]})
                this.setState({imgIndex: 0})
            }else if (this.state.imgIndex + plus < 0) {
                this.setState({image: [this.state.data[this.state.data.length -1].details]})
                this.setState({imgIndex: this.state.data.length -1})
            }else if (plus > 0) {
                this.setState({image: [this.state.data[this.state.imgIndex +1].details]})
                this.setState({imgIndex: this.state.imgIndex + plus})
            } else if (plus < 0) {
                this.setState({image: [this.state.data[this.state.imgIndex -1].details]})
                this.setState({imgIndex: this.state.imgIndex + plus})
            }}

            
    myFunction = (event) => {
        

        this.setState({value: event.target.value.toUpperCase()}, ()=> {
            this.filterCards()
        })
    
    }
  
    filterCards = () => {

    var body = document.getElementById("body")
    var cards = body.getElementsByClassName("flip-card")
    var i = 0
    for (i=0; i< cards.length; i++) {
      var insideText = cards[i].getElementsByTagName("h3")[0];
      var insideText2 = cards[i].getElementsByTagName("p")[0]
      if (cards) {
        var txtValue = insideText.textContent //|| insideText.innerText 
        var txtValue2 = insideText2.textContent //|| insideText2.innerText
      }
      if (txtValue.toUpperCase().indexOf(this.state.value) > -1 || txtValue2.toUpperCase().indexOf(this.state.value) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
      }
    }

    render() {
        
        return (
            <div>
                <header id="header">
                    <div id="header2">
                        <div className="image1">
                            <img src={image1} alt="Ubiqum Logo"></img>
                        </div>
                        <div id="headerText">
                            <h1>UBIQUM</h1>
                            <h2>BOOKSTORE</h2>
                        </div>  
                    </div>
                    <div id="headerSearch">  
                        <input type="text" id="myInput" onKeyUp={this.myFunction} placeholder="Search..."></input>        
                    </div>
                </header>
                <div id="headerBar"></div>
                <div id="body">
                    {this.state.data.map((book, index)=> {
                    return (
                        <div className="flip-card" key={index}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src={book.cover} alt={book.title} ></img>
                                </div>
                                <div className="flip-card-back">
                                    <h3>{book.title}</h3>
                                    <p>{book.description}</p>
                                    <button className="flipButton" onClick={() =>this.openModal(index)} type="button">More Information </button>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    <div id="myModal" className="modal">
                        <span className="close cursor" onClick={this.closeModal}>&times;</span>
                        <div id="getLightBox" className="modal-content">
                        {/*  {this.state.data.map((book, index)=> {
                        return (*/
                            <div className="mySlides">
                                <div className="numbertext">{this.state.imgIndex +1} / {this.state.data.length}</div>
                                <img src={this.state.image} /*style="width:100%"*/ alt="{book.title}"></img>
                            </div>
              /*      )})}  */}
                            <p className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</p>
                            <p className="next" onClick={() => this.plusSlides(1)}>&#10095;</p>
                            <div className="caption-container">
                                <p id="caption"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div id="footer">
                    <p>2018 UBIQUM | All Rights Reserved</p>
                    </div>
                </footer>
            
               
            </div> 
             
        )
    }
}



    

