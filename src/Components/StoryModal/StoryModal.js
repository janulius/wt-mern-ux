import React from 'react';
import Modal from 'react-modal';

import './StoryModal.css'

// Modal custom styles
// Basically centering stuff
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class StoryModal extends React.Component {

  constructor(props) {
    super(props)
    // Internal state
    this.state = {
      author: '',
      content: '',
      _id: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    // Re-binding author and content values
    if(e.target.id === 'author') {
      this.setState({author: e.target.value})
    }
    if(e.target.id === 'content') {
      this.setState({content: e.target.value})
    }
  }

  componentWillReceiveProps({story}) {
    // Update story state anytime
    // a new props is passed to the Modal
    // This is handy because the component
    // is never destroyed but it's props might change
    this.setState(story)
  }

  render() {
    const {
      modalIsOpen,
      closeModal
    } = this.props;
    // Use React's Modal component
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal.bind(this, null)}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Story Modal"
      >

        <div className="Modal">
          <h4 className="text-center">Story Form</h4>
          <div className="col-md-6 col-md-offset-3">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={this.state.author} onChange={this.handleInputChange} id="author" className="form-control"/>
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea value={this.state.content} onChange={this.handleInputChange} cols="30" id="content" className="form-control"></textarea>
              </div>
              <div className="form-group">
                <button
                  className="ModalButton"
                  onClick={closeModal.bind(this, this.state)}
                >Save</button>
                <button
                  className="ModalButton ModalButton--close"
                  onClick={closeModal.bind(this, null)}
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    )
  }
}