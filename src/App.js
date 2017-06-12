import React, { Component } from 'react';
import Axios from 'axios';

import StoryList from './Components/StoryList/StoryList';
import StoryButton from './Components/StoryButton/StoryButton';
import StoryModal from './Components/StoryModal/StoryModal';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      stories: [],
      modalIsOpen: false,
      story: {
        author: '',
        content: '',
        _id: undefined
      }
    };

    this.apiUrl = 'https://wt-10758e4cd3e5cc1c14fc97f413f63121-0.run.webtask.io/wt-mern-api/stories'

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // Fetch stories from API and
    // and update `stories` state
    Axios.get(this.apiUrl).then(({data}) => {
      this.setState({stories: data});
    })
  }

  handleEdit(id) {
    // Open a modal to update a story
    // Uncomment this line later
    this.openModal(this.state.stories.find(x => x._id === id))
  }

  handleDelete(id) {
    // Delete story from API
    Axios.delete(`${this.apiUrl}?id=${id}`).then(() => {
      // Remove story from stories list
      const updatedStories = this.state.stories.findIndex(x => x._id === id);
      this.setState({states: [...this.state.stories.splice(updatedStories, 1)]})
    })
  }

  openModal(story) {
    // Launches Modal. We will un-comment later
     this.setState({modalIsOpen: true});
     if(story) {
        this.setState({story});
     }
  }

  closeModal(model) {
    this.setState({modalIsOpen: false});
    console.log(model);
    if(model) {
      if(!model._id) {
        Axios.post(this.apiUrl, model).then(({data}) => {
          this.setState({stories: [data, ...this.state.stories]});
          this.setState({isLoading: false})
        })
      } else {
        Axios.put(`${this.apiUrl}?id=${model._id}`, model).then(({data}) => {
          const storyToUpdate = this.state.stories.find(x => x._id === model._id);
          const updatedStory = Object.assign({}, storyToUpdate, data)
          const newStories = this.state.stories.map(story => {
            if(data._id === story._id) return updatedStory;
            return story;
          })
          this.setState({stories: newStories});
        })
      }
    }
    this.setState({story: {
      author: '',
      content: '',
      _id: undefined
    }})
  }

  render() {
    return (
      <div className="App">

        <StoryModal
          modalIsOpen={this.state.modalIsOpen}
          story={this.state.story}
          closeModal={this.closeModal}
        />

        <div className="col-md-4 col-md-offset-4 Story">

          <div className="StoryHeader">
            <h2>Stories</h2>
          </div>
          {/* pass stories and
           event handlers down to StoryList*/}
          <StoryList
            stories={this.state.stories}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />

          <div className="StoryFooter">
            <p>Thank you!</p>
          </div>

        </div>

        <StoryButton handleClick={this.openModal.bind(this, null)} />

      </div>
    );
  }
}

export default App;
