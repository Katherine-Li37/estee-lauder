/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            searchTerm: null,
            searchResult: []
        };

        this.keyPress = this.keyPress.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e){
        this.setState({searchTerm: e.target.value});
    }

    keyPress(e){
        if(e.keyCode == 13){
            var authOptions = {
                method: 'POST',
                url: 'http://localhost:3035',
                data: e.target.value,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            };

            axios(authOptions)
              .then(function (response)  {
                this.setState({searchResult: response.data});
                console.log(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
     }

     renderProducts(){
        if(this.state.searchResult!==undefined && this.state.searchResult.length!==0){
            return this.state.searchResult.map((product) => {
                return (
                    <TableRow key={product._id}>
                        <TableCell>
                            <img src={product.picture}
                                style={{width: "100px", height: "100px"}}
                            />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.about}</TableCell>
                        <TableCell>{product.tags}</TableCell>
                    </TableRow>
                );
            });
        }
    }

    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e)} onKeyDown={this.keyPress} placeholder="ENTER SEARCH TERM"/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <div className='search-results'>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Picture</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>About</TableCell>
                                <TableCell>Tags</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.renderProducts() }
                        </TableBody>
                    </Table>
                    </div>
                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;