import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gantt } from 'dhtmlx-gantt';

import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './FilterResults.scss';
import * as reducer from '../../../reducers/tasks';

class FilterResults extends Component {
  componentDidMount() {
    const { tasks } = this.props;
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.columns = [
      { name: 'text', label: 'Task name', tree: true, width: '*', min_width: 150 },
      { name: 'start_date', label: 'Start time', align: 'center', min_width: 80 },
      { name: 'duration', label: 'Duration', align: 'center' },
      { name: 'owner', label: 'Owner', align: 'center' },
      { name: 'documents', label: 'Documents', align: 'center', template: ({ documents }) => documents ? documents.length : 0 },
      { name: 'tasks', label: 'Tasks', align: 'center', template: ({ tasks }) => tasks ? tasks.length : 0 },
      { name: 'team_managers', label: 'Team Managers', align: 'center',
        min_width: 100, template: ({ team_managers }) => team_managers ? team_managers.length : 0 },
      { name: 'subcontractor_managers', label: 'Subc. Managers', align: 'center',
        min_width: 100, template: ({ subcontractor_managers }) => subcontractor_managers ? subcontractor_managers.length : 0},
      { name: 'add', label: '' }
    ];
    gantt.attachEvent('onBeforeTaskAdd', (id, taskData) => {
      try {
        debugger
        this.props.addTask(id, taskData);
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    });
    gantt.init(this.ganttContainer);
    gantt.parse(tasks);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    gantt.clearAll();
    gantt.parse(nextProps.tasks);
    gantt.render();
  }

  componentWillUnmount() {
    gantt.clearAll();
  }

  render() {
    return (
      <div className="filter-results">
        <div
          ref={ (node) => { this.ganttContainer = node } }
          style={ { width: '100%', height: '85vh' } }
        />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    addTask: (id, taskData) => {dispatch(reducer.onAddTask(id, taskData))}
  })
)(FilterResults);
