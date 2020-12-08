import React from 'react';

import libraryData from '../../../helpers/data/libraryData';

import './AddNewLibrary.scss';

class AddNewLibrary extends React.Component {
    state = {
        newLibraryName: ''
    }

    newLibraryName = (e) => {
        e.preventDefault();
        this.setState({ newLibraryName: e.target.value});
      }

      createNewLibrary = (e) => {
        e.preventDefault();
        const {
          newLibraryName,
        } = this.state;
    
    const newLibrary = {
        libraryName: newLibraryName,
    };

    libraryData.addNewLibrary(newLibrary)
    .then(() => this.props.history.push('/home'))
    .catch((err) => console.error('unable to add new Library'))
    }

    render() {
        const newLibraryName = this.state;
        return(
            <div className="AddNewLibrary">
                <form className="col-6 offset-3 text-left">
                    <div className="form-group">
                        <label htmlFor="new-library-name">Give Your Library A Name</label>
                            <input
                            type="text"
                            className="form-control"
                            id="new-library-name"
                            value={newLibraryName}
                            onChange={this.newLibraryName}
                            />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddNewLibrary;
