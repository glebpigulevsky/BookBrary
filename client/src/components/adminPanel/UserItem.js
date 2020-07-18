import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { setCurrentU } from '../../actions/usersActions';
import PropTypes from 'prop-types'


const UserItem = props => {


  return (
    <Fragment>
      <tr>
        <th scope="row">{props.user._id.slice(-4)}</th>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>
          {
            (props.user.isBlocked) ? 
            (<span className="badge badge-pill badge-danger">Blocked</span>)
            : (<span className="badge badge-pill badge-success">Active</span>)
          }
        </td>
        <td>
        {
            (!props.user.isAdmin) 
            ? (<span className="badge badge-pill badge-danger">No</span>)
            : (<span className="badge badge-pill badge-success">Yes</span>)
            }
        </td>
        <td>
          <a href="#!" data-target="#edit-user-modal" data-toggle="modal" onClick={() => props.setCurrentU(props.user)}><i className="fas fa-user-edit"></i></a>
        </td>
      </tr>
      
    </Fragment>
  )
}

UserItem.propTypes = {
  setCurrentU: PropTypes.func.isRequired
}

export default connect(null, {setCurrentU})(UserItem)
