import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchList } from '../actions/actions'

class Home extends Component {

  componentWillMount() {
    this.props.retrieve();
  }

  render() {
    return (
      <div>
        <h1>Hello world!</h1>
        <span>{this.props.cats.items.length}</span>
      </div>
    )
  }

}

const mapStateToProps = (
  state
) => {
  return {
    cats: state.cats
  }
}

const mapDispatchToProps = (
  dispatch
) => {
  return {
    retrieve: () => {
      dispatch(fetchList());
    }
  }
}

export default connect(
  state => ({ cats: state.cats }),
  (dispatch) => {
    return {
      retrieve: () => {
        dispatch(fetchList())
      }
    }
  }
)(Home)