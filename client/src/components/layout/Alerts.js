import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const Alerts = ({alerts}) => {
  
  return (
    alerts.length > 0 && alerts.map(alert => (
      <div className={`alert alert-${alert.alertType}`} role="alert" key={alert.id}>
        {alert.msg}
      </div>
    ))
  )
}

Alerts.propTypes = {
   alerts: PropTypes.array.isRequired
 }
const mapStatToProps = state => ({
  alerts: state.alert
})

export default connect(mapStatToProps)(Alerts)