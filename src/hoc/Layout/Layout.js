import React, {Component} from 'react';
import Footer from '../../containers/Footer/Footer';
import Header from '../../containers/Header/Header'

class Layout extends Component {

  render() {
    return (
        <React.Fragment>
            <Header/>
            <main>
                {this.props.children}
            </main>
            <Footer />
        </React.Fragment>
    );
  }
}

export default Layout;