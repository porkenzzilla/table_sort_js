const header = document.createElement('header');
header.innerHTML = '<h1>Countries Search</h1>';
document.body.before(header);

const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');
const div4 = document.createElement('div');
div1.className = 'div1';
div2.className = 'div2';
div3.className = 'div3';
div4.className = 'div4';

div1.innerHTML = `<p class="p1">Please choose the type of search:</p>
<p class="p2">Please choose search query:</p>`;

div2.innerHTML = `<input type="radio" name="radioCheck" onclick="getRegions()">
<label>By Region</label">`;

div3.innerHTML = `<input type="radio" name="radioCheck" onclick="getLanguages()">
<label>By Language</label>`;

div4.innerHTML = `<p>No items, please choose search query</p>`;

document.body.append(div1);
div1.append(div2);
div1.append(div3);

const form = document.createElement('form');
const select = document.createElement('select');
select.setAttribute('disabled', 'disabled');
select.setAttribute('id', 'select1');
select.innerHTML = '<option value="Select value">Select value</option>';
form.append(select);
div1.append(form);
const el = document.getElementById('select1');

function removeTable() {
  const tab = document.getElementById('mainTable');
  if (tab !== null) {
    const body = document.getElementsByTagName('body')[0];
    body.removeChild(body.lastChild);
  }
}

function getRegions() {
  removeTable();
  const allRegions = externalService.getRegionsList();
  select.innerHTML = '<option value="Select value">Select value</option>';
  for (const item of allRegions) {
    select.innerHTML = `${select.innerHTML}<option value=${item}>${item}</option>`;
  }
  select.removeAttribute('disabled');
  if (el.value === 'Select value') {
    document.body.append(div4);
  }
  el.addEventListener('change', () => {
    if (el.value === 'Select value') {
      removeTable();
      document.body.append(div4);
    }
  });
}

function getLanguages() {
  removeTable();
  const allLanguages = externalService.getLanguagesList();
  select.innerHTML = '<option value="Select value">Select value</option>';
  for (const item of allLanguages) {
    select.innerHTML = `${select.innerHTML}<option value=${item}>${item}</option>`;
  }
  select.removeAttribute('disabled');
  if (el.value === 'Select value') {
    document.body.append(div4);
  }
  el.addEventListener('change', () => {
    if (el.value === 'Select value') {
      removeTable();
      document.body.append(div4);
    }
  });
}

el.addEventListener('change', () => {
  if (el.value !== 'Select value') {
    if (el.value === 'North') {
      return getTable('North America');
    }
    if (el.value === 'South') {
      return getTable('South America');
    }
    return getTable(el.value);
  }
});

function getTable(val) {
  const div4Remove = document.querySelector('.div4');
  if (div4Remove !== null) {
    document.body.removeChild(div4Remove);
  }
  const table = document.createElement('table');
  table.setAttribute('id', 'mainTable');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  removeTable();
  const tr1 = document.createElement('tr');
  const country = 'Country name <span class="span1">&#8593;</span>';
  const area = 'Area <span class="span2">&#8597;</span>';
  const allTh = [`${country}`, 'Capital', 'World region', 'Languages', `${area}`, 'Flag'];
  for (const item of allTh) {
    tr1.innerHTML = `${tr1.innerHTML}<th>${item}</th>`;
  }

  const language = externalService.getCountryListByLanguage(val);
  const region = externalService.getCountryListByRegion(val);
  thead.append(tr1);
  table.append(thead);

  tbody.innerHTML += language.map((n) => `<tr>
<td class="firstElem">${n.name}</td>
<td>${n.capital}</td>
<td>${n.region}</td>
<td>${Object.values(n.languages).join(', ')}</td>
<td class="fifthElem">${n.area}</td>
<td><img src=${n.flagURL} width=64 height=64></img></td>
</tr>`).join('');

  tbody.innerHTML += region.map((n) => `<tr>
<td class="firstElem">${n.name}</td>
<td>${n.capital}</td>
<td>${n.region}</td>
<td>${Object.values(n.languages).join(', ')}</td>
<td class="fifthElem">${n.area}</td>
<td><img src=${n.flagURL} width=64 height=64></img></td>
</tr>`).join('');

  table.append(tbody);
  document.body.append(table);
  sortTable();
  const tableBody = document.querySelectorAll('tbody');

  Array.from(tableBody).map((item) => {
    item.onmouseover = function (event) {
      const { target } = event;
      if (target.parentElement.lastChild.previousSibling !== null) {
        target.parentElement.lastChild.previousSibling.style.backgroundColor = 'yellow';
      }
      target.parentElement.style.backgroundColor = 'yellow';
    };
    item.onmouseout = function (event) {
      const { target } = event;
      if (target.parentElement.lastChild.previousSibling !== null) {
        target.parentElement.lastChild.previousSibling.style.backgroundColor = 'white';
      }
      target.parentElement.style.backgroundColor = 'white';
    };
  });

  const img = document.querySelectorAll('img');
  Array.from(img).map((item1) => {
    item1.onmouseover = function (event) {
      const { target } = event;
      target.parentElement.parentElement.style.backgroundColor = 'yellow';
    };
    item1.onmouseout = function (event) {
      const { target } = event;
      target.parentElement.parentElement.style.backgroundColor = 'white';
    };
  });

  const span1 = document.querySelector('.span1');
  const span2 = document.querySelector('.span2');

  span1.addEventListener('click', () => {
    span2.innerHTML = '&#8597;';
    if (span1.textContent === '↓') {
      span1.innerHTML = '&#8593;';
      return sortTable();
    }
    span1.innerHTML = '&#8595;';
    return reverseTable();
  });

  span2.addEventListener('click', () => {
    if (span2.textContent === '↕' || span2.textContent === '↓') {
      span2.innerHTML = '&#8593;';
      let arr = Array.from(table.rows);
      arr = arr.slice(1);
      arr.sort((a, b) => {
        const str = Number(a.cells[4].textContent);
        const str2 = Number(b.cells[4].textContent);
        return str - str2;
      });
      table.tBodies[0].append(...arr);
      return;
    }
    if (span2.textContent === '↑') {
      span2.innerHTML = '&#8595;';
      let arr = Array.from(table.rows);
      arr = arr.slice(1);
      arr.sort((a, b) => {
        const str = Number(a.cells[4].textContent);
        const str2 = Number(b.cells[4].textContent);
        return str2 - str;
      });
      table.tBodies[0].append(...arr);
    }
  });

  function sortTable() {
    const tableBody = document.querySelector('tbody');
    const tableData = table2data(tableBody);
    tableData.sort();
    data2table(tableBody, tableData);
  }

  function reverseTable() {
    const tableBody = document.querySelector('tbody');
    const tableData = table2data(tableBody);
    tableData.sort().reverse();
    data2table(tableBody, tableData);
  }

  function table2data(tableBody) {
    const tableData = [];
    tableBody.querySelectorAll('tr')
      .forEach((row) => {
        const rowData = [];
        row.querySelectorAll('td')
          .forEach((cell) => {
            rowData.push(cell.innerHTML);
          });
        tableData.push(rowData);
      });
    return tableData;
  }
  function data2table(tableBody, tableData) {
    tableBody.querySelectorAll('tr')
      .forEach((row, i) => {
        const rowData = tableData[i];
        row.querySelectorAll('td')
          .forEach((cell, j) => {
            cell.innerHTML = rowData[j];
          });
        tableData.push(rowData);
      });
  }
}
