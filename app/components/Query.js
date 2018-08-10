import React from 'react';

import { connect } from 'react-redux';

import { getGraph } from '../actions/actions.js';



let Query = React.createClass({

  componentDidMount() {

    this.props.dispatch(getGraph("{resources {name ,    crn ,    space_guid,    organization_guid } }}"));



  },

  render() {

    let dispatch = this.props.dispatch;

    let fetchInProgress = String(this.props.store.get('fetching'));

    let queryText;

    let goldberg = this.props.store.get('data').toObject();

    return (

      <div>

        <p>Fetch in progress: {fetchInProgress}</p>

        <h3>{ goldberg.name }</h3>

        <p>{ goldberg.crn}</p>

        <p>{ goldberg.space_guid }</p>

        <p>{ goldberg.organization_guid }</p>

        <input ref={node => {queryText = node}}></input>

        <button onClick={() => {dispatch(getGraph(queryText.value))}}>

          query

        </button>

      </div>

    )

  }

});



const mapStateToProps = (state) => {

  return {

    store: state

  }

};



export const QueryContainer = connect(

  mapStateToProps

)(Query);
