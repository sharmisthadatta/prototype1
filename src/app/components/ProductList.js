import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchProductsSuccess} from '../actions/actions.js';
import ReactTable from "react-table";
import "react-table/react-table.css";




class ProductList extends React.Component {

  componentDidMount() {}

       //let fp = fetchPage.bind(this);

       //debugger;
       fetch("https://dev-console.stage1.bluemix.net/datalayer/graphql", {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
          'Authorization':'bearer eyJraWQiOiIyMDE3MTAyNS0xNjoyNzoxMCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJJQk1pZC0wNjAwMDBXTUVIIiwiaWQiOiJJQk1pZC0wNjAwMDBXTUVIIiwicmVhbG1pZCI6IklCTWlkIiwiaWRlbnRpZmllciI6IjA2MDAwMFdNRUgiLCJnaXZlbl9uYW1lIjoiSm9uIiwiZmFtaWx5X25hbWUiOiJCZW5uZXR0IiwibmFtZSI6IkpvbiBCZW5uZXR0IiwiZW1haWwiOiJqZGJlbm5ldEBjYS5pYm0uY29tIiwic3ViIjoiamRiZW5uZXRAY2EuaWJtLmNvbSIsImFjY291bnQiOnsiYnNzIjoiOTVmYzI0NDM2OTVjMTY5ZmM5MWI0MWFlODgwN2QyMWYifSwiaWF0IjoxNTMzNjY1NDE2LCJleHAiOjE1MzM2NjkwMTYsImlzcyI6Imh0dHBzOi8vaWFtLnN0YWdlMS5uZy5ibHVlbWl4Lm5ldC9vaWRjL3Rva2VuIiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiYngiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.E0lW1sQ4gcmIBTFwZwqM8Qz5q_524inz6zPNHk39KNdaK3EmV-MNVf-joU0_QPzUNOBs4kNntkHgZQlaIMMyv0rqLpum8KAvbxunZTxJn9f_W1AELdid5-u-cUJtY03fiKHEITrjedKQM7wm6YeGUHcJQyOD6ngeJHOh2asxFMABQurVSk4cmhBePXzHQod4jzK3ISXKTha_KHFz2rDuDPrlQu51BiYga3ChtmFQnCur8PsjzT63xJOw4P_JXxT4oh8BqBhko7iehQGLHjx_o0x1P8Pt2qJpkAD64rayJyTBkxVphaTfhPjN6hyo7zNvrprNKr0RydTgaxaxOosIKQ'
        },
          body: JSON.stringify({ query: '{ 	resource_list(progressive:true,limit:50) 	{ resources{	name 	crn organization_guid } cursor 	}} ' }),

        })
        .then(res => res.json())
        .then(res => {
        console.log(res);
        let cursor =res.data.resource_list.cursor;
        if(cursor)
          {
            fetchPage(cursor)
          }

        });


      const fetchPage = (cursor) => {

              fetch("https://dev-console.stage1.bluemix.net/datalayer/graphql", {
              method: 'POST',
              headers: {'Content-Type': 'application/json',
              'Authorization':'bearer eyJraWQiOiIyMDE3MTAyNS0xNjoyNzoxMCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJJQk1pZC0wNjAwMDBXTUVIIiwiaWQiOiJJQk1pZC0wNjAwMDBXTUVIIiwicmVhbG1pZCI6IklCTWlkIiwiaWRlbnRpZmllciI6IjA2MDAwMFdNRUgiLCJnaXZlbl9uYW1lIjoiSm9uIiwiZmFtaWx5X25hbWUiOiJCZW5uZXR0IiwibmFtZSI6IkpvbiBCZW5uZXR0IiwiZW1haWwiOiJqZGJlbm5ldEBjYS5pYm0uY29tIiwic3ViIjoiamRiZW5uZXRAY2EuaWJtLmNvbSIsImFjY291bnQiOnsiYnNzIjoiOTVmYzI0NDM2OTVjMTY5ZmM5MWI0MWFlODgwN2QyMWYifSwiaWF0IjoxNTMzNjY1NDE2LCJleHAiOjE1MzM2NjkwMTYsImlzcyI6Imh0dHBzOi8vaWFtLnN0YWdlMS5uZy5ibHVlbWl4Lm5ldC9vaWRjL3Rva2VuIiwiZ3JhbnRfdHlwZSI6InBhc3N3b3JkIiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiYngiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.E0lW1sQ4gcmIBTFwZwqM8Qz5q_524inz6zPNHk39KNdaK3EmV-MNVf-joU0_QPzUNOBs4kNntkHgZQlaIMMyv0rqLpum8KAvbxunZTxJn9f_W1AELdid5-u-cUJtY03fiKHEITrjedKQM7wm6YeGUHcJQyOD6ngeJHOh2asxFMABQurVSk4cmhBePXzHQod4jzK3ISXKTha_KHFz2rDuDPrlQu51BiYga3ChtmFQnCur8PsjzT63xJOw4P_JXxT4oh8BqBhko7iehQGLHjx_o0x1P8Pt2qJpkAD64rayJyTBkxVphaTfhPjN6hyo7zNvrprNKr0RydTgaxaxOosIKQ'
            },
              body: JSON.stringify({ query: '{ 	page(cursor: ${cursor}){ resources{ name 	crn	resource_group_name } 	cursor 	} }  	' }),

            })
            .then(res => res.json())
            .then(res => {
            results=[].concat(res);
            console.log(results);
            console.log(res);
            let cursor =res.data.resource_list.cursor;
            if(cursor)
              {
                 //action(results)
                 fetchPage(cursor)
              }
            else{
                   return action(results);
                 }
            });

          }

   render() {
      const products= this.props.products;

  return(<h1>successs</h1>)


    }

  }




const mapDispatchToProps = (dispatch) => {
    return {
        fetchData:(data) => {
          return dispatch(fetchProductsSuccess(data))
        }
    };
};


const mapStateToProps = state =>
 {
 return {
    products: state.items
        }
}



export default connect(mapStateToProps,mapDispatchToProps)(ProductList);
