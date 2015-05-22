var React = require('react');

var InspectionDetails = React.createClass({
  render: function() {
    return (
      <thead>
        <tr>
          <th>
            <div>Name:*</div>
          </th>
          <td className='spec-width'>
            <input attribute='name' 
                placeholder='Enter Name' 
                editable='true' 
                autofocus='false'/>
          </td>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>
            <div>Trade:</div>
          </th>
          <td>
          <input attribute='name' 
                placeholder='Will Be Trade Picker' 
                editable='true' 
                autofocus='false'/>
          </td>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>
            <div>
              Description:
            </div>
          </th>
          <td colspan='3' className='full-content tinymce-output'>
            <textarea/>
          </td>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>
            <div>
              Description:
            </div>
          </th>
          <td>
            <input type="file" />
          </td>
          <th></th>
          <td></td>
        </tr>
      </thead>
    );
  }

});

module.exports = InspectionDetails;