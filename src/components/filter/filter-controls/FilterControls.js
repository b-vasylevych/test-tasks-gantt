import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import FilterResults from '../filter-results/FilterResults';
import * as reducer from '../../../reducers/tasks';
import './FilterControls.scss';

class FilterControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: '',
      selectedDuration: '',
      selectedDocumentsCount: '',
      selectedTasksCount: '',
      selectedDate: null,
      data: [],
      durationList: [],
      documentsList: [],
      tasksList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.data.length !== nextProps.data.length) {
      const { data } = nextProps;
      const durationList = this.getList(data, 'duration', (a, b) => a === b, (a, b) => a - b);
      const documentsList = this.getList(data, 'documents',
        (a, b) => a.length === b.length, (a, b) => a.length - b.length);
      const tasksList = this.getList(data, 'tasks',
        (a, b) => a.length === b.length, (a, b) => a.length - b.length);

      this.setState({ data, durationList, documentsList, tasksList });
    }
  }

  getList = (data, key, findFunc, compareFunc) => {
    const list = [];

    data.forEach((item) => {
      if (item[key] !== null) {
        const isIncluded = list.some(listValue => findFunc(item[key], listValue));
        if (!isIncluded) {
          list.push(item[key])
        }
      }
    });

    return list.sort(compareFunc);
  };

  handleInputChange = ({ target: { name, value }}) => this.applySelectedFilter({ [name]: value });

  handleDateChange = (selectedDate) => this.applySelectedFilter({ selectedDate });

  clearDate = () => this.applySelectedFilter({ selectedDate: null });

  applySelectedFilter = ({
    selectedName = this.state.selectedName,
    selectedDuration = this.state.selectedDuration,
    selectedDocumentsCount = this.state.selectedDocumentsCount,
    selectedTasksCount = this.state.selectedTasksCount,
    selectedDate = this.state.selectedDate
  }) => {
    const { data } = this.props;

    const filteredData = data.filter(({ start_date, owner, duration, documents, tasks }) => (
      this.checkDate(start_date, selectedDate) &&
      this.checkValue(owner, selectedName) &&
      this.checkValue(duration, selectedDuration) &&
      this.checkValue(documents.length, selectedDocumentsCount) &&
      this.checkValue(tasks.length, selectedTasksCount)
    ));

    this.setState({
      data: filteredData,
      selectedName,
      selectedDuration,
      selectedDocumentsCount,
      selectedTasksCount,
      selectedDate
    });
  };

  checkValue = (value, selectedValue) => String(value).toLowerCase().indexOf(String(selectedValue).toLowerCase()) !== -1;

  checkDate = (date, selectedDate) => {
    const formattedUserDate = moment(date).format('DD-MM-YYYY');
    const formattedSelectedDate = selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : '';
    return formattedUserDate.indexOf(formattedSelectedDate) !== -1;
  };

  render() {
    const { links } = this.props;
    const { data, durationList, documentsList, tasksList } = this.state;

    return (
      <React.Fragment>
        <Form className="filter-controls">
          <h2>Filter by</h2>

          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Owner name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Owner name"
                  name="selectedName"
                  value={this.state.selectedName}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Duration"
                  name="selectedDuration"
                  value={this.state.selectedDuration}
                  onChange={(e) => this.handleInputChange(e)}
                  disabled={!durationList.length}
                >
                  <option value="">Select a duration</option>
                  {durationList.map((duration) => <option value={duration} key={duration}>{ duration }</option>)}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="documents">
                <Form.Label>Documents count</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Duration"
                  name="selectedDocumentsCount"
                  value={this.state.selectedDocumentsCount}
                  onChange={(e) => this.handleInputChange(e)}
                  disabled={!documentsList.length}
                >
                  <option value="">Select the documents count</option>
                  {documentsList.map((document) => <option value={document.length} key={document}>{ document.length }</option>)}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="tasks">
                <Form.Label>Tasks count</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Duration"
                  name="selectedTasksCount"
                  value={this.state.selectedTasksCount}
                  onChange={(e) => this.handleInputChange(e)}
                  disabled={!tasksList.length}
                >
                  <option value="">Select the tasks count</option>
                  {tasksList.map((task) => <option value={task.length} key={task}>{ task.length }</option>)}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <div className="filter-controls-datepicker">
                  <DatePicker
                    selected={this.state.selectedDate}
                    onChange={(date) =>this.handleDateChange(date)}
                    placeholderText="  Select a date..."
                    dropdownMode="select"
                  />
                  <Button variant="primary" size="sm" onClick={() => this.clearDate()}>Clear date</Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <FilterResults tasks={{ data: this.state.data, links }} />
      </React.Fragment>
    );
  }
}

FilterControls.propTypes = {
  data: PropTypes.array.isRequired
};

export default connect(
  ({ tasks: { data, links, loading } }) => ({ data, links, loading }),
  null
)(FilterControls);
