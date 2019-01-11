import React, { Component } from 'react';
import '../../node_modules/materialize-css/dist/css/materialize.min.css';
class Header extends Component {

  render() {

   //console.log(this.props.total);
    return (
      <nav>
       <div class="nav-wrapper">
         <span class="brand-logo">NBA Data</span>
        </div>
       </nav>
    );
  }
}


export default Header;
