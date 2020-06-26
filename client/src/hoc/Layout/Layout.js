import React, {Component} from 'react'
import classes from './Layout.module.css'

import { connect } from 'react-redux';
import { Dh } from  '../../store/actions/Dh'


class Layout extends Component {

    componentDidMount() {   
        console.log("componentDidMount");
        this.props.Dh();
    }

    render() {
        console.log("render")
        return (
            <div className={classes.Layout}>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return { 
      Dh: () => dispatch(Dh())
    }
}

export default connect(null, mapDispatchToProps)(Layout);