import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearCurrentU, updateAusers, deleteUser } from '../../actions/usersActions';
import { ToastContainer, toast } from 'react-toastify';
  




const EditUserModal = props => {

  const notify = () => toast("Contact deleted");
  const [isAdmin, setIsAdmin] = useState('');
  const [isBlocked, setIsBlocked] = useState('');

  useEffect(() => {
    if(props.users.current !== null) {
      setIsAdmin(props.users.current.isAdmin);
      setIsBlocked(props.users.current.isBlocked);
    }
    //eslint-disable-next-line
  },[props.users.current])
  
  const onSubmit = () => {
    console.log('isAdmin: ', isAdmin, '  isBlocked: ', isBlocked);
    props.updateAusers({isAdmin, isBlocked, id: props.users.current._id});
  }

  return (
    <Fragment>
      <ToastContainer 
        position="bottom-right"
      />
      { !props.users.loading 
        && (
          <div id="edit-user-modal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{props.users.current !== null && props.users.current.email + ' as ' + props.users.current.name}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.clearCurrentU()}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <div>
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="customSwitch2"
                          checked={!isBlocked}
                          onChange={e => setIsBlocked(!isBlocked)}
                        />
                        <label className="custom-control-label" htmlFor="customSwitch2">Status: {!isBlocked ? 'active' : 'blocked'}</label>
                      </div>
                      <div className="custom-control custom-switch">
                        <input 
                          type="checkbox" 
                          className="custom-control-input" 
                          id="customSwitch1" 
                          checked={isAdmin}
                          onChange={e => setIsAdmin(!isAdmin)}
                        />
                        <label className="custom-control-label" htmlFor="customSwitch1">Admin rights</label>
                      </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  

                    <div className="">
                      <button
                       type="button"
                       className="btn btn-danger"
                       data-dismiss="modal"
                       onClick={() => {
                        props.deleteUser(props.users.current._id);
                        notify();
                      }}
                      >
                           Delete user
                      </button>
                    </div>

                    <div className="">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {props.clearCurrentU();}}>Close</button>
                      <button type="button" className="btn btn-primary ml-2" data-dismiss="modal" onClick={onSubmit}>Save changes</button>
                    </div>
                    
                  
                </div>
              </div>
            </div>
          </div>
        ) 
      
      }
      
    </Fragment>
    
  )
}

EditUserModal.propTypes = {
  clearCurrentU: PropTypes.func.isRequired,
  updateAusers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
}



const mapStateToProps = state => ({
  users: state.users,
})

export default connect(mapStateToProps, { clearCurrentU, updateAusers, deleteUser })(EditUserModal)
