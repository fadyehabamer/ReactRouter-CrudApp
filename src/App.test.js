import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

const addEmployee = ({ id, name, age = '30', address = 'Cairo', salary }) => {
  userEvent.click(screen.getByRole('link', { name: /add newstudent/i }));
  userEvent.type(screen.getByLabelText('ID'), id);
  userEvent.type(screen.getByLabelText('Name'), name);
  userEvent.type(screen.getByLabelText('Age'), age);
  userEvent.type(screen.getByLabelText('Address'), address);
  userEvent.type(screen.getByLabelText('Salary'), salary);
  userEvent.click(screen.getByRole('button', { name: 'Add' }));
};

const rows = () => screen.queryAllByRole('listitem');

test('opening the edit page directly redirects to the list instead of crashing', () => {
  renderAt('/EditStudent/0');
  expect(screen.getByRole('heading', { name: /crud using react router/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/List');
});

test('adding works when the add page is opened directly', () => {
  renderAt('/AddStudent');
  userEvent.type(screen.getByLabelText('Name'), 'Ann');
  userEvent.type(screen.getByLabelText('Salary'), '3000');
  userEvent.click(screen.getByRole('button', { name: 'Add' }));

  expect(rows()).toHaveLength(1);
  expect(rows()[0]).toHaveTextContent('Ann');
});

test('editing keeps the salary', () => {
  renderAt('/');
  addEmployee({ id: '1', name: 'Ann', salary: '3000' });

  userEvent.click(within(rows()[0]).getByRole('link', { name: /edit/i }));
  expect(screen.getByLabelText('Salary')).toHaveValue('3000');
  userEvent.clear(screen.getByLabelText('Name'));
  userEvent.type(screen.getByLabelText('Name'), 'Anna');
  userEvent.click(screen.getByRole('button', { name: /save/i }));

  expect(rows()[0]).toHaveTextContent('Anna');
  expect(rows()[0]).toHaveTextContent('3000');
});

test('sorts ascending by salary and deletes the right row', () => {
  renderAt('/');
  addEmployee({ id: '1', name: 'Ann', salary: '10000' });
  addEmployee({ id: '2', name: 'Bob', salary: '900' });

  userEvent.click(screen.getByRole('button', { name: /sort by salary/i }));
  expect(rows()[0]).toHaveTextContent('Bob');
  expect(rows()[1]).toHaveTextContent('Ann');

  userEvent.click(within(rows()[0]).getByRole('button', { name: /delete/i }));
  expect(rows()).toHaveLength(1);
  expect(rows()[0]).toHaveTextContent('Ann');
});

test('the salary filter is reversible and keeps edit targets correct', () => {
  renderAt('/');
  addEmployee({ id: '1', name: 'Bob', salary: '1000' });
  addEmployee({ id: '2', name: 'Ann', salary: '3000' });

  userEvent.click(screen.getByRole('button', { name: /filter above 2500/i }));
  expect(rows()).toHaveLength(1);
  expect(rows()[0]).toHaveTextContent('Ann');

  userEvent.click(screen.getByRole('button', { name: /show all/i }));
  expect(rows()).toHaveLength(2);

  userEvent.click(screen.getByRole('button', { name: /filter above 2500/i }));
  userEvent.click(within(rows()[0]).getByRole('link', { name: /edit/i }));
  expect(screen.getByLabelText('Name')).toHaveValue('Ann');
});
