import { connect } from 'react-redux'
import TestButton from './TestButton'
import { testFunction } from './TestButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    buttonClicked: (event) => {
      event.preventDefault();

      dispatch(testFunction())
    }
  }
}

const TestButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestButton)

export default TestButtonContainer
