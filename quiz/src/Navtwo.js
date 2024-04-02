import React, { Component } from 'react'
import './Navtwo.css'


class Navtwo extends Component {
    state = { clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className='NavbarItems'>
                <h1 className='navbar-logo'><i class="fa-brands fa-mendeley"></i>Insightify</h1>
                <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fa fa-times" :"fa fa-bars"}></i>
                </div>
                <div>
                    <h1>Section B: Personality Trait Test</h1>
                </div>
                <div>
                    <h2>30:5</h2>
                </div>
                <div>
                    <button>End Assessment</button>
                </div>
                
            </nav>
        )
    }
}

export default Navtwo;